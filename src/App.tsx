import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/Landingpage';
import AuthForm from './pages/Signin';
import AboutPage from './pages/AboutPage';
import SafetyAssistant from './pages/SafetyAssistant';
import PoliciesPage from './pages/PoliciesPage';
import DashboardPage from './pages/DashboardPage'; // ✅ Import DashboardPage
import EmergencyRoutingPage from './pages/EmergencyRoutingPage';
import './App.css';

const App = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/login"
              element={
                <AuthForm
                  isSignup={false}
                  onSwitch={() => setIsSignup(true)}
                  onSuccess={() => (window.location.href = '/dashboard')}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <AuthForm
                  isSignup={true}
                  onSwitch={() => setIsSignup(false)}
                  onSuccess={() => (window.location.href = '/dashboard')}
                />
              }
            />

            {/* ✅ Integrated DashboardPage here */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/emergency-routing" element={<EmergencyRoutingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/safety-assistant" element={<SafetyAssistant />} />
            <Route path="/policies" element={<PoliciesPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
