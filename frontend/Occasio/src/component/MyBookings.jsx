import React from "react";

function MyBookings() {
  return (
    <div className="container mt-4 text-center">

      <h3 className="mb-4 text-center fw-bold">My Bookings</h3>
      <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
            alt="No bookings"
            width="110"
            className="mb-3"
          />
      {/* Empty state card */}
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-muted">No Bookings Found</h5>
          <p className="card-text">
            You don’t have any bookings at the moment. Start exploring and book your first trip!
          </p>
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
              Browse Events
            </button>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
