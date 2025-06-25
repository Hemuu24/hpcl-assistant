// components/Navbar.tsx
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import hpclLogo from "../assets/images/hpcl-logo.png";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Title */}
        <div className="logo-container">
          <Link to="/" className="logo-title-container">
            <img src={hpclLogo} alt="HPCL" className="logo" />
            <span className="system-title">Emergency Response System</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/safety-assistant" className="nav-link">Safety Assistant</Link>
          <Link to="/policies" className="nav-link">HPCL Policies</Link>
          <Link to="/emergency-routing" className="nav-link">Emergency Routing</Link>
          <HashLink smooth to="/#operations-section" className="nav-link">Refinery Operations</HashLink>
        </div>

        {/* User Section */}
        <div className="auth-section">
          <Link to="/dashboard" className="dashboard-button">Control Panel</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
