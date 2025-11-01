from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Venue
from .serializers import VenueSerializer
from .permissions import IsAdminOrReadOnly  

class VenueViewSet(viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def perform_create(self, serializer):
        #setting the user who created the venue
        serializer.save(created_by=self.request.user)
