# Quick Reference: Custom Venue Booking

## Feature Summary
Users can now book venues for specific dates. System prevents double-booking on the same date.

---

## Core Concepts

### 1. Date-Based Uniqueness
**Only ONE booking allowed per venue per date.**

```python
class VenueBooking(models.Model):
    class Meta:
        unique_together = ('venue', 'event_date')  # DB constraint
```

**Validation:** Serializer checks before save:
```python
if existing_booking:
    raise ValidationError("This venue is already booked for the selected date.")
```

---

### 2. How Venues Load on Frontend
```
VenuesPage.jsx
  └─ useEffect() 
      └─ api.get("venues/")  // PUBLIC endpoint, no auth
          └─ Display all venues in cards
```

---

### 3. How Booking Works
```
1. User clicks "Book Now"
   └─ CustomVenueBookingForm Modal Opens
   
2. User fills form:
   - Event Date (date picker)
   - Purpose (dropdown)
   - Custom Requirements (textarea)
   
3. Click "Confirm Booking"
   └─ POST /api/venue-bookings/
   
4. Backend validates:
   ├─ User authenticated? ✓
   ├─ Event date in future? ✓
   ├─ Venue free on date? ✓
   
5. If all pass:
   └─ Create VenueBooking, redirect to /dashboard/bookings
   
6. If date conflict:
   └─ Show error: "This venue is already booked for the selected date."
```

---

## Backend Models

### Venue Model
```python
Venue
├── id (PK)
├── name (CharField)
├── location (CharField)
├── capacity (IntegerField)
├── price (DecimalField) ← NEW
├── description (TextField) ← NEW
├── created_by (ForeignKey → User)
└── created_at (DateTime)
```

### VenueBooking Model (NEW)
```python
VenueBooking
├── id (PK)
├── user (ForeignKey → User)
├── venue (ForeignKey → Venue)
├── event_date (DateField) ← CRITICAL
├── purpose (CharField: wedding/birthday/corporate/party/other)
├── custom_requirements (TextField)
├── booking_date (DateTime)
├── total_price (DecimalField)
├── status (CharField: pending/confirmed/cancelled)
└── Meta: unique_together = ('venue', 'event_date')
```

---

## API Endpoints

### Venues
```
GET  /api/venues/              [PUBLIC - no auth]
POST /api/venues/              [ADMIN ONLY]
```

### Venue Bookings
```
GET  /api/venue-bookings/      [AUTH - own only]
POST /api/venue-bookings/      [AUTH - create new]
PATCH /api/venue-bookings/{id}/ [AUTH - update status]
```

---

## Error Messages

| Error | Cause | Status |
|-------|-------|--------|
| "This venue is already booked for the selected date." | Date conflict | 400 |
| "Event date cannot be in the past." | Invalid date | 400 |
| "Purpose is required." | Empty purpose | 400 |
| 401 Unauthorized | Not logged in | 401 |

---

## Frontend Components

### CustomVenueBookingForm (NEW)
- Modal form for booking
- Fields: event_date, purpose, custom_requirements
- Auto-fills venue details
- Error handling for date conflicts
- Success redirects to /dashboard/bookings

### VenuesPage (UPDATED)
- Fetches venues from API (not hardcoded)
- "Book Now" button
- Auth check before showing form
- Redirect to login if not authenticated

### MyBookings (UPDATED)
- Tab: "Event Bookings" (existing)
- Tab: "Venue Bookings" (NEW)
- Separate display logic
- Cancel functionality for both types

---

## Validation Flow

```
User submits form
    ↓
Frontend validates
├─ eventDate not empty?
├─ purpose not empty?
└─ customRequirements optional

    ↓
POST /api/venue-bookings/
    ↓
Backend Serializer.validate()
├─ purpose required?
├─ event_date in future?
├─ Check existing booking:
│  SELECT * FROM VenueBooking
│  WHERE venue_id = ? 
│  AND event_date = ? 
│  AND status IN ['pending', 'confirmed']
└─ If exists → ValidationError

    ↓
Model.save()
├─ Calculate total_price = venue.price
├─ unique_together check (DB level)
└─ Save to database

    ↓
Response
├─ 201 Created → Redirect to /dashboard/bookings
└─ 400 Bad Request → Show error message
```

---

## Key Implementation Details

### Why separate VenueBooking model?
- Clean separation from Event bookings
- Easier to manage venue-specific logic
- Future scalability (pricing tiers, add-ons, etc.)

### Why unique_together?
- Database-level constraint is stronger
- Prevents race conditions
- Clear schema documentation

### Why check in both serializer AND model?
- Serializer: User-friendly error messages
- Model: Additional safety net

### Why IsAuthenticatedOrReadOnly for Venues?
- Anyone can browse venues (no auth needed)
- Only authenticated users can book

---

## Testing Scenarios

### Scenario 1: Successful Booking
1. Login as user A
2. Select venue "Premier Hall"
3. Select date "2025-12-25"
4. Click "Book Now"
5. ✅ Redirected to /dashboard/bookings

### Scenario 2: Date Conflict
1. Login as user B
2. Select same venue "Premier Hall"
3. Select same date "2025-12-25"
4. Click "Book Now"
5. ❌ Error: "This venue is already booked for the selected date."

### Scenario 3: Non-Authenticated User
1. Click "Book Now" without login
2. ❌ Redirected to /login
3. ✅ Toast: "Please login to book a venue."

### Scenario 4: View My Bookings
1. Login as user
2. Go to /dashboard/bookings
3. See "Event Bookings" and "Venue Bookings" tabs
4. ✅ Both types display correctly

---

## Database Queries

### Find all venue bookings for a specific date
```sql
SELECT * FROM bookings_venuebooking 
WHERE event_date = '2025-12-25' AND status != 'cancelled';
```

### Find booked dates for a specific venue
```sql
SELECT event_date FROM bookings_venuebooking 
WHERE venue_id = 1 AND status IN ('pending', 'confirmed');
```

### Count bookings per user
```sql
SELECT user_id, COUNT(*) FROM bookings_venuebooking 
GROUP BY user_id;
```

---

## Files Changed (Summary)

**Backend (5 files):**
- ✅ models.py (Venue + VenueBooking)
- ✅ serializers.py (VenueBookingSerializer)
- ✅ views.py (VenueBookingViewSet)
- ✅ urls.py (Register viewset)
- ✅ migrations (2 files)

**Frontend (3 files):**
- ✅ CustomVenueBookingForm.jsx (NEW)
- ✅ VenuesPage.jsx (API integration)
- ✅ MyBookings.jsx (Tab system)

**Total:** 8 files modified/created

---

## Deployment Checklist

- [ ] Run migrations: `python manage.py migrate`
- [ ] Add dummy venues: `python manage.py shell < add_dummy_venues.py`
- [ ] Test API endpoints with Postman/curl
- [ ] Test frontend booking flow
- [ ] Check error messages display correctly
- [ ] Verify redirect to /dashboard/bookings works
- [ ] Test date conflict scenario
- [ ] Verify unauthenticated users get redirected to /login

---

