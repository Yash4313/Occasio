from rest_framework import viewsets
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer,RegisterSerializer
from django.template.loader import render_to_string
# Allow login by username OR email by customizing the TokenObtainPair serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.conf import settings
from django.core.mail import EmailMessage
import random
import logging
from django.contrib.auth import authenticate

UserModel = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Accept either username or email in the 'username' field when obtaining tokens."""

    def validate(self, attrs):
        # attrs typically contains 'username' and 'password'
        identifier = attrs.get(self.username_field)
        # If identifier looks like an email, try to map it to a username
        if identifier and "@" in identifier:
            try:
                user = UserModel.objects.get(email__iexact=identifier)
                # replace the identifier with the user's username and continue
                attrs[self.username_field] = getattr(user, self.username_field)
            except UserModel.DoesNotExist:
                # leave attrs untouched; super() will handle invalid credentials
                pass

        return super().validate(attrs)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Send welcome email
            try:
                subject = "Welcome to Occasio!"
                # You would create this template in your templates directory
                message = render_to_string('email/registration_confirmation.html', {
                    'user': user,
                })
                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', None) or getattr(settings, 'EMAIL_HOST_USER', None)
                
                if user.email and from_email:
                    msg = EmailMessage(subject, message, from_email, [user.email])
                    msg.content_subtype = "html"
                    # msg.send(fail_silently=True) # Set to False to debug email sending issues
                    msg.send(fail_silently=False) # Set to False to debug email sending issues
            except Exception as e:
                # Log the error if email sending fails
                logging.getLogger(__name__).exception("Failed to send registration email")

            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  

            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token or already blacklisted"}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OTPRequestView(APIView):
    """Request an OTP for a given phone number. Stores OTP in cache with a short TTL.

    Expects POST {"phone": "+919876543210"}
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Accept either 'identifier' (email or phone) or explicit 'phone'/'email'
        identifier = request.data.get('identifier')
        phone = request.data.get('phone')
        email = request.data.get('email')

        # prefer explicit phone/email, otherwise use identifier heuristic
        target_phone = None
        target_email = None
        if phone:
            target_phone = phone
        elif email:
            target_email = email
        elif identifier:
            if '@' in identifier:
                target_email = identifier
            else:
                target_phone = identifier

        if not target_phone and not target_email:
            return Response({"identifier": "Phone or email is required."}, status=status.HTTP_400_BAD_REQUEST)

        user = None
        key = None

        password = request.data.get('password')

        # If a password was supplied, validate credentials first.
        if password:
            # determine username for authenticate()
            username_for_auth = None
            if target_email:
                u = User.objects.filter(email__iexact=target_email).first()
                if u:
                    username_for_auth = u.username
            elif target_phone:
                u = User.objects.filter(phone__iexact=target_phone).first()
                if u:
                    username_for_auth = u.username
            else:
                # identifier was likely provided and not an email; treat it as username
                username_for_auth = identifier

            if not username_for_auth:
                return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

            user_auth = authenticate(request, username=username_for_auth, password=password)
            if not user_auth:
                return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

            # credentials valid; use this user for OTP
            user = user_auth
            if target_email:
                key = f"otp:email:{target_email}"
            else:
                key = f"otp:phone:{target_phone}"
        else:
            # No password supplied: only require that a user exists for the identifier
            if target_phone:
                user = User.objects.filter(phone__iexact=target_phone).first()
                key = f"otp:phone:{target_phone}"
            else:
                user = User.objects.filter(email__iexact=target_email).first()
                key = f"otp:email:{target_email}"

            if not user:
                return Response({"detail": "No account associated with this identifier."}, status=status.HTTP_400_BAD_REQUEST)

        # generate 6-digit numeric OTP
        otp = f"{random.randint(100000, 999999):06d}"

        # store user id and code
        cache.set(key, {"code": otp, "user_id": user.id}, timeout=60 * 5)  # 5 minutes

        # Send OTP via email if we have an email, otherwise log (SMS sending not implemented)
        if target_email:
            subject = "Your login OTP"
            message = render_to_string('email/otp_email.html', {'otp': otp, 'user': user})
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', None) or getattr(settings, 'EMAIL_HOST_USER', None)
            # default response (assume success unless exception)
            resp = {"detail": "OTP sent to email"}
            try:
                # If email backend is configured this will send;
                msg = EmailMessage(subject, message, from_email, [target_email])
                msg.fail_silently = True
                msg.content_subtype = "html"
                msg.send()
            except Exception:
                logging.getLogger(__name__).exception("Failed to send OTP email")
                logging.getLogger(__name__).info(f"OTP for email {target_email}: {otp}")
        else:
            # For phone, production should integrate SMS provider. For now log it.
            logging.getLogger(__name__).info(f"OTP for phone {target_phone}: {otp}")
            resp = {"detail": "OTP sent to phone"}

        if getattr(settings, 'DEBUG', False):
            # include OTP in response only in debug mode
            resp['otp'] = otp

        return Response(resp, status=status.HTTP_200_OK)


class OTPVerifyView(APIView):
    """Verify an OTP and return JWT tokens if valid.

    Expects POST {"phone": "+919876543210", "code": "123456"}
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # accept identifier OR phone/email along with code
        identifier = request.data.get('identifier')
        phone = request.data.get('phone')
        email = request.data.get('email')
        code = request.data.get('code')

        if not code or (not identifier and not phone and not email):
            return Response({"detail": "Identifier and code are required."}, status=status.HTTP_400_BAD_REQUEST)

        # determine cache key
        if phone:
            cache_key = f"otp:phone:{phone}"
        elif email:
            cache_key = f"otp:email:{email}"
        else:
            if '@' in identifier:
                cache_key = f"otp:email:{identifier}"
            else:
                cache_key = f"otp:phone:{identifier}"

        data = cache.get(cache_key)
        if not data or str(data.get('code')) != str(code):
            return Response({"detail": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)

        # lookup user
        try:
            user = User.objects.get(id=data.get('user_id'))
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

        # OTP valid -> clear cache and return tokens
        cache.delete(cache_key)
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
