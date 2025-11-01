import React from 'react';

const Admin = () => {
  return (
    <div className="container py-5">
      <h2>Admin Dashboard</h2>
      <p>Only users with role 'admin' should see this.</p>
    </div>
  );
};

export default Admin;
