import React from "react";
import pricing from "../assets/pricing.jpg"; // Replace with your image

const Pricing = () => {
  return (
    <div id="pricing" className="container" style={{ fontSize: "22px", paddingLeft: "12px", textAlign: "center", }}>
            <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#17ddbcff",
            marginBottom: "10px",
          }}
        >
          PRICING PLANS
          <hr className="w-25 mx-auto"/>
        </h1>
            <p style={{ color:"white"}}>
              Occasio offers flexible and budget-friendly <strong>event management solutions </strong>for every occasion — from private parties to corporate meets and dream weddings. Make every event special with Occasio. We provide simple, affordable, and customized plans to help you host parties.
            </p>
    <div id="PricingSection" className="container py-5" style={{ textAlign: "left" }}>
      <div className="row align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6">
          <img
            src={pricing}
            alt="Occasio Pricing"
            className="img-fluid w-100 object-fit-cover"
            style={{ height: "420px", borderRadius: "10px" }}
          />
        </div>

        {/* Right Side: Pricing Content */}
        <div className="col-md-6">
            <div className="row mt-6">
              {/* Basic Plan */}
              <div className="col-md-4 mb-3">
                <div
                  className="card text-center shadow-sm"
                  style={{ border: "none", height: "360px", borderRadius: "10px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Basic</h5>
                    <h3 className="text-primary">Rs.49</h3>
                    <p className="card-text" style={{ fontSize: "18px" }}>
                      ✔ Booking support <br />
                      ✔ Email notifications <br />
                      ✖ No customization <br />
                    </p>
                    <button className="btn btn-dark">Choose Plan</button>
                  </div>
                </div>
              </div>

              {/* Standard Plan */}
              <div className="col-md-4 mb-3">
                <div
                  className="card text-center shadow"
                  style={{
                    border: "2px solid #700c22",
                    height: "360px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.95)",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Standard</h5>
                    <h3 className="text-danger">Rs.99</h3>
                    <p className="card-text" style={{ fontSize: "18px" }}>
                      ✔ Priority booking <br />
                      ✔ Event customization <br />
                      ✔ Basic analytics <br />
                    </p>
                    <button className="btn btn-danger">Choose Plan</button>
                  </div>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="col-md-4 mb-3">
                <div
                  className="card text-center shadow-sm"
                  style={{ border: "none", height: "360px", borderRadius: "10px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Premium</h5>
                    <h3 className="text-success">Rs.199</h3>
                    <p className="card-text" style={{ fontSize: "18px" }}>
                      ✔ All Standard features <br />
                      ✔ Dedicated manager <br />
                      ✔ 24/7 support <br />
                    </p>
                    <button className="btn btn-success">Choose Plan</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
