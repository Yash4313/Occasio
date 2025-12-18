import React, { useEffect } from 'react'
import Navbar from "./Navbar";
import Hero from './Hero'
import AboutUs from './AboutUs'
import Services from './Services'
import Pricing from './Pricing'
import Contact from './Contact'
import { useLocation } from 'react-router-dom';

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
const LandingPage = () => {
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
    <>
    <div className='mybody'>
      {!hideNavbar && <Navbar />}

        <Hero />
        <AboutUs />
              <Services />
              <Pricing />
              <Contact />
    </div>
    </>
  )
}

export default LandingPage