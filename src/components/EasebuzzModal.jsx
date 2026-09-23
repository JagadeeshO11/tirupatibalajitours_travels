import { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getEasebuzzConfig, generateTransactionId, calculateEasebuzzHash } from '../services/easebuzzService';
import './BookingForm.css';

export default function EasebuzzModal({ isOpen, onClose, initialData = {} }) {
  const { recordPayment, addQuery } = useData();
  const [formData, setFormData] = useState({
    firstname: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    service: initialData.service || 'Tirupati Cab Booking Deposit',
    amount: initialData.amount || '500'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const config = getEasebuzzConfig();
    const txnid = generateTransactionId();
    const easebuzzId = `EZB_${Date.now()}`;
    const hash = calculateEasebuzzHash({
      key: config.merchantKey,
      txnid,
      amount: formData.amount,
      productinfo: formData.service,
      firstname: formData.firstname,
      email: formData.email,
      salt: config.salt
    });

    // Simulate Easebuzz gateway handoff & processing
    setTimeout(() => {
      const paymentRecord = recordPayment({
        txnid,
        easebuzzId,
        firstname: formData.firstname,
        email: formData.email,
        phone: formData.phone,
        amount: Number(formData.amount),
        productinfo: formData.service,
        mode: 'Easebuzz Online (UPI/Card)',
        hash
      });

      // Also log as an advance query
      addQuery({
        name: formData.firstname,
        phone: formData.phone,
        from: 'Online Payment',
        to: formData.service,
        date: new Date().toISOString().split('T')[0],
        trip: 'Paid Advance Booking',
        vehicle: formData.service,
        status: 'Confirmed'
      });

      setIsProcessing(false);
      setReceipt({
        txnid,
        easebuzzId,
        amount: formData.amount,
        service: formData.service,
        name: formData.firstname,
        date: new Date().toLocaleString()
      });
    }, 1500);
  };

  const handleClose = () => {
    setReceipt(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="itinerary-overlay" role="presentation" onClick={handleClose}>
      <div 
        className="itinerary-modal package-info-modal" 
        style={{ maxWidth: 520, padding: '2rem' }}
        role="dialog" 
        aria-modal="true" 
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="itinerary-close" aria-label="Close" onClick={handleClose}>
          <X size={20} />
        </button>

        {!receipt ? (
          <>
            <div className="itinerary-modal-header" style={{ marginBottom: '1.5rem' }}>
              <span className="itinerary-icon" style={{ background: '#0284c7', color: '#fff' }}>
                <CreditCard size={22} />
              </span>
              <div>
                <p style={{ color: '#0284c7', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>EASEBUZZ PAYMENT GATEWAY</p>
                <h3 style={{ fontSize: '1.35rem', color: '#0f172a' }}>Instant Advance Booking</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.firstname}
                  onChange={e => setFormData({ ...formData, firstname: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                    Email ID *
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Service / Package *
                </label>
                <input 
                  type="text" 
                  required 
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Advance Token Amount (₹) *
                </label>
                <select 
                  value={formData.amount} 
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}
                >
                  <option value="500">₹500 (Basic Advance Booking Token)</option>
                  <option value="1000">₹1,000 (Standard Advance Token)</option>
                  <option value="2000">₹2,000 (Outstation Package Token)</option>
                  <option value="3000">₹3,000 (Group / Bus Advance)</option>
                </select>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Lock size={18} color="#0284c7" />
                <span style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                  Secured by <strong>Easebuzz 256-Bit SSL Encryption</strong>. Supports UPI, Google Pay, PhonePe, Credit/Debit Cards & NetBanking.
                </span>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="button" 
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  fontSize: '1rem', 
                  fontWeight: 800, 
                  background: 'linear-gradient(135deg, #0284c7, #0369a1)', 
                  border: 'none', 
                  borderRadius: 10,
                  color: '#fff',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing Easebuzz Gateway...
                  </>
                ) : (
                  <>
                    Pay ₹{formData.amount} via Easebuzz <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: 64, height: 64, background: '#dcfce7', borderRadius: '50%', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.35rem' }}>
              Payment Successful!
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Thank you {receipt.name}. Your advance booking token has been received via Easebuzz.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Transaction ID:</span>
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{receipt.txnid}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Easebuzz Ref ID:</span>
                <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{receipt.easebuzzId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Service:</span>
                <strong style={{ color: '#0f172a' }}>{receipt.service}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Amount Paid:</span>
                <strong style={{ color: '#16a34a', fontSize: '1.05rem' }}>₹{receipt.amount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Date & Time:</span>
                <span style={{ color: '#475569' }}>{receipt.date}</span>
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleClose} 
              className="button"
              style={{ width: '100%', padding: '0.85rem', borderRadius: 8 }}
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
