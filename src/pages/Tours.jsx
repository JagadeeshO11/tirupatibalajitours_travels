import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, CheckCircle2, AlertCircle, MessageCircle, ArrowRight, Clock, Phone, ShieldCheck, Car, ChevronDown, CreditCard } from 'lucide-react';
import { images, whatsapp, phone } from '../data/siteData';
import { packageDetails } from '../data/packageDetails';
import StatsBanner from '../components/StatsBanner';
import EasebuzzModal from '../components/EasebuzzModal';
import { useData } from '../context/DataContext';
import './Tours.css';

const buildAllVehiclePrices = (pricesArray, startingPriceStr) => {
  const baseNum = parseInt((startingPriceStr || '3500').replace(/[^0-9]/g, ''), 10) || 3500;

  const defaultVehicleMap = [
    { key: 'Sedan', name: 'Sedan (4 Seater)', mult: 1.0 },
    { key: 'Ertiga', name: 'Ertiga (6 Seater)', mult: 1.25 },
    { key: 'Innova', name: 'Innova Crysta (7 Seater)', mult: 1.45 },
    { key: 'Hycross', name: 'Hycross (7 Seater)', mult: 1.7 },
    { key: 'Fortuner', name: 'Fortuner (7 Seater)', mult: 2.3 },
    { key: 'Tempo Traveller 12', name: 'Tempo Traveller 12 Seater', mult: 1.6 },
    { key: 'Urbania 12', name: 'Urbania 12 Seater', mult: 2.5 },
    { key: 'Tempo Traveller 16', name: 'Tempo Traveller 16 Seater', mult: 1.95 },
    { key: 'Urbania 16', name: 'Urbania 16 Seater', mult: 2.7 },
    { key: 'Tempo Traveller 20', name: 'Tempo Traveller 20 Seater', mult: 2.4 },
    { key: 'Mini Bus 27', name: 'Mini Bus 27 Seater', mult: 3.4 },
    { key: 'Bus 40', name: 'Bus 40 Seater', mult: 4.2 },
    { key: 'Bus 45', name: 'Bus 45 Seater', mult: 4.8 }
  ];

  const result = [];
  defaultVehicleMap.forEach(vOpt => {
    let matchedFare = null;
    if (pricesArray && pricesArray.length > 0) {
      const match = pricesArray.find(([vName]) => {
        const lower = vName.toLowerCase();
        if (vOpt.key === 'Sedan') return lower.includes('sedan') || lower.includes('dzire') || lower.includes('etios');
        if (vOpt.key === 'Ertiga') return lower.includes('ertiga');
        if (vOpt.key === 'Innova') return lower.includes('innova');
        if (vOpt.key === 'Hycross') return lower.includes('hycross');
        if (vOpt.key === 'Fortuner') return lower.includes('fortuner');
        if (vOpt.key === 'Tempo Traveller 12') return lower.includes('12') && lower.includes('tempo');
        if (vOpt.key === 'Urbania 12') return lower.includes('12') && lower.includes('urbania');
        if (vOpt.key === 'Tempo Traveller 16') return lower.includes('16') && lower.includes('tempo');
        if (vOpt.key === 'Urbania 16') return lower.includes('16') && lower.includes('urbania');
        if (vOpt.key === 'Tempo Traveller 20') return lower.includes('20');
        if (vOpt.key === 'Mini Bus 27') return lower.includes('27') || (lower.includes('bus') && lower.includes('27'));
        if (vOpt.key === 'Bus 40') return lower.includes('40');
        if (vOpt.key === 'Bus 45') return lower.includes('45');
        return false;
      });
      if (match) matchedFare = match[1];
    }

    if (!matchedFare) {
      const calcPrice = Math.round((baseNum * vOpt.mult) / 50) * 50;
      matchedFare = `₹${calcPrice.toLocaleString('en-IN')}`;
    }

    result.push([vOpt.name, matchedFare]);
  });

  return result;
};

export default function Tours() {
  const { tours, selectBooking } = useData();
  const [filter, setFilter] = useState('All');
  const [selectedPayTour, setSelectedPayTour] = useState(null);

  const durationOptions = [
    { key: 'All', label: 'All Packages' },
    { key: '1-Day', label: '1 Day' },
    { key: '2-Days', label: '2 Days' },
    { key: '3-Days', label: '3 Days' },
    { key: '4-Days', label: '4 Days' },
    { key: '5+Days', label: '5+ Days' }
  ];

  const parseDurationDays = (dStr) => {
    if (!dStr) return 1;
    const match = dStr.match(/(\d+)\s*Days?/i);
    if (match) return parseInt(match[1], 10);
    if (dStr.toLowerCase().includes('full day') || dStr.toLowerCase().includes('1 day')) return 1;
    return 1;
  };

  const sortedPackages = [...tours].sort((a, b) => parseDurationDays(a[1]) - parseDurationDays(b[1]));

  const filteredPackages = sortedPackages.filter(t => {
    const days = parseDurationDays(t[1]);
    if (filter === 'All') return true;
    if (filter === '1-Day') return days === 1;
    if (filter === '2-Days') return days === 2;
    if (filter === '3-Days') return days === 3;
    if (filter === '4-Days') return days === 4;
    if (filter === '5+Days') return days >= 5;
    return true;
  });

  return (
    <div className="tours-page-wrapper">
      {/* --- HERO BANNER --- */}
      <section className="tours-hero-card">
        <span className="tours-badge">
          <Sparkles size={14} /> PILGRIMAGE & TOUR PACKAGES
        </span>
        <h1>Curated Journeys of Faith & Discovery</h1>
        <p>
          Book private cab tour packages for Tirupati Balaji darshan, temple circuits across Andhra Pradesh & Tamil Nadu, and customized South India holiday getaways.
        </p>

        <div className="hero-trust-chips">
          <span><ShieldCheck size={14} /> Doorstep Pickup</span>
          <span><CheckCircle2 size={14} /> All Tolls & Batta Included</span>
          <span><Car size={14} /> Verified AC Cabs & Tourist Buses</span>
          <span><Phone size={14} /> 24/7 WhatsApp Assistance</span>
        </div>
      </section>

      {/* --- STICKY CATEGORY & DURATION FILTER BAR --- */}
      <div className="tours-sticky-filter-wrapper">
        <div className="tours-filter-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', flexWrap: 'nowrap' }}>
          {durationOptions.map(opt => {
            const count = opt.key === 'All' 
              ? tours.length 
              : tours.filter(t => {
                  const d = parseDurationDays(t[1]);
                  if (opt.key === '1-Day') return d === 1;
                  if (opt.key === '2-Days') return d === 2;
                  if (opt.key === '3-Days') return d === 3;
                  if (opt.key === '4-Days') return d === 4;
                  if (opt.key === '5+Days') return d >= 5;
                  return false;
                }).length;

            if (opt.key !== 'All' && count === 0) return null;

            return (
              <button
                key={opt.key}
                type="button"
                className={`tours-filter-btn ${filter === opt.key ? 'active' : ''}`}
                onClick={() => {
                  setFilter(opt.key);
                  const el = document.getElementById('tours-cards-section');
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < 130) {
                      const y = window.pageYOffset + rect.top - 140;
                      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
                    }
                  }
                }}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* --- TOUR PACKAGES GRID --- */}
      <section className="tours-section" id="tours-cards-section">
        <div className="tours-grid">
          {filteredPackages.map((pkg, idx) => {
            const title = pkg[0];
            const duration = pkg[1];
            const route = pkg[2];
            const price = pkg[3];
            const image = pkg[4];
            const details = packageDetails[title] || { 
              included: 'Includes Tolls, Parking, Driver Batta',
              excluded: 'Excludes Accommodation, Food, Darshan Tickets & Personal Expenses'
            };

            const allVehiclePrices = buildAllVehiclePrices(details.prices, price);

            return (
              <article className="tour-card compact-tour-card" key={title + idx}>
                <div className="tour-card-header compact-header">
                  <img src={image} alt={title} loading="lazy" />
                  <span className="tour-duration-badge">
                    <Clock size={12} /> {duration}
                  </span>
                  <div className="tour-price-badge">
                    <small>Starting from</small>
                    <strong>{price}</strong>
                  </div>
                </div>

                <div className="tour-card-body compact-body">
                  <div className="compact-title-row">
                    <span className="tour-category-tag">PILGRIMAGE PACKAGE</span>
                    <h3>{title}</h3>
                  </div>

                  {/* Route Corridor / Places Visited as a compact single row */}
                  <div className="compact-route-box">
                    <MapPin size={12} className="route-icon" />
                    <span className="route-label">Route:</span>
                    <span className="route-text" title={route}>{route}</span>
                  </div>

                  {/* ALL VEHICLE FLEET & FARES LIST (Including Buses) */}
                  <div className="compact-pricing-box">
                    <span className="pricing-box-label">
                      <Car size={12} /> Vehicles & Buses Fare Rates:
                    </span>
                    <div className="compact-prices-grid">
                      {allVehiclePrices.map(([shortLabel, fare]) => (
                        <div className="compact-price-pill" key={shortLabel}>
                          <span className="v-label">{shortLabel}</span>
                          <strong className="v-fare">{fare}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* INCLUSIONS & EXCLUSIONS SUMMARY (2 Rows Full Width) */}
                  <div className="compact-inc-exc-rows">
                    <div className="compact-inc-row" title={details.included || 'Includes Tolls, Parking, Driver Batta'}>
                      <CheckCircle2 size={12} className="inc-icon" />
                      <span><strong>Includes:</strong> {details.included || 'Tolls, Parking, Driver Batta'}</span>
                    </div>

                    <div className="compact-exc-row" title={details.excluded || 'Excludes Accommodation, Food, Darshan Tickets & Personal Expenses'}>
                      <AlertCircle size={12} className="exc-icon" />
                      <span><strong>Excludes:</strong> {details.excluded || 'Accommodation, Food, Darshan Tickets & Personal Expenses'}</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="tour-card-actions compact-actions">
                    <a
                      href={`${whatsapp}?text=${encodeURIComponent(`Hello! I want to book ${title} (${duration}) starting from ${price}. Please share availability.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="tour-book-btn wa-btn"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <button
                      type="button"
                      className="tour-book-btn pay-btn"
                      onClick={() => {
                        selectBooking({
                          to: title,
                          trip: 'Outstation Tour',
                          vehicle: 'Swift Dzire / Etios (Sedan 4-Seater)',
                          price: price
                        });
                        setSelectedPayTour({ type: 'tour', title, price, duration, prices: allVehiclePrices, route });
                      }}
                    >
                      <CreditCard size={14} /> Book Cab 💳
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* --- STATS COUNTER BANNER --- */}
      <StatsBanner title="Trusted Tour Package Operator" subtitle="WHY TRAVEL WITH US" />

      {/* --- CUSTOM QUOTATION BANNER --- */}
      <section className="tours-custom-banner">
        <span className="custom-badge"><Sparkles size={14} /> TAILOR-MADE ITINERARIES</span>
        <h2>Want a Tailor-Made Custom Tour Package?</h2>
        <p>
          We can customize your tour route, vehicle model, departure timings, and hotel arrangements for family groups, corporate delegations, and large pilgrim groups.
        </p>
        <div className="tours-custom-actions">
          <a
            href={`${whatsapp}?text=${encodeURIComponent('Hi Tirupati Balaji Tours! I want to request a customized tour itinerary for my group.')}`}
            target="_blank"
            rel="noreferrer"
            className="button hero-wa-btn"
          >
            <MessageCircle size={18} /> Request Custom Quotation
          </a>
          <a href={`tel:${phone}`} className="button hero-call-btn">
            <Phone size={16} /> Call Manager: {phone}
          </a>
        </div>
      </section>

      {/* Easebuzz Checkout Modal */}
      {selectedPayTour && (
        <EasebuzzModal 
          isOpen={Boolean(selectedPayTour)}
          onClose={() => setSelectedPayTour(null)}
          initialData={{
            type: 'tour',
            service: selectedPayTour.title,
            duration: selectedPayTour.duration,
            prices: selectedPayTour.prices,
            route: selectedPayTour.route,
            amount: '1000',
            fullAmount: selectedPayTour.price || '2500'
          }}
        />
      )}
    </div>
  );
}
