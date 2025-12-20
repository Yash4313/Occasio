# 🧪 TESTING & VERIFICATION GUIDE

---

## ✅ Pre-Launch Verification

Before considering this feature complete, verify each step below.

---

## 1️⃣ Database Verification

### Check Migrations Applied
```bash
cd backend/event_booking
python manage.py showmigrations venue bookings
```

Expected output:
```
venue
 [X] 0001_initial
 [X] 0002_venue_description_venue_price ← Should be marked [X]

bookings
 [X] 0001_initial
 [X] 0002_booking_status
 [X] 0003_booking_purpose
 [X] 0004_venuebooking ← Should be marked [X]
```

### Check Dummy Venues Exist
```bash
python manage.py shell
>>> from venue.models import Venue
>>> Venue.objects.all().count()
4  # Should return 4
>>> Venue.objects.values_list('name', 'price')
<QuerySet [('Elegant Guest House', Decimal('50000.00')), ...]>
```

### Check VenueBooking Table Exists
```bash
python manage.py shell
>>> from bookings.models import VenueBooking
>>> VenueBooking._meta.get_fields()
# Should show: venue, event_date, purpose, custom_requirements, status, etc.
```

---

## 2️⃣ API Endpoint Verification

### Start Backend Server
```bash
cd backend/event_booking
python manage.py runserver
```

### Test Venue Listing (PUBLIC)
```bash
# No auth needed
curl http://localhost:8000/api/venues/

# Expected response (4 venues):
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Elegant Guest House",
      "location": "123 Wedding Lane, Kanpur, India",
      "capacity": 500,
      "price": "50000.00",
      "description": "Perfect for weddings...",
      "created_by": 1,
      "created_at": "2025-12-20T..."
    },
    ... (3 more venues)
  ]
}
```

### Test Venue Booking Endpoint (PROTECTED)
```bash
# Get JWT token first (login)
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Response includes:
{
  "access": "eyJ0eXAi...",  # Copy this token
  "refresh": "eyJ0eXAi...",
  "user": { ... }
}

# Use token to create booking
curl -X POST http://localhost:8000/api/venue-bookings/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "venue": 1,
    "event_date": "2025-12-25",
    "purpose": "wedding",
    "custom_requirements": "Need extra parking"
  }'

# Expected response (201 Created):
{
  "id": 1,
  "user": 5,
  "venue": 1,
  "venue_name": "Elegant Guest House",
  "venue_price": "50000.00",
  "event_date": "2025-12-25",
  "purpose": "wedding",
  "custom_requirements": "Need extra parking",
  "booking_date": "2025-12-20T10:30:00Z",
  "total_price": "50000.00",
  "status": "pending"
}
```

### Test Date Conflict Error
```bash
# Try booking SAME venue, SAME date (should fail)
curl -X POST http://localhost:8000/api/venue-bookings/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "venue": 1,
    "event_date": "2025-12-25",  # Same date!
    "purpose": "birthday",
    "custom_requirements": ""
  }'

# Expected response (400 Bad Request):
{
  "non_field_errors": [
    "This venue is already booked for the selected date."
  ]
}
```

### Test Past Date Error
```bash
# Try booking past date (should fail)
curl -X POST http://localhost:8000/api/venue-bookings/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "venue": 2,
    "event_date": "2020-01-01",  # Past date!
    "purpose": "wedding",
    "custom_requirements": ""
  }'

# Expected response (400 Bad Request):
{
  "event_date": [
    "Event date cannot be in the past."
  ]
}
```

---

## 3️⃣ Frontend Verification

### Start Frontend Dev Server
```bash
cd frontend/Occasio
npm run dev
```

### Open in Browser
```
http://localhost:5173
```

---

## 4️⃣ User Flow Testing

### Test 1: Browse Venues (No Login Required)
1. Navigate to `/dashboard/venues`
2. ✅ Should see 4 venue cards
3. ✅ Each card shows: name, location, capacity, price
4. ✅ "Book Now" button visible

### Test 2: Unauthenticated Booking Attempt
1. Click "Book Now" button (while not logged in)
2. ✅ Toast notification: "Please login to book a venue."
3. ✅ Redirected to `/login`

### Test 3: Successful Booking
1. Login with valid credentials
2. Go to `/dashboard/venues`
3. Click "Book Now" on "Elegant Guest House"
4. ✅ Modal opens showing:
   - Venue name, location, capacity, price
   - Event Date input (date picker)
   - Purpose dropdown (5 options visible)
   - Custom Requirements textarea
   - Total Price calculation
5. Select event date: `2025-12-25`
6. Select purpose: `Wedding`
7. Enter custom requirements: `Need projector and catering`
8. Click "Confirm Booking"
9. ✅ Modal closes
10. ✅ Toast: "Booking created! Redirecting to My Bookings..."
11. ✅ Wait 1 second, then redirected to `/dashboard/bookings`

### Test 4: View Booking in Dashboard
1. Should see "Venue Bookings" tab
2. ✅ Tab shows count: "Venue Bookings (1)"
3. Click "Venue Bookings" tab
4. ✅ See booking card with:
   - Booking ID
   - Venue: "Elegant Guest House"
   - Event Date: "2025-12-25"
   - Purpose: "Wedding"
   - Requirements: "Need projector and catering"
   - Total Price: "₹50,000"
   - Status: "Pending"
   - "Cancel Booking" button

### Test 5: Date Conflict
1. Login as different user (User B)
2. Go to `/dashboard/venues`
3. Click "Book Now" on same venue ("Elegant Guest House")
4. Select event date: `2025-12-25` (same date!)
5. Select purpose: `Birthday`
6. Click "Confirm Booking"
7. ✅ Red error alert appears:
   ```
   This venue is already booked for the selected date.
   ```
8. ✅ Modal stays open
9. ✅ Can select different date and try again

### Test 6: Cancel Booking
1. Go to `/dashboard/bookings`
2. Find the venue booking created in Test 3
3. Click "Cancel Booking" button
4. ✅ Confirm dialog appears: "Are you sure?"
5. Click OK
6. ✅ Toast: "Booking cancelled successfully"
7. ✅ Status changes to "Cancelled"

### Test 7: Switch Between Tabs
1. Go to `/dashboard/bookings`
2. Should see two tabs:
   - "Event Bookings (X)"
   - "Venue Bookings (Y)"
3. ✅ Click "Event Bookings" → shows event bookings
4. ✅ Click "Venue Bookings" → shows venue bookings
5. ✅ Each shows appropriate fields for its type

---

## 5️⃣ Edge Case Testing

### Edge Case 1: Past Date Selection
1. Open booking form
2. Try to select past date (2020-01-01)
3. ✅ Date picker should prevent selection (grayed out)
4. Or if selected manually:
   - Submit
   - ✅ Error: "Event date cannot be in the past."

### Edge Case 2: Missing Required Fields
1. Open booking form
2. Click "Confirm Booking" without filling date
3. ✅ Error: "Please fill in all required fields."
4. Or backend validation:
   - ✅ Error: "This field is required."

### Edge Case 3: Empty Purpose
1. Open booking form
2. Select date but leave purpose empty
3. Click "Confirm Booking"
4. ✅ Error: "Purpose is required."

### Edge Case 4: Multiple Simultaneous Bookings
1. User A starts booking venue X, date Y
2. User B starts booking same venue X, date Y
3. User A submits first ✅ Success
4. User B submits ❌ Error: "Already booked"

### Edge Case 5: Unauthenticated API Call
```bash
# Try to access venue-bookings without token
curl http://localhost:8000/api/venue-bookings/

# Expected response (401):
{
  "detail": "Authentication credentials were not provided."
}
```

---

## 6️⃣ Database State Verification

### Check Bookings Created
```bash
python manage.py shell
>>> from bookings.models import VenueBooking
>>> VenueBooking.objects.all()
<QuerySet [<VenueBooking: user@email.com - Elegant Guest House (2025-12-25)>]>

>>> booking = VenueBooking.objects.first()
>>> booking.venue.name
'Elegant Guest House'
>>> booking.event_date
datetime.date(2025, 12, 25)
>>> booking.purpose
'wedding'
>>> booking.status
'pending'
```

### Check Unique Constraint
```bash
>>> # Try to create duplicate (should fail)
>>> from django.db import IntegrityError
>>> VenueBooking.objects.create(
...   user_id=1,
...   venue_id=1,
...   event_date='2025-12-25',
...   purpose='birthday',
...   total_price=50000,
...   status='pending'
... )
Traceback (most recent call last):
  ...
IntegrityError: UNIQUE constraint failed: ...
```

---

## 7️⃣ Browser DevTools Verification

### Check Network Requests
1. Open DevTools → Network tab
2. Go to `/dashboard/venues`
3. ✅ See `GET /api/venues/` request
   - Status: 200
   - Response: 4 venues

4. Click "Book Now"
5. ✅ See `POST /api/venue-bookings/` request
   - Status: 201 (Created)
   - Request body includes: venue, event_date, purpose, custom_requirements
   - Response includes: id, total_price, status, booking_date

6. Go to `/dashboard/bookings`
7. ✅ See `GET /api/venue-bookings/` request
   - Status: 200
   - Response includes booking(s)

### Check Console Errors
1. Open DevTools → Console tab
2. Should see NO red error messages
3. Only info/warning logs expected

### Check LocalStorage
1. Open DevTools → Application → LocalStorage
2. ✅ Should contain JWT token (access_token)
3. ✅ Token should be present in API requests (Authorization header)

---

## 8️⃣ Performance Verification

### Load Time
- `/dashboard/venues` should load in < 1 second
- Venues list should render smoothly
- No lag when opening form

### Database Queries
```bash
# Enable query logging
python manage.py shell
>>> from django.db import connection
>>> from django.test.utils import override_settings

# Fetch venues
>>> from django.db import reset_queries
>>> reset_queries()
>>> Venue.objects.all()
>>> len(connection.queries)
1  # Should be 1 query, not multiple
```

### API Response Times
```bash
# Test API response times
time curl http://localhost:8000/api/venues/
# Should complete in < 200ms
```

---

## 9️⃣ Security Verification

### Authentication Required for Booking
```bash
# Try to POST without token
curl -X POST http://localhost:8000/api/venue-bookings/ \
  -H "Content-Type: application/json" \
  -d '{"venue": 1, "event_date": "2025-12-25", "purpose": "wedding"}'

# Should get 401 Unauthorized
```

### Users Can't See Others' Bookings
```bash
# User A gets their bookings
GET /api/venue-bookings/ (as User A)
# Response: Only User A's bookings

# User B tries to access User A's bookings
# Should only see User B's bookings
```

### Read-Only Venue Fields
```bash
# Try to update venue via API
PATCH /api/venues/1/ (as regular user)
# Should get 403 Forbidden (or require admin)
```

---

## 🔟 Checklist Summary

### Backend ✅
- [ ] Migrations applied successfully
- [ ] Dummy venues in database
- [ ] VenueBooking model created
- [ ] Unique constraint works
- [ ] Date validation works
- [ ] API endpoints responding
- [ ] Authentication required for bookings
- [ ] Date conflict error returned correctly

### Frontend ✅
- [ ] Venues load from API
- [ ] "Book Now" redirects to login if not auth'd
- [ ] Booking form opens for auth'd users
- [ ] Date picker works
- [ ] Purpose dropdown shows 5 options
- [ ] Form submits correctly
- [ ] Error messages display on date conflict
- [ ] Redirect to /dashboard/bookings on success
- [ ] Venue bookings tab shows correct data
- [ ] Can cancel bookings

### User Experience ✅
- [ ] Public can view venues
- [ ] Login required for booking
- [ ] Clear error messages
- [ ] Successful redirect
- [ ] Bookings persist (refresh page)
- [ ] No duplicate bookings allowed
- [ ] Past dates prevented
- [ ] Required fields validated

---

## 📋 Test Cases Reference

### Positive Test Cases
| # | Action | Expected | Status |
|---|--------|----------|--------|
| 1 | View venues (no login) | See 4 venues | ✅ |
| 2 | Login & book venue | Redirect to bookings | ✅ |
| 3 | View my bookings | See both tabs | ✅ |
| 4 | Cancel booking | Status = cancelled | ✅ |
| 5 | Select future date | Date accepted | ✅ |

### Negative Test Cases
| # | Action | Expected | Status |
|---|--------|----------|--------|
| 1 | Book without login | Redirect to login | ✅ |
| 2 | Double-book venue | Error shown | ✅ |
| 3 | Select past date | Error or prevented | ✅ |
| 4 | Skip required field | Validation error | ✅ |
| 5 | Unauthorized API call | 401 response | ✅ |

---

## 🎯 Test Completion Criteria

Feature is **COMPLETE** when:
- ✅ All 10 test groups pass
- ✅ No red errors in console
- ✅ Date uniqueness enforced
- ✅ Authentication works
- ✅ Redirects work correctly
- ✅ Error messages clear
- ✅ Database schema correct
- ✅ No existing features broken

---

**Run these tests before deploying to production!**

