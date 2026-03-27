import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="ContactSection" className="container py-5" style={{ textAlign: "center", color:"white", fontSize:"22px"}}>
      <h3 style={{color: "#17ddbcff"}}>CONTACT US
      <hr className="w-25 mx-auto"></hr></h3>
      <p>
        Have any questions or want to book an event? Fill out the form below and we'll get back to you soon. 
      </p>

      <form style={{ maxWidth: "1000px", margin: "auto", textAlign: "left" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter your name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="Enter your email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea 
            className="form-control" 
            rows="4" 
            placeholder="Write your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-danger btn-lg w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {submitMessage && (
        <div className="mt-3" style={{ color: submitMessage.includes('Thank you') ? '#17ddbcff' : '#ff6b6b' }}>
          {submitMessage}
        </div>
      )}

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
