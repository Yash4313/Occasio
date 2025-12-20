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
        'name': 'Elegant Guest House',
        'location': '123 Wedding Lane, Kanpur, India',
        'capacity': 500,
        'price': 50000,
        'description': 'Perfect for weddings and large celebrations. Spacious halls, catering services, and elegant décor.'
    },
    {
        'name': 'Business Conference Hall',
        'location': '45 Corporate Street, Kanpur, India',
        'capacity': 200,
        'price': 30000,
        'description': 'Ideal for meetings, conferences, and corporate events. Equipped with projectors and conference rooms.'
    },
    {
        'name': 'Premium Guest House',
        'location': '78 Premium Road, Kanpur, India',
        'capacity': 300,
        'price': 70000,
        'description': 'Versatile space for weddings and meetings. Luxury interiors and customizable packages.'
    },
    {
        'name': 'Riverside Banquet Hall',
        'location': '99 River View, Kanpur, India',
        'capacity': 400,
        'price': 60000,
        'description': 'Beautiful venue with riverside views. Perfect for ceremonies and celebrations.'
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
