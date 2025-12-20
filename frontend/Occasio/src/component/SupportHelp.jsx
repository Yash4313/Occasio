import React from "react";

function SupportHelp() {
  return (
    <div className="container mt-4 text-center">
      <h3 className="mb-4 text-center fw-bold">Support / Help</h3>

      {/* Icon for support/help */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828940.png"
        alt="Support"
        width="115"
        className="mb-3"
      />

      {/* Empty state card */}
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-muted">Need Assistance?</h5>
          <p className="card-text">
            Our support team is here to help you. Reach out for guidance or troubleshooting.
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
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportHelp;
