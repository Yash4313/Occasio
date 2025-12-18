import React, { useState } from "react";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    fullName: "Raj Sinha",
    email: "sinha.raj123@gmail.com",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    console.log("Updated Info:", formData);
  };

  return (
    <div className="container p-4">
      <div
        className="mx-auto shadow p-4 rounded"
        style={{ maxWidth: "750px", background: "#ffffffd9" }}
      >
        <h3 className="mb-3 text-center fw-bold" style={{ fontFamily: "Cinzel" }}>
          Personal Information
        </h3>
        <p className="text-center text-muted mb-4">
          Update your profile details to keep your account up to date.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="House / Street / Area"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn px-4"
              style={{
                background: "#672345ff",
                color: "white",
                borderRadius: "25px",
                fontWeight: "500",
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
