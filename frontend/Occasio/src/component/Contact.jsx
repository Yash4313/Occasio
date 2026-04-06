// import React, { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitMessage('');

//     try {
//       const response = await fetch('http://localhost:8000/api/contact/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setSubmitMessage('Thank you for your message! We will get back to you soon.');
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         setSubmitMessage('There was an error sending your message. Please try again.');
//       }
//     } catch (error) {
//       setSubmitMessage('There was an error sending your message. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div id="ContactSection" className="container py-5" style={{ textAlign: "center", color:"white", fontSize:"22px"}}>
//       <h3 style={{color: "#17ddbcff"}}>CONTACT US
//       <hr className="w-25 mx-auto"></hr></h3>
//       <p>
//         Have any questions or want to book an event? Fill out the form below and we'll get back to you soon.
//       </p>

//       <form style={{ maxWidth: "1000px", margin: "auto", textAlign: "left" }} onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter your name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter your email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Message</label>
//           <textarea
//             className="form-control"
//             rows="4"
//             placeholder="Write your message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-danger btn-lg w-100"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Sending...' : 'Send Message'}
//         </button>
//       </form>

//       {submitMessage && (
//         <div className="mt-3" style={{ color: submitMessage.includes('Thank you') ? '#17ddbcff' : '#ff6b6b' }}>
//           {submitMessage}
//         </div>
//       )}

//       <div style={{ marginTop: "20px", fontSize: "14px", color:"white" }}>
//         <p>
//           📧 support@occasio.com <br />
//           ☎️ +91 9876543210
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(
          "Thank you for your message! We will get back to you soon.",
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage("There was an error sending your message.");
      }
    } catch {
      setSubmitMessage("There was an error sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="ContactSection"
      className="py-5"
      style={{
        background: "linear-gradient(to right, #3a0d1f, #672345)",
        borderRadius: "20px",
        margin: "40px",
      }}
    >
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Left Side */}
          <div className="col-md-6">
            <h3
              style={{ fontWeight: "600", marginBottom: "15px", color: "#ddd" }}
            >
              Get in Touch
            </h3>

            <p style={{ color: "#ddd", maxWidth: "400px" }}>
              Have questions or need help planning? Send us a message and our
              concierge team will get back to you shortly.
            </p>

            <div style={{ marginTop: "20px", fontSize: "14px", color: "#ddd" }}>
              <p>📧 support@occasio.com</p>
              <p>☎️ +91 9876543210</p>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="col-md-6">
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#672345",
                    color: "white",
                    borderRadius: "25px",
                    padding: "10px",
                    border: "none",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Message */}
              {submitMessage && (
                <p
                  className="mt-3 text-center"
                  style={{
                    color: submitMessage.includes("Thank you")
                      ? "#28a745"
                      : "#dc3545",
                  }}
                >
                  {submitMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fffafa",
          borderTop: "1px solid #eee",
          marginTop: "50px",
          padding: "40px 0 20px 0",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Brand */}
            <div className="col-md-3 mb-4">
              <h5 style={{ fontWeight: "600", color: "#672345" }}>Occasio</h5>
              <p style={{ fontSize: "14px", color: "#666" }}>
                A curated gallery of venues for life’s most meaningful moments.
              </p>
            </div>

            {/* Discover */}
            <div className="col-md-3 mb-4">
              <h6 style={{ fontWeight: "600" }}>Discover</h6>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                <li>Venues</li>
                <li>Experiences</li>
                <li>Journal</li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-md-3 mb-4">
              <h6 style={{ fontWeight: "600" }}>Company</h6>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-md-3 mb-4">
              <h6 style={{ fontWeight: "600" }}>Legal</h6>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div
            className="text-center"
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "15px",
              marginTop: "20px",
              fontSize: "13px",
              color: "#888",
            }}
          >
            © 2026 Occasio. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
