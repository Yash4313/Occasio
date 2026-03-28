// import service1 from '../assets/service1.jpg';
// import service2 from '../assets/service2.jpg';
// import service3 from '../assets/service3.jpg';

// const Services = () => {
//   return (
//     <div id="ServicesSection" className="container py-5" style={{ textAlign: "left", color:"white" }}>
//       <div className="row">
//         {/* Section Heading */}
//         <h1
//           style={{
//             fontSize: "28px",
//             fontWeight: "600",
//             color: "#17ddbcff",
//             textAlign: "center",
//             marginBottom: "10px",
//           }}
//         >
//           OUR SERVICES
//           <hr className="w-25 mx-auto" />
//         </h1>
//         <p
//           style={{
//             textAlign: "center",
//             fontSize: "23px",
//             marginBottom: "40px",
//           }}
//         >
//           At <strong>Occasio</strong>, we offer a complete range of event services to make your
//           experience smooth, organized, and memorable — from planning to perfection.
//         </p>
//       </div>
      
//       <div className="row text-center">
//         {/* Service 1 */}
//         <div className="col-md-4 mb-4">
//           <div
//             className="card border-0 shadow-sm"
//             style={{ borderRadius: "10px", transition: "0.3s" }}
//             onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <img
//               src={service1}
//               alt="Event Planning"
//               className="card-img-top"
//               style={{
//                 height: "220px",
//                 objectFit: "cover",
//                 borderTopLeftRadius: "10px",
//                 borderTopRightRadius: "10px",
//               }}
//             />
//             <div className="card-body">
//               <h4 style={{ fontWeight: "600", color: "#1a1a1a" }}>Event Planning</h4>
//               <p style={{fontSize: "20px" }}>
//                 From concept to execution, we plan every detail of your event to make it unique,
//                 elegant, and perfectly managed.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Service 2 */}
//         <div className="col-md-4 mb-4">
//           <div
//             className="card border-0 shadow-sm"
//             style={{ borderRadius: "10px", transition: "0.3s" }}
//             onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <img
//               src={service2}
//               alt="Venue Booking"
//               className="card-img-top"
//               style={{
//                 height: "220px",
//                 objectFit: "cover",
//                 borderTopLeftRadius: "10px",
//                 borderTopRightRadius: "10px",
//               }}
//             />
//             <div className="card-body">
//               <h4 style={{ fontWeight: "600", color: "#1a1a1a" }}>Venue Booking</h4>
//               <p style={{fontSize: "20px" }}>
//                 Browse and book top-rated venues that suit your event’s theme, budget, and style — all from one platform.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Service 3 */}
//         <div className="col-md-4 mb-4">
//           <div
//             className="card border-0 shadow-sm"
//             style={{ borderRadius: "10px", transition: "0.3s" }}
//             onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             <img
//               src={service3}
//               alt="Catering & Decor"
//               className="card-img-top"
//               style={{
//                 height: "220px",
//                 objectFit: "cover",
//                 borderTopLeftRadius: "10px",
//                 borderTopRightRadius: "10px",
//               }}
//             />
//             <div className="card-body">
//               <h4 style={{ fontWeight: "600", color: "#1a1a1a" }}>Catering & Decor</h4>
//               <p style={{fontSize: "20px" }}>
//                 Add a special touch with delicious menus and elegant décor options that reflect your theme and occasion perfectly.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Button */}
//       <div className="text-center mt-4">
//         <button
//           className="btn btn-primary"
//           style={{
//             backgroundColor: "#2563EB",
//             border: "none",
//             borderRadius: "25px",
//             padding: "10px 30px",
//             fontWeight: "500",
//           }}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1E40AF")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
//         >
//           Explore More Services
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Services;

import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";

const Services = () => {
  const services = [
    {
      title: "Weddings",
      subtitle: "Where forever begins in elegance.",
      img: service1,
    },
    {
      title: "Corporate",
      subtitle: "Professional spaces for impactful events.",
      img: service2,
    },
    {
      title: "Parties",
      subtitle: "Celebrate moments that matter.",
      img: service3,
    },
  ];

  return (
    <section
      id="ServicesSection"
      className="py-5"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container">

        {/* Heading Row */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                color: "#888",
                marginBottom: "5px",
              }}
            >
              SERVICES
            </p>

            <h2 style={{ fontWeight: "600", color: "#111" }}>
              Curated by Intent
            </h2>
          </div>

          <div className="col-md-6 text-md-end">
            <p style={{ color: "#666", maxWidth: "400px", float: "right" }}>
              Browse our meticulously selected venues categorized by the
              atmosphere they evoke.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-4">

          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              
              <div
                style={{
                  position: "relative",
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Image */}
                <img
                  src={service.img}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  className="service-img"
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
                  }}
                ></div>

                {/* Text Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    color: "white",
                  }}
                >
                  <h5 style={{ fontWeight: "600", marginBottom: "5px" }}>
                    {service.title}
                  </h5>
                  <p style={{ fontSize: "14px", margin: 0 }}>
                    {service.subtitle}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Hover Effect */}
      <style>
        {`
          .service-img:hover {
            transform: scale(1.08);
          }
        `}
      </style>
    </section>
  );
};

export default Services;