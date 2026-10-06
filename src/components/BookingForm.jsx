import { useState, useEffect } from 'react';
import { CalendarDays, MapPin, Route, MessageCircle, CreditCard, Car, Sparkles, Check, ChevronDown, ArrowRightLeft } from 'lucide-react';
import { whatsappBooking } from '../data/siteData';
import { packageDetails } from '../data/packageDetails';
import PopularPackages from './PopularPackages';
import EasebuzzModal from './EasebuzzModal';
import { useData } from '../context/DataContext';
import './BookingForm.css';

const popularRoutes = [
  { from: 'Tirupati', to: 'Tirumala', price: '₹900' },
  { from: 'Tirupati', to: 'Arunachalam', price: '₹4,500' },
  { from: 'Tirupati', to: 'Kanipakam', price: '₹1,800' },
  { from: 'Tirupati', to: 'Vellore Golden Temple', price: '₹3,200' },
  { from: 'Tirupati', to: 'Chennai Airport', price: '₹3,500' },
  { from: 'Tirupati', to: 'Bangalore', price: '₹5,500' }
];

const vehicleOptions = [
  { label: 'Swift Dzire / Etios (Sedan 4-Seater)', key: 'Sedan' },
  { label: 'Maruti Ertiga (MUV 6-Seater)', key: 'Ertiga' },
  { label: 'Toyota Innova Crysta (SUV 7-Seater)', key: 'Innova' },
  { label: 'Toyota Hycross (Hybrid MUV 7-Seater)', key: 'Hycross' },
  { label: 'Toyota Fortuner (Luxury SUV 7-Seater)', key: 'Fortuner' },
  { label: 'Tempo Traveller 12 Seater (12-Seater AC)', key: 'Tempo Traveller 12' },
  { label: 'Urbania 12 Seater (Luxury 12-Seater AC)', key: 'Urbania 12' },
  { label: 'Tempo Traveller 16 Seater (16-Seater AC)', key: 'Tempo Traveller 16' },
  { label: 'Urbania 16 Seater (Luxury 16-Seater AC)', key: 'Urbania 16' },
  { label: 'Tempo Traveller 20 Seater (20-Seater AC)', key: 'Tempo Traveller 20' },
  { label: 'Mini Bus 27 Seater (27-Seater AC Coach)', key: 'Mini Bus 27' },
  { label: 'Bus 40 Seater (40-Seater Tourist Coach)', key: 'Bus 40' },
  { label: 'Bus 45 Seater (45-Seater Volvo/Deluxe Bus)', key: 'Bus 45' }
];

export default function BookingForm({ showPackages = true }) {
  const { addQuery, bookingSelection } = useData();
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

  // Sync with global bookingSelection when user interacts with package/tour/destination/vehicle cards
  useEffect(() => {
    if (bookingSelection) {
      setF(prev => ({
        ...prev,
        from: bookingSelection.from || prev.from || 'Tirupati',
        to: bookingSelection.to || bookingSelection.name || bookingSelection.title || prev.to,
        trip: bookingSelection.trip || prev.trip,
        vehicle: bookingSelection.vehicle || prev.vehicle
      }));
    }
  }, [bookingSelection]);

  // Find package details matching current destination/package name
  const matchedPkgData = packageDetails[f.to] || 
    Object.entries(packageDetails).find(([key]) => f.to && (f.to.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(f.to.toLowerCase())))?.[1];

  const getFareForVehicleOption = (vOpt) => {
    if (matchedPkgData?.prices) {
      const match = matchedPkgData.prices.find(([vName]) => vName.toLowerCase().includes(vOpt.key.toLowerCase()));
      if (match) return match[1];
    }
    if (bookingSelection?.price && bookingSelection?.vehicle && f.vehicle === vOpt.label) {
      return bookingSelection.price;
    }
    const matchedRoute = popularRoutes.find(
      r => r.from.toLowerCase() === f.from.trim().toLowerCase() && r.to.toLowerCase() === f.to.trim().toLowerCase()
    );
    if (matchedRoute) return matchedRoute.price;

    return getVehicleBaseRate(vOpt.label);
  };

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

  // Compute estimated price for currently selected vehicle
  const selectedOpt = vehicleOptions.find(v => v.label === f.vehicle) || vehicleOptions[0];
  const estimatedPrice = getFareForVehicleOption(selectedOpt);

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

    const message = `Hi, I would like to book a cab / tour package.\nBooked Item / Destination: ${f.to}\nFrom: ${f.from}\nDate: ${f.date || 'Not specified'}\nTrip type: ${f.trip}\nSelected Vehicle: ${f.vehicle}\nEstimated Fare: ${estimatedPrice}`;
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

  const destLabel = (f.trip === 'Local Sightseeing' || f.trip === 'Outstation Tour') 
    ? 'DESTINATION / PLACES TO VISIT' 
    : 'DESTINATION (DROP)';

  const destPlaceholder = f.trip === 'Local Sightseeing'
    ? 'e.g. Tirupati Local Temples, Kapila Theertham, Kanipakam'
    : f.trip === 'Outstation Tour'
    ? 'e.g. Arunachalam, Golden Temple Vellore, Kanchipuram'
    : 'e.g. Tirumala / Srikalahasti / Airport';

  return (
    <>
      <div className="enhanced-booking-container" id="booking-form">
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

            {/* To Field (Places to Visit / Destination) */}
            <div className="field-box">
              <label>{destLabel}</label>
              <div className="field-input-wrap">
                <MapPin className="field-icon gold" size={17} />
                <input 
                  type="text"
                  value={f.to} 
                  onChange={e => setF({ ...f, to: e.target.value })} 
                  list="drop-suggestions"
                  placeholder={destPlaceholder}
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

            {/* Vehicle Selection Field with Price Shown */}
            <div className="field-box">
              <label>VEHICLE & PRICE SHOWN</label>
              <div className="field-input-wrap">
                <Car className="field-icon gold" size={17} />
                <select value={f.vehicle} onChange={e => setF({ ...f, vehicle: e.target.value })}>
                  {vehicleOptions.map(vOpt => {
                    const fare = getFareForVehicleOption(vOpt);
                    return (
                      <option key={vOpt.label} value={vOpt.label}>
                        {vOpt.label} — {fare}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="select-arrow" size={14} />
              </div>
            </div>
          </div>

          {/* Bottom Action Row with Estimated Fare Badge */}
          <div className="booking-card-footer">
            <div className="fare-estimate-badge">
              <span className="estimate-dot" />
              <span>Selected Vehicle Fare: <strong>{estimatedPrice}</strong> <small>(AC Cab & Driver Incl.)</small></span>
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
                <CreditCard size={16} /> Book Cab 💳
              </button>
            </div>
          </div>
        </form>
      </div>

      {showPackages && <PopularPackages />}

      <EasebuzzModal 
        modalClassName="home-hero-booking-modal"
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)}
        initialData={{
          service: `${f.to} (${f.trip})`,
          vehicle: f.vehicle,
          amount: '1000',
          fullAmount: estimatedPrice,
          name: f.name,
          phone: f.phone,
          date: f.date,
          pickup: f.from
        }}
      />
    </>
  );
}

