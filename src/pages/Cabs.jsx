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
          {services.map(([I, t, d]) => (
            <article key={t}>
              <I />
              <h3>{t}</h3>
              <p>{d}</p>
              <button
                type="button"
                className="button"
                style={{ width: '100%', marginTop: '0.5rem', background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                onClick={() => setPayService(t)}
              >
                Book now 💳 <CheckCircle2 size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>

      {payService && (
        <EasebuzzModal
          isOpen={Boolean(payService)}
          onClose={() => setPayService(null)}
          initialData={{
            service: `${payService} Booking`,
            amount: '500',
            fullAmount: '2499'
          }}
        />
      )}
    </Page>
  );
}

