import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Vendor = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Vendor Dashboard</h2>

      <p><strong>Name:</strong> {user?.username}</p>
      <p><strong>Vendor ID:</strong> {user?.vendor_id}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Vendor;