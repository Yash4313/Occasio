from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from .models import Feedback, ContactMessage
from .serializers import FeedbackSerializer, ContactMessageSerializer
from .permissions import IsOwnerOrAdmin

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        contact_message = serializer.save()
        # Send email to host
        subject = f"New Contact Message from {contact_message.name}"
        message = render_to_string('email/contact_message.html', {
            'name': contact_message.name,
            'email': contact_message.email,
            'message': contact_message.message,
            'created_at': contact_message.created_at,
        })
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', None) or getattr(settings, 'EMAIL_HOST_USER', None)
        recipient_list = [settings.EMAIL_HOST_USER]  # Send to the host email

        if from_email and recipient_list:
            msg = EmailMessage(subject, message, from_email, recipient_list)
            msg.content_subtype = "html"  # Main content is now text/html
            try:
                msg.send(fail_silently=False)
            except Exception as e:
                # Log the error but don't fail the request
                import logging
                logging.getLogger(__name__).exception("Failed to send contact email")
