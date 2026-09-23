import { useState } from 'react';
import { Plus, Edit2, Trash2, X, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Admin.css';

export default function AdminDestinations() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    desc: '',
    image: '',
    price: ''
  });

  const handleOpenAdd = () => {
    setEditingSlug(null);
    setFormData({
      slug: 'talakona-waterfalls',
      name: 'Talakona Waterfalls',
      desc: 'Scenic forest waterfalls day trip near Tirupati.',
      image: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1786733245/2294ffc1-24a6-4284-bd31-20ada6598736.png',
      price: '₹3,800'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (d) => {
    setEditingSlug(d[0]);
    setFormData({
      slug: d[0],
      name: d[1],
      desc: d[2],
      image: d[3],
      price: d[4]
    });
    setModalOpen(true);
  };

  const handleDelete = (slug, name) => {
    if (window.confirm(`Are you sure you want to delete destination: "${name}"?`)) {
      deleteDestination(slug);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const destArray = [formData.slug, formData.name, formData.desc, formData.image, formData.price];
    if (editingSlug) {
      updateDestination(editingSlug, destArray);
    } else {
      addDestination(destArray);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card">
        <div className="card-top-bar">
          <div>
            <h2>Destinations Management ({destinations.length})</h2>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              Add or edit pilgrimage destinations and sightseeing spots displayed on the website
            </p>
          </div>
          <button type="button" onClick={handleOpenAdd} className="btn-primary-admin">
            <Plus size={16} /> Add Destination
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Destination Name</th>
                <th>URL Slug</th>
                <th>Description</th>
                <th>Starting Package</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map(d => (
                <tr key={d[0]}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img src={d[3]} alt={d[1]} className="table-thumb" />
                      <strong style={{ color: '#fff' }}>{d[1]}</strong>
                    </div>
                  </td>
                  <td><code style={{ color: '#38bdf8' }}>{d[0]}</code></td>
                  <td>{d[2]?.slice(0, 50)}...</td>
                  <td><strong style={{ color: '#34d399' }}>{d[4]}</strong></td>
                  <td>
                    <div className="action-btns">
                      <button type="button" onClick={() => handleOpenEdit(d)} className="btn-icon-admin" title="Edit Destination">
                        <Edit2 size={14} />
                      </button>
                      <button type="button" onClick={() => handleDelete(d[0], d[1])} className="btn-icon-admin danger" title="Delete Destination">
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
              <h3>{editingSlug ? 'Edit Destination' : 'Add Destination'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-grid">
              <div>
                <label>Destination Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label>URL Slug *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. srikalahasti"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  disabled={Boolean(editingSlug)}
                />
              </div>

              <div className="modal-form-full">
                <label>Starting Package Fare *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. ₹2,999"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="modal-form-full">
                <label>Image URL *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="modal-form-full">
                <label>Summary Description *</label>
                <textarea 
                  rows="3"
                  required
                  value={formData.desc}
                  onChange={e => setFormData({ ...formData, desc: e.target.value })}
                />
              </div>

              <div className="modal-form-full modal-actions">
                <button type="button" className="btn-secondary-admin" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-admin">
                  {editingSlug ? 'Save Changes' : 'Create Destination'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
