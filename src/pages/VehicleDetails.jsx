import { ArrowLeft, Check, Clock3, Luggage, ShieldCheck, Users, Wind } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Page from './PageTemplate';
import { vehicles, whatsapp } from '../data/siteData';
import './VehicleDetails.css';

export default function VehicleDetails(){
  const { vehicleId } = useParams();
  const vehicle = vehicles.find(v => v[0].toLowerCase().replace(/[^a-z0-9]+/g,'-') === vehicleId);
  if(!vehicle) return <Page eyebrow="FLEET" title="Vehicle not found" text="This vehicle is no longer available in the current fleet."><Link className="button" to="/fleet">Back to Fleet</Link></Page>;
  const [name,seats,bags,image,rate,service,category,summary,minimum] = vehicle;
  const message = `Hi, I want to rent ${name} in Tirupati. Please share availability and the exact quote.`;
  return <Page eyebrow={category} title={name} text={summary} image={image}>
    <section className="vehicle-detail content">
      <Link className="vehicle-back" to="/fleet"><ArrowLeft/> Back to fleet</Link>
      <div className="vehicle-detail-grid">
        <div className="vehicle-detail-media"><img src={image} alt={`${name} rental vehicle`} /></div>
        <div className="vehicle-detail-copy">
          <span className="vehicle-detail-category">{category}</span><h2>{name}</h2><p>{summary}</p>
          <div className="vehicle-spec-grid"><span><Users/><b>{seats}</b><small>Capacity</small></span><span><Luggage/><b>{bags}</b><small>Luggage</small></span><span><Wind/><b>AC</b><small>Climate control</small></span><span><ShieldCheck/><b>With driver</b><small>Service</small></span></div>
          <div className="vehicle-detail-rate"><small>Indicative rate</small><strong>{rate}</strong><span><Clock3/> {minimum}</span></div>
          <a className="button" href={`${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Rent on WhatsApp</a>
        </div>
      </div>
      <div className="vehicle-detail-info"><div><span className="eyebrow">GOOD TO KNOW</span><h3>Built for a comfortable journey</h3><p>Every rental is arranged with a professional driver. Final pricing depends on your route, duration, kilometres and applicable tolls, parking, permits and other trip-specific charges.</p></div><ul><li><Check/> Professional driver included</li><li><Check/> Clean and maintained vehicle</li><li><Check/> Local & outstation travel</li><li><Check/> Availability confirmed through WhatsApp</li></ul></div>
    </section>
  </Page>;
}
