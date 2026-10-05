import { useState } from 'react';
import { Luggage, Wind, ShieldCheck, Clock3, Fuel, Users, MapPin, CreditCard, Check } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';
import { fleetCategories } from '../data/fleetData';
import StatsBanner from '../components/StatsBanner';
import ScrollReveal from '../components/ScrollReveal';
import EasebuzzModal from '../components/EasebuzzModal';
import { useData } from '../context/DataContext';
import './Fleet.css';
import './FleetOverride.css';
import './FleetMobileOrder.css';

function FleetCardItem({ vehicle, onBook }) {
  const [selectedRate, setSelectedRate] = useState('local'); // 'local' | 'localLong' | 'outstation'

  const rateOptions = [
    { key: 'local', label: 'Local 8h / 80km', price: vehicle.local },
    { key: 'localLong', label: 'Local 12h / 150km', price: vehicle.localLong },
    { key: 'outstation', label: 'Outstation (Min 300km/day)', price: vehicle.outstation }
  ];

  const currentOption = rateOptions.find(r => r.key === selectedRate) || rateOptions[0];

  const waMessage = `Hi, I want to book ${vehicle.name} in Tirupati for ${currentOption.label} (${currentOption.price}). Please share availability.`;

  return (
    <article className="rental-card">
      <div className="vehicle-media">
        <img src={vehicle.image} alt={`${vehicle.name} rental in Tirupati`} loading="lazy" />
        <span className="media-type">{vehicle.category}</span>
        <div className="media-bottom">
          <span className="media-rate">{currentOption.price}</span>
          <span className="media-seats"><Users size={14} /> {vehicle.seats}</span>
        </div>
      </div>

      <div className="rental-info">
        <div className="vehicle-heading">
          <div>
            <span className="vehicle-category">{vehicle.category}</span>
            <h3>{vehicle.name}</h3>
          </div>
          <span className="vehicle-capacity">{vehicle.seats} seats</span>
        </div>

        <p className="vehicle-summary">{vehicle.use}</p>

        <div className="vehicle-features">
          {Array.isArray(vehicle.features) ? (
            vehicle.features.map(feature => (
              <span key={feature}><Wind size={13} /> {feature}</span>
            ))
          ) : (
            <span><Wind size={13} /> {vehicle.features}</span>
          )}
          <span><Luggage size={13} /> {vehicle.bags} bags</span>
          <span><Fuel size={13} /> {vehicle.fuel}</span>
        </div>

        {/* SELECTABLE RATES SECTION */}
        <div className="selectable-rates-container" style={{ marginTop: '0.85rem', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.35rem', letterSpacing: '0.04em' }}>
            SELECT RATE PLAN:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
            {rateOptions.map(opt => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelectedRate(opt.key)}
                style={{
                  padding: '0.55rem 0.35rem',
                  borderRadius: 10,
                  border: selectedRate === opt.key ? '2px solid #d97706' : '1.5px solid #cbd5e1',
                  background: selectedRate === opt.key ? '#fffdf5' : '#f8fafc',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  boxShadow: selectedRate === opt.key ? '0 4px 12px rgba(217, 119, 6, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <small style={{ fontSize: '0.65rem', fontWeight: 800, color: selectedRate === opt.key ? '#d97706' : '#64748b', textTransform: 'uppercase' }}>
                  {opt.label}
                </small>
                <b style={{ fontSize: '0.82rem', fontWeight: 800, color: '#060c2c', whiteSpace: 'nowrap' }}>
                  {opt.price}
                </b>
              </button>
            ))}
          </div>
        </div>

        <p className="vehicle-minimum"><MapPin size={14} /> Outstation minimum {vehicle.minimum}</p>

        {/* Note: "View Details" button removed as requested */}

        <div className="rent-actions" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.85rem' }}>
          <a
            className="button"
            style={{ flex: 1 }}
            href={`${whatsapp}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noreferrer"
          >
            Book on WhatsApp
          </a>
          <button
            type="button"
            className="button"
            style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7' }}
            onClick={() => onBook({ 
              name: vehicle.name, 
              service: `${vehicle.name} - ${currentOption.label} (${currentOption.price})`, 
              price: currentOption.price 
            })}
          >
            Book 💳
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Fleet() {
  const { fleets } = useData();
  const [selectedPayVehicle, setSelectedPayVehicle] = useState(null);

  return (
    <Page
      eyebrow="FLEET & RENTALS"
      title="Choose the right vehicle for your journey."
      text="From economical Tirupati cabs to premium Urbania, Tempo Travellers and large buses, choose the space, comfort and price point that fits your trip."
      image={images.hero}
    >
      <section className="content" id="rentals">
        <div className="fleet-pricing-strip">
          <div>
            <span>LOCAL • 8 HOURS / 80 KM</span>
            <strong>From ₹2,880</strong>
          </div>
          <div>
            <span>LOCAL • 12 HOURS / 150 KM</span>
            <strong>From ₹3,650</strong>
          </div>
          <div>
            <span>OUTSTATION</span>
            <strong>From ₹15/km • 300 km/day min</strong>
          </div>
        </div>

        {fleetCategories.slice(1).map(category => {
          const items = fleets.filter(v => category.ids.includes(v.id));
          if (items.length === 0) return null;

          return (
            <section className="fleet-group" id={category.key} key={category.key} style={{ marginTop: '2.5rem' }}>
              <div className="fleet-group-heading">
                <div>
                  <span className="eyebrow">
                    {category.key === 'cars'
                      ? 'CARS'
                      : category.key === 'tempo'
                      ? 'TEMPO TRAVELLERS'
                      : category.key === 'urbania'
                      ? 'PREMIUM GROUP TRAVEL'
                      : 'LARGE GROUP TRAVEL'}
                  </span>
                  <h3>{category.label}</h3>
                  {category.key === 'cars' && (
                    <p className="fleet-category-note">
                      Local packages below are 8 hours / 80 km and 12 hours / 150 km. Outstation pricing is charged per km.
                    </p>
                  )}
                </div>
                <span>{items.length} options</span>
              </div>

              <div className="vehicle-slider">
                {items.map((v, idx) => (
                  <ScrollReveal key={v.id} direction="up" delay={idx * 0.06}>
                    <FleetCardItem 
                      vehicle={v} 
                      onBook={(payload) => setSelectedPayVehicle(payload)} 
                    />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          );
        })}

        <ScrollReveal direction="up">
          <div className="fleet-intro">
            <div>
              <p className="eyebrow">OUR FLEET</p>
              <h2>Comfort for small groups. Space for everyone.</h2>
              <p className="fleet-subcopy">
                Local rates are shown for 8-hour / 80-km and 12-hour / 150-km packages. Outstation travel uses the published per-kilometre rate with a 300 km/day minimum.
              </p>
            </div>
            <div className="fleet-trust">
              <span><ShieldCheck /> Professional drivers</span>
              <span><Wind /> AC vehicles</span>
              <span><Clock3 /> 24/7 support</span>
            </div>
          </div>
        </ScrollReveal>

        <StatsBanner title="Extensive Vehicle Availability" subtitle="FLEET ADVANTAGE" />

        <div className="fleet-pricing-note" style={{ marginTop: '3rem' }}>
          <strong>Pricing note</strong>
          <span>
            Rates are based on the supplied fleet rate sheet. Tolls, parking, permits, state taxes and other trip-specific charges may apply. Final pricing is confirmed on WhatsApp.
          </span>
        </div>
      </section>

      {/* Easebuzz Checkout Modal */}
      {selectedPayVehicle && (
        <EasebuzzModal 
          isOpen={Boolean(selectedPayVehicle)}
          onClose={() => setSelectedPayVehicle(null)}
          initialData={{
            service: selectedPayVehicle.service || `${selectedPayVehicle.name} Booking`,
            vehicle: selectedPayVehicle.name,
            amount: '1000',
            fullAmount: selectedPayVehicle.price || '2880'
          }}
        />
      )}
    </Page>
  );
}
