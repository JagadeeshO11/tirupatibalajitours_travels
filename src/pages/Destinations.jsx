import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, CreditCard, Sparkles, MapPin } from 'lucide-react';
import { images, whatsapp } from '../data/siteData';
import EasebuzzModal from '../components/EasebuzzModal';
import { useData } from '../context/DataContext';
import ScrollReveal from '../components/ScrollReveal';
import './Destinations.css';

export default function Destinations() {
  const { destinations, selectBooking } = useData();
  const [selectedDestSlug, setSelectedDestSlug] = useState(destinations[0]?.[0] || 'tirumala');
  const [selectedPayDest, setSelectedPayDest] = useState(null);

  const selectedDestObj = destinations.find(d => d[0] === selectedDestSlug) || destinations[0];

  const handleHeroBookClick = () => {
    if (selectedDestObj) {
      selectBooking({
        to: selectedDestObj[1],
        trip: 'Outstation Tour',
        vehicle: 'Swift Dzire / Etios (Sedan 4-Seater)',
        price: selectedDestObj[4] || '₹2,499'
      });
      setSelectedPayDest(selectedDestObj);
    }
  };

  return (
    <main className="page destinations-main-page">
      {/* HERO BANNER WITH DESTINATION SELECTION & BOOKING BUTTON */}
      <section 
        className="destinations-hero-section"
        style={{ backgroundImage: `linear-gradient(135deg, rgba(6, 12, 44, 0.93) 0%, rgba(12, 24, 94, 0.88) 100%), url(${images.place})` }}
      >
        <div className="dest-hero-inner">
          <span className="dest-hero-badge">
            <Sparkles size={14} /> TEMPLE DESTINATIONS & TOUR ROUTES
          </span>
          <h1>Every stop tells a sacred story.</h1>
          <p>
            Explore handpicked temple circuits, historical landmarks, and outstation pilgrimage destinations from Tirupati.
          </p>

          {/* DESTINATION SELECTION BAR */}
          <div className="dest-hero-booking-card">
            <div className="dest-select-group">
              <label htmlFor="hero-dest-picker">
                <MapPin size={16} /> Select Destination:
              </label>
              <select
                id="hero-dest-picker"
                className="dest-select-field"
                value={selectedDestSlug}
                onChange={(e) => setSelectedDestSlug(e.target.value)}
              >
                {destinations.map(d => (
                  <option key={d[0]} value={d[0]}>
                    {d[1]} {d[4] ? `(${d[4]})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="button dest-hero-book-btn"
              onClick={handleHeroBookClick}
            >
              <CreditCard size={18} /> Book {selectedDestObj ? selectedDestObj[1] : 'Cab'} 💳
            </button>
          </div>
        </div>
      </section>

      {/* CARDS LIST SECTION */}
      <div className="destinations-page-section">
        <div className="destinations-grid-container">
          {destinations.map((d, i) => (
            <ScrollReveal key={d[0]} direction="up" delay={i * 0.04}>
              <article className="dest-card">
                <div className="dest-card-image-wrapper">
                  <img src={d[3]} alt={d[1]} className="dest-card-img" loading="lazy" />
                  <span className="dest-price-badge">
                    From {d[4]}
                  </span>
                  <span className="dest-number-chip">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>
                </div>

                <div className="dest-card-content">
                  <div className="dest-card-header">
                    <span className="dest-route-eyebrow">
                      <Compass size={12} /> SACRED PILGRIMAGE ROUTE
                    </span>
                    <h3 className="dest-title">{d[1]}</h3>
                  </div>

                  <p className="dest-description">{d[2]}</p>

                  <div className="dest-actions-single">
                    <Link to={`/destinations/${d[0]}`} className="dest-btn-details">
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Easebuzz Checkout Modal */}
      {selectedPayDest && (
        <EasebuzzModal 
          isOpen={Boolean(selectedPayDest)}
          onClose={() => setSelectedPayDest(null)}
          initialData={{
            service: `${selectedPayDest[1]} Cab Booking`,
            amount: '500',
            fullAmount: selectedPayDest[4] || '2499'
          }}
        />
      )}
    </main>
  );
}

