import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/safety-manuals" element={<SafetyManualsPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/emergency-routing" element={<EmergencyRoutingPage />} />
            <Route path="/safety-assistant" element={<SafetyAssistant />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
