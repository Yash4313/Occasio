from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Booking, VenueBooking
from .serializers import BookingSerializer, VenueBookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Normal users see only their bookings
        user = self.request.user
        if user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VenueBookingViewSet(viewsets.ModelViewSet):
    queryset = VenueBooking.objects.all()
    serializer_class = VenueBookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Normal users see only their venue bookings
        user = self.request.user
        if user.is_staff:
            return VenueBooking.objects.all()
        return VenueBooking.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)