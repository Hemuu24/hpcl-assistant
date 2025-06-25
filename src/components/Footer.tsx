import "./Footer.css";

const Footer = () => {
  return (
    <footer className="hpcl-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4 className="footer-heading">HPCL Visakh Refinery</h4>
            <p className="footer-about">Emergency Response System<br />Kutcha Rd, Visakhapatnam, Andhra Pradesh 530011</p>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/dashboard">Control Panel</a></li>
              <li><a href="/policies">Safety Policies</a></li>
              <li><a href="/emergency-routing">Emergency Routes</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Emergency Contacts</h4>
            <ul className="emergency-contacts">
              <li>Control Room: <span>Ext. 5555</span></li>
              <li>Medical: <span>Ext. 2222</span></li>
              <li>Security: <span>Ext. 1111</span></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li>HPCL Internal Use Only</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Hindustan Petroleum Corporation Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;