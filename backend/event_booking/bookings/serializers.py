from rest_framework import serializers
from .models import Booking, VenueBooking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'total_price', 'booking_date']
    
    def validate_purpose(self, value):
        if not value:
            raise serializers.ValidationError("Purpose is required.")
        return value


class VenueBookingSerializer(serializers.ModelSerializer):
    venue_name = serializers.CharField(source='venue.name', read_only=True)
    venue_price = serializers.DecimalField(source='venue.price', read_only=True, max_digits=10, decimal_places=2)
    
    class Meta:
        model = VenueBooking
        fields = '__all__'
        read_only_fields = ['user', 'total_price', 'booking_date']
    
    def validate_purpose(self, value):
        if not value:
            raise serializers.ValidationError("Purpose is required.")
        return value
    
    def validate_event_date(self, value):
        from datetime import date
        if value < date.today():
            raise serializers.ValidationError("Event date cannot be in the past.")
        return value
    
    def validate(self, data):
        # Check if venue is already booked for the selected date
        from django.core.exceptions import ValidationError
        venue = data.get('venue')
        event_date = data.get('event_date')
        
        if venue and event_date:
            existing = VenueBooking.objects.filter(
                venue=venue,
                event_date=event_date,
                status__in=['pending', 'confirmed']
            ).exists()
            if existing:
                raise serializers.ValidationError(
                    "This venue is already booked for the selected date."
                )
        
        return data
