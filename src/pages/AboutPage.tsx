import './AboutPage.css';

const heritageData = [
  {
    year: '1957',
    title: 'Refinery Established',
    description: 'HPCL Visakh Refinery commenced operations with an initial capacity of 0.65 MMTPA, marking the beginning of our safety journey.',
  },
  {
    year: '1976',
    title: 'Nationalization',
    description: 'Became a part of the Hindustan Petroleum Corporation Limited (HPCL) family, aligning with national energy goals.',
  },
  {
    year: '1999',
    title: 'First Safety Management System',
    description: 'Implemented our first comprehensive safety management system, setting industry benchmarks for operational safety.',
  },
  {
    year: '2013',
    title: 'Refinery Modernization Project',
    description: 'Completed a major expansion to increase capacity and upgrade technology for producing cleaner, high-quality fuels.',
  },
  {
    year: 'Today',
    title: 'A Leader in Digital Transformation',
    description: 'Integrating AI and digital solutions, like this Emergency Response System, to achieve new heights in safety and efficiency.',
  }
];

const coreValuesData = [
  {
    title: 'Safety First',
    description: 'Every decision begins with safety considerations for our people, community, and environment.'
  },
  {
    title: 'Innovation',
    description: 'Continuously evolving our systems with the latest safety technologies and best practices.'
  },
  {
    title: 'Accountability',
    description: 'Clear safety responsibilities at all organizational levels with transparent reporting.'
  }
];

const AboutPage = () => {
  return (
    <div className="about-page-timeline">
      <div className="heritage-header">
        <h1>Our Heritage</h1>
      </div>
      <section className="timeline-section">
        <div className="timeline-container">
          {heritageData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="values-section">
        <div className="values-header">
          <h2>Our Core Values</h2>
        </div>
        <div className="values-grid">
          {coreValuesData.map((value, index) => (
            <div key={index} className="value-card">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section-about">
        <div className="cta-content-about">
          <h2>Join Us in Setting Safety Standards</h2>
          <div className="cta-buttons-about">
            <button className="primary-button-about">Contact Our Safety Team</button>
            <button className="secondary-button-about">Safety Career Opportunities</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;