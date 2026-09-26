import { useState } from 'react';
import { CalendarDays, MapPin, Route, MessageCircle, CreditCard, Car, Sparkles, Check, ChevronDown, ArrowRightLeft } from 'lucide-react';
import { whatsappBooking } from '../data/siteData';
import PopularPackages from './PopularPackages';
import EasebuzzModal from './EasebuzzModal';
import { useData } from '../context/DataContext';
import './BookingForm.css';

const popularRoutes = [
  { from: 'Tirupati', to: 'Tirumala', price: '₹900' },
  { from: 'Tirupati', to: 'Srikalahasti', price: '₹1,500' },
  { from: 'Tirupati', to: 'Kanipakam', price: '₹1,800' },
  { from: 'Tirupati', to: 'Vellore Golden Temple', price: '₹3,200' },
  { from: 'Tirupati', to: 'Chennai Airport', price: '₹3,500' },
  { from: 'Tirupati', to: 'Bangalore', price: '₹5,500' }
];

export default function BookingForm({ showPackages = true }) {
  const { addQuery } = useData();
  const [f, setF] = useState({ 
    from: 'Tirupati', 
    to: 'Tirumala', 
    date: '', 
    trip: 'One Way', 
    vehicle: 'Swift Dzire / Etios (Sedan 4-Seater)',
    name: '', 
    phone: '' 
  });
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Dynamic Fare Estimation
  const matchedRoute = popularRoutes.find(
    r => r.from.toLowerCase() === f.from.trim().toLowerCase() && r.to.toLowerCase() === f.to.trim().toLowerCase()
  );

  const getVehicleBaseRate = (vehicleName) => {
    if (vehicleName.includes('Ertiga')) return '₹1,500';
    if (vehicleName.includes('Innova')) return '₹2,200';
    if (vehicleName.includes('Hycross')) return '₹3,200';
    if (vehicleName.includes('Fortuner')) return '₹4,500';
    if (vehicleName.includes('Tempo')) return '₹3,500';
    if (vehicleName.includes('Urbania')) return '₹4,000';
    if (vehicleName.includes('Bus')) return '₹7,500';
    return '₹900';
  };

  const estimatedPrice = matchedRoute ? matchedRoute.price : getVehicleBaseRate(f.vehicle);

  function submit(e) {
    e.preventDefault();
    addQuery({
      name: f.name || 'Site Visitor',
      phone: f.phone || 'WhatsApp Visitor',
      from: f.from,
      to: f.to,
      date: f.date || 'Not specified',
      trip: f.trip,
      vehicle: f.vehicle,
      status: 'Pending'
    });

    const message = `Hi, I would like to book a cab.\nFrom: ${f.from}\nTo: ${f.to}\nDate: ${f.date || 'Not specified'}\nTrip type: ${f.trip}\nVehicle: ${f.vehicle}`;
    window.open(whatsappBooking(message), '_blank', 'noopener,noreferrer');
  }

  const handleTripChange = (type) => {
    let defaultTo = f.to;
    if (type === 'Local Sightseeing') defaultTo = 'Tirupati Local Sightseeing (8h / 80km)';
    else if (type === 'Outstation Tour') defaultTo = 'Arunachalam & Golden Temple';
    else if (type === 'One Way' && f.to.includes('Sightseeing')) defaultTo = 'Tirumala';
    
    setF(prev => ({ ...prev, trip: type, to: defaultTo }));
  };

  const handleSelectQuickRoute = (routeItem) => {
    setF(prev => ({ ...prev, from: routeItem.from, to: routeItem.to }));
  };

  const swapLocations = () => {
    setF(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="enhanced-booking-container">
        {/* Top Bar: Trip Types & Popular Route Chips */}
        <div className="booking-top-strip">
          <div className="trip-type-pills">
            {['One Way', 'Round Trip', 'Local Sightseeing', 'Outstation Tour'].map(type => (
              <button
                key={type}
                type="button"
                className={`trip-pill ${f.trip === type ? 'active' : ''}`}
                onClick={() => handleTripChange(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="quick-route-chips">
            <span className="chips-label"><Sparkles size={12} /> Popular:</span>
            {popularRoutes.slice(0, 4).map(item => (
              <button
                key={`${item.from}-${item.to}`}
                type="button"
                className={`quick-chip ${f.from === item.from && f.to === item.to ? 'active' : ''}`}
                onClick={() => handleSelectQuickRoute(item)}
              >
                {item.from} → {item.to}
              </button>
            ))}
          </div>
        </div>

        {/* Datalists for Pickup & Drop Suggestions */}
        <datalist id="pickup-suggestions">
          <option value="Tirupati Railway Station" />
          <option value="Tirupati Central Bus Stand" />
          <option value="Tirupati Airport (TIR)" />
          <option value="Renigunta Junction" />
          <option value="Hotel / Residence in Tirupati" />
        </datalist>

        <datalist id="drop-suggestions">
          <option value="Tirumala Temple" />
          <option value="Srikalahasti Temple" />
          <option value="Kanipakam Temple" />
          <option value="Vellore Golden Temple" />
          <option value="Arunachalam (Tiruvannamalai)" />
          <option value="Chennai Airport (MAA)" />
          <option value="Bangalore Airport (BLR)" />
          <option value="Kanchipuram Temples" />
        </datalist>

        {/* Main Booking Form Card */}
        <form className="enhanced-booking-card" onSubmit={submit}>
          <div className="booking-fields-grid">
            {/* From Field */}
            <div className="field-box">
              <label>PICKUP LOCATION</label>
              <div className="field-input-wrap">
                <MapPin className="field-icon gold" size={17} />
                <input 
                  type="text"
                  value={f.from} 
                  onChange={e => setF({ ...f, from: e.target.value })} 
                  list="pickup-suggestions"
                  placeholder="e.g. Tirupati Airport / Hotel"
                  required
                />
              </div>
            </div>

            {/* Swap Button (between From and To) */}
            <button type="button" className="swap-btn" onClick={swapLocations} title="Swap Locations">
              <ArrowRightLeft size={14} />
            </button>

            {/* To Field */}
            <div className="field-box">
              <label>DESTINATION (DROP)</label>
              <div className="field-input-wrap">
                <MapPin className="field-icon gold" size={17} />
                <input 
                  type="text"
                  value={f.to} 
                  onChange={e => setF({ ...f, to: e.target.value })} 
                  list="drop-suggestions"
                  placeholder="e.g. Tirumala / Srikalahasti"
                  required
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="field-box">
              <label>TRAVEL DATE</label>
              <div className="field-input-wrap">
                <CalendarDays className="field-icon gold" size={17} />
                <input 
                  type="date" 
                  value={f.date} 
                  min={todayStr}
                  onChange={e => setF({ ...f, date: e.target.value })} 
                />
              </div>
            </div>

            {/* Vehicle Selection Field */}
            <div className="field-box">
              <label>VEHICLE CATEGORY</label>
              <div className="field-input-wrap">
                <Car className="field-icon gold" size={17} />
                <select value={f.vehicle} onChange={e => setF({ ...f, vehicle: e.target.value })}>
                  <option>Swift Dzire / Etios (Sedan 4-Seater)</option>
                  <option>Maruti Ertiga (MUV 6-Seater)</option>
                  <option>Toyota Innova Crysta (SUV 7-Seater)</option>
                  <option>Toyota Hycross (Hybrid MUV 7-Seater)</option>
                  <option>Toyota Fortuner (Luxury SUV 7-Seater)</option>
                  <option>Tempo Traveller (12 / 17 Seater)</option>
                  <option>Force Urbania (12 / 16 Seater)</option>
                  <option>Luxury Bus (27 / 40 / 50 Seater)</option>
                </select>
                <ChevronDown className="select-arrow" size={14} />
              </div>
            </div>
          </div>

          {/* Bottom Action Row with Estimated Fare Badge */}
          <div className="booking-card-footer">
            <div className="fare-estimate-badge">
              <span className="estimate-dot" />
              <span>Est. Starting Fare: <strong>{estimatedPrice}</strong> <small>(AC Cab & Driver Incl.)</small></span>
            </div>

            <div className="booking-actions-group">
              <button className="button wa-booking-btn" type="submit">
                <MessageCircle size={16} /> Enquire on WhatsApp
              </button>
              <button 
                className="button pay-booking-btn" 
                type="button" 
                onClick={() => setIsPayModalOpen(true)}
              >
                <CreditCard size={16} /> Pay & Book 💳
              </button>
            </div>
          </div>
        </form>
      </div>

      {showPackages && <PopularPackages />}

      <EasebuzzModal 
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)}
        initialData={{
          service: `${f.from} to ${f.to} (${f.vehicle} - ${f.trip})`,
          amount: '500',
          fullAmount: estimatedPrice,
          name: f.name,
          phone: f.phone
        }}
      />
    </>
  );
}
