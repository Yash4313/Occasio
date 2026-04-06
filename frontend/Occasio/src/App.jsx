// import React, { useEffect } from "react";
// import { useLocation, Routes, Route } from "react-router-dom";
// import Login from "./component/Login";
// import OTPLogin from "./component/OTPLogin";
// import Register from "./component/Register";
// import ProtectedRoute from "./component/ProtectedRoute";
// import Profile from "./component/Profile";
// import RoleProtectedRoute from "./component/RoleProtectedRoute";
// import HomePage from './component/HomePage'
// import PersonalInfo from "./component/PersonalInfo";
// import MyBookings from "./component/MyBookings";
// import Invoices from "./component/Invoices";
// import PaymentHistory from "./component/PaymentHistory";
// import Reviews from "./component/Reviews";
// import Settings from "./component/Settings";
// import SupportHelp from "./component/SupportHelp";
// import Dashboard from "./component/DashBoard";
// import EventListingPage from "./component/EventListingPage";
// import VenuesPage from "./component/VenuesPage";
// import Admin from "./component/Admin";
// import LandingPage from "./component/LandingPage";

// const App = () => {
//   return (
//     <div>
//       <Routes>
//         {/* Main SPA routes: render the same single-page sections so Links scroll to sections */}
//         <Route path="/" element={ <LandingPage/>}/>

//         {/* Explicit routes that map to sections — these let the navbar Links work */}
//         {/* <Route path="/about" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
//         <Route path="/services/*" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
//         <Route path="/pricing" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
//         <Route path="/contact" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} /> */}

//         {/* Auth and protected routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/login/otp" element={<OTPLogin />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/profile"
//           element={<ProtectedRoute><Profile /></ProtectedRoute>}
//         />

//         <Route path="/user" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

//          <Route path="/dashboard" element={<Dashboard/>}>
//           <Route index element={<PersonalInfo />} />
//           <Route path="personal" element={<PersonalInfo />} />
//           <Route path="bookings" element={<MyBookings />} />
//           <Route path="invoices" element={<Invoices />} />
//           <Route path="payments" element={<PaymentHistory />} />
//           <Route path="reviews" element={<Reviews />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="support" element={<SupportHelp />} />
//           <Route path="event-listing" element={<EventListingPage />} />
//           <Route path="venues" element={<VenuesPage/>}/>
//         </Route>

//         <Route
//           path="/admin"
//           element={<RoleProtectedRoute roles={["admin"]}><Admin /></RoleProtectedRoute>}
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./component/Login";
import Register from "./component/Register";
import ProtectedRoute from "./component/ProtectedRoute";
import RoleProtectedRoute from "./component/RoleProtectedRoute";

import Profile from "./component/Profile";
import HomePage from "./component/HomePage";
import Dashboard from "./component/DashBoard";
import Admin from "./component/Admin";
import LandingPage from "./component/LandingPage";
import Vendor from "./component/Vendor";

// Dashboard inner pages
import PersonalInfo from "./component/PersonalInfo";
import MyBookings from "./component/MyBookings";
import Invoices from "./component/Invoices";
import PaymentHistory from "./component/PaymentHistory";
import Reviews from "./component/Reviews";
import Settings from "./component/Settings";
import SupportHelp from "./component/SupportHelp";
import EventListingPage from "./component/EventListingPage";
import VenuesPage from "./component/VenuesPage";

const App = () => {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* GENERAL PROTECTED */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* USER ROUTES */}
      <Route
        path="/user"
        element={
          <RoleProtectedRoute roles={["user"]}>
            <HomePage />
          </RoleProtectedRoute>
        }
      />

      {/* USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute roles={["user"]}>
            <Dashboard />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<PersonalInfo />} />
        <Route path="personal" element={<PersonalInfo />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="payments" element={<PaymentHistory />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<SupportHelp />} />
        <Route path="event-listing" element={<EventListingPage />} />
        <Route path="venues" element={<VenuesPage />} />
      </Route>

      {/* VENDOR ROUTE */}
      <Route
        path="/vendor"
        element={
          <RoleProtectedRoute roles={["vendor"]}>
            <Vendor />
          </RoleProtectedRoute>
        }
      />

      {/* ADMIN ROUTE */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute roles={["admin"]}>
            <Admin />
          </RoleProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;