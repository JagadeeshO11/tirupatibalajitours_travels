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

export default function BookingForm() {
  const { addQuery } = useData();
  const [f, setF] = useState({ 
    from: 'Tirupati', 
    to: 'Tirumala', 
    date: '', 
    trip: 'One Way', 
    vehicle: 'Swift Dzire / Etios (Sedan)',
    name: '', 
    phone: '' 
  });
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Find estimated price for current selection if available
  const matchedRoute = popularRoutes.find(
    r => r.from.toLowerCase() === f.from.trim().toLowerCase() && r.to.toLowerCase() === f.to.trim().toLowerCase()
  );
  const estimatedPrice = matchedRoute ? matchedRoute.price : '₹2,500';

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

  const handleSelectQuickRoute = (routeItem) => {
    setF(prev => ({ ...prev, from: routeItem.from, to: routeItem.to }));
  };

  const swapLocations = () => {
    setF(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

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
                onClick={() => setF({ ...f, trip: type })}
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
                  <option>Swift Dzire / Etios (Sedan)</option>
                  <option>Maruti Ertiga (MUV)</option>
                  <option>Toyota Innova Crysta (SUV)</option>
                  <option>Tempo Traveller (12/17 Seater)</option>
                  <option>Force Urbania (12/16 Seater)</option>
                  <option>Luxury Bus (27/40/50 Seater)</option>
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

      <PopularPackages />

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
