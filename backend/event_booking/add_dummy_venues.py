import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'event_booking.settings')
django.setup()

from venue.models import Venue
from user.models import User

# Get admin user or create one
admin_user = User.objects.filter(is_staff=True).first()
if not admin_user:
    admin_user = User.objects.create_user(username='admin', password='admin123', is_staff=True, is_superuser=True)

# Add dummy venues
venues_data = [
    {
        'name': 'Ramada',
        'location': 'Gomti Nagar, Lucknow',
        'capacity': 350,
        'price': 40000,
        'description': 'Perfect for weddings and large celebrations with elegant décoration.'
    },
    {
        'name': 'Garden Galaxy',
        'location': 'Hazratganj, Lucknow',
        'capacity': 200,
        'price': 25000,
        'description': 'Open-air charm for intimate gatherings, surrounded by greenery and fresh vibes.'
    },
    {
        'name': 'Moon & Mars',
        'location': 'Indira Nagar, Lucknow',
        'capacity': 250,
        'price': 32000,
        'description': 'Stylish space for cocktail parties and receptions with modern interiors.'
    },
    {
        'name': 'Royal Orchid Banquet',
        'location': 'Gomti Nagar, Lucknow',
        'capacity': 300,
        'price': 45000,
        'description': 'Luxury indoor hall perfect for corporate events and weddings with premium facilities.'
    },
    {
        'name': 'Sunset View Lawn',
        'location': 'Hazratganj, Lucknow',
        'capacity': 200,
        'price': 30000,
        'description': 'Beautiful open-air lawn ideal for receptions and birthday parties with sunset views.'
    },
    {
        'name': 'Imperial Grand Hall',
        'location': 'Indira Nagar, Lucknow',
        'capacity': 500,
        'price': 70000,
        'description': 'Premium grand hall for luxury events, concerts, and big functions with world-class amenities.'
    },
]

# Delete existing venues if needed (optional)
# Venue.objects.all().delete()

for venue_data in venues_data:
    venue, created = Venue.objects.get_or_create(
        name=venue_data['name'],
        defaults={
            'location': venue_data['location'],
            'capacity': venue_data['capacity'],
            'price': venue_data['price'],
            'description': venue_data['description'],
            'created_by': admin_user,
        }
    )
    if created:
        print(f"✓ Created: {venue.name}")
    else:
        print(f"Already exists: {venue.name}")

print("\nAll dummy venues added successfully!")
