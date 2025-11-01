import service1 from '../assets/service1.jpg';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';

const Services = () => {
  return (
    <div id="ServicesSection" className="container py-5" style={{ textAlign: "left", color:"white" }}>
      <div className="row">
        {/* Section Heading */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#17ddbcff",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          OUR SERVICES
          <hr className="w-25 mx-auto" />
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "23px",
            marginBottom: "40px",
          }}
        >
          At <strong>Occasio</strong>, we offer a complete range of event services to make your
          experience smooth, organized, and memorable — from planning to perfection.
        </p>
      </div>
      
      <div className="row text-center">
        {/* Service 1 */}
        <div className="col-md-4 mb-4">
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "10px", transition: "0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={service1}
              alt="Event Planning"
              className="card-img-top"
              style={{
                height: "220px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <div className="card-body">
              <h4 style={{ fontWeight: "600", color: "#1a1a1a" }}>Event Planning</h4>
              <p style={{fontSize: "20px" }}>
                From concept to execution, we plan every detail of your event to make it unique,
                elegant, and perfectly managed.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2 */}
        <div className="col-md-4 mb-4">
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "10px", transition: "0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={service2}
              alt="Venue Booking"
              className="card-img-top"
              style={{
                height: "220px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <div className="card-body">
              <h4 style={{ fontWeight: "600", color: "#1a1a1a" }}>Venue Booking</h4>
              <p style={{fontSize: "20px" }}>
                Browse and book top-rated venues that suit your event’s theme, budget, and style — all from one platform.
              </p>
            </div>
          </div>
        </div>

        {/* Service 3 */}
        <div className="col-md-4 mb-4">
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "10px", transition: "0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={service3}
              alt="Catering & Decor"
              className="card-img-top"
              style={{
                height: "220px",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <div className="card-body">
              <h4 style={{ fontWeight: "600", color: "#1a1a1a" }}>Catering & Decor</h4>
              <p style={{fontSize: "20px" }}>
                Add a special touch with delicious menus and elegant décor options that reflect your theme and occasion perfectly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: "#2563EB",
            border: "none",
            borderRadius: "25px",
            padding: "10px 30px",
            fontWeight: "500",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1E40AF")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
        >
          Explore More Services
        </button>
      </div>
    </div>
  );
};

export default Services;
