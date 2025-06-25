// components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import hpclLogo from "../assets/images/hpcl-logo.png";
import "./Navbar.css";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Title */}
        <div className="logo-container">
          <Link to="/dashboard" className="logo-title-container">
            <img src={hpclLogo} alt="HPCL" className="logo" />
            <span className="system-title">Emergency Response System</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/safety-assistant" className="nav-link">Safety Assistant</Link>
          <Link to="/policies" className="nav-link">Policies</Link>
          <Link to="/emergency-routing" className="nav-link emergency-link">Emergency Routing</Link>
        </div>

        {/* User Section */}
        <div className="auth-section">
          <button onClick={handleLogoutClick} className="dashboard-button">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
