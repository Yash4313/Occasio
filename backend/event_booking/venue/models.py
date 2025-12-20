from django.db import models
from django.conf import settings

class Venue(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=150)
    capacity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='venues')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

