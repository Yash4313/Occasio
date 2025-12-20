// src/pages/VenuesPage.js
import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UiContext from "../context/UiContext";
import api from "../api/api";
import CustomVenueBookingForm from "./CustomVenueBookingForm";
import Img4 from "../assets/HeroPic4.jpg";
import Img2 from "../assets/HeroPic5.jpg";
import Img3 from "../assets/HeroPic6.jpg";

const defaultImages = [Img4, Img2, Img3];

export default function VenuesPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const ui = useContext(UiContext);

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("venues/");
      const venueList = Array.isArray(response.data) ? response.data : [];
      setVenues(venueList);
    } catch (err) {
      setError("Failed to load venues. Please try again.");
      console.error("Venues fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (venue) => {
    if (!auth?.user) {
      // Redirect to login if not authenticated
      ui?.addToast?.("Please login to book a venue.", "warning");
      navigate("/login");
      return;
    }
    setSelectedVenue(venue);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setSelectedVenue(null);
    ui?.addToast?.(
      "Booking created! Redirecting to My Bookings...",
      "success"
    );
    setTimeout(() => {
      navigate("/dashboard/bookings");
    }, 1000);
  };

  const getImageForVenue = (index) => {
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
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1>Book Your Perfect Venue</h1>
        <p>Select from our curated collection of elegant venues for your special events.</p>
      </div>

      {/* Venue Cards */}
      {venues.length > 0 ? (
        <Row>
          {venues.map((venue, idx) => (
            <Col md={4} key={venue.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={getImageForVenue(idx)}
                  alt={venue.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{venue.name}</Card.Title>
                  <Card.Text>
                    {venue.description
                      ? venue.description.substring(0, 60) + "..."
                      : "Modern and elegant venue"}
                  </Card.Text>
                  <div className="mb-3">
                    <p className="mb-1">
                      <small className="text-muted">📍 {venue.location}</small>
                    </p>
                    <p className="mb-1">
                      <strong>₹{venue.price?.toLocaleString()}</strong>
                    </p>
                    <p className="mb-0">
                      <small>Capacity: {venue.capacity} guests</small>
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-100"
                    onClick={() => handleBookNow(venue)}
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No venues available at the moment.</Alert>
      )}

      {/* Booking Form Modal */}
      {selectedVenue && (
        <CustomVenueBookingForm
          show={showBookingForm}
          onHide={() => {
            setShowBookingForm(false);
            setSelectedVenue(null);
          }}
          venue={selectedVenue}
          onSuccess={handleBookingSuccess}
        />
      )}
    </Container>
  );
}
