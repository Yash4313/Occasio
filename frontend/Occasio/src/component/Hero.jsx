import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero d-flex flex-column justify-content-center align-items-start text-dark">
      <div className="container">
        <h1 className="display-3 fw-bold text-white" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>Welcome to Occasio</h1>
        <p className="display-6 lead mt-4 fw-bold text-white" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
          Make your events memorable with our services
        </p>
        <Link to="/services" className="btn btn- btn-dark btn-lg mt-4">
          Explore Services
        </Link>
      </div>
    </div>
  );
};

export default Hero;
