from rest_framework import viewsets,generics
from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer,RegisterSerializer,VendorSerializer
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

class RegisterView( generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            try:
                subject = "Welcome to Occasio!"

                if user.role == 'vendor':
                    message = render_to_string('email/vendor_registration.html', {
                        'user': user,
                        'vendor_id': user.vendor_id
                    })
                else:
                    message = render_to_string('email/registration_confirmation.html', {
                        'user': user,
                    })

                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', None) or getattr(settings, 'EMAIL_HOST_USER', None)

                if user.email:
                    msg = EmailMessage(subject, message, from_email, [user.email])
                    msg.content_subtype = "html"
                    msg.send(fail_silently=False)

            except Exception as e:
                logging.getLogger(__name__).exception("Email failed")

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
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        identifier = request.data.get('identifier')
        password = request.data.get('password')
        role = request.data.get('role')

        if not identifier or not password:
            return Response({"detail": "Identifier and password required"}, status=400)

        user = None

        # ===== VENDOR LOGIN (NO OTP) =====
        if role == "vendor":
            user = User.objects.filter(vendor_id__iexact=identifier).first()
            if not user:
                return Response({"detail": "Invalid Vendor ID"}, status=400)

            user_auth = authenticate(request, username=user.username, password=password)
            if not user_auth:
                return Response({"detail": "Invalid credentials"}, status=400)

            #  NO OTP FOR VENDOR
            refresh = RefreshToken.for_user(user)

            return Response({
                'user': VendorSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'role': 'vendor'
            }, status=200)

        # ===== USER LOGIN (OTP FLOW) =====
        else:
            user = User.objects.filter(email__iexact=identifier).first()
            if not user:
                return Response({"detail": "Invalid email"}, status=400)

            user_auth = authenticate(request, username=user.username, password=password)
            if not user_auth:
                return Response({"detail": "Invalid credentials"}, status=400)

            # ===== OTP GENERATION =====
            otp = f"{random.randint(100000, 999999):06d}"
            key = f"otp:email:{user.email}"

            cache.set(key, {"code": otp, "user_id": user.id}, timeout=300)

            # send email
            try:
                subject = "Your login OTP"
                message = render_to_string('email/otp_email.html', {'otp': otp, 'user': user})
                from_email = settings.EMAIL_HOST_USER

                msg = EmailMessage(subject, message, from_email, [user.email])
                msg.content_subtype = "html"
                msg.send(fail_silently=True)
            except Exception:
                logging.getLogger(__name__).exception("OTP email failed")

            return Response({"detail": "OTP sent to email"}, status=200)


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
