import React, { useState, useEffect } from 'react';
import './SafetyAssistant.css';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface Node {
  id: string;
  name: string;
}

const SafetyAssistant = () => {
  const [activeTab, setActiveTab] = useState<'emergency' | 'protocols' | 'report'>('report');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapData, setMapData] = useState<{ nodes: Node[] } | null>(null);
  const [hazardType, setHazardType] = useState('');
  const [hazardDescription, setHazardDescription] = useState('');
  const [hazardLocation, setHazardLocation] = useState('');
  const [reportStatus, setReportStatus] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  useEffect(() => {
    fetch('/refinery_map.json')
      .then(response => response.json())
      .then(data => setMapData(data));
  }, []);

  const emergencyProcedures = [
    {
      title: "Fire Emergency",
      steps: [
        "Activate nearest fire alarm",
        "Evacuate to designated assembly point",
        "Use appropriate fire extinguisher if trained",
        "Do not use elevators during evacuation"
      ]
    },
    {
      title: "Chemical Spill",
      steps: [
        "Alert personnel in the area",
        "Contain the spill if safe to do so",
        "Use appropriate PPE before handling",
        "Report to safety officer immediately"
      ]
    },
    {
      title: "Medical Emergency",
      steps: [
        "Call medical response team (Ext. 2222)",
        "Provide first aid if qualified",
        "Do not move injured person unless in danger",
        "Keep area clear for medical personnel"
      ]
    }
  ];

  const safetyProtocols = [
    {
      category: "Personal Protective Equipment",
      items: [
        "Hard hats must be worn in designated areas",
        "Safety goggles for all chemical handling",
        "Fire-resistant clothing in processing units",
        "Hearing protection in high-noise zones"
      ]
    },
    {
      category: "Permit Requirements",
      items: [
        "Hot work permit for welding/cutting",
        "Confined space entry permit",
        "Height work permit for >2m elevation",
        "Electrical work permit for live systems"
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const newMessage: ChatMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the assistant.');
      }

      const data = await response.json();
      const botMessage: ChatMessage = { sender: 'bot', text: data.answer };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      const botMessage: ChatMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setChatHistory(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hazardType || !hazardDescription || !hazardLocation) {
      setReportStatus('Please fill in all fields.');
      return;
    }
    setReportStatus('Submitting...');
    try {
      const response = await fetch('http://localhost:5000/report-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hazard_type: hazardType,
          description: hazardDescription,
          location: hazardLocation
        })
      });
      const data = await response.json();
      if (response.ok) {
        setReportStatus('Report submitted successfully!');
        setHazardType('');
        setHazardDescription('');
        setHazardLocation('');
      } else {
        setReportStatus(data.error || 'Failed to submit report.');
      }
    } catch (err) {
      setReportStatus('Error submitting report.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadStatus('Please select a PDF file.');
      return;
    }
    setUploadStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', uploadFile);
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setUploadStatus('File uploaded and indexed successfully!');
        setUploadFile(null);
      } else {
        const data = await response.json();
        setUploadStatus(data.error || 'Failed to upload file.');
      }
    } catch (err) {
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div className="safety-assistant-container">
      <div className="safety-header">
        <h1>HPCL Safety Assistant</h1>
        <p>Your digital guide for refinery safety protocols and emergency procedures</p>
      </div>

      <div className="assistant-tabs">
        <button 
          className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          Emergency Procedures
        </button>
        <button 
          className={`tab-button ${activeTab === 'protocols' ? 'active' : ''}`}
          onClick={() => setActiveTab('protocols')}
        >
          Safety Protocols
        </button>
        <button 
          className={`tab-button ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          Report Hazard
        </button>
      </div>

      <div className="assistant-content">
        <div className="report-hazard">
          <div className="report-chat">
            <h2>Safety Assistance Chat</h2>
            <div className="chat-container">
              <div className="chat-messages">
                {chatHistory.length === 0 ? (
                  <div className="empty-chat">
                    <p>Ask me anything about safety documents.</p>
                    <p className="example-text">e.g., "What are the PPE requirements for the processing area?"</p>
                  </div>
                ) : (
                  chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.sender}`}>
                      <p>{chat.text}</p>
                    </div>
                  ))
                )}
                {isLoading && <div className="loading-indicator">Bot is typing...</div>}
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="chat-input-area">
                <form className="file-upload-area" onSubmit={handleFileUpload}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading || !uploadFile}>
                    Upload PDF
                  </button>
                  {uploadStatus && <span className="upload-status">{uploadStatus}</span>}
                </form>
                <div className="chat-input">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your safety question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'emergency' && (
          <div className="emergency-procedures">
            <h2>Emergency Response Procedures</h2>
            <div className="procedure-grid">
              {emergencyProcedures.map((procedure, index) => (
                <div key={index} className="procedure-card">
                  <h3>{procedure.title}</h3>
                  <ol className="steps-list">
                    {procedure.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <button className="procedure-button">
                    View Detailed Protocol
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'protocols' && (
          <div className="safety-protocols">
            <h2>Refinery Safety Protocols</h2>
            <div className="protocols-container">
              {safetyProtocols.map((protocol, index) => (
                <div key={index} className="protocol-section">
                  <h3>{protocol.category}</h3>
                  <ul className="protocol-list">
                    {protocol.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="quick-report">
            <h3>Quick Hazard Report</h3>
            <form className="report-form" onSubmit={handleReportSubmit}>
              <select value={hazardType} onChange={e => setHazardType(e.target.value)} required>
                <option value="">Select hazard type</option>
                <option value="fire">Fire hazard</option>
                <option value="chemical">Chemical spill</option>
                <option value="equipment">Equipment failure</option>
                <option value="other">Other safety concern</option>
              </select>
              <select value={hazardLocation} onChange={e => setHazardLocation(e.target.value)} required>
                <option value="">Select location</option>
                {mapData?.nodes.map((node: Node) => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </select>
              <textarea
                placeholder="Describe the hazard details..."
                value={hazardDescription}
                onChange={e => setHazardDescription(e.target.value)}
                required
              ></textarea>
              <div className="form-actions">
                <button type="submit" className="primary-button">
                  Submit Report
                </button>
              </div>
              {reportStatus && <p className="upload-status">{reportStatus}</p>}
            </form>
          </div>
        )}
      </div>

      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <div className="contacts-grid">
          <div className="contact-card">
            <h3>Refinery Emergency</h3>
            <p>Extension: 2222</p>
            <p>Mobile: 0891-2562222</p>
          </div>
          <div className="contact-card">
            <h3>Medical Center</h3>
            <p>Extension: 3333</p>
            <p>Mobile: 0891-2563333</p>
          </div>
          <div className="contact-card">
            <h3>Safety Department</h3>
            <p>Extension: 4444</p>
            <p>Mobile: 0891-2564444</p>
          </div>
          <div className="contact-card">
            <h3>Security Control</h3>
            <p>Extension: 5555</p>
            <p>Mobile: 0891-2565555</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyAssistant;