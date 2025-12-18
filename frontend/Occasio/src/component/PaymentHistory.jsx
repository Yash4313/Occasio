import React from "react";

function PaymentHistory() {
  return (
    <div className="container mt-4 text-center">
      <h3 className="mb-4 text-center fw-bold">Payment History</h3>

      {/* Icon for empty state */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1048/1048942.png"
        alt="No payments"
        width="115"
        className="mb-3"
      />

      {/* Empty state card */}
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-muted">No Payment Records Found</h5>
          <p className="card-text">
            You haven’t made any payments yet. Once you complete a booking or transaction, your payment history will appear here.
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
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
