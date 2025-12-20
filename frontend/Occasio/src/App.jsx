import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
// import Hero from "./component/Hero";
// import AboutUs from "./component/AboutUs";
// import Services from "./component/Services";
// import Pricing from "./component/Pricing";
// import Contact from "./component/Contact";
import Login from "./component/Login";
import OTPLogin from "./component/OTPLogin";
import Register from "./component/Register";
import ProtectedRoute from "./component/ProtectedRoute";
import Profile from "./component/Profile";
import RoleProtectedRoute from "./component/RoleProtectedRoute";
import HomePage from './component/HomePage'
import PersonalInfo from "./component/PersonalInfo";
import MyBookings from "./component/MyBookings";
import Invoices from "./component/Invoices";
import PaymentHistory from "./component/PaymentHistory";
import Reviews from "./component/Reviews";
import Settings from "./component/Settings";
import SupportHelp from "./component/SupportHelp";
import Dashboard from "./component/DashBoard";
import VenueListingPage from "./component/VenueListingPage";
import VenuesPage from "./component/VenuesPage";
import Admin from "./component/Admin";
import LandingPage from "./component/LandingPage";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Main SPA routes: render the same single-page sections so Links scroll to sections */}
        <Route path="/" element={ <LandingPage/>}/>

        {/* Explicit routes that map to sections — these let the navbar Links work */}
        {/* <Route path="/about" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
        <Route path="/services/*" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
        <Route path="/pricing" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
        <Route path="/contact" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} /> */}

        {/* Auth and protected routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/otp" element={<OTPLogin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        <Route path="/user" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

         <Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<PersonalInfo />} />
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

        <Route
          path="/admin"
          element={<RoleProtectedRoute roles={["admin"]}><Admin /></RoleProtectedRoute>}
        />
      </Routes>
    </div>
  );
};

export default App;
