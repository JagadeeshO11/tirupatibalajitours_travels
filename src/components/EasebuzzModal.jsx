import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CreditCard, CheckCircle2, Lock, ArrowRight, Loader2, Car, Calendar, MapPin, Route, Tag, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getEasebuzzConfig, generateTransactionId, calculateEasebuzzHash } from '../services/easebuzzService';
import { packageDetails } from '../data/packageDetails';
import { getVehicleInfo } from '../data/packageData';
import './BookingForm.css';

const vehicleOptionsList = [
  'Swift Dzire / Etios (Sedan 4-Seater) — ₹2,880 (Local 8h) / ₹15/km',
  'Maruti Ertiga (MUV 6-Seater) — ₹3,380 (Local 8h) / ₹19/km',
  'Toyota Innova Crysta (SUV 7-Seater) — ₹4,380 (Local 8h) / ₹23/km',
  'Toyota Hycross (Hybrid MUV 7-Seater) — ₹6,100 (Local 8h) / ₹32/km',
  'Toyota Fortuner (Luxury SUV 7-Seater) — ₹8,800 (Local 8h) / ₹43/km',
  'Tempo Traveller 12 Seater (12-Seater AC) — ₹5,100 (Local 8h) / ₹26/km',
  'Urbania 12 Seater (Luxury 12-Seater AC) — ₹10,000 (Local 8h) / ₹45/km',
  'Tempo Traveller 16 Seater (16-Seater AC) — ₹6,800 (Local 8h) / ₹35/km',
  'Urbania 16 Seater (Luxury 16-Seater AC) — ₹12,000 (Local 8h) / ₹48/km',
  'Tempo Traveller 20 Seater (20-Seater AC) — ₹9,000 (Local 8h) / ₹45/km',
  'Mini Bus 27 Seater (27-Seater AC Coach) — ₹12,000 (Local 8h) / ₹55/km',
  'Bus 40 Seater (40-Seater Tourist Coach) — ₹15,200 (Local 8h) / ₹65/km',
  'Bus 45 Seater (45-Seater Volvo/Deluxe Bus) — ₹18,000 (Local 8h) / ₹75/km'
];

export function getBestMatchingVehicleOption(inputStr, availableOptions) {
  if (!inputStr || !availableOptions || availableOptions.length === 0) {
    return availableOptions?.[0] || '';
  }

  const exact = availableOptions.find(opt => opt === inputStr);
  if (exact) return exact;

  const cleanInput = inputStr.toLowerCase();

  const inclusion = availableOptions.find(opt => {
    const cleanOpt = opt.toLowerCase();
    return cleanOpt.includes(cleanInput) || cleanInput.includes(cleanOpt);
  });
  if (inclusion) return inclusion;

  if (cleanInput.includes('fortuner')) {
    return availableOptions.find(o => o.toLowerCase().includes('fortuner')) || availableOptions[0];
  }
  if (cleanInput.includes('hycross')) {
    return availableOptions.find(o => o.toLowerCase().includes('hycross')) || availableOptions[0];
  }
  if (cleanInput.includes('crysta') || cleanInput.includes('innova')) {
    return availableOptions.find(o => o.toLowerCase().includes('crysta') || o.toLowerCase().includes('innova')) || availableOptions[0];
  }
  if (cleanInput.includes('ertiga')) {
    return availableOptions.find(o => o.toLowerCase().includes('ertiga')) || availableOptions[0];
  }
  if (cleanInput.includes('urbania 16') || cleanInput.includes('urbania (16') || cleanInput.includes('16-seater urbania')) {
    return availableOptions.find(o => o.toLowerCase().includes('urbania 16') || o.toLowerCase().includes('urbania (16')) || availableOptions[0];
  }
  if (cleanInput.includes('urbania')) {
    return availableOptions.find(o => o.toLowerCase().includes('urbania 12') || o.toLowerCase().includes('urbania')) || availableOptions[0];
  }
  if (cleanInput.includes('20 seater') || cleanInput.includes('20-seater')) {
    return availableOptions.find(o => o.toLowerCase().includes('20 seater') || o.toLowerCase().includes('20-seater')) || availableOptions[0];
  }
  if (cleanInput.includes('16 seater') || cleanInput.includes('16-seater')) {
    return availableOptions.find(o => o.toLowerCase().includes('16 seater') || o.toLowerCase().includes('16-seater')) || availableOptions[0];
  }
  if (cleanInput.includes('12 seater') || cleanInput.includes('12-seater')) {
    return availableOptions.find(o => o.toLowerCase().includes('12 seater') || o.toLowerCase().includes('12-seater')) || availableOptions[0];
  }
  if (cleanInput.includes('45 seater') || cleanInput.includes('45-seater')) {
    return availableOptions.find(o => o.toLowerCase().includes('45 seater') || o.toLowerCase().includes('45-seater')) || availableOptions[0];
  }
  if (cleanInput.includes('40 seater') || cleanInput.includes('40-seater')) {
    return availableOptions.find(o => o.toLowerCase().includes('40 seater') || o.toLowerCase().includes('40-seater')) || availableOptions[0];
  }
  if (cleanInput.includes('27 seater') || cleanInput.includes('mini bus')) {
    return availableOptions.find(o => o.toLowerCase().includes('27 seater') || o.toLowerCase().includes('mini bus')) || availableOptions[0];
  }
  if (cleanInput.includes('sedan') || cleanInput.includes('etios') || cleanInput.includes('dzire')) {
    return availableOptions.find(o => o.toLowerCase().includes('dzire') || o.toLowerCase().includes('etios') || o.toLowerCase().includes('sedan')) || availableOptions[0];
  }

  return availableOptions[0];
}

export default function EasebuzzModal({ isOpen, onClose, initialData = {}, modalClassName = '' }) {
  const { recordPayment, addQuery } = useData();

  const fixedAdvanceAmount = '1000';
  const [step, setStep] = useState(1);

  // Identify booking context type: 'tour' | 'vehicle' | 'route' | 'general'
  const serviceName = initialData.service || initialData.name || initialData.title || '';
  const matchedPkg = packageDetails[serviceName] || packageDetails[initialData.name];

  const tourPrices = initialData.prices || matchedPkg?.prices || [];
  const durationText = initialData.duration || (serviceName.includes('Days') || serviceName.includes('Day') ? serviceName.match(/\d+\s*Days?/i)?.[0] : null);
  const routeText = initialData.route || initialData.routeCorridor;

  const isTourBooking = initialData.type === 'tour' || (tourPrices.length > 0 && !initialData.local && !initialData.outstation);
  const isVehicleBooking = initialData.type === 'vehicle' || Boolean(initialData.local || initialData.outstation || initialData.localLong);
  const isRouteBooking = initialData.type === 'route' || Boolean(initialData.routeName || (initialData.from && initialData.to));

  const bookingType = initialData.type || (
    isTourBooking ? 'tour' :
    isVehicleBooking ? 'vehicle' :
    isRouteBooking ? 'route' :
    'general'
  );

  // Vehicle options computation
  const vehicleOptions = tourPrices.length > 0
    ? tourPrices.map(([vName, vPrice]) => `${vName} — ${vPrice}`)
    : (initialData.vehicleOptions || vehicleOptionsList);

  const rawVehicleStr = initialData.vehicle || initialData.service || initialData.name || '';
  const initialVehicle = tourPrices.length > 0
    ? (initialData.vehicle && !initialData.vehicle.includes('—')
        ? (tourPrices.find(([v]) => v.toLowerCase().includes(initialData.vehicle.toLowerCase()))
            ? `${tourPrices.find(([v]) => v.toLowerCase().includes(initialData.vehicle.toLowerCase()))[0]} — ${tourPrices.find(([v]) => v.toLowerCase().includes(initialData.vehicle.toLowerCase()))[1]}`
            : vehicleOptions[0])
        : (initialData.vehicle || vehicleOptions[0]))
    : getBestMatchingVehicleOption(rawVehicleStr, vehicleOptions);

  const [selectedRateKey, setSelectedRateKey] = useState('local');

  const [formData, setFormData] = useState({
    firstname: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    service: serviceName || 'Tirupati Cab Service',
    vehicle: initialVehicle,
    date: initialData.date || new Date().toISOString().split('T')[0],
    pickup: initialData.pickup || initialData.from || 'Tirupati',
    tripType: initialData.tripType || 'One Way',
    amount: fixedAdvanceAmount
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const rawVeh = initialData.vehicle || initialData.service || initialData.name || '';
      const computedVehicle = tourPrices.length > 0
        ? (initialData.vehicle && !initialData.vehicle.includes('—')
            ? (tourPrices.find(([v]) => v.toLowerCase().includes(initialData.vehicle.toLowerCase()))
                ? `${tourPrices.find(([v]) => v.toLowerCase().includes(initialData.vehicle.toLowerCase()))[0]} — ${tourPrices.find(([v]) => v.toLowerCase().includes(initialData.vehicle.toLowerCase()))[1]}`
                : vehicleOptions[0])
            : (initialData.vehicle || vehicleOptions[0]))
        : getBestMatchingVehicleOption(rawVeh, vehicleOptions);

      let initialRateKey = 'local';
      if (initialData.selectedRateKey) {
        initialRateKey = initialData.selectedRateKey;
      } else if (initialData.ratePlan) {
        const rpLower = initialData.ratePlan.toLowerCase();
        if (rpLower.includes('12 h') || rpLower.includes('12-hour') || rpLower.includes('150')) {
          initialRateKey = 'localLong';
        } else if (rpLower.includes('outstation')) {
          initialRateKey = 'outstation';
        }
      }
      setSelectedRateKey(initialRateKey);

      setFormData({
        firstname: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        service: serviceName || 'Tirupati Cab Service',
        vehicle: computedVehicle,
        date: initialData.date || new Date().toISOString().split('T')[0],
        pickup: initialData.pickup || initialData.from || 'Tirupati',
        tripType: initialData.tripType || 'One Way',
        amount: fixedAdvanceAmount
      });
      setReceipt(null);
      setIsProcessing(false);
    }
  }, [isOpen, initialData]);

  // Dynamic vehicle lookup for current selected vehicle in dropdown
  const currentVehicleObj = getVehicleInfo(formData.vehicle);

  const vehicleLocalRate = currentVehicleObj?.local 
    ? currentVehicleObj.local.split('/')[0].trim() 
    : (initialData.local || '₹2,880');

  const vehicleLocalLongRate = currentVehicleObj?.localLong 
    ? currentVehicleObj.localLong.split('/')[0].trim() 
    : (initialData.localLong || '₹3,650');

  const vehicleOutstationRate = currentVehicleObj?.outstation 
    ? currentVehicleObj.outstation 
    : (initialData.outstation || '₹15/km');

  const rawMin = currentVehicleObj?.minimum || initialData.minimum || '300 km/day';
  const vehicleMinKm = rawMin.toLowerCase().startsWith('min') ? rawMin : `Min ${rawMin}`;

  const ratePlanOptions = [
    { key: 'local', label: `Local 8 Hours / 80 Km (${vehicleLocalRate})`, val: `Local 8 Hours / 80 Km (${vehicleLocalRate})` },
    { key: 'localLong', label: `Local 12 Hours / 150 Km (${vehicleLocalLongRate})`, val: `Local 12 Hours / 150 Km (${vehicleLocalLongRate})` },
    { key: 'outstation', label: `Outstation Trip (${vehicleOutstationRate} • ${vehicleMinKm})`, val: `Outstation Trip (${vehicleOutstationRate} • ${vehicleMinKm})` }
  ];

  const activeRateOption = ratePlanOptions.find(opt => opt.key === selectedRateKey) || ratePlanOptions[0];

  const dynamicRatePlan = bookingType === 'tour' 
    ? 'Fixed Tour Package Tariff' 
    : (bookingType === 'vehicle' ? activeRateOption.val : 'Standard Trip Tariff');

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
      productinfo: `${formData.service} (${formData.vehicle} - ${dynamicRatePlan})`,
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
        productinfo: `${formData.service} - ${formData.vehicle} [${dynamicRatePlan}]`,
        mode: 'Online (₹1,000 Advance Token)',
        hash
      });

      addQuery({
        name: formData.firstname,
        phone: formData.phone,
        from: formData.pickup,
        to: formData.service,
        date: formData.date,
        trip: `₹1,000 ADVANCE (${dynamicRatePlan})`,
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
        ratePlan: dynamicRatePlan,
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
      role="presentation" 
      onClick={handleClose}
    >
      <div 
        className="itinerary-modal package-info-modal" 
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
            <div className="booking-step-progress">
              <div className={`booking-step-progress-bar ${step >= 1 ? 'active' : ''}`} />
              <div className={`booking-step-progress-bar ${step >= 2 ? 'active second' : ''}`} />
            </div>

            {step === 1 && (
              <div>
                {/* STEP HEADER BASED ON BOOKING TYPE */}
                <div className="itinerary-modal-header" style={{ marginBottom: '1.1rem' }}>
                  <div>
                    <p style={{ color: '#0284c7', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {bookingType === 'tour' ? 'TOUR PACKAGE BOOKING' : bookingType === 'vehicle' ? 'VEHICLE RENTAL' : bookingType === 'route' ? 'OUTSTATION CAB ROUTE' : 'CAB BOOKING'}
                    </p>
                    <h3 style={{ fontSize: '1.25rem', color: '#060c2c', margin: 0, fontWeight: 800 }}>
                      {bookingType === 'vehicle' ? `${currentVehicleObj?.name || formData.vehicle} Rental` : formData.service}
                    </h3>
                  </div>
                </div>

                {/* CONTEXT 1: TOUR PACKAGE DETAILS BANNER */}
                {bookingType === 'tour' && (
                  <div style={{ background: '#f0f9ff', padding: '0.75rem 1rem', borderRadius: 14, border: '1.5px solid #0284c7', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={15} /> Tour Duration: <strong style={{ color: '#060c2c' }}>{durationText || '1 Day'}</strong>
                      </span>
                      <span style={{ fontSize: '0.68rem', background: '#0284c7', color: '#ffffff', padding: '3px 9px', borderRadius: 12, fontWeight: 800 }}>
                        FIXED TOUR TARIFF
                      </span>
                    </div>
                    {routeText && (
                      <p style={{ fontSize: '0.78rem', color: '#334155', margin: '3px 0 0 0', lineHeight: 1.35 }}>
                        <strong>📍 Corridor:</strong> {routeText}
                      </p>
                    )}
                    <span style={{ fontSize: '0.72rem', color: '#166534', background: '#dcfce7', padding: '3px 8px', borderRadius: 6, fontWeight: 700, marginTop: '4px', display: 'inline-block', width: 'fit-content' }}>
                      ✔ Tolls, Parking, State Permits & Driver Batta Included
                    </span>
                  </div>
                )}

                <form onSubmit={handleNextToStep2} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {/* VEHICLE / TARIFF SELECTION (Only shown when booking general cabs or tour packages where vehicle is not fixed) */}
                  {bookingType !== 'vehicle' && !initialData.vehicle && (
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        {bookingType === 'tour' ? 'Select Vehicle & Fixed Package Tariff *' : 'Select Vehicle Category *'}
                      </label>
                      <select 
                        value={formData.vehicle}
                        onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, border: '1.5px solid #0284c7', fontSize: '0.9rem', fontWeight: 700, color: '#060c2c', background: '#ffffff' }}
                      >
                        {vehicleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* USER CONTACT DETAILS */}
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
              /* STEP 2: SUMMARY & ADVANCE PAYMENT */
              <div>
                <div className="itinerary-modal-header" style={{ marginBottom: '1.1rem' }}>
                  <div>
                    <p style={{ color: '#d97706', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase' }}>STEP 2 OF 2 · ADVANCE PAYMENT</p>
                    <h3 style={{ fontSize: '1.25rem', color: '#060c2c', margin: 0, fontWeight: 800 }}>Confirm & Lock Booking</h3>
                  </div>
                </div>

                <form onSubmit={handleSubmitPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* SUMMARY BOX */}
                  <div style={{ background: '#f8fafc', padding: '0.9rem 1rem', borderRadius: 14, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Customer:</span>
                      <strong style={{ color: '#060c2c' }}>{formData.firstname} ({formData.phone})</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Service / Tour:</span>
                      <strong style={{ color: '#060c2c' }}>{formData.service}</strong>
                    </div>

                    {durationText && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                        <span style={{ color: '#64748b' }}>Total Duration:</span>
                        <strong style={{ color: '#0284c7', fontWeight: 800 }}>⏱️ {durationText}</strong>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Selected Vehicle:</span>
                      <strong style={{ color: '#d97706', fontWeight: 800 }}>{formData.vehicle}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.4rem' }}>
                      <span style={{ color: '#64748b' }}>Trip / Rate Type:</span>
                      <strong style={{ 
                        color: '#d97706', 
                        background: '#fffdf5', 
                        padding: '3px 10px', 
                        borderRadius: 20, 
                        border: '1.5px solid #fde68a',
                        fontSize: '0.82rem',
                        fontWeight: 900
                      }}>
                        {dynamicRatePlan}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Date & Pickup:</span>
                      <strong style={{ color: '#060c2c' }}>{formData.date} · {formData.pickup}</strong>
                    </div>
                  </div>

                  {/* ADVANCE TOKEN BOX */}
                  <div style={{ background: '#fffdf5', padding: '1rem', borderRadius: 14, border: '2px solid #f59e0b', textAlign: 'center', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', display: 'block', letterSpacing: '0.05em' }}>
                      ADVANCE BOOKING TOKEN
                    </span>
                    <strong style={{ fontSize: '1.8rem', color: '#060c2c', display: 'block', margin: '0.2rem 0' }}>
                      ₹1,000
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4, display: 'block' }}>
                      Fixed advance deposit to lock your cab & driver. Remaining balance payable directly to driver.
                    </span>
                  </div>

                  {/* ENCRYPTED GATEWAY GUARANTEE */}
                  <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Lock size={18} color="#0284c7" />
                    <span style={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.35 }}>
                      Secured by <strong>256-Bit SSL Payment Encryption</strong>. Supports UPI, Google Pay, PhonePe, Cards & NetBanking.
                    </span>
                  </div>

                  {/* ACTION BUTTONS */}
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
