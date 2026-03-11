import { useState } from 'react';
import './index.css';

const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
);

const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
);

const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const IconMarket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

const IconSend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

const IconBot = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
);

const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sysStatus, setSysStatus] = useState({ gateway: 'offline' });

  useState(() => {
    fetch('http://127.0.0.1:8080/api/v1/system_status')
      .then(res => res.json())
      .then(data => setSysStatus(data))
      .catch(() => setSysStatus({ gateway: 'offline' }));
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand animate-fade-in">
          <div className="brand-icon">A3</div>
          <div className="brand-name">Agrimate V3</div>
        </div>

        <nav className="flex-col gap-2">
          <button
            className={`nav-link animate-fade-in delay-1 ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <IconDashboard /> Dashboard
          </button>
          <button
            className={`nav-link animate-fade-in delay-2 ${activeTab === 'monitoring' ? 'active' : ''}`}
            onClick={() => setActiveTab('monitoring')}
          >
            <IconMap /> Crop Monitoring
          </button>
          <button
            className={`nav-link animate-fade-in delay-3 ${activeTab === 'assistant' ? 'active' : ''}`}
            onClick={() => setActiveTab('assistant')}
          >
            <IconChat /> AI Assistant
          </button>
          <button
            className={`nav-link animate-fade-in delay-3 ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            <IconMarket /> Market Intelligence
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header animate-fade-in">
          <div className="flex-col">
            <h1 className="page-title">
              {activeTab === 'dashboard' && 'Farm Overview'}
              {activeTab === 'monitoring' && 'NDVI Analysis'}
              {activeTab === 'assistant' && 'Agrimate Assistant'}
              {activeTab === 'market' && 'Agmarknet Prices'}
            </h1>
            <div className="flex gap-2" style={{ marginTop: '0.25rem' }}>
              <span className={`badge ${sysStatus.gateway === 'online' ? 'badge-success' : 'badge-warning'}`}>Gateway: {sysStatus.gateway}</span>
              <span className={`badge ${sysStatus.throttler === 'enabled' ? 'badge-success' : 'badge-warning'}`}>Throttler: {sysStatus.throttler}</span>
            </div>
          </div>
          <div className="user-profile">
            <button className="btn-primary">Connect Synapse</button>
            <div className="avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard sysStatus={sysStatus} />}
        {activeTab === 'monitoring' && <Monitoring />}
        {activeTab === 'assistant' && <AIAssistant />}
        {activeTab === 'market' && <MarketIntelligence />}
      </main>
    </div>
  );
}

function Dashboard({ sysStatus }) {
  const [summary, setSummary] = useState(null);

  useState(() => {
    fetch('http://127.0.0.1:8080/api/v1/data_summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-grid animate-fade-in delay-1">
      <div className="stat-card glass-panel widget-small">
        <div className="stat-header">
          <span>Overall Yield Est.</span>
          <IconMap />
        </div>
        <div className="stat-value">2,450 kg</div>
        <div className="stat-change positive">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          +14.5% from last year
        </div>
      </div>
      <div className="stat-card glass-panel widget-small">
        <div className="stat-header">
          <span>Records Ingested</span>
          <IconDashboard />
        </div>
        <div className="stat-value">{summary?.total_rows || 0}</div>
        <div className="stat-change positive">From {Object.keys(summary?.sources || {}).length} sources</div>
      </div>
      <div className="stat-card glass-panel widget-small">
        <div className="stat-header">
          <span>Process Status</span>
          <IconChat />
        </div>
        <div className="flex-col gap-1" style={{ marginTop: '0.5rem' }}>
          <div className={`badge ${sysStatus.research_poller === 'active' ? 'badge-success' : 'badge-warning'}`}>Poller: {sysStatus.research_poller}</div>
          <div className={`badge ${sysStatus.ml_reanalyser === 'active' ? 'badge-success' : 'badge-warning'}`}>Re-analyser: {sysStatus.ml_reanalyser}</div>
        </div>
      </div>

      <div className="glass-panel widget-large">
        <div className="widget-title">
          <span>Recent Field Scans</span>
          <button style={{ color: 'var(--accent-primary)', fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="map-placeholder" style={{ padding: 0 }}>
          <img src="/ndvi_map.png" alt="NDVI Heatmap" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
          <span style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', color: '#fff' }}>Interactive Map Engine</span>
        </div>
      </div>

      <div className="glass-panel widget-small">
        <div className="widget-title">Project Context</div>
        <div className="flex-col gap-4">
          {summary?.sources && Object.entries(summary.sources).map(([name, count]) => (
            <div key={name} style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '1rem' }}>
              <div className="flex justify-between">
                <span style={{ fontWeight: 600 }}>{name} Data</span>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>SYNCED</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{count} master records processed.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Monitoring() {
  return (
    <div className="dashboard-grid animate-fade-in delay-1">
      <div className="glass-panel" style={{ gridColumn: 'span 12', padding: '1.5rem' }}>
        <div className="widget-title">Live Satellite NDVI Map</div>
        <div className="map-placeholder" style={{ height: '500px', padding: 0 }}>
          <img src="/ndvi_map.png" alt="NDVI Live Monitoring Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--text-secondary)', zIndex: 2, background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1rem', borderRadius: '4px' }}>🔴 Live Satellite Feed - Sync Active</span>
        </div>
      </div>
    </div>
  );
}

function MarketIntelligence() {
  const [summary, setSummary] = useState(null);

  useState(() => {
    fetch('http://127.0.0.1:8080/api/v1/data_summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard-grid animate-fade-in delay-1">
      <div className="glass-panel" style={{ gridColumn: 'span 12', padding: '1.5rem' }}>
        <div className="widget-title">Agmarknet Price Feed Strategy</div>
        <div className="flex-col gap-4">
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Data Sources Integrated</h3>
            <div className="flex gap-4">
              {summary?.sources && Object.entries(summary.sources).map(([name, count]) => (
                <div key={name} className="stat-card glass-panel" style={{ flex: 1, padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{name}</div>
                   <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{count}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Automated APY/Agmarknet Pipeline (T-101)</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The current pipeline handles standardization of {summary?.columns?.length || 0} features across state-wise datasets. 
              The Master Panel in Google Drive is updated hourly by the ML Re-analyser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am the Agrimate RAG Assistant. I have been trained on rural innovation, agricultural documents, and APY datasets. How can I help you query the knowledge base today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/v1/chat?query=${encodeURIComponent(input)}`, {
        method: 'POST',
      });
      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Connection failed. Please ensure the local backend gateway is running on port 8080.' 
      }]);
    }
  };

  return (
    <div className="glass-panel animate-fade-in delay-1" style={{ padding: '1.5rem' }}>
      <div className="rag-chat-container">
        <div className="widget-title">RAG Knowledge Base Assistant</div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'bot' ? <IconBot /> : <IconUser />}
              </div>
              <div className="message-bubble animate-fade-in">
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form className="chat-input-container" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about crop monitoring, APY datasets, or automation..."
          />
          <button type="submit" className="chat-submit" disabled={!input.trim()}>
            <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
}
