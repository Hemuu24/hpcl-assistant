import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/Landingpage';
import DashboardPage from './pages/DashboardPage';
import SafetyManualsPage from './pages/SafetyManualsPage';
import PoliciesPage from './pages/PoliciesPage';
import EmergencyRoutingPage from './pages/EmergencyRoutingPage';
import SafetyAssistant from './pages/SafetyAssistant';
import AboutPage from './pages/AboutPage';
import AuthForm from './pages/Signin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('loggedIn') === 'true');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <main>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <AuthForm isSignup={false} onSwitch={() => {}} onSuccess={handleLogin} /> : <Navigate to="/dashboard" />} />
            <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/safety-manuals" element={isAuthenticated ? <SafetyManualsPage /> : <Navigate to="/login" />} />
            <Route path="/policies" element={isAuthenticated ? <PoliciesPage /> : <Navigate to="/login" />} />
            <Route path="/emergency-routing" element={isAuthenticated ? <EmergencyRoutingPage /> : <Navigate to="/login" />} />
            <Route path="/safety-assistant" element={isAuthenticated ? <SafetyAssistant /> : <Navigate to="/login" />} />
            <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
