import { useEffect, useState } from 'react';
import './Landingpage.css';
import sliderImage1 from '../assets/images/sliderimage1.jpg';
import sliderImage2 from '../assets/images/sliderimage2.jpg';
import sliderImage3 from '../assets/images/sliderimage3.jpeg';
import sliderImage4 from '../assets/images/sliderimage4.jpeg';
import sliderImage5 from '../assets/images/sliderimage5.jpeg';
import operationImage1 from '../assets/images/sliderimage1.jpg';
import operationImage2 from '../assets/images/sliderimage3.jpeg';
import operationImage3 from '../assets/images/image1.jpeg';
import operationImage4 from '../assets/images/refinery.jpeg';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sliderImages = [sliderImage1, sliderImage2, sliderImage3, sliderImage4, sliderImage5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="landing-page">
      {/* Hero Slider Section */}
      <section className="hero-section">
        <div className="slider-container">
          {sliderImages.map((img, i) => (
            <div 
              key={i}
              className={`slider-slide ${i === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1>HPCL Visakh Refinery Safety Systems</h1>
            <p>Advanced AI solutions for India's premier refinery safety and operational efficiency. We are committed to leveraging cutting-edge technology to ensure the highest standards of safety and productivity.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-item">
            <h3>8.3 MMTPA</h3>
            <p>Crude Processing Capacity</p>
          </div>
          <div className="stats-item">
            <h3>60+</h3>
            <p>Years of Operation</p>
          </div>
          <div className="stats-item">
            <h3>99.5%</h3>
            <p>Process Safety Performance</p>
          </div>
          <div className="stats-item">
            <h3>1500+</h3>
            <p>Safety Personnel</p>
          </div>
        </div>
      </section>

      {/* Refinery Operations Section */}
      <section id="operations-section" className="operations-section">
        <h2 className="section-title">Refinery Operations</h2>
        <div className="operations-grid">
          <div className="operation-card">
            <img src={operationImage1} alt="Crude Distillation Unit" />
            <div className="operation-overlay">
              <h3>Crude Distillation</h3>
              <p>Primary processing of crude oil into different fractions.</p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
          <div className="operation-card">
            <img src={operationImage2} alt="Fluid Catalytic Cracker" />
            <div className="operation-overlay">
              <h3>Catalytic Cracking</h3>
              <p>Upgrading heavier fractions into more valuable lighter products.</p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
          <div className="operation-card">
            <img src={operationImage3} alt="Hydrotreating Unit" />
            <div className="operation-overlay">
              <h3>Hydrotreating</h3>
              <p>Removing sulfur and other contaminants from distillates.</p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
          <div className="operation-card">
            <img src={operationImage4} alt="Control Room" />
            <div className="operation-overlay">
              <h3>Process Control</h3>
              <p>Monitoring and optimizing all refinery unit operations.</p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Integrated Solutions</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Document Search Bot</h3>
            <p>
              An intelligent bot for HPCL Policies and Safety Manuals. Ask questions like "What's the emergency protocol for gas leaks?" and get an accurate, instant response from embedded documents.
            </p>
            <ul>
              <li><strong>Web Dev:</strong> Simple React + Flask web interface.</li>
              <li><strong>AI/ML:</strong> Sentence transformers for document embedding and QA.</li>
              <li><strong>Server:</strong> Hosted on a local Linux server with Gunicorn/Nginx, featuring file upload and indexing.</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>Emergency Response Routing System</h3>
            <p>
              During fires or gas leaks, this system calculates the fastest, safest route for fire trucks and ambulances within the refinery, avoiding blocked paths and traffic in real-time.
            </p>
            <ul>
              <li><strong>Web Dev:</strong> Interactive map UI using Leaflet.js/Mapbox.</li>
              <li><strong>AI/ML:</strong> Pathfinding algorithms and ML for dynamic rerouting.</li>
              <li><strong>Server:</strong> Real-time route generation API with alert triggers.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Enhance Your Refinery's Safety?</h2>
          <div className="cta-buttons">
            <button className="primary-button">Contact Us</button>
            <button className="secondary-button">Technical Docs</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;