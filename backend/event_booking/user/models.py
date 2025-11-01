from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(
        max_length=20,
        choices=[
            ('user', 'User'),
            ('vendor', 'Vendor'),
            ('admin', 'Admin')
        ],
        default='user'
    )

    def __str__(self):
        return self.username
