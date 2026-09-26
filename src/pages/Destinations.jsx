import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import Page from './PageTemplate';
import { images } from '../data/siteData';
import EasebuzzModal from '../components/EasebuzzModal';
import { useData } from '../context/DataContext';
import ScrollReveal from '../components/ScrollReveal';
import './Destinations.css';

export default function Destinations() {
  const { destinations } = useData();
  const [selectedPayDest, setSelectedPayDest] = useState(null);

  return (
    <Page 
      eyebrow="TEMPLE DESTINATIONS & TOUR ROUTES" 
      title="Every stop tells a sacred story." 
      text="Explore handpicked temple circuits, historical landmarks, and outstation pilgrimage destinations from Tirupati." 
      image={images.place}
    >
      <div className="destinations-page-section">
        <div className="destinations-grid-container">
          {destinations.map((d, i) => (
            <ScrollReveal key={d[0]} direction="up" delay={i * 0.05}>
              <article className="dest-card">
                <div className="dest-card-image-wrapper">
                  <img src={d[3]} alt={d[1]} className="dest-card-img" />
                  <span className="dest-price-badge">
                    From {d[4]}
                  </span>
                  <span className="dest-number-chip">
                    0{i + 1}
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

                  <div className="dest-actions-two">
                    <button
                      type="button"
                      className="dest-btn-pay"
                      onClick={() => setSelectedPayDest(d)}
                    >
                      <span>Pay 💳</span>
                    </button>
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
            service: `${selectedPayDest[1]} Tour`,
            amount: '500',
            fullAmount: selectedPayDest[4] || '2499'
          }}
        />
      )}
    </Page>
  );
}
