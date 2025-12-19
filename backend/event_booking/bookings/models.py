from django.db import models
from django.conf import settings
from events.models import Event

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='bookings')
    num_tickets = models.PositiveIntegerField(default=1)
    booking_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def save(self, *args, **kwargs):
        # Automatically calculate total price based on event price × tickets
        self.total_price = self.event.price * self.num_tickets
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.event.title} ({self.status})"

