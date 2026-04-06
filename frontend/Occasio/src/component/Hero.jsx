import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="d-flex align-items-center"
      style={{
        height: "90vh",
        backgroundImage:
          "url('/src/assets/HeroImg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.41)",
        }}
      ></div>

      <div className="container position-relative text-white">
        <h1 className="display-3 fw-bold shadow-transparent" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
          Find the Perfect Venue <br />
          for Every{" "}
          <span style={{ color: "#ff4794" }}>Occasion</span>
        </h1>

        <p className="lead mt-4 fs-5 fw-bold shadow-transparent" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
          Curated spaces for life’s most meaningful moments.
        </p>        

        {/* CTA */}
        <Link
          to="/user"
          className="btn btn-light  mt-4 rounded-pill px-4"
          style={{ backgroundColor: "#672345ff", color: "white" }}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;