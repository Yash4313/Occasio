// src/pages/VenueListingPage.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import api from "../api/api";
import UiContext from "../context/UiContext";
import BookingModal from "./BookingModal";
import Img4 from "../Assets/HeroPic4.jpg";
import Img2 from "../Assets/HeroPic5.jpg";
import Img3 from "../Assets/HeroPic6.jpg";

const defaultImages = [Img4, Img2, Img3];

export default function VenueListingPage() {
  const navigate = useNavigate();
  const ui = useContext(UiContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("events/");
      const eventList = Array.isArray(response.data) ? response.data : [];
      setEvents(eventList);
    } catch (err) {
      setError("Failed to load events. Please try again.");
      console.error("Events fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    // Redirect to My Bookings after successful booking
    setShowBookingModal(false);
    ui?.addToast?.(
      "Booking created! Redirecting to My Bookings...",
      "success"
    );
    setTimeout(() => {
      navigate("/dashboard/bookings");
    }, 1000);
  };

  const getImageForEvent = (index) => {
    return defaultImages[index % defaultImages.length];
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <h1>Venue Listings</h1>
        <div className="spinner-border mt-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <h1>Venue Listings</h1>
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1>Venue Listings</h1>
        <p>Explore all available events and venues with details on price, capacity, and dates.</p>
      </div>

      {/* Events Cards */}
      {events.length > 0 ? (
        <Row>
          {events.map((event, idx) => (
            <Col md={4} key={event.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={getImageForEvent(idx)}
                  alt={event.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>{event.description?.substring(0, 80)}...</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Venue:</strong> {event.venue?.name || "N/A"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Time:</strong> {event.time || "N/A"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Price:</strong> ₹{event.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Capacity:</strong> {event.capacity} Guests
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    className="w-100 mt-3"
                    style={{
                      background: "#672345ff",
                      borderColor: "#672345ff",
                      color: "white",
                      fontWeight: "500",
                    }}
                    onClick={() => handleBookNow(event)}
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="alert alert-info text-center mt-4">
          No events available at the moment. Please check back later.
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        event={selectedEvent}
        onBookingSuccess={handleBookingSuccess}
      />
    </Container>
  );
}
