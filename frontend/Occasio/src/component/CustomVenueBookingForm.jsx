import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import api from "../api/api";

export default function CustomVenueBookingForm({
  show,
  onHide,
  venue,
  onSuccess,
}) {
  const [eventDate, setEventDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purposeOptions = [
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday" },
    { value: "corporate", label: "Corporate Event" },
    { value: "party", label: "Party" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!eventDate || !purpose) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        venue: venue.id,
        event_date: eventDate,
        purpose: purpose,
        custom_requirements: customRequirements || null,
      };

      const response = await api.post("/venue-bookings/", bookingData);

      // Reset form
      setEventDate("");
      setPurpose("");
      setCustomRequirements("");
      onHide();

      // Call success callback
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors[0]);
      } else if (err.response?.data?.event_date) {
        setError(err.response.data.event_date[0]);
      } else {
        setError(
          err.response?.data?.detail ||
            "Failed to create booking. Please try again."
        );
      }
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book {venue?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Venue Info */}
          <div className="mb-3 p-3 bg-light rounded">
            <h6 className="mb-2">Venue Details</h6>
            <p className="mb-1">
              <strong>{venue?.name}</strong>
            </p>
            <p className="mb-1">📍 {venue?.location}</p>
            <p className="mb-0">
              💰 ₹{venue?.price?.toLocaleString()} | 👥 {venue?.capacity}{" "}
              capacity
            </p>
          </div>

          {/* Event Date */}
          <Form.Group className="mb-3">
            <Form.Label>Event Date *</Form.Label>
            <Form.Control
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>

          {/* Purpose */}
          <Form.Group className="mb-3">
            <Form.Label>Purpose of Booking *</Form.Label>
            <Form.Select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
            >
              <option value="">Select purpose...</option>
              {purposeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Custom Requirements */}
          <Form.Group className="mb-3">
            <Form.Label>Custom Requirements (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="e.g., Need projector, extra parking, vegetarian catering, etc."
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
            />
          </Form.Group>

          {/* Total Price */}
          <div className="alert alert-info mb-3">
            <strong>Total Price:</strong> ₹{venue?.price?.toLocaleString()}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || !eventDate || !purpose}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
