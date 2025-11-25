import React, { useEffect } from "react";
import Navbar from "./component/Navbar";
import { useLocation, Routes, Route } from "react-router-dom";
import Hero from "./component/Hero";
import AboutUs from "./component/AboutUs";
import Services from "./component/Services";
import Pricing from "./component/Pricing";
import Contact from "./component/Contact";
import Login from "./component/Login";
import OTPLogin from "./component/OTPLogin";
import Register from "./component/Register";
import ProtectedRoute from "./component/ProtectedRoute";
import Profile from "./component/Profile";
import RoleProtectedRoute from "./component/RoleProtectedRoute";
import Admin from "./component/Admin";

const scrollToId = (id) => {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (el) {
    // offset for fixed navbar height (adjust if needed)
    const yOffset = -70;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const App = () => {
  const location = useLocation();

  // hide navbar on owner pages (keeps existing behavior)
  const hideNavbar = location.pathname.includes("owner");

  useEffect(() => {
    const path = location.pathname || "/";

    if (path === "/" || path === "") {
      scrollToId(null);
      return;
    }

    if (path.startsWith("/about")) scrollToId("AboutSection");
    else if (path.startsWith("/services")) scrollToId("ServicesSection");
    else if (path.startsWith("/pricing")) scrollToId("PricingSection");
    else if (path.startsWith("/contact")) scrollToId("ContactSection");
    else scrollToId(null);
  }, [location]);

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Main SPA routes: render the same single-page sections so Links scroll to sections */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <AboutUs />
              <Services />
              <Pricing />
              <Contact />
            </>
          }
        />

        {/* Explicit routes that map to sections — these let the navbar Links work */}
        <Route path="/about" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
        <Route path="/services/*" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
        <Route path="/pricing" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />
        <Route path="/contact" element={<> <Hero /> <AboutUs /> <Services /> <Pricing /> <Contact /> </>} />

        {/* Auth and protected routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/otp" element={<OTPLogin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<RoleProtectedRoute roles={["admin"]}><Admin /></RoleProtectedRoute>}
        />
      </Routes>
    </div>
  );
};

export default App;
