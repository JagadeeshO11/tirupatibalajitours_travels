import { useState } from 'react';
import { Settings, Key, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { getEasebuzzConfig, saveEasebuzzConfig } from '../services/easebuzzService';
import './Admin.css';

export default function AdminSettings() {
  const { credentials, updateCredentials } = useAuth();
  const { resetToDefaults } = useData();

  // Easebuzz state
  const [easebuzz, setEasebuzz] = useState(getEasebuzzConfig());
  const [easebuzzSaved, setEasebuzzSaved] = useState(false);

  // Password state
  const [adminUser, setAdminUser] = useState(credentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSaveEasebuzz = (e) => {
    e.preventDefault();
    saveEasebuzzConfig(easebuzz);
    setEasebuzzSaved(true);
    setTimeout(() => setEasebuzzSaved(false), 3000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      updateCredentials(adminUser, newPassword);
      setPasswordSaved(true);
      setNewPassword('');
      setTimeout(() => setPasswordSaved(false), 3000);
    } else {
      alert('Password must be at least 4 characters long.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Resetting data will restore all Fleets, Tours, Destinations, Blogs, and Queries to initial demo defaults. Continue?')) {
      resetToDefaults();
      alert('Application data reset to defaults.');
      window.location.reload();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
      {/* Easebuzz Payment Gateway Setup */}
      <div className="admin-card">
        <div className="card-top-bar">
          <h2>Easebuzz Payment Gateway Setup</h2>
        </div>

        {easebuzzSaved && (
          <div className="status-badge success" style={{ marginBottom: '1rem', width: '100%', textAlign: 'center', padding: '0.6rem' }}>
            <CheckCircle2 size={16} style={{ display: 'inline', marginRight: 4 }} /> Easebuzz API Config Saved Successfully!
          </div>
        )}

        <form onSubmit={handleSaveEasebuzz} className="modal-form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Merchant Key *</label>
            <input 
              type="text" 
              required
              value={easebuzz.merchantKey}
              onChange={e => setEasebuzz({ ...easebuzz, merchantKey: e.target.value })}
            />
          </div>

          <div>
            <label>Salt Key *</label>
            <input 
              type="password" 
              required
              value={easebuzz.salt}
              onChange={e => setEasebuzz({ ...easebuzz, salt: e.target.value })}
            />
          </div>

          <div>
            <label>Environment Mode *</label>
            <select 
              value={easebuzz.environment}
              onChange={e => setEasebuzz({ ...easebuzz, environment: e.target.value })}
            >
              <option value="test">Sandbox / Test Mode</option>
              <option value="prod">Production / Live Mode</option>
            </select>
          </div>

          <button type="submit" className="btn-primary-admin" style={{ marginTop: '0.5rem' }}>
            Save Gateway Configuration
          </button>
        </form>
      </div>

      {/* Admin Credentials & Reset */}
      <div className="admin-card">
        <div className="card-top-bar">
          <h2>Admin Credentials Settings</h2>
        </div>

        {passwordSaved && (
          <div className="status-badge success" style={{ marginBottom: '1rem', width: '100%', textAlign: 'center', padding: '0.6rem' }}>
            <CheckCircle2 size={16} style={{ display: 'inline', marginRight: 4 }} /> Admin Credentials Updated!
          </div>
        )}

        <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label>Admin Username *</label>
            <input 
              type="text" 
              required
              value={adminUser}
              onChange={e => setAdminUser(e.target.value)}
            />
          </div>

          <div>
            <label>New Password *</label>
            <input 
              type="password" 
              required
              placeholder="Enter new admin password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary-admin">
            Update Credentials
          </button>
        </form>

        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--admin-card-border)' }}>
          <h3 style={{ color: '#ef4444', fontSize: '1rem', margin: '0 0 0.5rem 0', fontWeight: 800 }}>
            Reset Application Data
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '1rem' }}>
            Restores all Fleets, Tours, Destinations, Blogs, and Queries to default seed data.
          </p>
          <button type="button" onClick={handleResetData} className="logout-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <RefreshCw size={16} /> Reset All Data to Demo Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
