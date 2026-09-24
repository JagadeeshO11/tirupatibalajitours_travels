import { useState, useEffect } from 'react';
import { X, CreditCard, CheckCircle2, Lock, ArrowRight, Loader2, Sparkles, Wallet, Check } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getEasebuzzConfig, generateTransactionId, calculateEasebuzzHash } from '../services/easebuzzService';
import './BookingForm.css';

export default function EasebuzzModal({ isOpen, onClose, initialData = {} }) {
  const { recordPayment, addQuery } = useData();

  // Extract base amounts from initialData
  const defaultDeposit = initialData.amount || '500';
  const rawFullAmount = initialData.fullAmount || initialData.totalAmount || initialData.price || '2499';
  // Clean currency formatting if string contains ₹ or commas
  const cleanedFullAmount = String(rawFullAmount).replace(/[^0-9]/g, '') || '2500';

  const [paymentType, setPaymentType] = useState('deposit'); // 'deposit' | 'full' | 'custom'
  const [formData, setFormData] = useState({
    firstname: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    service: initialData.service || 'Tirupati Cab Booking',
    amount: defaultDeposit,
    customAmount: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Sync state when initialData changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentType('deposit');
      setFormData({
        firstname: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        service: initialData.service || 'Tirupati Cab Booking',
        amount: defaultDeposit,
        customAmount: ''
      });
      setReceipt(null);
      setIsProcessing(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  // Handle payment type radio tab changes
  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (type === 'deposit') {
      setFormData(prev => ({ ...prev, amount: defaultDeposit }));
    } else if (type === 'full') {
      setFormData(prev => ({ ...prev, amount: cleanedFullAmount }));
    } else if (type === 'custom') {
      setFormData(prev => ({ ...prev, amount: prev.customAmount || '500' }));
    }
  };

  const handleCustomAmountChange = (val) => {
    const numericVal = val.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      customAmount: numericVal,
      amount: numericVal || '0'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }
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

    // Simulate online gateway handoff & processing
    setTimeout(() => {
      const paymentRecord = recordPayment({
        txnid,
        easebuzzId,
        firstname: formData.firstname,
        email: formData.email,
        phone: formData.phone,
        amount: Number(formData.amount),
        productinfo: formData.service,
        mode: `Online (${paymentType === 'full' ? 'Full Payment' : paymentType === 'deposit' ? 'Advance Token' : 'Custom Amount'})`,
        hash
      });

      // Also log as an advance query
      addQuery({
        name: formData.firstname,
        phone: formData.phone,
        from: 'Online Payment Gateway',
        to: formData.service,
        date: new Date().toISOString().split('T')[0],
        trip: `${paymentType.toUpperCase()} PAYMENT - ₹${formData.amount}`,
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
        type: paymentType === 'full' ? 'Full Payment' : paymentType === 'deposit' ? 'Advance Token Deposit' : 'Custom Payment',
        date: new Date().toLocaleString()
      });
    }, 1400);
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
        style={{ maxWidth: 540, padding: '2rem', borderRadius: 24 }}
        role="dialog" 
        aria-modal="true" 
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="itinerary-close" aria-label="Close" onClick={handleClose}>
          <X size={20} />
        </button>

        {!receipt ? (
          <>
            <div className="itinerary-modal-header" style={{ marginBottom: '1.25rem' }}>
              <span className="itinerary-icon" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#060c2c' }}>
                <CreditCard size={22} />
              </span>
              <div>
                <p style={{ color: '#d97706', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>INSTANT ONLINE PAYMENT</p>
                <h3 style={{ fontSize: '1.35rem', color: '#060c2c', margin: 0 }}>Finalize Payment Amount</h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* SERVICE ITEM BADGE */}
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, display: 'block' }}>SELECTED SERVICE</span>
                  <strong style={{ fontSize: '0.95rem', color: '#060c2c' }}>{formData.service}</strong>
                </div>
                <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: 999 }}>
                  Verified Booking
                </span>
              </div>

              {/* PAYMENT TYPE SELECTION TABS */}
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#060c2c', display: 'block', marginBottom: '0.5rem' }}>
                  Choose Payment Option *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {/* DEPOSIT / ADVANCE TOKEN OPTION */}
                  <div 
                    onClick={() => handlePaymentTypeChange('deposit')}
                    style={{
                      padding: '0.85rem 0.65rem',
                      borderRadius: 12,
                      border: paymentType === 'deposit' ? '2px solid #f59e0b' : '1.5px solid #cbd5e1',
                      background: paymentType === 'deposit' ? '#fffdf5' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: paymentType === 'deposit' ? '0 4px 15px rgba(245, 158, 11, 0.2)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: paymentType === 'deposit' ? '#d97706' : '#64748b', display: 'block' }}>
                      ADVANCE TOKEN
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: paymentType === 'deposit' ? '#060c2c' : '#334155', display: 'block', marginTop: '0.15rem' }}>
                      ₹{defaultDeposit}
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Balance to driver</span>
                  </div>

                  {/* FULL PAYMENT OPTION */}
                  <div 
                    onClick={() => handlePaymentTypeChange('full')}
                    style={{
                      padding: '0.85rem 0.65rem',
                      borderRadius: 12,
                      border: paymentType === 'full' ? '2px solid #0284c7' : '1.5px solid #cbd5e1',
                      background: paymentType === 'full' ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: paymentType === 'full' ? '0 4px 15px rgba(2, 132, 199, 0.2)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: paymentType === 'full' ? '#0284c7' : '#64748b', display: 'block' }}>
                      FULL PAYMENT
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: paymentType === 'full' ? '#060c2c' : '#334155', display: 'block', marginTop: '0.15rem' }}>
                      ₹{cleanedFullAmount}
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>100% Paid in full</span>
                  </div>

                  {/* CUSTOM AMOUNT OPTION */}
                  <div 
                    onClick={() => handlePaymentTypeChange('custom')}
                    style={{
                      padding: '0.85rem 0.65rem',
                      borderRadius: 12,
                      border: paymentType === 'custom' ? '2px solid #10b981' : '1.5px solid #cbd5e1',
                      background: paymentType === 'custom' ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: paymentType === 'custom' ? '0 4px 15px rgba(16, 185, 129, 0.2)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: paymentType === 'custom' ? '#059669' : '#64748b', display: 'block' }}>
                      CUSTOM AMOUNT
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: paymentType === 'custom' ? '#060c2c' : '#334155', display: 'block', marginTop: '0.15rem' }}>
                      ₹{formData.customAmount || 'Other'}
                    </strong>
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Enter custom ₹</span>
                  </div>
                </div>
              </div>

              {/* CUSTOM AMOUNT INPUT FIELD IF SELECTED */}
              {paymentType === 'custom' && (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                    Enter Custom Amount (₹) *
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 1500"
                    value={formData.customAmount}
                    onChange={e => handleCustomAmountChange(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, border: '2px solid #10b981', fontSize: '1.05rem', fontWeight: 700, color: '#060c2c' }}
                  />
                </div>
              )}

              {/* CUSTOMER CONTACT FIELDS */}
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

              {/* ENCRYPTED GATEWAY GUARANTEE */}
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Lock size={18} color="#0284c7" />
                <span style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                  Secured by <strong>256-Bit SSL Payment Encryption</strong>. Supports UPI, Google Pay, PhonePe, Cards & NetBanking.
                </span>
              </div>

              {/* PAY BUTTON WITH CARD EMOJI */}
              <button 
                type="submit" 
                disabled={isProcessing}
                className="button" 
                style={{ 
                  width: '100%', 
                  padding: '0.95rem 1.25rem', 
                  fontSize: '1.05rem', 
                  fontWeight: 900, 
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)', 
                  border: 'none', 
                  borderRadius: 12,
                  color: '#060c2c',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.25rem',
                  boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)'
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing Payment Gateway...
                  </>
                ) : (
                  <>
                    Pay ₹{formData.amount} 💳 <ArrowRight size={18} />
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
              Thank you {receipt.name}. Your booking payment of <strong>₹{receipt.amount}</strong> has been received successfully.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 14, border: '1px solid #e2e8f0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Transaction ID:</span>
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{receipt.txnid}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Payment Type:</span>
                <strong style={{ color: '#0284c7' }}>{receipt.type}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Service:</span>
                <strong style={{ color: '#0f172a' }}>{receipt.service}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Amount Paid:</span>
                <strong style={{ color: '#16a34a', fontSize: '1.1rem' }}>₹{receipt.amount}</strong>
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
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10 }}
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
