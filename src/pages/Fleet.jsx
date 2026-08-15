import { Luggage, Wind, ShieldCheck, Clock3, Fuel, Users, MapPin, Car, BusFront, Sparkles, CalendarDays, MapPinned, Plane, ArrowRight } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';
import { fleet, fleetCategories, fleetCapacityNote } from '../data/fleetData';
import './Fleet.css';
import './FleetOverride.css';
import { Link } from 'react-router-dom';

const categoryIcons = { cars: Car, tempo: Users, urbania: Sparkles, bus: BusFront };

export default function Fleet(){
  const rentalOptions = { icon: CalendarDays, label: 'Car Rentals', detail: 'Day rent · Tirupati · Airport', href: '#cars' };

  return <Page eyebrow="FLEET & RENTALS" title="Choose the right vehicle for your journey." text="From economical Tirupati cabs to premium Urbania, Tempo Travellers and large buses, choose the space, comfort and price point that fits your trip." image={images.hero}>
    <section className="content" id="rentals">
      <div className="fleet-intro"><div><p className="eyebrow">OUR FLEET</p><h2>Comfort for small groups. Space for everyone.</h2><p className="fleet-subcopy">Official fleet options cover local day rentals and outstation travel. Every quote is confirmed for your exact route and itinerary.</p></div><div className="fleet-trust"><span><ShieldCheck/> Professional drivers</span><span><Wind/> AC vehicles</span><span><Clock3/> 24/7 support</span></div></div>

      <div className="fleet-chooser" aria-label="Choose vehicle or rental option">
        <div className="fleet-chooser-copy"><span className="eyebrow">CHOOSE VEHICLE</span><strong>What are you travelling with?</strong><small>Jump directly to the vehicle type that fits your group.</small></div>
        <nav className="fleet-filter-row">
          {fleetCategories.slice(1).map(c=>{const Icon=categoryIcons[c.key] || Car; return <a className="fleet-choice" key={c.key} href={`#${c.key}`}><span className="fleet-choice-icon"><Icon/></span><span><b>{c.label}</b><small>{c.ids.length} options</small></span><span className="fleet-choice-arrow"><ArrowRight/></span></a>})}
          {(() => { const Icon=rentalOptions.icon; return <a className="fleet-choice" href={rentalOptions.href}><span className="fleet-choice-icon"><Icon/></span><span><b>{rentalOptions.label}</b><small>{rentalOptions.detail}</small></span><span className="fleet-choice-arrow"><ArrowRight/></span></a> })()}
        </nav>
      </div>

      <div className="fleet-pricing-strip"><div><span>LOCAL DAY RENT</span><strong>From ₹2,000/day</strong></div><div><span>OUTSTATION</span><strong>From ₹15/km</strong></div><div><span>GROUP OPTIONS</span><strong>Up to 50 seats</strong></div></div>
      {fleetCategories.slice(1).map(category=>{const items=fleet.filter(v=>category.ids.includes(v.id));return <section className="fleet-group" id={category.key} key={category.key}><div className="fleet-group-heading"><div><span className="eyebrow">{category.key==='cars'?'CARS':category.key==='tempo'?'TEMPO TRAVELLERS':category.key==='urbania'?'PREMIUM GROUP TRAVEL':'LARGE GROUP TRAVEL'}</span><h3>{category.label}</h3></div><span>{items.length} options</span></div><div className="vehicle-slider">{items.map(v=><article className="rental-card" key={v.id}>
        <div className="vehicle-media"><img src={v.image} alt={`${v.name} rental in Tirupati`} loading="lazy"/><span className="media-type">{v.category}</span><div className="media-bottom"><span className="media-rate">{v.local}</span><span className="media-seats"><Users/> {v.seats}</span></div></div>
        <div className="rental-info"><div className="vehicle-heading"><div><span className="vehicle-category">{v.category}</span><h3>{v.name}</h3></div><span className="vehicle-capacity">{v.seats} seats</span></div><p className="vehicle-summary">{v.use}</p><div className="vehicle-features">{v.features.map(feature=><span key={feature}><Wind/> {feature}</span>)}<span><Luggage/> {v.bags} bags</span><span><Fuel/> {v.fuel}</span></div><div className="vehicle-price-grid"><span><small>Local</small><b>{v.local}</b></span><span><small>Outstation</small><b>{v.outstation}</b></span></div><p className="vehicle-minimum"><MapPin/> Minimum {v.minimum}</p><Link className="view-details" to={`/fleet/${v.id}`}>View Details</Link><div className="rent-actions"><a className="button" href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to book ${v.name} in Tirupati. Please share availability and the exact quote.`)}`} target="_blank" rel="noreferrer">Book on WhatsApp</a></div></div>
      </article>)}</div></section>})}
      <div className="fleet-capacity-note"><strong>30-seater bus</strong><span>{fleetCapacityNote.replace('The official fleet information also lists a 30-seater bus. ','')}</span></div>
      <div className="fleet-pricing-note"><strong>Pricing note</strong><span>These are indicative figures published on the official service pages. Tolls, parking, permits, state taxes and other trip-specific charges may apply. Final pricing is confirmed on WhatsApp.</span></div>
    </section>
  </Page>
}
