# BOOKING FEATURE - CODE CHANGES REFERENCE

## 1. NEW FILE: bookingService.js
**Location:** `src/api/bookingService.js`

```javascript
import api from "./api";

export const bookingService = {
  createBooking: async (bookingData) => {
    try {
      const response = await api.post("bookings/", bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to create booking" };
    }
  },

  getMyBookings: async () => {
    try {
      const response = await api.get("bookings/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch bookings" };
    }
  },

  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`bookings/${bookingId}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch booking" };
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await api.patch(`bookings/${bookingId}/`, {
        status: "cancelled",
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to cancel booking" };
    }
  },
};

export default bookingService;
```

---

## 2. NEW FILE: BookingModal.jsx
**Location:** `src/component/BookingModal.jsx`

```jsx
import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import bookingService from "../api/bookingService";
import UiContext from "../context/UiContext";

function BookingModal({ show, onClose, event, onBookingSuccess }) {
  const ui = useContext(UiContext);
  const [numTickets, setNumTickets] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        event: event.id,
        num_tickets: parseInt(numTickets, 10),
      };

      await bookingService.createBooking(bookingData);
      ui?.addToast?.("Booking created successfully!", "success");
      onBookingSuccess?.();
      onClose();
      setNumTickets(1);
    } catch (err) {
      ui?.addToast?.(err.error || "Failed to create booking", "error");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = event?.price ? (event.price * numTickets).toFixed(2) : "0.00";

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleBooking}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Event</Form.Label>
            <Form.Control type="text" disabled value={event?.title || ""} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Venue</Form.Label>
            <Form.Control type="text" disabled value={event?.venue?.name || ""} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Event Date</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={event?.date ? new Date(event.date).toLocaleDateString() : ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Price per Ticket</Form.Label>
            <Form.Control type="text" disabled value={`₹${event?.price || "0.00"}`} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Number of Tickets</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={event?.capacity || 100}
              value={numTickets}
              onChange={(e) => setNumTickets(e.target.value)}
              disabled={loading}
              required
            />
            <Form.Text className="text-muted">
              Available capacity: {event?.capacity || "N/A"}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Total Price</Form.Label>
            <Form.Control type="text" disabled value={`₹${totalPrice}`} />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-100"
            style={{ background: "#672345ff", borderColor: "#672345ff" }}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookingModal;
```

---

## 3. UPDATED FILE: MyBookings.jsx
**Location:** `src/component/MyBookings.jsx`

**Key Changes:**
- Added state management: `bookings`, `loading`, `error`
- Added `useEffect` hook to fetch bookings on mount
- Added `fetchBookings()` function using bookingService
- Added `handleCancelBooking()` function
- Added `getStatusBadgeColor()` helper function
- Implemented 4 conditional renders: loading, error, empty, and bookings list
- Each booking card shows: title, status badge, booking ID, venue, date, tickets, price, booking date, cancel button

**Import Changes:**
```javascript
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../api/bookingService";
import UiContext from "../context/UiContext";
```

**Key Features:**
- Loading spinner
- Error handling
- Empty state with "Browse Events" button
- Booking cards grid (2 columns on medium screens)
- Status badges (confirmed=green, pending=yellow, cancelled=red)
- Cancel button with confirmation dialog
- Toast notifications via UiContext

---

## 4. UPDATED FILE: VenueListingPage.jsx
**Location:** `src/component/VenueListingPage.jsx`

**Key Changes:**
- Changed from static hardcoded venues to dynamic events
- Added state management: `events`, `loading`, `error`, `selectedEvent`, `showBookingModal`
- Added `useEffect` hook to fetch events on mount
- Added `fetchEvents()` function using api.get("events/")
- Added `handleBookNow()` and `handleBookingSuccess()` functions
- Added BookingModal component at bottom
- Changed card display to show event details instead of venue details
- Added "Book Now" button on each event card

**Import Changes:**
```javascript
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import api from "../api/api";
import UiContext from "../context/UiContext";
import BookingModal from "./BookingModal";
```

**Key Features:**
- Fetches real events from `/api/events/`
- Loading spinner
- Error handling
- Empty state message
- Event cards with venue name, date, time, price, capacity
- "Book Now" button opens modal
- Success toast after booking
- Modal closes and resets after successful booking

---

## API DATA FLOW

### Booking Creation Flow
```
User Input (BookingModal)
  ↓
bookingService.createBooking({event: id, num_tickets: n})
  ↓
api.post("bookings/", data)
  ↓
Django Backend: POST /api/bookings/
  ↓
Backend adds user from JWT token
  ↓
Booking created with status='pending'
  ↓
Returns booking object
  ↓
Toast notification shown
  ↓
MyBookings refetches bookings
```

### Fetching Bookings Flow
```
MyBookings Component Mount
  ↓
fetchBookings() called
  ↓
bookingService.getMyBookings()
  ↓
api.get("bookings/")
  ↓
Django Backend: GET /api/bookings/ (filtered by user)
  ↓
Returns array of booking objects
  ↓
setBookings(data)
  ↓
Component renders booking cards
```

---

## DEPENDENCIES USED

- **React Hooks:** `useState`, `useEffect`, `useContext`
- **React Router:** `useNavigate`
- **Bootstrap Components:** `Modal`, `Form`, `Button`, `Card`, `ListGroup`, `Container`, `Row`, `Col`
- **Existing Services:** `api.js` (axios instance), `UiContext`, `AuthContext`

**NO NEW EXTERNAL PACKAGES REQUIRED** - Uses existing dependencies!

---

## TESTING THE INTEGRATION

### 1. Check Backend
```bash
# SSH into backend
python manage.py shell
from events.models import Event
from bookings.models import Booking

# Verify events exist
Event.objects.all()  

# After testing, check booking created
Booking.objects.all()
```

### 2. Browser DevTools
- Open F12 (DevTools)
- Network tab
- Click "Book Now"
- Look for: `POST /api/bookings/`
- Response should show booking object with ID

### 3. User Flow
1. Login → Dashboard
2. Navigate to "Venues" (VenueListingPage)
3. Click "Book Now" on any event
4. Fill ticket quantity → "Confirm Booking"
5. Check "My Bookings" section
6. See booking card with status

---

## COMMON ISSUES & SOLUTIONS

| Issue | Cause | Solution |
|-------|-------|----------|
| Events not loading | API endpoint missing or DB empty | Check /api/events/ returns data |
| Booking fails | User not authenticated | Check JWT tokens in localStorage |
| Modal doesn't show | BookingModal not imported in VenueListingPage | Verify import statement |
| "No Bookings" shows | User has no bookings or API error | Check Network tab for errors |
| Prices not calculating | Event object missing `price` field | Verify Event model has price field |

---

## SUMMARY

✅ **4 Files Created/Updated:**
1. `bookingService.js` (NEW) - API calls
2. `BookingModal.jsx` (NEW) - Booking form
3. `MyBookings.jsx` (UPDATED) - Display bookings
4. `VenueListingPage.jsx` (UPDATED) - List events + Book Now

✅ **No breaking changes to existing code**
✅ **Fully integrated with existing auth system**
✅ **Production-ready error handling**
✅ **Mobile-responsive design**
