import { useState } from 'react';
import { Plus, Edit2, Trash2, X, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import './Admin.css';

const emptyBlog = {
  id: '',
  slug: '',
  title: '',
  category: 'Pilgrimage Guide',
  author: 'Balaji Travel Team',
  date: 'Sep 23, 2026',
  readTime: '5 min read',
  image: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482140/tirupatibalaji/fleet/cars/etios-new.png',
  snippet: ''
};

export default function AdminBlogs() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyBlog);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      ...emptyBlog,
      id: String(Date.now()),
      title: 'Tirumala Balaji Darshan Travel Tips 2026',
      slug: `blog-${Date.now()}`,
      snippet: 'Complete guide for pilgrims visiting Tirumala including queue timings and cab advice.'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingId(b.id);
    setFormData({ ...b });
    setModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete blog article: "${title}"?`)) {
      deleteBlog(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateBlog(editingId, formData);
    } else {
      addBlog(formData);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card">
        <div className="card-top-bar">
          <div>
            <h2>Blog Posts & Guides Management ({blogs.length})</h2>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              Publish, edit or remove travel blogs and pilgrimage guides on the website
            </p>
          </div>
          <button type="button" onClick={handleOpenAdd} className="btn-primary-admin">
            <Plus size={16} /> Write New Article
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Read Time</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img src={b.image} alt={b.title} className="table-thumb" />
                      <div>
                        <strong style={{ color: '#fff' }}>{b.title}</strong>
                        <small style={{ display: 'block', color: '#64748b' }}>{b.snippet?.slice(0, 45)}...</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge info">{b.category}</span>
                  </td>
                  <td>{b.author}</td>
                  <td>{b.readTime}</td>
                  <td>{b.date}</td>
                  <td>
                    <div className="action-btns">
                      <button type="button" onClick={() => handleOpenEdit(b)} className="btn-icon-admin" title="Edit Article">
                        <Edit2 size={14} />
                      </button>
                      <button type="button" onClick={() => handleDelete(b.id, b.title)} className="btn-icon-admin danger" title="Delete Article">
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
              <h3>{editingId ? 'Edit Article' : 'Write New Article'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-grid">
              <div className="modal-form-full">
                <label>Article Title *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label>Category *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div>
                <label>Author *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div>
                <label>Read Time *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.readTime}
                  onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                />
              </div>

              <div>
                <label>Published Date *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="modal-form-full">
                <label>Cover Image Cloudinary URL *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="modal-form-full">
                <label>Snippet / Summary Description *</label>
                <textarea 
                  rows="3"
                  required
                  value={formData.snippet}
                  onChange={e => setFormData({ ...formData, snippet: e.target.value })}
                />
              </div>

              <div className="modal-form-full modal-actions">
                <button type="button" className="btn-secondary-admin" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-admin">
                  {editingId ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
