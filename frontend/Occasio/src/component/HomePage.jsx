import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Img1 from "../assets/UserProImg1.jpg";
import Img2 from "../assets/UserProImg2.jpg";
import Img3 from "../assets/UserProImg4.jpg";
import Img4 from "../assets/HeroPic1.jpg";
import Img5 from "../assets/HeroPic2.jpg";
import Img6 from "../assets/HeroPic3.jpg";
import Img7 from "../assets/HeroPic4.jpg";
import Img8 from "../assets/HeroPic5.jpg";
import Img9 from "../assets/HeroPic6.jpg";
import Img10 from "../assets/HeroPic7.jpg";
import Img11 from "../assets/HeroPic8.jpg";
import { Link } from "react-router-dom";
import axios from "axios"; 

const HomePage = () => {
  const heroImages = [Img11, Img7, Img5, Img10, Img6, Img4, Img8, Img9];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const { logout, access } = useContext(AuthContext);
  const [venues, setVenues] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    price: ''
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/venues/', {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
    if (access) {
      fetchVenues();
    }
  }, [access]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/events/', formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        capacity: '',
        price: ''
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="BGC">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark text-danger-emphasis"
        style={{ backgroundColor: "#672345ff" }}
      >
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Occasio
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/venues">
                  Venues
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/bookings">
                  My Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/personal">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" onClick={logout} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <div className="container-fluid">
          <img
            src={heroImages[currentIndex]}
            alt="Event Venue"
            className="img-fluid rounded shadow mb-4"
            style={{
              transition: "0.6s",
              width: "98%",
              height: "595px",
              objectFit: "cover",
            }}
          />
          <h1 className="display-5 fw-bold">Book Your Perfect Party Venue</h1>
          <p className="lead">
            Elegant spaces. Seamless bookings. Unforgettable events.
          </p>
          <Link to="/dashboard/bookings" className="btn btn-danger btn-lg mt-3 colo">
            Book Now
          </Link>
        </div>
      </header>
      {/* Venue Highlights */}
      {/* Venue Highlights */}
<section className="container my-5">
  <h2 className="text-center mb-4 fw-bold text-danger">
    ✨ Our Popular Venues ✨
  </h2>

  {/* Selected venue state */}
  {/* const [selectedVenue, setSelectedVenue] = useState(null); */}

  <div className="row g-4">
    {[
      {
        img: Img1,
        title: "Ramada",
        price: "₹40,000 / day",
        capacity: "350 People",
        location: "📍 Gomti Nagar, Lucknow",
        desc: "Perfect for weddings and large celebrations with elegant décoration.",
        availability: "✅ Available All Days",
      },
      {
        img: Img2,
        title: "Garden Galaxy",
        price: "₹25,000 / day",
        capacity: "200 People",
        location: "📍 Hazratganj, Lucknow",
        desc: "Open-air charm for intimate gatherings, surrounded by greenery and fresh vibes.",
        availability: "📅 Only Weekends",
      },
      {
        img: Img3,
        title: "Moon & Mars",
        price: "₹32,000 / day",
        capacity: "250 People",
        location: "📍 Indira Nagar, Lucknow",
        desc: "Stylish space for cocktail parties and receptions with modern interiors.",
        availability: "📅 Weekdays & Weekends",
      },
      {
        img: Img10,
        title: "Royal Orchid Banquet",
        price: "₹45,000 / day",
        capacity: "300 People",
        location: "📍 Gomti Nagar, Lucknow",
        desc: "Luxury indoor hall perfect for corporate events and weddings with premium facilities.",
        availability: "📅 Available Weekends & Weekdays",
      },
      {
        img: Img8,
        title: "Sunset View Lawn",
        price: "₹30,000 / day",
        capacity: "200 People",
        location: "📍 Hazratganj, Lucknow",
        desc: "Beautiful open-air lawn ideal for receptions and birthday parties with sunset views.",
        availability: "📅 Only Weekend Slots",
      },
      {
        img: Img9,
        title: "Imperial Grand Hall",
        price: "₹70,000 / day",
        capacity: "500 People",
        location: "📍 Indira Nagar, Lucknow",
        desc: "Premium grand hall for luxury events, concerts, and big functions with world-class amenities.",
        availability: "✅ Available All Days",
      },
    ].map((venue, index) => (
      <div className="col-md-4" key={index}>
        <div className="card border-0 shadow-lg h-100">
          <img
            src={venue.img}
            className="card-img-top rounded-top"
            alt={venue.title}
            style={{ height: "220px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title fw-bold text-danger">{venue.title}</h5>
            <p className="card-text text-muted">{venue.desc}</p>

            <button
              className="btn btn-outline-danger w-100 fw-bold"
              onClick={() => setSelectedVenue(selectedVenue === index ? null : index)}
            >
              {selectedVenue === index ? "▲ Hide Details" : "▼ View Details"}
            </button>

            {selectedVenue === index && (
              <div className="mt-3 p-3 border rounded bg-light shadow-sm">
                <p className="mb-2"><strong>💰 Price:</strong> {venue.price}</p>
                <p className="mb-2"><strong>👥 Capacity:</strong> {venue.capacity}</p>
                <p className="mb-2"><strong>📍 Location:</strong> {venue.location}</p>
                <p className="mb-2"><strong>📅 Availability:</strong> {venue.availability}</p>

                <Link to="/dashboard/venues" className="btn btn-danger w-100 mt-3 fw-bold">
                  🚀 Book Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
      {/* Booking Form */}
      <section id="booking" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold text-danger">
            Create Your Event
          </h2>
          <form className="mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter event title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Enter event description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Venue</label>
              <select
                name="venue"
                className="form-select"
                value={formData.venue}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a venue</option>
                {venues.map(venue => (
                  <option key={venue.id} value={venue.id}>{venue.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Capacity</label>
              <input
                type="number"
                name="capacity"
                className="form-control"
                placeholder="Enter capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                step="0.01"
                className="form-control"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100 colo">
              Create Event
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p className="mb-0">
          © 2025 <strong>Occasio</strong> — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

