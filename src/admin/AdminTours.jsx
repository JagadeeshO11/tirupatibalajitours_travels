import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Compass } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Admin.css';

const emptyTour = ['New Tour Package', '1 Day', 'Tirupati → Tirumala → Tirupati', '₹2,499', 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1786733399/8d17421f-0c51-490c-9fd1-34615a6a9dbd.png'];

export default function AdminTours() {
  const { tours, addTour, updateTour, deleteTour } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
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
              Create, modify or remove pilgrimage tour packages displayed on the website
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
                <th>Starting Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t, idx) => (
                <tr key={t[0] + idx}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img src={t[4]} alt={t[0]} className="table-thumb" />
                      <strong style={{ color: '#fff' }}>{t[0]}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge warning">{t[1]}</span>
                  </td>
                  <td>{t[2]}</td>
                  <td><strong style={{ color: '#34d399' }}>{t[3]}</strong></td>
                  <td>
                    <div className="action-btns">
                      <button type="button" onClick={() => handleOpenEdit(t, idx)} className="btn-icon-admin" title="Edit Tour">
                        <Edit2 size={14} />
                      </button>
                      <button type="button" onClick={() => handleDelete(idx, t[0])} className="btn-icon-admin danger" title="Delete Tour">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                <label>Starting Price *</label>
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
