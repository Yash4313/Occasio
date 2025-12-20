import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import bookingService from "../api/bookingService";
import UiContext from "../context/UiContext";

function BookingModal({ show, onClose, event, onBookingSuccess }) {
  const ui = useContext(UiContext);
  const [numTickets, setNumTickets] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);

  const purposeOptions = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'party', label: 'Party' },
    { value: 'other', label: 'Other' },
  ];

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        event: event.id,
        num_tickets: parseInt(numTickets, 10),
        purpose: purpose,
      };

      await bookingService.createBooking(bookingData);
      ui?.addToast?.("Booking created successfully!", "success");
      onBookingSuccess?.();
      onClose();
      setNumTickets(1);
      setPurpose('');
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
            <Form.Control
              type="text"
              disabled
              value={event?.title || ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Venue</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={event?.venue?.name || ""}
            />
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
            <Form.Control
              type="text"
              disabled
              value={`₹${event?.price || "0.00"}`}
            />
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
            <Form.Label className="fw-bold">Purpose of Booking *</Form.Label>
            <Form.Select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              disabled={loading}
              required
            >
              <option value="">Select a purpose...</option>
              {purposeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Total Price</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={`₹${totalPrice}`}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-100"
            style={{
              background: "#672345ff",
              borderColor: "#672345ff",
            }}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookingModal;
