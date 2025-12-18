
function Invoices() {
  return (
    <div className="container mt-4 text-center">
      <h3 className="mb-4 text-center fw-bold">Invoices</h3>
       <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055644.png"
            alt="No invoice"
            width="115"
            className="mb-3"
          />

      {/* Empty state card */}
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-muted">No Invoices Available</h5>
          <p className="card-text">
            You don’t have any invoices yet. Once you make a booking or payment, your invoices will appear here.
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
              Make a Booking
            </button>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
