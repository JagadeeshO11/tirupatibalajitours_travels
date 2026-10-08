import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Car, CheckCircle2, CreditCard } from 'lucide-react';
import Page from './PageTemplate';
import BookingForm from '../components/BookingForm';
import EasebuzzModal from '../components/EasebuzzModal';
import { images, services, whatsapp } from '../data/siteData';

export default function Cabs() {
  const [q] = useSearchParams();
  const [payService, setPayService] = useState(null);

  return (
    <Page eyebrow="TIRUPATI CAB SERVICE" title="A cab for every sacred journey." text="Reliable local, outstation, airport and temple taxi service from Tirupati." image={images.taxi}>
      <div className="content">
        <BookingForm />
        {q.get('from') && (
          <p className="result">
            Your search: <b>{q.get('from')} to {q.get('to')}</b>. Select a service below or <a href={whatsapp}>message us on WhatsApp</a>.
          </p>
        )}
        <section className="rental-banner">
          <div>
            <p className="eyebrow">INSIDE TIRUPATI · RENTALS</p>
            <h2>Need a car on rent?</h2>
            <p>Compare available cars, travellers and buses with clear daily starting rates.</p>
          </div>
          <Link className="button" to="/fleet">View vehicle availability</Link>
        </section>
        <div className="card-grid">
          {services.map(([I, t, d, p, slug]) => (
            <article key={t} style={{ display: 'flex', flexDirection: 'column' }}>
              <I />
              <h3>
                <Link to={`/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{t}</Link>
              </h3>
              <p style={{ flex: 1 }}>{d}</p>
              {p && (
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d97706', margin: '0.4rem 0 0.2rem 0' }}>
                  Starting from {p}
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Link
                  to={`/${slug}`}
                  className="button secondary"
                  style={{ flex: 1, padding: '0.55rem 0.4rem', fontSize: '0.82rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  View Details
                </Link>
                <button
                  type="button"
                  className="button"
                  style={{ flex: 1, padding: '0.55rem 0.4rem', fontSize: '0.82rem', background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}
                  onClick={() => setPayService({ title: t, price: p })}
                >
                  Book now 💳
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {payService && (
        <EasebuzzModal
          isOpen={Boolean(payService)}
          onClose={() => setPayService(null)}
          initialData={{
            service: payService.title,
            fullAmount: payService.price,
            type: 'service'
          }}
        />
      )}
    </Page>
  );
}

