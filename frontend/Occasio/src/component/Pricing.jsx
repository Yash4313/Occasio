// import React from "react";
// import pricing from "../assets/pricing.jpg"; // Replace with your image

// const Pricing = () => {
//   return (
//     <div id="pricing" className="container" style={{ fontSize: "22px", paddingLeft: "12px", textAlign: "center", }}>
//             <h1
//           style={{
//             fontSize: "28px",
//             fontWeight: "600",
//             color: "#17ddbcff",
//             marginBottom: "10px",
//           }}
//         >
//           PRICING PLANS
//           <hr className="w-25 mx-auto"/>
//         </h1>
//             <p style={{ color:"white"}}>
//               Occasio offers flexible and budget-friendly <strong>event management solutions </strong>for every occasion — from private parties to corporate meets and dream weddings. Make every event special with Occasio. We provide simple, affordable, and customized plans to help you host parties.
//             </p>
//     <div id="PricingSection" className="container py-5" style={{ textAlign: "left" }}>
//       <div className="row align-items-center">
//         {/* Left Side: Image */}
//         <div className="col-md-6">
//           <img
//             src={pricing}
//             alt="Occasio Pricing"
//             className="img-fluid w-100 object-fit-cover"
//             style={{ height: "420px", borderRadius: "10px" }}
//           />
//         </div>

//         {/* Right Side: Pricing Content */}
//         <div className="col-md-6">
//             <div className="row mt-6">
//               {/* Basic Plan */}
//               <div className="col-md-4 mb-3">
//                 <div
//                   className="card text-center shadow-sm"
//                   style={{ border: "none", height: "360px", borderRadius: "10px" }}
//                 >
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">Basic</h5>
//                     <h3 className="text-primary">Rs.49</h3>
//                     <p className="card-text" style={{ fontSize: "18px" }}>
//                       ✔ Booking support <br />
//                       ✔ Email notifications <br />
//                       ✖ No customization <br />
//                     </p>
//                     <button className="btn btn-dark">Choose Plan</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Standard Plan */}
//               <div className="col-md-4 mb-3">
//                 <div
//                   className="card text-center shadow"
//                   style={{
//                     border: "2px solid #700c22",
//                     height: "360px",
//                     borderRadius: "10px",
//                     background: "rgba(255,255,255,0.95)",
//                   }}
//                 >
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">Standard</h5>
//                     <h3 className="text-danger">Rs.99</h3>
//                     <p className="card-text" style={{ fontSize: "18px" }}>
//                       ✔ Priority booking <br />
//                       ✔ Event customization <br />
//                       ✔ Basic analytics <br />
//                     </p>
//                     <button className="btn btn-danger">Choose Plan</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Premium Plan */}
//               <div className="col-md-4 mb-3">
//                 <div
//                   className="card text-center shadow-sm"
//                   style={{ border: "none", height: "360px", borderRadius: "10px" }}
//                 >
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">Premium</h5>
//                     <h3 className="text-success">Rs.199</h3>
//                     <p className="card-text" style={{ fontSize: "18px" }}>
//                       ✔ All Standard features <br />
//                       ✔ Dedicated manager <br />
//                       ✔ 24/7 support <br />
//                     </p>
//                     <button className="btn btn-success">Choose Plan</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;


import React from "react";
import pricing from "../assets/pricing.jpg"; // reuse your image

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-5"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="container">
        <div className="row align-items-center g-4">

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
              VOICES OF OCCASIO
            </p>

            <h2
              style={{
                fontWeight: "600",
                marginBottom: "20px",
                color: "#111",
              }}
            >
              Crafting Memories, <br />
              One Space at a Time.
            </h2>

            <p
              style={{
                fontStyle: "italic",
                color: "#555",
                lineHeight: "1.7",
                maxWidth: "450px",
              }}
            >
              “The process of finding a venue for our product launch used to
              take weeks. With Occasio, we found the perfect minimalist studio
              in minutes. The gallery-style presentation truly makes a
              difference.”
            </p>

            {/* User */}
            <div className="d-flex align-items-center mt-4">
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                style={{
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <div style={{ fontWeight: "500" }}>Sarah Chen</div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  Event Director, Luma Tech
                </div>
              </div>
            </div>
          </div>

          {/* Right Image + Floating Card */}
          <div className="col-md-6 position-relative text-center">

            <img
              src={pricing}
              alt="testimonial visual"
              className="img-fluid"
              style={{
                borderRadius: "15px",
                width: "80%",
                maxHeight: "350px",
                objectFit: "cover",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            />

            {/* Floating Stats Card */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "20%",
                background: "white",
                padding: "15px 20px",
                borderRadius: "10px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
                textAlign: "left",
              }}
            >
              <h5 style={{ margin: 0, fontWeight: "600" }}>500+</h5>
              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                Five-star experiences <br />
                Europe and North America
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;