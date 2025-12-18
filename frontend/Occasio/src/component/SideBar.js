import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProPic from "../Assets/ProfilePIC.jpg";

function Sidebar() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`d-flex flex-column p-4 vh-100 shadow ${bgClass}`} style={{ width: "280px" }}>
      <div className="text-center mb-4">
        <img src={ProPic} alt="Profile" className="rounded-circle shadow-sm border border-3 border-danger" style={{ width: "90px", height: "90px" }} />
        <h5 className="mt-3 fw-bold">Raj Sinha</h5>
        <p className="mb-2">shikhar123@gmail.com</p>
        <button className="btn btn-outline-danger btn-sm rounded-pill">Edit Profile</button>
      </div>

      <nav className="flex-grow-1">
        <ul className="nav flex-column fw-semibold">
          <li><NavLink to="/dashboard/personal" className="nav-link">Personal Info</NavLink></li>
          <li><NavLink to="/dashboard/bookings" className="nav-link">My Bookings</NavLink></li>
          <li><NavLink to="/dashboard/invoices" className="nav-link">Invoices</NavLink></li>
          <li><NavLink to="/dashboard/payments" className="nav-link">Payment History</NavLink></li>
          <li><NavLink to="/dashboard/reviews" className="nav-link">Reviews</NavLink></li>
          <li><NavLink to="/dashboard/settings" className="nav-link">Settings</NavLink></li>
          <li><NavLink to="/dashboard/venues-listing" className="nav-link">Venue List</NavLink></li>
          <li><NavLink to="/dashboard/support" className="nav-link">Support / Help</NavLink></li>
        </ul>
      </nav>

      <div className="mt-auto text-center">
        <button className="btn btn-outline-dark btn-sm rounded-pill me-2" onClick={toggleTheme}>
          {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button className="btn btn-danger btn-sm rounded-pill colo">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
