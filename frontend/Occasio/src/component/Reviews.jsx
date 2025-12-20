import React from "react";

function Reviews() {
  return (
    <div className="container mt-4 text-center">
      <h3 className="mb-4 text-center fw-bold">Reviews</h3>

      {/* Icon for empty state */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2463/2463510.png"
        alt="No reviews"
        width="115"
        className="mb-3"
      />

      {/* Empty state card */}
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-muted">No Reviews Submitted</h5>
          <p className="card-text">
            You haven’t shared any reviews yet. Once you complete a booking, you can leave feedback here.
          </p>
          <button
            type="button"
            className="btn px-4"
            style={{
              background: "#672345ff",
              color: "white",
              borderRadius: "25px",
              fontWeight: "500",
            }}
          >
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
