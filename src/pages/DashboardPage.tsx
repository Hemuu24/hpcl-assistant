import { useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const safetyMetrics = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    values: [92, 95, 97, 96, 94, 93, 95]
  };

  const incidentData = {
    categories: ['Fire', 'Chemical', 'Equipment', 'Medical', 'Other'],
    counts: [12, 8, 15, 5, 3]
  };

  const zoneSafety = [
    { name: 'Crude Unit', score: 94, status: 'safe' },
    { name: 'FCC Unit', score: 88, status: 'warning' },
    { name: 'Utilities', score: 97, status: 'safe' },
    { name: 'Tank Farm', score: 82, status: 'critical' },
    { name: 'Loading Bay', score: 91, status: 'safe' }
  ];

  const recentAlerts = [
    { id: 1, zone: 'Tank Farm', type: 'Temperature', status: 'critical', time: '10:23 AM' },
    { id: 2, zone: 'FCC Unit', type: 'Pressure', status: 'warning', time: '09:47 AM' },
    { id: 3, zone: 'Utilities', type: 'Gas Detection', status: 'normal', time: '08:15 AM' },
    { id: 4, zone: 'Crude Unit', type: 'Vibration', status: 'warning', time: '07:30 AM' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Refinery Safety Dashboard</h1>
        <div className="time-selector">
          <button 
            className={timeRange === '24h' ? 'active' : ''}
            onClick={() => setTimeRange('24h')}
          >
            24 Hours
          </button>
          <button 
            className={timeRange === '7d' ? 'active' : ''}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button 
            className={timeRange === '30d' ? 'active' : ''}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        {/* Safety Score */}
        <div className="metric-card large">
          <div className="metric-header">
            <h2>Overall Safety Score</h2>
            <span className="score-badge">94.6</span>
          </div>
          <div className="safety-graph">
            {safetyMetrics.values.map((value, i) => (
              <div key={i} className="graph-bar-container">
                <div 
                  className="graph-bar" 
                  style={{ height: `${value}%` }}
                  data-value={value}
                ></div>
                <span className="graph-label">{safetyMetrics.labels[i]}</span>
              </div>
            ))}
          </div>
          <div className="metric-footer">
            <span className="trend up">+2.4%</span> from yesterday
          </div>
        </div>

        {/* Incident Breakdown */}
        <div className="metric-card">
          <h2>Incident Breakdown</h2>
          <div className="incident-chart">
            {incidentData.counts.map((count, i) => (
              <div key={i} className="incident-bar-container">
                <div 
                  className={`incident-bar ${incidentData.categories[i].toLowerCase()}`}
                  style={{ height: `${count * 10}px` }}
                >
                  <span className="incident-count">{count}</span>
                </div>
                <span className="incident-label">{incidentData.categories[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Safety Status */}
        <div className="metric-card">
          <h2>Zone Safety Status</h2>
          <div className="zone-list">
            {zoneSafety.map((zone, i) => (
              <div key={i} className="zone-item">
                <div className="zone-info">
                  <h3>{zone.name}</h3>
                  <div className={`status-dot ${zone.status}`}></div>
                </div>
                <div className="zone-progress">
                  <div 
                    className={`progress-bar ${zone.status}`}
                    style={{ width: `${zone.score}%` }}
                  ></div>
                  <span className="progress-text">{zone.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="metric-row">
          <div className="small-metric">
            <h3>Active Alerts</h3>
            <div className="metric-value critical">8</div>
          </div>
          <div className="small-metric">
            <h3>Safety Checks</h3>
            <div className="metric-value">247/250</div>
          </div>
          <div className="small-metric">
            <h3>PPE Compliance</h3>
            <div className="metric-value">98.2%</div>
          </div>
          <div className="small-metric">
            <h3>Response Time</h3>
            <div className="metric-value">2.4m</div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="metric-card wide">
          <h2>Recent Alerts</h2>
          <div className="alerts-table">
            <div className="table-header">
              <span>Zone</span>
              <span>Alert Type</span>
              <span>Status</span>
              <span>Time</span>
              <span>Actions</span>
            </div>
            {recentAlerts.map(alert => (
              <div key={alert.id} className={`table-row ${alert.status}`}>
                <span>{alert.zone}</span>
                <span>{alert.type}</span>
                <span>
                  <div className={`status-badge ${alert.status}`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </div>
                </span>
                <span>{alert.time}</span>
                <span>
                  <button className="action-button">Details</button>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Trends */}
        <div className="metric-card wide">
          <div className="card-header">
            <h2>Safety Trends</h2>
            <div className="tab-selector">
              <button 
                className={activeTab === 'overview' ? 'active' : ''}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={activeTab === 'incidents' ? 'active' : ''}
                onClick={() => setActiveTab('incidents')}
              >
                Incidents
              </button>
              <button 
                className={activeTab === 'compliance' ? 'active' : ''}
                onClick={() => setActiveTab('compliance')}
              >
                Compliance
              </button>
            </div>
          </div>
          <div className="trend-graph">
            <div className="graph-placeholder">
              {activeTab === 'overview' && 'Safety Overview Graph'}
              {activeTab === 'incidents' && 'Incident Trend Graph'}
              {activeTab === 'compliance' && 'Compliance Trend Graph'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;