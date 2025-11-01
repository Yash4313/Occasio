from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer
from venue.permissions import IsAdminOrReadOnly  # reuse the permission

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
