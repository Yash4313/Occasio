import About from '../assets/About.jpg'; 

const AboutUs = () => {
  return (
    <div id="AboutSection" className="container-fluid py-5" style={{ textAlign: "left", color:"white" }}>
      
      <h1 style={{ fontSize: "30px", marginTop: "20px", textAlign: "center", fontWeight: "600", color: "#17ddbcff" }}>
        ABOUT US
        <hr className="w-25 mx-auto" />
      </h1>

      <div className="row">
        
        <div className="col-md-5">
          <img
            src={About}
            alt="Occasio event"
            className="img-fluid w-100 object-fit-cover"
            style={{ height: "350px", borderRadius: "10px" }}
          />
        </div>

        <div className="col-md-7">
          <div className="row" style={{ fontSize: "15px", paddingLeft: "12px" }}>

            <p style={{ fontSize: "23px"}}>
              Occasio is a modern <strong>Event Booking & Management Platform</strong> that helps
              individuals and organizations easily plan, organize, and manage all types of events.
              From weddings and corporate meetings to parties and concerts — Occasio makes event
              management simple, smart & hassle-free.
            </p>

            <h4 style={{ fontSize: "24px", marginTop: "15px", fontWeight: "600", color:"#17ddbcff" }}>
              Why Choose Occasio?
            </h4>

            <div className="col">
              <ul style={{ fontSize: "23px", paddingLeft: "0px" }}>
                <li>Easy online booking</li>
                <li>Real-time event tracking</li>
                <li>Secure payment options</li>
                <li>24/7 customer support</li>
              </ul>
            </div>

            <div className="col">
              <ul style={{ fontSize: "23px" }}>
                <li>Personalized event packages</li>
                <li>For individuals and businesses</li>
                <li>Instant updates and reminders</li>
                <li>Accessible anytime, anywhere</li>
              </ul>
            </div>  

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;