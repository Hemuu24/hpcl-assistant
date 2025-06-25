import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>HPCL Visakh Refinery</h4>
          <p>Emergency Response System</p>
          <p>Kutcha Rd, Visakhapatnam, Andhra Pradesh 530011</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/dashboard">Control Panel</a></li>
            <li><a href="/policies">Safety Policies</a></li>
            <li><a href="/emergency-routing">Emergency Routes</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Emergency Contacts</h4>
          <ul>
            <li>Control Room: <strong>Ext. 5555</strong></li>
            <li>Medical: <strong>Ext. 2222</strong></li>
            <li>Security: <strong>Ext. 1111</strong></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <p>HPCL Internal Use Only</p>
          <p>&copy; {new Date().getFullYear()} Hindustan Petroleum Corporation Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;