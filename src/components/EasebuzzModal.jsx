import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CreditCard, CheckCircle2, Lock, ArrowRight, Loader2, Car, Calendar, MapPin, User, Phone as PhoneIcon, Mail, ArrowLeft, Tag } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getEasebuzzConfig, generateTransactionId, calculateEasebuzzHash } from '../services/easebuzzService';
import { packageDetails } from '../data/packageDetails';
import './BookingForm.css';

const vehicleOptionsList = [
  'Swift Dzire / Etios (Sedan 4-Seater)',
  'Maruti Ertiga (MUV 6-Seater)',
  'Toyota Innova Crysta (SUV 7-Seater)',
  'Toyota Hycross (Hybrid MUV 7-Seater)',
  'Toyota Fortuner (Luxury SUV 7-Seater)',
  'Tempo Traveller (12 / 17 Seater)',
  'Force Urbania (12 / 16 Seater)',
  'Luxury Bus (27 / 40 / 50 Seater)'
];

const categoryVehiclesMap = {
  tempo: [
    'Tempo Traveller 12 Seater (AC)',
    'Tempo Traveller 16 Seater (AC)',
    'Tempo Traveller 20 Seater (AC)'
  ],
  urbania: [
    'Force Urbania Luxury (12-Seater AC)',
    'Force Urbania Executive (16-Seater AC)'
  ],
  bus: [
    'Mini Bus Coach (27-Seater AC)',
    'Deluxe Tourist Bus (40-Seater AC)',
    'Volvo Multi-Axle Bus (45-Seater AC)'
  ],
  cars: [
    'Swift Dzire / Etios (Sedan 4-Seater)',
    'Maruti Ertiga (MUV 6-Seater)',
    'Toyota Innova Crysta (SUV 7-Seater)',
    'Toyota Hycross (Hybrid MUV 7-Seater)',
    'Toyota Fortuner (Luxury SUV 7-Seater)'
  ]
};

const ratePlanOptions = [
  { key: 'Local 8h / 80km', label: 'Local 8 Hours / 80 Km' },
  { key: 'Local 12h / 150km', label: 'Local 12 Hours / 150 Km' },
  { key: 'Outstation', label: 'Outstation (Min 300km/day)' }
];

export default function EasebuzzModal({ isOpen, onClose, initialData = {}, modalClassName = '' }) {
  const { recordPayment, addQuery } = useData();

  const fixedAdvanceAmount = '1000';

  const [step, setStep] = useState(1);

  const packagePrices = initialData.prices || packageDetails[initialData.service]?.prices || packageDetails[initialData.name]?.prices || [];
  const durationText = initialData.duration || packageDetails[initialData.service]?.duration || (initialData.service?.includes('Days') || initialData.service?.includes('Day') ? initialData.service.match(/\d+\s*Days?/i)?.[0] : null);

  const activeCategory = initialData.category || 
    (initialData.slug === 'tempo-traveller-rental-in-tirupati' ? 'tempo' :
     initialData.slug === 'urbania-traveller-rental-in-tirupati' ? 'urbania' :
     initialData.slug === 'bus-rental-in-tirupati' ? 'bus' :
     (initialData.slug === 'car-rentals-in-tirupati' || initialData.slug === 'car-for-rent-in-tirupati-day-rentals') ? 'cars' :
     (initialData.service || initialData.name || '').toLowerCase().includes('tempo') ? 'tempo' :
     (initialData.service || initialData.name || '').toLowerCase().includes('urbania') ? 'urbania' :
     (initialData.service || initialData.name || '').toLowerCase().includes('bus') ? 'bus' :
     (initialData.service || initialData.name || '').toLowerCase().includes('car') ? 'cars' : null);

  const customVehicleOptions = initialData.vehicleOptions ||
    (activeCategory && categoryVehiclesMap[activeCategory] ? categoryVehiclesMap[activeCategory] :
     packagePrices.length > 0 ? packagePrices.map(([vName, vPrice]) => `${vName} — ${vPrice}`) :
     vehicleOptionsList);

  const initialVehicle = initialData.vehicle || customVehicleOptions[0];

  const [formData, setFormData] = useState({
    firstname: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    service: initialData.service || 'Tirupati Cab Booking',
    vehicle: initialVehicle,
    ratePlan: initialData.ratePlan || (initialData.service?.includes('12h') ? 'Local 12 Hours / 150 Km' : initialData.service?.includes('Outstation') ? 'Outstation Trip' : 'Local 8 Hours / 80 Km'),
    date: initialData.date || new Date().toISOString().split('T')[0],
    pickup: initialData.pickup || initialData.from || 'Tirupati',
    amount: fixedAdvanceAmount
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const isVehicleCardContext = Boolean(
    initialData.vehicle && !initialData.isHero
  );

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const detectedRatePlan = initialData.ratePlan || (
        initialData.service?.toLowerCase().includes('12h') || initialData.service?.toLowerCase().includes('12 hrs') ? 'Local 12 Hours / 150 Km' :
        initialData.service?.toLowerCase().includes('outstation') ? 'Outstation Trip' :
        'Local 8 Hours / 80 Km'
      );

      const computedVehicle = initialData.vehicle || customVehicleOptions[0];

      setFormData({
        firstname: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        service: initialData.service || 'Tirupati Cab Booking',
        vehicle: computedVehicle,
        ratePlan: detectedRatePlan,
        date: initialData.date || new Date().toISOString().split('T')[0],
        pickup: initialData.pickup || initialData.from || 'Tirupati',
        amount: fixedAdvanceAmount
      });
      setReceipt(null);
      setIsProcessing(false);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextToStep2 = (e) => {
    e.preventDefault();
    if (!formData.firstname.trim() || !formData.phone.trim() || !formData.date || !formData.pickup.trim()) {
      alert('Please fill in all required fields (Name, Phone, Date, Pickup Location).');
      return;
    }
    setStep(2);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const config = getEasebuzzConfig();
    const txnid = generateTransactionId();
    const easebuzzId = `EZB_${Date.now()}`;
    const hash = calculateEasebuzzHash({
      key: config.merchantKey,
      txnid,
      amount: fixedAdvanceAmount,
      productinfo: `${formData.service} (${formData.vehicle} - ${formData.ratePlan})`,
      firstname: formData.firstname,
      email: formData.email || 'customer@tirupatibalajitours.com',
      salt: config.salt
    });

    setTimeout(() => {
      recordPayment({
        txnid,
        easebuzzId,
        firstname: formData.firstname,
        email: formData.email || 'customer@tirupatibalajitours.com',
        phone: formData.phone,
        amount: Number(fixedAdvanceAmount),
        productinfo: `${formData.service} - ${formData.vehicle} [${formData.ratePlan}]`,
        mode: 'Online (₹1,000 Advance Token)',
        hash
      });

      addQuery({
        name: formData.firstname,
        phone: formData.phone,
        from: formData.pickup,
        to: formData.service,
        date: formData.date,
        trip: `₹1,000 ADVANCE PAYMENT (${formData.ratePlan})`,
        vehicle: formData.vehicle,
        status: 'Confirmed'
      });

      setIsProcessing(false);
      setReceipt({
        txnid,
        easebuzzId,
        amount: fixedAdvanceAmount,
        service: formData.service,
        vehicle: formData.vehicle,
        ratePlan: formData.ratePlan,
        name: formData.firstname,
        phone: formData.phone,
        pickup: formData.pickup,
        date: formData.date,
        time: new Date().toLocaleString()
      });
    }, 1400);
  };

  const handleClose = () => {
    setReceipt(null);
    setIsProcessing(false);
    setStep(1);
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return createPortal(
    <div 
      className={`itinerary-overlay booking-payment-overlay ${modalClassName}`.trim()} 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', padding: '20px 12px' }} 
      role="presentation" 
      onClick={handleClose}
    >
      <div 
        className="itinerary-modal package-info-modal" 
        style={{ maxWidth: 540, width: '100%', padding: '1.5rem', borderRadius: 24, margin: 'auto', maxHeight: '92vh', overflowY: 'auto' }}
        role="dialog" 
        aria-modal="true" 
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="itinerary-close" aria-label="Close" onClick={handleClose}>
          <X size={20} />
        </button>

        {!receipt ? (
          <>
            {/* STEP PROGRESS BAR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <div 
                style={{ 
                  flex: 1, 
                  height: 6, 
                  borderRadius: 4, 
                  background: step >= 1 ? 'linear-gradient(90deg, #0284c7, #0369a1)' : '#e2e8f0' 
                }} 
              />
              <div 
                style={{ 
                  flex: 1, 
                  height: 6, 
                  borderRadius: 4, 
                  background: step >= 2 ? 'linear-gradient(90deg, #d97706, #f59e0b)' : '#e2e8f0' 
                }} 
              />
            </div>

            {step === 1 && (
              /* STEP 1: VEHICLE SELECTION, TRIP TYPE & CONTACT DETAILS */
              <div>
                <div className="itinerary-modal-header" style={{ marginBottom: '1.1rem' }}>
                  <span className="itinerary-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                    <Car size={22} />
                  </span>
                  <div>
                    <p style={{ color: '#0284c7', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>STEP 1 OF 2 · BOOKING DETAILS</p>
                    <h3 style={{ fontSize: '1.3rem', color: '#060c2c', margin: 0 }}>Select Vehicle & Trip Type</h3>
                  </div>
                </div>

                {durationText && (
                  <div style={{ background: '#f0f9ff', padding: '0.65rem 1rem', borderRadius: 12, border: '1.5px solid #0284c7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} /> Total Duration: <strong style={{ color: '#060c2c', fontSize: '0.95rem' }}>{durationText}</strong>
                    </span>
                    <span style={{ fontSize: '0.7rem', background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: 12, fontWeight: 800, letterSpacing: '0.5px' }}>
                      TOUR PACKAGE
                    </span>
                  </div>
                )}

                <form onSubmit={handleNextToStep2} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {/* VEHICLE SELECTION */}
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                      {packagePrices.length > 0 ? 'Select Vehicle & Package Tariff *' : 'Select Vehicle *'}
                    </label>
                    {isVehicleCardContext ? (
                      <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 10, border: '1.5px solid #0284c7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Car size={18} color="#0284c7" />
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#060c2c' }}>{formData.vehicle}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 12, fontWeight: 800 }}>Pre-selected</span>
                      </div>
                    ) : (
                      <select 
                        value={formData.vehicle}
                        onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1.5px solid #0284c7', fontSize: '0.9rem', fontWeight: 700, color: '#060c2c', background: '#ffffff' }}
                      >
                        {customVehicleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* RATE PLAN / TRIP TYPE SELECTOR */}
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                      Select Trip / Rate Plan *
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                      {ratePlanOptions.map(plan => (
                        <button
                          key={plan.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, ratePlan: plan.label })}
                          style={{
                            padding: '0.6rem 0.4rem',
                            borderRadius: 10,
                            border: formData.ratePlan === plan.label ? '2px solid #d97706' : '1.5px solid #cbd5e1',
                            background: formData.ratePlan === plan.label ? '#fffdf5' : '#ffffff',
                            color: formData.ratePlan === plan.label ? '#d97706' : '#475569',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: formData.ratePlan === plan.label ? '0 4px 12px rgba(217, 119, 6, 0.2)' : 'none'
                          }}
                        >
                          {plan.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FULL NAME */}
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.firstname}
                      onChange={e => setFormData({ ...formData, firstname: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                    />
                  </div>

                  {/* PHONE & EMAIL (OPTIONAL) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Email ID <small style={{ color: '#94a3b8', fontWeight: 500 }}>(Optional)</small>
                      </label>
                      <input 
                        type="email" 
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>

                  {/* TRAVEL DATE & PICKUP LOCATION */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Travel Date *
                      </label>
                      <input 
                        type="date" 
                        required 
                        min={todayStr}
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Pickup Location *
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Tirupati Airport / Hotel"
                        value={formData.pickup}
                        onChange={e => setFormData({ ...formData, pickup: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>

                  {/* NEXT STEP PAY BUTTON */}
                  <button 
                    type="submit" 
                    className="button" 
                    style={{ 
                      width: '100%', 
                      padding: '0.9rem 1.25rem', 
                      fontSize: '1rem', 
                      fontWeight: 900, 
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', 
                      border: 'none', 
                      borderRadius: 12,
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '0.5rem',
                      boxShadow: '0 8px 24px rgba(2, 132, 199, 0.3)'
                    }}
                  >
                    Next Step Pay 💳 <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              /* STEP 2: ADVANCE ₹1,000 COLLECTION PAGE ONLY WITH CLEAR LOCAL / OUTSTATION DISPLAY */
              <div>
                <div className="itinerary-modal-header" style={{ marginBottom: '1.1rem' }}>
                  <span className="itinerary-icon" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#060c2c' }}>
                    <CreditCard size={22} />
                  </span>
                  <div>
                    <p style={{ color: '#d97706', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>STEP 2 OF 2 · ADVANCE PAYMENT</p>
                    <h3 style={{ fontSize: '1.3rem', color: '#060c2c', margin: 0 }}>Adv ₹1,000 Payment Collect</h3>
                  </div>
                </div>

                <form onSubmit={handleSubmitPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* SUMMARY BOX OF STEP 1 DETAILS WITH LOCAL / OUTSTATION TYPE HIGHLIGHT */}
                  <div style={{ background: '#f8fafc', padding: '0.9rem 1rem', borderRadius: 14, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Customer:</span>
                      <strong style={{ color: '#060c2c' }}>{formData.firstname} ({formData.phone})</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Tour / Service:</span>
                      <strong style={{ color: '#060c2c' }}>{formData.service}</strong>
                    </div>

                    {durationText && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                        <span style={{ color: '#64748b' }}>Total Duration:</span>
                        <strong style={{ color: '#0284c7', fontWeight: 800 }}>⏱️ {durationText}</strong>
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Vehicle & Tariff:</span>
                      <strong style={{ color: '#d97706', fontWeight: 800 }}>{formData.vehicle}</strong>
                    </div>

                    {/* CLEAR DISPLAY OF LOCAL 8H / LOCAL 12H / OUTSTATION */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Trip / Rate Type:</span>
                      <strong style={{ 
                        color: '#d97706', 
                        background: '#fffdf5', 
                        padding: '3px 10px', 
                        borderRadius: 20, 
                        border: '1.5px solid #fde68a',
                        fontSize: '0.85rem',
                        fontWeight: 900
                      }}>
                        🚕 {formData.ratePlan}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Date & Pickup:</span>
                      <strong style={{ color: '#060c2c' }}>{formData.date} · {formData.pickup}</strong>
                    </div>
                  </div>

                  {/* ADVANCE ₹1,000 PAYMENT ONLY BOX */}
                  <div style={{ background: '#fffdf5', padding: '1rem', borderRadius: 14, border: '2px solid #f59e0b', textAlign: 'center', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', display: 'block', letterSpacing: '0.05em' }}>
                      ADVANCE BOOKING TOKEN
                    </span>
                    <strong style={{ fontSize: '1.8rem', color: '#060c2c', display: 'block', margin: '0.2rem 0' }}>
                      ₹1,000
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4, display: 'block' }}>
                      Fixed advance payment to confirm your cab booking. Remaining balance is payable to driver.
                    </span>
                  </div>

                  {/* ENCRYPTED GATEWAY GUARANTEE */}
                  <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Lock size={18} color="#0284c7" />
                    <span style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.35 }}>
                      Secured by <strong>256-Bit SSL Payment Encryption</strong>. Supports UPI, Google Pay, PhonePe, Cards & NetBanking.
                    </span>
                  </div>

                  {/* ACTION BUTTONS (BACK & PAY) */}
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      style={{ padding: '0.85rem 1rem', borderRadius: 12, border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#475569', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ArrowLeft size={16} /> Step 1
                    </button>

                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="button" 
                      style={{ 
                        flex: 1, 
                        padding: '0.85rem 1rem', 
                        fontSize: '1rem', 
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
                        boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)'
                      }}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          Pay ₹1,000 Advance 💳 <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        ) : (
          /* PAYMENT SUCCESS RECEIPT */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: 64, height: 64, background: '#dcfce7', borderRadius: '50%', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.35rem' }}>
              Advance Booking Confirmed!
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Thank you <strong>{receipt.name}</strong>. Your advance payment of <strong>₹1,000</strong> has been received successfully.
            </p>

            <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: 14, border: '1px solid #e2e8f0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Transaction ID:</span>
                <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{receipt.txnid}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Vehicle:</span>
                <strong style={{ color: '#0284c7' }}>{receipt.vehicle}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Trip / Rate Type:</span>
                <strong style={{ color: '#d97706' }}>{receipt.ratePlan}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Pickup Point:</span>
                <strong style={{ color: '#0f172a' }}>{receipt.pickup}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Advance Paid:</span>
                <strong style={{ color: '#16a34a', fontSize: '1.05rem' }}>₹1,000</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Date & Time:</span>
                <span style={{ color: '#475569' }}>{receipt.time}</span>
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
    </div>,
    document.body
  );
}
