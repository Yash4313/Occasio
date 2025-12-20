from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from events.models import Event
from venue.models import Venue

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    PURPOSE_CHOICES = [
        ('wedding', 'Wedding'),
        ('birthday', 'Birthday'),
        ('corporate', 'Corporate Event'),
        ('party', 'Party'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='bookings')
    num_tickets = models.PositiveIntegerField(default=1)
    booking_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    purpose = models.CharField(max_length=50, choices=PURPOSE_CHOICES, default='other')

    def save(self, *args, **kwargs):
        # Automatically calculate total price based on event price × tickets
        self.total_price = self.event.price * self.num_tickets
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.event.title} ({self.status})"


class VenueBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    PURPOSE_CHOICES = [
        ('wedding', 'Wedding'),
        ('birthday', 'Birthday'),
        ('corporate', 'Corporate Event'),
        ('party', 'Party'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='venue_bookings')
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='bookings')
    event_date = models.DateField()
    purpose = models.CharField(max_length=50, choices=PURPOSE_CHOICES, default='other')
    custom_requirements = models.TextField(blank=True, null=True)
    booking_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    class Meta:
        unique_together = ('venue', 'event_date')
    
    def save(self, *args, **kwargs):
        # Check if venue is already booked for this date
        if not self.pk:  # Only check on creation, not update
            existing = VenueBooking.objects.filter(
                venue=self.venue,
                event_date=self.event_date,
                status__in=['pending', 'confirmed']
            ).exists()
            if existing:
                raise ValidationError("This venue is already booked for the selected date.")
        
        # Calculate total price based on venue price
        self.total_price = self.venue.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.venue.name} ({self.event_date})"