import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/AboutPage.css';
import refineryImage from '../assets/images/sliderimage1.jpg';
import teamImage from '../assets/images/sliderimage2.jpg';
import safetyImage from '../assets/images/sliderimage3.jpeg';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>About HPCL Visakh Safety Systems</h1>
          <p>Pioneering refinery safety through innovation and technology</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <div className="mission-statement">
              <p>
                To deliver world-class safety solutions that protect our workforce, 
                environment, and assets through cutting-edge technology and 
                operational excellence.
              </p>
            </div>
            <button 
              className="primary-button"
              onClick={() => navigate('/safety-manuals')}
            >
              View Our Safety Protocols
            </button>
          </div>
          <div className="mission-image">
            <img src={refineryImage} alt="HPCL Visakh Refinery" />
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <h2>Our Heritage</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">1957</div>
            <div className="timeline-content">
              <h3>Refinery Established</h3>
              <p>
                HPCL Visakh Refinery commenced operations with an initial capacity 
                of 0.65 MMTPA, marking the beginning of our safety journey.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">1999</div>
            <div className="timeline-content">
              <h3>First Safety Management System</h3>
              <p>
                Implemented our first comprehensive safety management system, 
                setting industry benchmarks.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2023</div>
            <div className="timeline-content">
              <h3>AI-Powered Safety Platform</h3>
              <p>
                Launched our current generation predictive safety and emergency 
                response system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Our Safety Leadership</h2>
          <p>
            Dedicated professionals ensuring operational safety at every level
          </p>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-image-container">
              <img src={teamImage} alt="Safety Team" />
            </div>
            <h3>Safety Operations</h3>
            <p>
              150+ certified safety officers monitoring operations 24/7 with 
              advanced surveillance systems.
            </p>
          </div>
          <div className="team-card">
            <div className="team-image-container">
              <img src={safetyImage} alt="Technical Team" />
            </div>
            <h3>Technical Experts</h3>
            <p>
              Process safety engineers with an average of 15+ years experience 
              in refinery operations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Safety First</h3>
            <p>
              Every decision begins with safety considerations for our people, 
              community, and environment.
            </p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>
              Continuously evolving our systems with the latest safety technologies 
              and best practices.
            </p>
          </div>
          <div className="value-card">
            <h3>Accountability</h3>
            <p>
              Clear safety responsibilities at all organizational levels with 
              transparent reporting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Join Us in Setting Safety Standards</h2>
        <div className="cta-buttons">
          <button 
            className="primary-button"
            onClick={() => navigate('/contact')}
          >
            Contact Our Safety Team
          </button>
          <button 
            className="secondary-button"
            onClick={() => navigate('/careers')}
          >
            Safety Career Opportunities
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;