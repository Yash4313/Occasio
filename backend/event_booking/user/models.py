import random
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

    # NEW FIELDS (only for vendor)
    shop_name = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    vendor_id = models.CharField(max_length=20, unique=True, blank=True, null=True)

    def generate_vendor_id(self):
        if self.role != 'vendor':
            return None

        state_code = (self.state[:2] if self.state else "XX").upper()
        city_code = (self.city[:3] if self.city else "XXX").upper()
        random_number = str(random.randint(1000, 9999))

        return f"{state_code}{city_code}{random_number}"

    def save(self, *args, **kwargs):
        if self.role == 'vendor' and not self.vendor_id:
            self.vendor_id = self.generate_vendor_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
