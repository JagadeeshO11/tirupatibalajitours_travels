import { ArrowLeft, Check, Clock3, Fuel, Luggage, ShieldCheck, Users, Wind } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Page from './PageTemplate';
import { whatsapp } from '../data/siteData';
import { fleet } from '../data/fleetData';
import './VehicleDetails.css';

export default function VehicleDetails(){
  const { vehicleId } = useParams();
  const vehicle = fleet.find(v => v.id === vehicleId);
  if(!vehicle) return <Page eyebrow="FLEET" title="Vehicle not found" text="This vehicle is no longer available in the current fleet."><Link className="button" to="/fleet">Back to Fleet</Link></Page>;
  const { name,seats,bags,image,local,outstation,minimum,fuel,features,category,use } = vehicle;
  const message = `Hi, I want to rent ${name} in Tirupati. Please share availability and the current quote.`;
  return <Page eyebrow={category} title={name} text={use} image={image}>
    <section className="vehicle-detail content">
      <Link className="vehicle-back" to="/fleet"><ArrowLeft/> Back to fleet</Link>
      <div className="vehicle-detail-grid">
        <div className="vehicle-detail-media"><img src={image} alt={`${name} rental in Tirupati`} /></div>
        <div className="vehicle-detail-copy">
          <span className="vehicle-detail-category">{category}</span><h2>{name}</h2><p>{use}</p>
          <div className="vehicle-spec-grid"><span><Users/><b>{seats}</b><small>Capacity</small></span><span><Luggage/><b>{bags}</b><small>Luggage</small></span><span><Wind/><b>AC</b><small>Air conditioned</small></span><span><ShieldCheck/><b>Driver</b><small>Professional service</small></span></div>
          <div className="vehicle-detail-rate"><div><small>Local day rent</small><strong>{local}</strong></div><div><small>Outstation</small><strong>{outstation}</strong></div><span><Clock3/> {minimum}</span></div>
          <div className="vehicle-detail-feature-list">{features.map(feature=><span key={feature}><Check/> {feature}</span>)}<span><Fuel/> {fuel}</span></div>
          <a className="button" href={`${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Rent on WhatsApp</a>
        </div>
      </div>
      <div className="vehicle-detail-info"><div><span className="eyebrow">GOOD TO KNOW</span><h3>Plan the trip around your vehicle</h3><p>Published rates are indicative. Final pricing depends on your route, duration, kilometres and itinerary. Tolls, parking, permits, state taxes and other applicable trip-specific charges may be extra. For outstation travel, the minimum kilometre rule shown above applies.</p></div><ul><li><Check/> Professional driver included</li><li><Check/> Clean and maintained vehicle</li><li><Check/> Local, temple and outstation travel</li><li><Check/> Availability confirmed through WhatsApp</li></ul></div>
    </section>
  </Page>;
}
