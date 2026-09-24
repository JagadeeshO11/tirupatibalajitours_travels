import { useState } from 'react';
import { ArrowLeft, Check, Clock3, Fuel, Luggage, ShieldCheck, Users, Wind, CreditCard } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Page from './PageTemplate';
import { whatsapp } from '../data/siteData';
import { fleet } from '../data/fleetData';
import EasebuzzModal from '../components/EasebuzzModal';
import './VehicleDetails.css';

export default function VehicleDetails(){
  const { vehicleId } = useParams();
  const vehicle = fleet.find(v => v.id === vehicleId);
  const [showPayModal, setShowPayModal] = useState(false);

  if(!vehicle) return <Page eyebrow="FLEET" title="Vehicle not found" text="This vehicle is no longer available in the current fleet."><Link className="button" to="/fleet">Back to Fleet</Link></Page>;
  const { name,seats,bags,image,local,localLong,outstation,minimum,fuel,features,category,use } = vehicle;
  const message = `Hi, I want to rent ${name} in Tirupati. Please share availability and the current quote.`;
  
  return <Page eyebrow={category} title={name} text={use} image={image}>
    <section className="vehicle-detail content">
      <Link className="vehicle-back" to="/fleet"><ArrowLeft/> Back to fleet</Link>
      <div className="vehicle-detail-grid">
        <div className="vehicle-detail-media"><img src={image} alt={`${name} rental in Tirupati`} /></div>
        <div className="vehicle-detail-copy">
          <span className="vehicle-detail-category">{category}</span><h2>{name}</h2><p>{use}</p>
          <div className="vehicle-spec-grid"><span><Users/><b>{seats}</b><small>Capacity</small></span><span><Luggage/><b>{bags}</b><small>Luggage</small></span><span><Wind/><b>AC</b><small>Air conditioned</small></span><span><ShieldCheck/><b>Driver</b><small>Professional service</small></span></div>
          <div className="vehicle-detail-rate"><div><small>Local • 8 hrs / 80 km</small><strong>{local}</strong></div><div><small>Local • 12 hrs / 150 km</small><strong>{localLong}</strong></div><div><small>Outstation</small><strong>{outstation}</strong></div><span><Clock3/> {minimum}</span></div>
          <div className="vehicle-detail-feature-list">{features.map(feature=><span key={feature}><Check/> {feature}</span>)}<span><Fuel/> {fuel}</span></div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <a className="button" style={{ flex: 1 }} href={`${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Rent on WhatsApp</a>
            <button type="button" className="button" style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7' }} onClick={() => setShowPayModal(true)}>
              Pay 💳
            </button>
          </div>
        </div>
      </div>
      <div className="vehicle-detail-info"><div><span className="eyebrow">GOOD TO KNOW</span><h3>Plan the trip around your vehicle</h3><p>Published rates are indicative. Final pricing depends on your route, duration, kilometres and itinerary. Tolls, parking, permits, state taxes and other applicable trip-specific charges may be extra. For outstation travel, the minimum kilometre rule shown above applies.</p></div><ul><li><Check/> Professional driver included</li><li><Check/> Clean and maintained vehicle</li><li><Check/> Local, temple and outstation travel</li><li><Check/> Instant booking deposit confirmation</li></ul></div>
    </section>

    {showPayModal && (
      <EasebuzzModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        initialData={{
          service: `${name} Booking`,
          amount: '500',
          fullAmount: local || '2880'
        }}
      />
    )}
  </Page>;
}

