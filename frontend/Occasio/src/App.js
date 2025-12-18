import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
// layout with sidebar
import PersonalInfo from "./components/PersonalInfo";
import MyBookings from "./components/MyBookings";
import Invoices from "./components/Invoices";
import PaymentHistory from "./components/PaymentHistory";
import Reviews from "./components/Reviews";
import Settings from "./components/Settings";
import SupportHelp from "./components/SupportHelp";
import Dashboard from "./components/DashBoard";
import VenueListingPage from "./components/VenueListingPage";
import VenuesPage from "./components/VenuesPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard with sidebar */}
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="personal" element={<PersonalInfo />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<SupportHelp />} />
          <Route path="venues-listing" element={<VenueListingPage />} />
          <Route path="venues" element={<VenuesPage/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
