// import About from '../assets/About.jpg'; 

// const AboutUs = () => {
//   return (
//     <div id="AboutSection" className="container-fluid py-5" style={{ textAlign: "left", color:"white" }}>
      
//       <h1 style={{ fontSize: "30px", marginTop: "20px", textAlign: "center", fontWeight: "600", color: "#17ddbcff" }}>
//         ABOUT US
//         <hr className="w-25 mx-auto" />
//       </h1>

//       <div className="row">
        
//         <div className="col-md-5">
//           <img
//             src={About}
//             alt="Occasio event"
//             className="img-fluid w-100 object-fit-cover"
//             style={{ height: "350px", borderRadius: "10px" }}
//           />
//         </div>

//         <div className="col-md-7">
//           <div className="row" style={{ fontSize: "15px", paddingLeft: "12px" }}>

//             <p style={{ fontSize: "23px"}}>
//               Occasio is a modern <strong>Event Booking & Management Platform</strong> that helps
//               individuals and organizations easily plan, organize, and manage all types of events.
//               From weddings and corporate meetings to parties and concerts — Occasio makes event
//               management simple, smart & hassle-free.
//             </p>

//             <h4 style={{ fontSize: "24px", marginTop: "15px", fontWeight: "600", color:"#17ddbcff" }}>
//               Why Choose Occasio?
//             </h4>

//             <div className="col">
//               <ul style={{ fontSize: "23px", paddingLeft: "0px" }}>
//                 <li>Easy online booking</li>
//                 <li>Real-time event tracking</li>
//                 <li>Secure payment options</li>
//                 <li>24/7 customer support</li>
//               </ul>
//             </div>

//             <div className="col">
//               <ul style={{ fontSize: "23px" }}>
//                 <li>Personalized event packages</li>
//                 <li>For individuals and businesses</li>
//                 <li>Instant updates and reminders</li>
//                 <li>Accessible anytime, anywhere</li>
//               </ul>
//             </div>  

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import About from "../assets/About.jpg";

const AboutUs = () => {
  return (
    <section
      id="AboutSection"
      className="py-5"
      style={{ backgroundColor: "#fff4fa" }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-md-6">

            <p
              style={{
                fontSize: "12px",
                letterSpacing: "2px",
                color: "#888",
                marginBottom: "10px",
              }}
            >
              OUR STORY
            </p>

            <h2
              style={{
                fontSize: "36px",
                fontWeight: "600",
                marginBottom: "20px",
                color: "#111",
              }}
            >
              Curating the Perfect <br />
              Stage for Your Life's <br />
              Moments
            </h2>

            <p
              style={{
                color: "#555",
                fontSize: "16px",
                lineHeight: "1.7",
                maxWidth: "500px",
              }}
            >
              At Occasio, we believe every gathering is a masterpiece in the
              making. We’ve curated a global gallery of the world’s most
              exceptional spaces, from intimate, sun-drenched lofts to grand
              architectural wonders, each chosen for its ability to transform a
              simple event into an unforgettable memory.
            </p>

            <button
              className="btn mt-4"
              style={{
                backgroundColor: "#672345",
                color: "white",
                borderRadius: "25px",
                padding: "10px 20px",
                border: "none",
              }}
            >
              Discover our vision
            </button>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src={About}
              alt="About Occasio"
              className="img-fluid"
              style={{
                borderRadius: "20px",
                width: "90%",
                maxHeight: "450px",
                objectFit: "cover",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;