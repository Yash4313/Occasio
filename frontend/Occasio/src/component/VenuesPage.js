// src/pages/VenuesPage.js
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, ListGroup } from "react-bootstrap";
import Img4 from "../Assets/HeroPic4.jpg";
import Img2 from "../Assets/HeroPic5.jpg";
import Img3 from "../Assets/HeroPic6.jpg";

const venues = [
  {
    id: 1,
    name: "Elegant Guest House",
    description: "Perfect for weddings and large celebrations. This venue offers spacious halls, catering services, and elegant décor.",
    images: [Img4, Img2, Img3], // gallery
    location: "123 Wedding Lane, Kanpur, India",
    availableDates: ["2025-12-01", "2025-12-15", "2025-12-20"],
    priceBreakdown: {
      basePrice: "₹50,000",
      catering: "₹20,000",
      decoration: "₹15,000",
    },
    amenities: ["Parking", "Wi-Fi", "Air Conditioning", "Catering", "Stage & Lighting"],
  },
  {
    id: 2,
    name: "Business Guest House",
    description: "Ideal for meetings, conferences, and corporate events. Equipped with projectors, conference halls, and catering options.",
    images: [Img2, Img3],
    location: "45 Corporate Street, Kanpur, India",
    availableDates: ["2025-12-05", "2025-12-10", "2025-12-18"],
    priceBreakdown: {
      basePrice: "₹30,000",
      projector: "₹5,000",
      catering: "₹10,000",
    },
    amenities: ["Conference Rooms", "Wi-Fi", "Projector", "Parking", "Catering"],
  },
  {
    id: 3,
    name: "Premium Guest House",
    description: "A versatile space for both weddings and meetings. Offers luxury interiors and customizable packages.",
    images: [Img3, Img4],
    location: "78 Premium Road, Kanpur, India",
    availableDates: ["2025-12-08", "2025-12-22", "2025-12-25"],
    priceBreakdown: {
      basePrice: "₹70,000",
      luxuryDecor: "₹25,000",
      catering: "₹30,000",
    },
    amenities: ["Luxury Interiors", "Wi-Fi", "Parking", "Catering", "Garden Area"],
  },
];

export default function VenuesPage() {
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleClose = () => setSelectedVenue(null);

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1>Book Your Guest House Venue</h1>
        <p>Elegant spaces for weddings and professional meetings.</p>
      </div>

      {/* Venue Cards */}
      <Row>
        {venues.map((venue) => (
          <Col md={4} key={venue.id} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={venue.images[0]}
                alt={venue.name}
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.description.substring(0, 60)}...</Card.Text>
                <Button variant="primary" onClick={() => setSelectedVenue(venue)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Venue Details Modal */}
      {selectedVenue && (
        <Modal show={true} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedVenue.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Gallery */}
            <Row>
              {selectedVenue.images.map((img, idx) => (
                <Col md={4} key={idx} className="mb-3">
                  <img
                    src={img}
                    alt={`${selectedVenue.name} ${idx}`}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </Col>
              ))}
            </Row>

            {/* Full Description */}
            <h5>Description</h5>
            <p>{selectedVenue.description}</p>

            {/* Location */}
            <h5>Location</h5>
            <p>{selectedVenue.location}</p>

            {/* Available Dates */}
            <h5>Available Dates</h5>
            <ListGroup>
              {selectedVenue.availableDates.map((date, idx) => (
                <ListGroup.Item key={idx}>{date}</ListGroup.Item>
              ))}
            </ListGroup>

            {/* Price Breakdown */}
            <h5 className="mt-3">Price Breakdown</h5>
            <ListGroup>
              {Object.entries(selectedVenue.priceBreakdown).map(([key, value], idx) => (
                <ListGroup.Item key={idx}>
                  {key}: <strong>{value}</strong>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* Amenities */}
            <h5 className="mt-3">Amenities</h5>
            <ListGroup>
              {selectedVenue.amenities.map((amenity, idx) => (
                <ListGroup.Item key={idx}>{amenity}</ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success">Proceed to Booking</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
