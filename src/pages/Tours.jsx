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

  const filteredPackages = tours.filter(t => {
    if (filter === 'All') return true;
    if (filter === '1-Day') return t[1].includes('1 Day');
    if (filter === '2-Day') return t[1].includes('2 Day') || t[1].includes('Full Day');
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

      {/* --- STICKY CATEGORY FILTER BAR --- */}
      <div className="tours-sticky-filter-wrapper">
        <div className="tours-filter-bar">
          <button className={`tours-filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>
            All Packages ({tours.length})
          </button>
          <button className={`tours-filter-btn ${filter === '1-Day' ? 'active' : ''}`} onClick={() => setFilter('1-Day')}>
            1-Day Tours
          </button>
          <button className={`tours-filter-btn ${filter === '2-Day' ? 'active' : ''}`} onClick={() => setFilter('2-Day')}>
            Multi-Day & Full Day
          </button>
        </div>
      </div>

      {/* --- TOUR PACKAGES GRID --- */}
      <section className="tours-section">
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

                  <details className="tour-route-details">
                    <summary className="tour-route-summary">
                      <span>Route Corridor</span>
                      <ChevronDown size={12} className="summary-chevron" />
                    </summary>
                    <p className="tour-route-full">{route}</p>
                  </details>

                  <div className="tour-pricing-grid">
                    <span className="grid-label">INDICATIVE TARIFFS</span>
                    {details.prices.slice(0, 3).map(([vehicle, pVal]) => (
                      <div key={vehicle} className="tour-price-row">
                        <span>{vehicle}</span>
                        <strong>{pVal}</strong>
                      </div>
                    ))}
                  </div>

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
                      onClick={() => setSelectedPayTour({ title, price })}
                    >
                      <CreditCard size={15} /> Pay Deposit (Easebuzz)
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
            service: `${selectedPayTour.title} Advance Deposit`,
            amount: '1000'
          }}
        />
      )}
    </div>
  );
}
