from django.db import models
from user.models import User

class Venue(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=150)
    capacity = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='venues')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

