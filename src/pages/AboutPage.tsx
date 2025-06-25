import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="header-overlay"></div>
        <h1>About HPCL Visakh Refinery</h1>
        <p>A cornerstone of India's energy sector since 1957</p>
      </header>
      
      <section className="about-content">
        <div className="content-card">
          <h2>Our History & Legacy</h2>
          <p>
            Commissioned in 1957, the Visakh Refinery is one of the oldest and most strategic refineries in India. 
            Originally established as Caltex Oil Refining (India) Ltd., it was nationalized in 1976 and became part of the Hindustan Petroleum Corporation Limited (HPCL) family.
            Over the decades, it has undergone numerous upgrades and expansions to become a modern, high-complexity facility, currently boasting a capacity of 8.3 MMTPA.
          </p>
        </div>

        <div className="content-card">
          <h2>Commitment to Safety</h2>
          <p>
            Safety is not just a priority; it is a core value that drives every aspect of our operations. 
            We are committed to achieving a zero-incident workplace through continuous improvement of our processes, state-of-the-art technology, and comprehensive training for all our personnel.
            This Emergency Response System is a testament to our proactive approach to managing and mitigating risks effectively.
          </p>
        </div>

        <div className="content-card">
          <h2>Technological Excellence</h2>
          <p>
            The Visakh Refinery is equipped with advanced processing units, including a Fluidized Catalytic Cracker (FCC), hydrocrackers, and diesel hydro-treating units. 
            We leverage cutting-edge digital technologies, from advanced process control to AI-driven predictive maintenance, to ensure operational efficiency, reliability, and environmental compliance.
          </p>
        </div>

        <div className="content-card">
          <h2>Environmental Stewardship</h2>
          <p>
            As a responsible corporate citizen, we are dedicated to minimizing our environmental footprint. 
            The refinery has implemented extensive environmental management programs, including low-NOx burners, an advanced effluent treatment plant, and a robust leak detection and repair (LDAR) program, all compliant with the latest national and international standards.
          </p>
        </div>
      </section>

      <footer className="about-footer">
        <p>HPCL Visakh Refinery - Powering the Nation, Protecting our People.</p>
      </footer>
    </div>
  );
};

export default AboutPage;