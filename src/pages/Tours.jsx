import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, CheckCircle2, MessageCircle, ArrowRight, Clock, Phone, ShieldCheck, Car, ChevronDown, CreditCard } from 'lucide-react';
import { images, whatsapp, phone } from '../data/siteData';
import { packageDetails } from '../data/packageDetails';
import StatsBanner from '../components/StatsBanner';
import EasebuzzModal from '../components/EasebuzzModal';
import { useData } from '../context/DataContext';
import './Tours.css';

export default function Tours() {
  const { tours } = useData();
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

  const filteredPackages = tours.filter(t => {
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
          <span><Car size={14} /> Verified AC Cabs</span>
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
            const details = packageDetails[title] || { prices: [['Sedan', price], ['Ertiga', '₹3,500'], ['Innova Crysta', '₹4,500']] };

            return (
              <article className="tour-card" key={title + idx}>
                <div className="tour-card-header">
                  <img src={image} alt={title} loading="lazy" />
                  <span className="tour-duration-badge">
                    <Clock size={13} /> {duration}
                  </span>
                  <div className="tour-price-badge">
                    <small>Starting from</small>
                    <strong>{price}</strong>
                  </div>
                </div>

                <div className="tour-card-body">
                  <p className="tour-category-tag">PILGRIMAGE PACKAGE</p>
                  <h3>{title}</h3>

                  <div className="tour-route-details-box" style={{ margin: '0.75rem 0', padding: '0.6rem 0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      Places Visited / Route Corridor:
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem 0.5rem' }}>
                      {route.split(/·|→|\s\s+/).map(p => p.trim()).filter(Boolean).map((place, pIdx) => (
                        <span key={pIdx} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={11} style={{ color: '#0284c7', flexShrink: 0 }} /> {place}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* FLEET FARES PREVIEW CHIPS */}
                  {details.prices && details.prices.length > 0 && (
                    <div style={{ margin: '0.5rem 0 0.75rem 0', padding: '0.5rem 0.75rem', background: '#f1f5f9', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        🚗 Vehicle Fleet Pricing:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {details.prices.slice(0, 4).map(([vName, vFare]) => (
                          <span key={vName} style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid #cbd5e1', padding: '2px 6px', borderRadius: '4px', color: '#1e293b' }}>
                            <small style={{ color: '#64748b', fontWeight: 600 }}>{vName.split(' ')[0]}:</small> <strong style={{ color: '#0284c7' }}>{vFare}</strong>
                          </span>
                        ))}
                        {details.prices.length > 4 && (
                          <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 700, alignSelf: 'center' }}>
                            +{details.prices.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="tour-inclusions-summary">
                    <CheckCircle2 size={13} /> Includes Tolls, Parking, Driver Batta
                  </div>

                  <div className="tour-card-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={`${whatsapp}?text=${encodeURIComponent(`Hello! I want to book ${title} (${duration}) starting from ${price}. Please share availability.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="tour-book-btn"
                      style={{ flex: 1 }}
                    >
                      <MessageCircle size={15} /> Book WhatsApp
                    </a>
                    <button
                      type="button"
                      className="tour-book-btn"
                      style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7' }}
                      onClick={() => setSelectedPayTour({ title, price, duration, prices: details.prices })}
                    >
                      Book 💳
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
            service: selectedPayTour.title,
            duration: selectedPayTour.duration,
            prices: selectedPayTour.prices,
            amount: '1000',
            fullAmount: selectedPayTour.price || '2500'
          }}
        />
      )}
    </div>
  );
}
