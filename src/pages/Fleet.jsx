import {useState} from 'react';
import {ChevronDown,Check,Luggage,Users,Wind,ShieldCheck,Clock3} from 'lucide-react';
import Page from './PageTemplate';
import {images,vehicles,whatsapp} from '../data/siteData';
import './Fleet.css';
import './FleetOverride.css';

export default function Fleet(){
  const[open,setOpen]=useState(null);
  return <Page eyebrow="FLEET & RENTALS" title="Travel in the right vehicle for your journey." text="From everyday Tirupati cabs to spacious group travellers and buses, choose a clean, AC vehicle with a professional driver." image={images.hero}>
    <section className="content" id="rentals">
      <div className="fleet-intro">
        <div><p className="eyebrow">OUR FLEET</p><h2>Comfort for 1. Space for 50.</h2><p className="fleet-subcopy">Cars, Tempo Travellers, Urbania and buses for local sightseeing, temple visits, airport transfers and outstation journeys.</p></div>
        <div className="fleet-trust"><span><ShieldCheck/> Professional drivers</span><span><Wind/> AC fleet</span><span><Clock3/> 24/7 support</span></div>
      </div>
      <div className="fleet-filter-row" aria-label="Fleet categories"><span>Cars</span><span>Tempo Travellers</span><span>Urbania</span><span>Buses</span></div>
      <div className="vehicle-slider">
        {vehicles.map((v,i)=><article className={`rental-card ${open===i?'expanded':''}`} key={v[0]}>
          <div className="vehicle-media"><img src={v[3]} alt={`${v[0]} rental in Tirupati`} loading="lazy"/><span className="media-type">{v[5] || 'AC · WITH DRIVER'}</span><div className="media-bottom"><span className="media-rate">{v[4]}</span><span className="media-seats"><Users/> {v[1]}</span></div></div>
          <div className="rental-info"><div className="vehicle-heading"><div><span className="vehicle-category">{v[6] || 'RENTAL VEHICLE'}</span><h3>{v[0]}</h3></div><span className="vehicle-capacity">{v[1]}</span></div><p className="vehicle-summary">{v[7] || 'Well-maintained, comfortable vehicle with a professional driver.'}</p><div className="vehicle-features"><span><Wind/> AC</span><span><Users/> {v[1]}</span><span><Luggage/> {v[2]}</span></div><button className="details-toggle" onClick={()=>setOpen(open===i?null:i)}>View rental details <ChevronDown/></button>{open===i&&<div className="amenities"><b>Good to know</b><span><Check/> Professional driver included</span><span><Check/> Clean, maintained vehicle</span><span><Check/> Local & outstation availability</span><p>Final fare depends on route, duration, kilometres and applicable tolls, parking, permits and other trip-specific charges. Contact us for an exact quote.</p></div>}<div className="rent-actions"><a className="button" href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to book ${v[0]} in Tirupati. Please share availability and the exact quote.`)}`} target="_blank" rel="noreferrer">Book on WhatsApp</a><a className="rent-link" href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to rent ${v[0]}. Please share the rental details and quote.`)}`} target="_blank" rel="noreferrer">Get rental quote</a></div></div>
        </article>)}
      </div>
      <div className="fleet-pricing-note"><strong>Indicative pricing</strong><span>Published rates are starting/indicative figures. Exact pricing is confirmed according to your route and travel plan.</span></div>
    </section>
  </Page>
}
