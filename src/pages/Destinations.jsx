import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, CreditCard, ArrowRight } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';
import EasebuzzModal from '../components/EasebuzzModal';
import { useData } from '../context/DataContext';

export default function Destinations() {
  const { destinations } = useData();
  const [selectedPayDest, setSelectedPayDest] = useState(null);

  return (
    <Page 
      eyebrow="TEMPLE DESTINATIONS" 
      title="Every stop tells a sacred story." 
      text="Explore our handpicked temple and pilgrimage routes from Tirupati." 
      image={images.place}
    >
      <div className="content destination-list">
        {destinations.map((d, i) => (
          <article key={d[0]} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative' }}>
              <img src={d[3]} alt={d[1]} />
              <span className="popular-duration" style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(15,23,42,0.85)', color: '#34d399', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: 6 }}>
                From {d[4]}
              </span>
            </div>
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706' }}>0{i + 1} · SACRED ROUTE</span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem 0' }}>{d[1]}</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', flex: 1 }}>{d[2]}</p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                <Link to={`/destinations/${d[0]}`} className="button secondary" style={{ flex: 1, padding: '0.6rem', textAlign: 'center', fontSize: '0.85rem' }}>
                  Read Guide
                </Link>
                <a
                  href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to book a cab for ${d[1]} Tour starting at ${d[4]}. Please share availability.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                  style={{ flex: 1, padding: '0.6rem', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Book WhatsApp
                </a>
                <button
                  type="button"
                  className="button"
                  style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7', padding: '0.6rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.35rem' }}
                  onClick={() => setSelectedPayDest(d)}
                >
                  <CreditCard size={14} /> Pay Advance Token (Easebuzz)
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Easebuzz Checkout Modal */}
      {selectedPayDest && (
        <EasebuzzModal 
          isOpen={Boolean(selectedPayDest)}
          onClose={() => setSelectedPayDest(null)}
          initialData={{
            service: `${selectedPayDest[1]} Tour Advance Token`,
            amount: '500'
          }}
        />
      )}
    </Page>
  );
}
