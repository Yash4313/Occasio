from rest_framework import viewsets, permissions
from .models import Feedback
from .serializers import FeedbackSerializer
from .permissions import IsOwnerOrAdmin

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrAdmin]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
