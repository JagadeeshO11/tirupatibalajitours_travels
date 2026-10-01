import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Compass, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { packageDetails } from '../data/packageDetails';
import './Admin.css';

const emptyTour = ['New Tour Package', '1 Day', 'Tirupati → Tirumala → Tirupati', '₹2,499', 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1786733399/8d17421f-0c51-490c-9fd1-34615a6a9dbd.png'];

function getFleetFares(title, basePriceStr) {
  if (packageDetails[title]?.prices && packageDetails[title].prices.length > 0) {
    return packageDetails[title].prices;
  }
  const keys = Object.keys(packageDetails);
  const foundKey = keys.find(k => k.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(k.toLowerCase()));
  if (foundKey && packageDetails[foundKey]?.prices && packageDetails[foundKey].prices.length > 0) {
    return packageDetails[foundKey].prices;
  }
  const baseNum = parseInt((basePriceStr || '3500').replace(/[^0-9]/g, ''), 10) || 3500;
  return [
    ['Sedan (4 Seater)', `₹${baseNum.toLocaleString('en-IN')}`],
    ['Ertiga (6 Seater)', `₹${(Math.round((baseNum * 1.3) / 100) * 100).toLocaleString('en-IN')}`],
    ['Innova Crysta (7 Seater)', `₹${(Math.round((baseNum * 1.55) / 100) * 100).toLocaleString('en-IN')}`],
    ['Hycross (7 Seater)', `₹${(Math.round((baseNum * 1.9) / 100) * 100).toLocaleString('en-IN')}`],
    ['Tempo Traveller 12', `₹${(Math.round((baseNum * 2.2) / 100) * 100).toLocaleString('en-IN')}`],
    ['Urbania 16 Seater', `₹${(Math.round((baseNum * 2.8) / 100) * 100).toLocaleString('en-IN')}`]
  ];
}

export default function AdminTours() {
  const { tours, addTour, updateTour, deleteTour } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    route: '',
    price: '',
    image: ''
  });

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      title: 'New Temple Package',
      duration: '1 Day',
      route: 'Tirupati → Srikalahasti → Tirupati',
      price: '₹2,999',
      image: emptyTour[4]
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t, idx) => {
    setEditingIndex(idx);
    setFormData({
      title: t[0],
      duration: t[1],
      route: t[2],
      price: t[3],
      image: t[4]
    });
    setModalOpen(true);
  };

  const handleDelete = (idx, title) => {
    if (window.confirm(`Are you sure you want to delete tour package: "${title}"?`)) {
      deleteTour(idx);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tourArray = [formData.title, formData.duration, formData.route, formData.price, formData.image];
    if (editingIndex !== null) {
      updateTour(editingIndex, tourArray);
    } else {
      addTour(tourArray);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card">
        <div className="card-top-bar">
          <div>
            <h2>Tour Packages Management ({tours.length})</h2>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              Create, modify or remove pilgrimage tour packages & full vehicle fleet rate cards
            </p>
          </div>
          <button type="button" onClick={handleOpenAdd} className="btn-primary-admin">
            <Plus size={16} /> Add Tour Package
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Package Title</th>
                <th>Duration</th>
                <th>Route Corridor</th>
                <th>Vehicle Fleet Fares Breakdown</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t, idx) => {
                const fleetFares = getFleetFares(t[0], t[3]);
                const isExpanded = expandedIndex === idx;

                return (
                  <tr key={t[0] + idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img src={t[4]} alt={t[0]} className="table-thumb" />
                        <div>
                          <strong style={{ color: '#fff' }}>{t[0]}</strong>
                          <small style={{ display: 'block', color: '#64748b' }}>Starting Base: <strong style={{ color: '#34d399' }}>{t[3]}</strong></small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge warning">{t[1]}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{t[2]}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fleet Options ({fleetFares.length}):</span>
                          <button
                            type="button"
                            onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                            className="btn-secondary-admin"
                            style={{
                              padding: '2px 8px',
                              fontSize: '0.72rem',
                              borderColor: 'var(--admin-card-border)',
                              color: isExpanded ? '#38bdf8' : '#cbd5e1',
                              cursor: 'pointer'
                            }}
                          >
                            {isExpanded ? 'Collapse ▲' : 'Show All Fleet Fares ▼'}
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxWidth: '340px' }}>
                          {(isExpanded ? fleetFares : fleetFares.slice(0, 3)).map(([vehicle, fare], fIdx) => (
                            <span key={fIdx} style={{
                              background: 'rgba(30, 41, 59, 0.85)',
                              border: '1px solid rgba(56, 189, 248, 0.25)',
                              color: '#e2e8f0',
                              fontSize: '0.72rem',
                              padding: '2px 7px',
                              borderRadius: '5px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <span style={{ color: '#38bdf8', fontWeight: 600 }}>{vehicle.split(' ')[0]}:</span>
                              <strong style={{ color: '#34d399' }}>{fare}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="action-btns">
                        <a
                          href="/tours"
                          target="_blank"
                          rel="noreferrer"
                          className="btn-icon-admin"
                          title="View Live Tour Cards"
                          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button type="button" onClick={() => handleOpenEdit(t, idx)} className="btn-icon-admin" title="Edit Tour">
                          <Edit2 size={14} />
                        </button>
                        <button type="button" onClick={() => handleDelete(idx, t[0])} className="btn-icon-admin danger" title="Delete Tour">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingIndex !== null ? 'Edit Tour Package' : 'Add Tour Package'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-grid">
              <div className="modal-form-full">
                <label>Package Title *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label>Duration *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 1 Day / 3 Days"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <div>
                <label>Starting Base Fare (Sedan 4-Seater) *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹2,999"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="modal-form-full">
                <label>Route Corridor *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Tirupati → Tirumala → Kapila"
                  value={formData.route}
                  onChange={e => setFormData({ ...formData, route: e.target.value })}
                />
              </div>

              <div className="modal-form-full">
                <label>Cover Image URL *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* FLEET FARES BREAKDOWN PREVIEW */}
              <div className="modal-form-full" style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', border: '1px solid #1e293b' }}>
                <label style={{ color: '#38bdf8', fontWeight: 700, display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  🚗 Vehicle Fleet Rates Breakdown Preview for this Package:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.4rem' }}>
                  {getFleetFares(formData.title, formData.price).map(([vName, vFare], fIdx) => (
                    <div key={fIdx} style={{ fontSize: '0.78rem', background: '#1e293b', padding: '0.35rem 0.6rem', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1' }}>{vName}</span>
                      <strong style={{ color: '#34d399' }}>{vFare}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-form-full modal-actions">
                <button type="button" className="btn-secondary-admin" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-admin">
                  {editingIndex !== null ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
