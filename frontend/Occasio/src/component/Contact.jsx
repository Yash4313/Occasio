import React from "react";

const Contact = () => {
  return (
    <div id="ContactSection" className="container py-5" style={{ textAlign: "center", color:"white", fontSize:"22px"}}>
      <h3 style={{color: "#17ddbcff"}}>CONTACT US
      <hr className="w-25 mx-auto"></hr></h3>
      <p>
        Have any questions or want to book an event? Fill out the form below and we’ll get back to you soon. 
      </p>

      <form style={{ maxWidth: "1000px", margin: "auto", textAlign: "left" }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" placeholder="Enter your name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" placeholder="Write your message"></textarea>
        </div>

        <button type="submit" className="btn btn-danger btn-lg w-100">
          Send Message
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "14px", color:"white" }}>
        <p>
          📧 support@occasio.com <br />
          ☎️ +91 9876543210
        </p>
      </div>
    </div>
  );
};

export default Contact;
