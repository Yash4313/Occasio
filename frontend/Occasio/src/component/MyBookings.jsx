import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bookingService from "../api/bookingService";
import api from "../api/api";
import UiContext from "../context/UiContext";

function MyBookings() {
  const navigate = useNavigate();
  const ui = useContext(UiContext);
  const [eventBookings, setEventBookings] = useState([]);
  const [venueBookings, setVenueBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch event bookings
      const eventData = await bookingService.getMyBookings();
      setEventBookings(Array.isArray(eventData) ? eventData : []);

      // Fetch venue bookings
      const venueResponse = await api.get("venue-bookings/");
      setVenueBookings(Array.isArray(venueResponse.data) ? venueResponse.data : []);
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
      console.error("Booking fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, type = "event") => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    try {
      if (type === "event") {
        await bookingService.cancelBooking(bookingId);
      } else {
        await api.patch(`venue-bookings/${bookingId}/`, { status: "cancelled" });
      }
      ui?.addToast?.("Booking cancelled successfully", "success");
      fetchBookings();
    } catch (err) {
      ui?.addToast?.(err.error || "Failed to cancel booking", "error");
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-success";
      case "pending":
        return "bg-warning";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const renderBookingCard = (booking, isVenueBooking = false) => {
    return (
      <div key={booking.id} className="col-md-6 mb-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5 className="card-title">
                {isVenueBooking ? booking.venue_name : booking.event?.title || "Booking"}
              </h5>
              <span className={`badge ${getStatusBadgeColor(booking.status)}`}>
                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
              </span>
            </div>
            <p className="card-text text-muted">
              <small>
                <strong>Booking ID:</strong> #{booking.id}
              </small>
            </p>
            <ul className="list-unstyled small">
              {isVenueBooking ? (
                <>
                  <li className="mb-2">
                    <strong>Event Date:</strong>{" "}
                    {new Date(booking.event_date).toLocaleDateString()}
                  </li>
                  <li className="mb-2">
                    <strong>Purpose:</strong>{" "}
                    {booking.purpose.charAt(0).toUpperCase() + booking.purpose.slice(1)}
                  </li>
                  {booking.custom_requirements && (
                    <li className="mb-2">
                      <strong>Requirements:</strong> {booking.custom_requirements}
                    </li>
                  )}
                </>
              ) : (
                <>
                  {booking.event?.venue && (
                    <li className="mb-2">
                      <strong>Venue:</strong> {booking.event.venue.name}
                    </li>
                  )}
                  {booking.event?.date && (
                    <li className="mb-2">
                      <strong>Date:</strong>{" "}
                      {new Date(booking.event.date).toLocaleDateString()}
                    </li>
                  )}
                  <li className="mb-2">
                    <strong>Tickets:</strong> {booking.num_tickets}
                  </li>
                  {booking.purpose && (
                    <li className="mb-2">
                      <strong>Purpose:</strong>{" "}
                      {booking.purpose.charAt(0).toUpperCase() +
                        booking.purpose.slice(1)}
                    </li>
                  )}
                </>
              )}
              <li className="mb-2">
                <strong>Total Price:</strong> ₹{booking.total_price}
              </li>
              <li className="mb-2">
                <strong>Booked on:</strong>{" "}
                {new Date(booking.booking_date).toLocaleDateString()}
              </li>
            </ul>
            <div className="mt-3">
              {booking.status !== "cancelled" && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancelBooking(booking.id, isVenueBooking ? "venue" : "event")}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h3 className="mb-4 text-center fw-bold">My Bookings</h3>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h3 className="mb-4 text-center fw-bold">My Bookings</h3>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const allBookings = activeTab === "events" ? eventBookings : venueBookings;
  const hasBookings = eventBookings.length > 0 || venueBookings.length > 0;

  if (!hasBookings) {
    return (
      <div className="container mt-4 text-center">
        <h3 className="mb-4 text-center fw-bold">My Bookings</h3>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
          alt="No bookings"
          width="110"
          className="mb-3"
        />
        <div className="card shadow-sm border-0">
          <div className="card-body text-center">
            <h5 className="card-title text-muted">No Bookings Found</h5>
            <p className="card-text">
              You don't have any bookings at the moment. Start exploring and book your first event!
            </p>
            <button
              type="button"
              className="btn px-4"
              style={{
                background: "#672345ff",
                color: "white",
                borderRadius: "25px",
                fontWeight: "500",
              }}
              onClick={() => navigate("/dashboard/venues")}
            >
              Browse Venues
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center fw-bold">My Bookings</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Event Bookings ({eventBookings.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "venues" ? "active" : ""}`}
            onClick={() => setActiveTab("venues")}
          >
            Venue Bookings ({venueBookings.length})
          </button>
        </li>
      </ul>

      {/* Bookings List */}
      {allBookings.length === 0 ? (
        <div className="alert alert-info">
          No {activeTab === "events" ? "event" : "venue"} bookings yet.
        </div>
      ) : (
        <div className="row">
          {allBookings.map((booking) =>
            renderBookingCard(booking, activeTab === "venues")
          )}
        </div>
      )}
    </div>
  );
}

export default MyBookings;