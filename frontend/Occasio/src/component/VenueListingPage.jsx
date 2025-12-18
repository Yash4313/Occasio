// src/pages/VenueListingPage.js
import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Img4 from "../Assets/HeroPic4.jpg";
import Img2 from "../Assets/HeroPic5.jpg";
import Img3 from "../Assets/HeroPic6.jpg";

const venues = [
  {
    id: 1,
    name: "Elegant Guest House",
    image: Img4,
    price: "₹50,000",
    capacity: "500 Guests",
    location: "123 Wedding Lane, Kanpur, India",
    description: "Perfect for weddings and large celebrations with elegant décoration.",
    availability: ["2025-12-01", "2025-12-15", "2025-12-20"],
  },
  {
    id: 2,
    name: "Business Guest House",
    image: Img2,
    price: "₹30,000",
    capacity: "200 Guests",
    location: "45 Corporate Street, Kanpur, India",
    description: "Ideal for meetings, conferences, and corporate events with modern facilities.",
    availability: ["2025-12-05", "2025-12-10", "2025-12-18"],
  },
  {
    id: 3,
    name: "Premium Guest House",
    image: Img3,
    price: "₹70,000",
    capacity: "600 Guests",
    location: "78 Premium Road, Kanpur, India",
    description: "A versatile space for both weddings and meetings with luxury interiors.",
    availability: ["2025-12-08", "2025-12-22", "2025-12-25"],
  },
];

export default function VenueListingPage() {
  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1>Venue Listings</h1>
        <p>Explore all available venues with details on price, capacity, and availability.</p>
      </div>

      {/* Venue Cards */}
      <Row>
        {venues.map((venue) => (
          <Col md={4} key={venue.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={venue.image}
                alt={venue.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.description}</Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Price:</strong> {venue.price}</ListGroup.Item>
                  <ListGroup.Item><strong>Capacity:</strong> {venue.capacity}</ListGroup.Item>
                  <ListGroup.Item><strong>Location:</strong> {venue.location}</ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Availability:</strong>
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {venue.availability.map((date, idx) => (
                        <li key={idx}>{date}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
