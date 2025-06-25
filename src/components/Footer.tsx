import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="hpcl-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* About Column */}
          <div className="footer-column">
            <h3 className="footer-heading">About HPCL Visakh</h3>
            <p className="footer-about">
              HPCL Visakh Refinery is one of India's largest coastal refineries with 
              a capacity of 8.3 MMTPA, serving the nation's energy needs since 1957.
            </p>
            <div className="footer-contact">
              <p>Visakhapatnam, Andhra Pradesh</p>
              <p>India - 530001</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/emergency-routing">Emergency Protocols</Link></li>
              <li><Link to="/safety-manuals">Safety Manuals</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Emergency Contacts Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Emergency Contacts</h3>
            <ul className="emergency-contacts">
              <li>Control Room: <span>+91-891-2567890</span></li>
              <li>Medical Emergency: <span>+91-891-2567891</span></li>
              <li>Fire Station: <span>+91-891-2567892</span></li>
              <li>Security: <span>+91-891-2567893</span></li>
            </ul>
          </div>

          {/* Social/External Links Column */}
          <div className="footer-column">
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="footer-social">
              <a href="https://www.hindustanpetroleum.com" target="_blank" rel="noopener noreferrer">
                Official Website
              </a>
              <a href="mailto:visakhrefinery@hpcl.in" target="_blank" rel="noopener noreferrer">
                Email Us
              </a>
            </div>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} HPCL Visakh Refinery. All Rights Reserved.
          </div>
          <div className="footer-credits">
            <span>Safety Management System v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;