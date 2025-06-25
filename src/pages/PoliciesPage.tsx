import { useState } from 'react';
import './PoliciesPage.css';

// Define a type for a single policy
interface Policy {
  id: number;
  title: string;
  description: string;
  lastUpdated: string;
  content: string[];
}

// Define the structure of the policy categories
interface PolicyCategories {
  safety: Policy[];
  environmental: Policy[];
  emergency: Policy[];
}

// Define a type for the keys of policyCategories, which are our tab names
type ActiveTab = keyof PolicyCategories;

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('safety');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPolicy, setExpandedPolicy] = useState<number | null>(null);

  // Policy data with full content
  const policyCategories: PolicyCategories = {
    safety: [
      { 
        id: 1,
        title: "Refinery Safety Policy Framework",
        description: "Comprehensive safety guidelines covering all operational areas",
        lastUpdated: "2023-11-15",
        content: [
          "1. All personnel must complete mandatory safety training before accessing operational areas",
          "2. Hazardous work requires pre-job safety meetings and permits",
          "3. Regular equipment inspections must be documented weekly",
          "4. Incident reporting within 1 hour of occurrence",
          "5. PPE requirements by zone:",
          "   - Processing Areas: FR clothing, hard hats, safety glasses, steel-toe boots",
          "   - Tank Farms: Additional H2S monitors",
          "   - Laboratories: Chemical-resistant gloves and aprons"
        ]
      },
      {
        id: 2,
        title: "Personal Protective Equipment (PPE) Standards",
        description: "Mandatory requirements for different refinery zones",
        lastUpdated: "2023-09-01",
        content: [
          "1. Base Requirements (All Areas):",
          "   - Hard hat (ANSI Z89.1 compliant)",
          "   - Safety glasses with side shields",
          "   - Steel-toe boots (ASTM F2413-18)",
          "   - High-visibility vest",
          "",
          "2. Processing Units Additional Requirements:",
          "   - Flame-resistant (FR) clothing",
          "   - Hearing protection (85+ dB areas)",
          "   - Gas monitors when working in confined spaces",
          "",
          "3. Specialized PPE:",
          "   - Acid suits for alkylation units",
          "   - Thermal protection for furnace work",
          "   - Fall protection at heights >1.8m"
        ]
      }
    ],
    environmental: [
      {
        id: 3,
        title: "Environmental Compliance Protocol",
        description: "Procedures for environmental regulations adherence",
        lastUpdated: "2023-10-20",
        content: [
          "1. Emissions Control:",
          "   - Continuous monitoring of SOx, NOx, and PM emissions",
          "   - Monthly stack testing for critical units",
          "   - LDAR program for VOC leaks (quarterly inspections)",
          "",
          "2. Water Management:",
          "   - Oily water separation standards (≤10 ppm discharge)",
          "   - Cooling water biocide treatment protocols",
          "   - Stormwater runoff containment procedures",
          "",
          "3. Waste Handling:",
          "   - Hazardous waste segregation and labeling",
          "   - Spent catalyst disposal procedures",
          "   - Used oil recycling requirements"
        ]
      }
    ],
    emergency: [
      {
        id: 4,
        title: "Emergency Response Manual",
        description: "Protocols for emergency scenarios",
        lastUpdated: "2023-12-05",
        content: [
          "Tier 1 (Unit-Level Emergency):",
          "   - Immediate area evacuation",
          "   - Unit isolation procedures",
          "   - Emergency shutdown activation",
          "",
          "Tier 2 (Site-Wide Emergency):",
          "   - Activation of site alarm system",
          "   - muster point accountability",
          "   - Emergency control center activation",
          "",
          "Tier 3 (Community Impacting):",
          "   - Notification of off-site emergency services",
          "   - Community alert system activation",
          "   - Media communication protocols"
        ]
      }
    ]
  };

  const filteredPolicies = policyCategories[activeTab].filter((policy: Policy) =>
    policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePolicy = (id: number) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  return (
    <div className="policies-page">
      {/* Hero Section */}
      <section className="policies-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>HPCL Visakh Refinery Policies</h1>
          <p>Complete documentation of all operational and safety procedures</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="policies-container">
        {/* Search and Filter */}
        <div className="policies-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="policy-tabs">
            <button
              className={`tab-btn ${activeTab === 'safety' ? 'active' : ''}`}
              onClick={() => setActiveTab('safety')}
            >
              Safety Policies
            </button>
            <button
              className={`tab-btn ${activeTab === 'environmental' ? 'active' : ''}`}
              onClick={() => setActiveTab('environmental')}
            >
              Environmental Policies
            </button>
            <button
              className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
              onClick={() => setActiveTab('emergency')}
            >
              Emergency Protocols
            </button>
          </div>
        </div>

        {/* Policies List */}
        <div className="policies-list">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy: Policy) => (
              <div 
                key={policy.id} 
                className={`policy-card ${expandedPolicy === policy.id ? 'expanded' : ''}`}
              >
                <div 
                  className="policy-header"
                  onClick={() => togglePolicy(policy.id)}
                >
                  <div className="policy-info">
                    <h3>{policy.title}</h3>
                    <p className="policy-description">{policy.description}</p>
                    <div className="policy-meta">
                      <span className="update-date">Last updated: {policy.lastUpdated}</span>
                      <span className="policy-category">{activeTab.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="expand-icon">
                    {expandedPolicy === policy.id ? '−' : '+'}
                  </div>
                </div>
                
                {expandedPolicy === policy.id && (
                  <div className="policy-content">
                    <div className="content-section">
                      {policy.content.map((item: string, index: number) => (
                        <p key={index} className={item === "" ? "content-spacer" : "content-item"}>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No policies found matching your search criteria</p>
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Compliance Section */}
        <div className="compliance-section">
          <h2>Regulatory Compliance</h2>
          <div className="compliance-grid">
            <div className="compliance-card">
              <h3>Statutory Requirements</h3>
              <ul>
                <li>
                  <strong>Petroleum Rules, 2002:</strong> Storage, handling, and safety requirements
                </li>
                <li>
                  <strong>Factories Act, 1948:</strong> Worker safety and welfare provisions
                </li>
                <li>
                  <strong>Environmental Protection Act:</strong> Emission and discharge standards
                </li>
              </ul>
            </div>
            <div className="compliance-card">
              <h3>International Standards</h3>
              <ul>
                <li>
                  <strong>ISO 45001:2018:</strong> Occupational health and safety management
                </li>
                <li>
                  <strong>API RP 754:</strong> Process safety performance indicators
                </li>
                <li>
                  <strong>OSHA Standards:</strong> Workplace safety regulations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoliciesPage;