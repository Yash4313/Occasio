import React from "react";

function Settings() {
  return (
    <div className="container mt-4 text-center">
      <h3 className="mb-4 text-center fw-bold">Settings</h3>

      {/* Icon for settings */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
        alt="Settings"
        width="115"
        className="mb-3"
      />

      {/* Empty state card */}
      <div className="card shadow-sm border-0">
        <div className="card-body text-center">
          <h5 className="card-title text-muted">Manage Your Preferences</h5>
          <p className="card-text">
            Update your account settings, change your preferences, and customize your experience here.
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
            Update Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
