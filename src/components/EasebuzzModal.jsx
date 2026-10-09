import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CreditCard, CheckCircle2, AlertCircle, Lock, ArrowRight, Loader2, Car, Calendar, MapPin, Route, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getEasebuzzConfig, generateTransactionId, calculateEasebuzzHash } from '../services/easebuzzService';
import { packageDetails } from '../data/packageDetails';
import { cabRoutes } from '../data/cabRoutes';
import { getVehicleInfo } from '../data/packageData';
import { whatsappBooking } from '../data/siteData';
import './BookingForm.css';

const vehicleOptionsList = [
  'Sedan (4 Seater)',
  'Ertiga (6 Seater)',
  'Innova Crysta (7 Seater)',
  'Hycross (7 Seater)',
  'Fortuner (7 Seater)',
  'Tempo Traveller 12 Seater',
  'Urbania 12 Seater',
  'Tempo Traveller 16 Seater',
  'Urbania 16 Seater',
  'Tempo Traveller 20 Seater',
  'Mini Bus 27 Seater',
  'Bus 40 Seater',
  'Bus 45 Seater'
];

export const carOnlyOptions = [
  'Sedan (4 Seater)',
  'Ertiga (6 Seater)',
  'Innova Crysta (7 Seater)',
  'Hycross (7 Seater)',
  'Fortuner (7 Seater)'
];

export const tempoOnlyOptions = [
  'Tempo Traveller 12 Seater',
  'Tempo Traveller 16 Seater',
  'Tempo Traveller 20 Seater'
];

export const urbaniaOnlyOptions = [
  'Urbania 12 Seater',
  'Urbania 16 Seater'
];

export const busOnlyOptions = [
  'Mini Bus 27 Seater',
  'Bus 40 Seater',
  'Bus 45 Seater'
];

export function getFormattedVehicleOptionLabel(optStr, serviceName = '', selectedRateKey = '') {
  if (!optStr) return '';

  const parts = optStr.split('—').map(s => s.trim());
  const baseName = parts[0];
  const fixedPrice = parts[1] || '';

  const vObj = getVehicleInfo(baseName);
  const fullName = vObj?.name || baseName;

  if (fixedPrice) {
    return `${fullName} — ${fixedPrice}`;
  }

  return fullName;
}

export function getFilteredVehicleOptions(serviceName = '', initialVehicleOptions = null) {
  if (initialVehicleOptions && Array.isArray(initialVehicleOptions) && initialVehicleOptions.length > 0) {
    return initialVehicleOptions;
  }

  const sLower = (serviceName || '').toLowerCase();

  // 1. Car Rentals & Car Hire Pages: STRICTLY LIMIT TO CARS ONLY (Sedan, Ertiga, Crysta, Hycross, Fortuner)
  if (
    sLower.includes('car-rentals') || 
    sLower.includes('car rentals') || 
    sLower.includes('car-rental') || 
    sLower.includes('car rental') || 
    sLower.includes('car-for-rent') || 
    sLower.includes('car for rent') || 
    sLower.includes('car hire') || 
    sLower.includes('day hire') || 
    sLower.includes('day-rentals')
  ) {
    return carOnlyOptions;
  }

  // 2. Specific Vehicle Category Rentals
  if (sLower.includes('urbania')) {
    return urbaniaOnlyOptions;
  }
  if (sLower.includes('tempo traveller') || sLower.includes('tempo rental') || sLower.includes('tempo')) {
    return tempoOnlyOptions;
  }
  if (sLower.includes('bus rental') || sLower.includes('luxury bus') || sLower.includes('bus')) {
    return busOnlyOptions;
  }

  // 3. Outstation Taxi Service: Return FULL fleet without restricting!
  if (sLower.includes('outstation')) {
    return vehicleOptionsList;
  }

  if (
    sLower.includes('taxi service') || 
    sLower.includes('taxi in tirupati') ||
    sLower.includes('sedan') || 
    sLower.includes('ertiga') || 
    sLower.includes('crysta') || 
    sLower.includes('hycross') || 
    sLower.includes('fortuner')
  ) {
    return carOnlyOptions;
  }
  if (sLower.includes('airport taxi') || sLower.includes('airport')) {
    return ['Sedan (4 Seater)', 'Ertiga (6 Seater)', 'Innova Crysta (7 Seater)', 'Tempo Traveller 12 Seater'];
  }

  return vehicleOptionsList;
}

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

  if (cleanInput.includes('urbania')) {
    return availableOptions.find(o => o.toLowerCase().includes('urbania 12') || o.toLowerCase().includes('urbania')) || availableOptions[0];
  }
  if (cleanInput.includes('tempo traveller') || cleanInput.includes('tempo')) {
    return availableOptions.find(o => o.toLowerCase().includes('tempo traveller 12') || o.toLowerCase().includes('tempo')) || availableOptions[0];
  }
  if (cleanInput.includes('luxury bus') || cleanInput.includes('bus rental') || cleanInput.includes('bus')) {
    return availableOptions.find(o => o.toLowerCase().includes('27 seater') || o.toLowerCase().includes('bus')) || availableOptions[0];
  }
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
  if (cleanInput.includes('sedan') || cleanInput.includes('etios') || cleanInput.includes('dzire') || cleanInput.includes('car rental') || cleanInput.includes('airport taxi') || cleanInput.includes('day hire') || cleanInput.includes('taxi service')) {
    return availableOptions.find(o => o.toLowerCase().includes('dzire') || o.toLowerCase().includes('etios') || o.toLowerCase().includes('sedan')) || availableOptions[0];
  }

  return availableOptions[0];
}

export default function EasebuzzModal({ isOpen, onClose, initialData = {}, modalClassName = '' }) {
  const { recordPayment, addQuery } = useData();

  const fixedAdvanceAmount = '1000';
  const [step, setStep] = useState(1);

  // Identify booking context type: 'tour' | 'vehicle' | 'route' | 'general'
  const serviceName = initialData.service || initialData.slug || initialData.name || initialData.title || '';
  const matchedPkg = packageDetails[serviceName] || packageDetails[initialData.name];
  const matchedRoute = cabRoutes.find(r => {
    if (!serviceName) return false;
    const sLower = serviceName.toLowerCase();
    const rTitle = r.title.toLowerCase();
    const rShort = r.shortTitle.toLowerCase();
    const rSlug = r.slug.toLowerCase();
    return sLower.includes(rTitle) || rTitle.includes(sLower) || sLower.includes(rShort) || rShort.includes(sLower) || sLower.includes(rSlug.replace(/-distance$/, ''));
  });

  const tourPrices = initialData.prices || matchedRoute?.prices || matchedPkg?.prices || [];
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

  const isNavbarBooking = initialData.isNavbarBooking === true;

  const sLowerCheck = (initialData.slug || initialData.pageSlug || serviceName || initialData.service || '').toLowerCase();
  const isCustomPackages = sLowerCheck.includes('customized-packages') || sLowerCheck.includes('customized packages') || sLowerCheck.includes('custom quote') || sLowerCheck.includes('custom package');

  const isFixedRouteOrTour = !isNavbarBooking && !isCustomPackages && (
    bookingType === 'route' || 
    bookingType === 'tour' || 
    Boolean(initialData.prices && initialData.prices.length > 0) || 
    Boolean(matchedRoute) || 
    Boolean(matchedPkg) ||
    sLowerCheck.includes('tirupati-cabs') ||
    sLowerCheck.includes('cabs/') ||
    sLowerCheck.includes('srikalahasti') ||
    sLowerCheck.includes('kanipakam') ||
    sLowerCheck.includes('golden-temple') ||
    sLowerCheck.includes('arunachalam') ||
    sLowerCheck.includes('tiruvannamalai') ||
    sLowerCheck.includes('kanchipuram') ||
    sLowerCheck.includes('rameshwaram') ||
    sLowerCheck.includes('srisailam') ||
    sLowerCheck.includes('pondicherry') ||
    sLowerCheck.includes('madurai') ||
    sLowerCheck.includes('kanyakumari') ||
    sLowerCheck.includes('talakona') ||
    sLowerCheck.includes('mahabalipuram')
  );

  // Vehicle options computation: tag package / cab route prices with vehicles or filtered list
  const filteredVehiclesList = getFilteredVehicleOptions(initialData.slug || serviceName, initialData.vehicleOptions);
  const vehicleOptions = (isFixedRouteOrTour && tourPrices.length > 0)
    ? tourPrices.map(([vName, vPrice]) => {
        const vObj = getVehicleInfo(vName);
        const fullName = vObj?.name || vName;
        return `${fullName} — ${vPrice}`;
      })
    : filteredVehiclesList;

  const rawVehicleStr = initialData.vehicle || initialData.service || initialData.name || '';
  const initialVehicle = getBestMatchingVehicleOption(rawVehicleStr, vehicleOptions);

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
      const computedVehicle = getBestMatchingVehicleOption(rawVeh, vehicleOptions);

      let initialRateKey = 'local';
      if (initialData.selectedRateKey) {
        initialRateKey = initialData.selectedRateKey;
      } else if (initialData.ratePlan) {
        const rpLower = initialData.ratePlan.toLowerCase();
        if (rpLower.includes('12 h') || rpLower.includes('12-hour') || rpLower.includes('12h') || rpLower.includes('150')) {
          initialRateKey = 'localLong';
        } else if (rpLower.includes('outstation')) {
          initialRateKey = 'outstation';
        }
      } else if (initialData.service) {
        const sLower = initialData.service.toLowerCase();
        if (sLower.includes('12h') || sLower.includes('12-hour') || sLower.includes('12 h') || sLower.includes('150')) {
          initialRateKey = 'localLong';
        } else if (sLower.includes('outstation')) {
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

  const extraHrText = currentVehicleObj?.extraHr 
    ? `+${currentVehicleObj.extraHr.replace(/\/hr?$/i, '/extra hr')}` 
    : '+extra hr';

  const ratePlanOptions = [
    { 
      key: 'local', 
      title: 'Local 8h / 80km',
      priceTag: vehicleLocalRate, 
      subText: extraHrText,
      val: `Local 8h / 80km — ${vehicleLocalRate} (${extraHrText})` 
    },
    { 
      key: 'localLong', 
      title: 'Local 12h / 150km',
      priceTag: vehicleLocalLongRate, 
      subText: extraHrText,
      val: `Local 12h / 150km — ${vehicleLocalLongRate} (${extraHrText})` 
    },
    { 
      key: 'outstation', 
      title: 'Outstation Trip',
      priceTag: vehicleOutstationRate, 
      subText: vehicleMinKm,
      val: `Outstation — ${vehicleOutstationRate} (${vehicleMinKm})` 
    }
  ];

  const activeRateOption = ratePlanOptions.find(opt => opt.key === selectedRateKey) || ratePlanOptions[0];

  const sLowerContext = (initialData.slug || initialData.pageSlug || formData.service || serviceName || initialData.service || '').toLowerCase();
  const isOutstationTaxi = sLowerContext.includes('outstation');

  const isDedicatedTaxiRentalPage = !isOutstationTaxi && (
    sLowerContext.includes('car-rentals') || sLowerContext.includes('car rentals') ||
    sLowerContext.includes('tempo-traveller') || sLowerContext.includes('tempo traveller') || sLowerContext.includes('tempo rental') ||
    sLowerContext.includes('urbania') ||
    sLowerContext.includes('bus-rental') || sLowerContext.includes('bus rental') || sLowerContext.includes('luxury bus') ||
    sLowerContext.includes('taxi-service') || sLowerContext.includes('taxi service') || sLowerContext.includes('taxi in tirupati') || sLowerContext.includes('taxi-in-tirupati') ||
    sLowerContext.includes('airport-taxi') || sLowerContext.includes('airport taxi') ||
    sLowerContext.includes('car-for-rent') || sLowerContext.includes('day hire') || sLowerContext.includes('day-rentals')
  );

  const isLocalPackages = sLowerContext.includes('local-packages') || sLowerContext.includes('local packages');
  const isBalajiTour = sLowerContext.includes('balaji-darshan') || sLowerContext.includes('balaji darshan') || sLowerContext.includes('balaji') || sLowerContext.includes('tirumala');
  const isStudentPackages = sLowerContext.includes('student-packages') || sLowerContext.includes('student packages');
  const isTourPage = bookingType === 'tour' || isTourBooking || sLowerContext.includes('tour') || sLowerContext.includes('tours') || isBalajiTour || sLowerContext.includes('devotional') || sLowerContext.includes('holiday') || sLowerContext.includes('family') || sLowerContext.includes('wedding');

  const currentRoutePrice = (tourPrices.length > 0)
    ? (tourPrices.find(([vName]) => {
        const vClean = vName.toLowerCase();
        const selClean = (formData.vehicle || '').toLowerCase();
        const selBase = selClean.split('—')[0].trim();
        const vBase = vClean.split('—')[0].trim();
        return vClean.includes(selBase) || selClean.includes(vBase);
      })?.[1] || tourPrices[0]?.[1])
    : initialData.fullAmount || initialData.price || 'Fixed Fare';

  const dynamicRatePlan = isFixedRouteOrTour 
    ? `Fixed Cab Route / Package Tariff (${currentRoutePrice})`
    : activeRateOption.val;

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
                      {bookingType === 'tour' ? 'TOUR PACKAGE BOOKING' : bookingType === 'vehicle' ? 'VEHICLE RENTAL' : bookingType === 'route' ? 'OUTSTATION CAB ROUTE' : 'TAXI SERVICE BOOKING'}
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
                  </div>
                )}

                <form onSubmit={handleNextToStep2} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {/* VEHICLE SELECTION & CONTEXT-BASED RATE CONTROLS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                        Vehicles & Buses Fare Rates *
                      </label>
                      <select 
                        value={formData.vehicle}
                        onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.6rem', borderRadius: 10, border: '1.5px solid #0284c7', fontSize: '0.85rem', fontWeight: 800, color: '#060c2c', background: '#ffffff' }}
                      >
                        {vehicleOptions.map(opt => (
                          <option key={opt} value={opt}>
                            {getFormattedVehicleOptionLabel(opt, `${initialData.slug || ''} ${initialData.pageSlug || ''} ${initialData.pageTitle || ''} ${formData.service || ''} ${serviceName || ''}`, selectedRateKey)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* RATE CONTROLS: CUSTOM PACKAGE BANNER, FIXED ROUTE TARIFF CARD FOR CAB ROUTES / TOURS, OR LOCAL/OUTSTATION SELECTION FOR TAXI RENTALS */}
                    {isCustomPackages ? (
                      <div style={{ background: '#f0fdf4', padding: '0.75rem 1rem', borderRadius: 12, border: '1.5px solid #86efac', marginTop: '0.35rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            ✨ Customized Tour Package:
                          </span>
                          <span style={{ fontSize: '0.68rem', background: '#166534', color: '#ffffff', padding: '3px 9px', borderRadius: 12, fontWeight: 800 }}>
                            INSTANT QUOTE
                          </span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: '#166534', margin: 0, lineHeight: 1.35 }}>
                          Share your travel dates, pickup location & places to visit. Receive a 100% customized route itinerary & custom fare quote on WhatsApp!
                        </p>
                      </div>
                    ) : isFixedRouteOrTour ? (
                      <div style={{ background: '#fffdf5', padding: '0.75rem 1rem', borderRadius: 12, border: '1.5px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          📍 Fixed Cab Route / Package Fare:
                        </span>
                        <strong style={{ fontSize: '1.15rem', color: '#060c2c', fontWeight: 900 }}>
                          {currentRoutePrice}
                        </strong>
                      </div>
                    ) : (
                      <div style={{ marginTop: '0.2rem' }}>
                        <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                          Select Trip & Rate Plan *
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedRateKey('local')}
                            style={{
                              padding: '0.65rem 0.25rem',
                              borderRadius: 10,
                              border: selectedRateKey === 'local' ? '2px solid #0284c7' : '1.5px solid #cbd5e1',
                              background: selectedRateKey === 'local' ? '#f0f9ff' : '#f8fafc',
                              color: selectedRateKey === 'local' ? '#0369a1' : '#334155',
                              fontWeight: 800,
                              fontSize: '0.74rem',
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div>Local 8h / 80km</div>
                            <b style={{ color: '#060c2c', fontSize: '0.85rem', display: 'block', margin: '3px 0 1px' }}>{vehicleLocalRate}</b>
                            <small style={{ color: '#d97706', fontSize: '0.66rem', display: 'block', fontWeight: 700 }}>{extraHrText}</small>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedRateKey('localLong')}
                            style={{
                              padding: '0.65rem 0.25rem',
                              borderRadius: 10,
                              border: selectedRateKey === 'localLong' ? '2px solid #0284c7' : '1.5px solid #cbd5e1',
                              background: selectedRateKey === 'localLong' ? '#f0f9ff' : '#f8fafc',
                              color: selectedRateKey === 'localLong' ? '#0369a1' : '#334155',
                              fontWeight: 800,
                              fontSize: '0.74rem',
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div>Local 12h / 150km</div>
                            <b style={{ color: '#060c2c', fontSize: '0.85rem', display: 'block', margin: '3px 0 1px' }}>{vehicleLocalLongRate}</b>
                            <small style={{ color: '#d97706', fontSize: '0.66rem', display: 'block', fontWeight: 700 }}>{extraHrText}</small>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedRateKey('outstation')}
                            style={{
                              padding: '0.65rem 0.25rem',
                              borderRadius: 10,
                              border: selectedRateKey === 'outstation' ? '2px solid #0284c7' : '1.5px solid #cbd5e1',
                              background: selectedRateKey === 'outstation' ? '#f0f9ff' : '#f8fafc',
                              color: selectedRateKey === 'outstation' ? '#0369a1' : '#334155',
                              fontWeight: 800,
                              fontSize: '0.74rem',
                              cursor: 'pointer',
                              textAlign: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div>Outstation Trip</div>
                            <b style={{ color: '#060c2c', fontSize: '0.85rem', display: 'block', margin: '3px 0 1px' }}>{vehicleOutstationRate}</b>
                            <small style={{ color: '#d97706', fontSize: '0.66rem', display: 'block', fontWeight: 700 }}>{vehicleMinKm}</small>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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

                  {isCustomPackages ? (
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (!formData.firstname.trim() || !formData.phone.trim() || !formData.date || !formData.pickup.trim()) {
                          alert('Please fill in required fields (Name, Phone, Date, Pickup Location).');
                          return;
                        }
                        const msg = `Hi, I would like to request a Custom Package Quote.\nName: ${formData.firstname}\nPhone: ${formData.phone}\nDate: ${formData.date}\nPickup Point: ${formData.pickup}\nSelected Vehicle: ${formData.vehicle}`;
                        window.open(whatsappBooking(msg), '_blank', 'noopener,noreferrer');
                        handleClose();
                      }}
                      className="button" 
                      style={{ 
                        width: '100%', 
                        padding: '0.9rem 1.25rem', 
                        fontSize: '1rem', 
                        fontWeight: 900, 
                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', 
                        border: 'none', 
                        borderRadius: 12,
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)'
                      }}
                    >
                      <MessageCircle size={18} /> Send Quote Enquiry on WhatsApp 💬
                    </button>
                  ) : (
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
                  )}
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
                        padding: '4px 10px', 
                        borderRadius: 20, 
                        border: '1.5px solid #fde68a',
                        fontSize: '0.8rem',
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

                  {/* INCLUSIONS SUMMARY */}
                  {bookingType === 'tour' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '7px 9px', borderRadius: 10, fontSize: '0.74rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', lineHeight: 1.35 }}>
                        <CheckCircle2 size={14} style={{ flexShrink: 0, color: '#16a34a' }} />
                        <span><strong>Includes:</strong> {matchedPkg?.included ? matchedPkg.included.replace(/Includes\s*/i, '') : 'Tolls, Parking, Driver Batta, Fuel & AC Cab'}</span>
                      </div>

                      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c', padding: '7px 9px', borderRadius: 10, fontSize: '0.74rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', lineHeight: 1.35 }}>
                        <AlertCircle size={14} style={{ flexShrink: 0, color: '#e11d48' }} />
                        <span><strong>Excludes:</strong> {matchedPkg?.excluded ? matchedPkg.excluded.replace(/Excludes\s*/i, '') : 'Darshan Tickets, Food, Hotel Stay & Permit'}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', padding: '8px 12px', borderRadius: 10, fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={15} style={{ flexShrink: 0, color: '#16a34a' }} />
                      <span>
                        <strong>
                          {serviceName.toLowerCase().includes('outstation') ? 'Outstation Taxi Inclusions:' :
                           serviceName.toLowerCase().includes('urbania') ? 'Urbania Inclusions:' :
                           serviceName.toLowerCase().includes('tempo') ? 'Tempo Traveller Inclusions:' :
                           serviceName.toLowerCase().includes('bus') ? 'Bus Inclusions:' :
                           serviceName.toLowerCase().includes('airport') ? 'Airport Taxi Inclusions:' :
                           'Taxi Inclusions:'}
                        </strong>{' '}
                        {serviceName.toLowerCase().includes('outstation') ? 'Clean AC Vehicle, Professional Driver, Fuel & Interstate Permit Assistance' :
                         serviceName.toLowerCase().includes('urbania') ? 'Plush Recliners, AC Cabin, USB Ports & Professional Driver' :
                         serviceName.toLowerCase().includes('tempo') ? 'Push-Back Seats, Air Conditioned, Luggage Boot & Expert Driver' :
                         serviceName.toLowerCase().includes('bus') ? 'Luxury AC Coach, Ample Storage & Experienced Highway Driver' :
                         serviceName.toLowerCase().includes('airport') ? 'Flight Schedule Tracking, Doorstep Pickup/Drop & AC Vehicle' :
                         'Clean AC Vehicle, Professional Driver & Fuel'}
                      </span>
                    </div>
                  )}

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
