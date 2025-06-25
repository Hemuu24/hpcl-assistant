import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About HPCL ERS</h4>
          <p>
            The HPCL Emergency Response System provides cutting-edge tools for ensuring safety and operational efficiency at the Visakh Refinery.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/safety-assistant">Safety Assistant</a></li>
            <li><a href="/emergency-routing">Emergency Routing</a></li>
            <li><a href="/policies">HPCL Policies</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>HPCL Visakh Refinery<br />Kutcha Rd, Visakhapatnam<br />Andhra Pradesh 530011</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hindustan Petroleum Corporation Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;