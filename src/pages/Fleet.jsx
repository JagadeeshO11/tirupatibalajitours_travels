import { Users, Luggage, Wind, ShieldCheck, Clock3 } from 'lucide-react';
import Page from './PageTemplate';
import { images, vehicles, whatsapp } from '../data/siteData';
import './Fleet.css';
import './FleetOverride.css';
import { Link } from 'react-router-dom';

export default function Fleet(){
  return <Page eyebrow="FLEET & RENTALS" title="Travel in the right vehicle for your journey." text="From everyday Tirupati cabs to spacious group travellers and buses, choose a clean, AC vehicle with a professional driver." image={images.hero}>
    <section className="content" id="rentals">
      <div className="fleet-intro"><div><p className="eyebrow">OUR FLEET</p><h2>Comfort for 1. Space for 50.</h2><p className="fleet-subcopy">Cars, Tempo Travellers, Urbania and buses for local sightseeing, temple visits, airport transfers and outstation journeys.</p></div><div className="fleet-trust"><span><ShieldCheck/> Professional drivers</span><span><Wind/> AC fleet</span><span><Clock3/> 24/7 support</span></div></div>
      <div className="fleet-filter-row" aria-label="Fleet categories"><span>Cars</span><span>Tempo Travellers</span><span>Urbania</span><span>Buses</span></div>
      <div className="vehicle-slider">
        {vehicles.map(v=>{const id=v[0].toLowerCase().replace(/[^a-z0-9]+/g,'-'); return <article className="rental-card" key={v[0]}>
          <div className="vehicle-media"><img src={v[3]} alt={`${v[0]} rental in Tirupati`} loading="lazy"/><span className="media-type">{v[5] || 'AC · WITH DRIVER'}</span><div className="media-bottom"><span className="media-rate">{v[4]}</span><span className="media-seats"><Users/> {v[1]}</span></div></div>
          <div className="rental-info"><div className="vehicle-heading"><div><span className="vehicle-category">{v[6] || 'RENTAL VEHICLE'}</span><h3>{v[0]}</h3></div><span className="vehicle-capacity">{v[1]}</span></div><p className="vehicle-summary">{v[7] || 'Well-maintained, comfortable vehicle with a professional driver.'}</p><div className="vehicle-features"><span><Wind/> AC</span><span><Users/> {v[1]}</span><span><Luggage/> {v[2]}</span></div><Link className="view-details" to={`/fleet/${id}`}>View Details</Link><div className="rent-actions"><a className="button" href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to book ${v[0]} in Tirupati. Please share availability and the exact quote.`)}`} target="_blank" rel="noreferrer">Book on WhatsApp</a></div></div>
        </article>})}
      </div>
      <div className="fleet-pricing-note"><strong>Indicative pricing</strong><span>Published rates are starting/indicative figures. Exact pricing is confirmed according to your route and travel plan.</span></div>
    </section>
  </Page>
}
