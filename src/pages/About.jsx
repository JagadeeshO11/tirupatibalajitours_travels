import { ShieldCheck, Headphones, Clock3, Users, MapPin, Sparkles, CheckCircle2, MessageCircle, Route } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';

const values = [
  [ShieldCheck, 'Safety first', 'Clean, maintained vehicles and experienced drivers for temple, airport and long-distance travel.'],
  [Users, 'Group-ready fleet', 'Cars, Tempo Travellers, Urbania and buses for solo travellers, families, pilgrims and larger groups.'],
  [Clock3, 'Punctual service', 'We plan around pickup times, temple visits, airport schedules and your overall itinerary.'],
  [MessageCircle, 'Clear communication', 'Share your route and requirements on WhatsApp and get a straightforward travel plan before booking.']
];

const promises = [
  'Experienced drivers familiar with Tirupati, Tirumala and nearby temple routes',
  'AC vehicles selected around your group size and comfort requirements',
  'Local day rentals, airport transfers and outstation journeys',
  'Flexible travel plans for families, pilgrims, corporate groups and events',
  'WhatsApp-first booking with no backend account or complicated checkout'
];

export default function About(){
  return <Page eyebrow="ABOUT OUR COMPANY" title="Local knowledge. Dependable vehicles. Travel with confidence." text="Tirupati Balaji Tours & Travels helps families, pilgrims, groups and business travellers move comfortably around Tirupati and beyond." image={images.hero}>
    <section className="content prose">
      <div className="about-story">
        <div><span className="eyebrow">WHY TRAVEL WITH US</span><h2>Built around the way people actually travel in Tirupati.</h2></div>
        <p>Temple visits rarely follow a simple point-to-point journey. A trip may involve Tirumala, Padmavathi Temple, local sightseeing, the airport, railway station and an outstation destination in the same itinerary. We focus on making those transitions easier with the right vehicle, an experienced driver and clear communication.</p>
      </div>

      <div className="card-grid about-values">{values.map(([Icon,title,text])=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>

      <div className="about-split">
        <div className="about-panel"><span className="eyebrow">WHAT WE COVER</span><h2>One fleet for different kinds of journeys.</h2><div className="about-route-list"><span><MapPin/> Tirupati & Tirumala temple travel</span><span><Route/> Airport & railway station transfers</span><span><Users/> Family and group rentals</span><span><Sparkles/> Outstation and multi-day tours</span></div></div>
        <div className="about-panel about-check-panel"><span className="eyebrow">OUR PROMISE</span><h2>A simpler booking experience.</h2>{promises.map(item=><p key={item}><CheckCircle2/>{item}</p>)}<a className="button" href={`${whatsapp}?text=${encodeURIComponent('Hi, I want to plan a trip with Tirupati Balaji Tours & Travels. Please help me choose the right vehicle.')}`} target="_blank" rel="noreferrer">Plan my trip on WhatsApp</a></div>
      </div>

      <div className="about-bottom"><div><span className="eyebrow">THE RIGHT VEHICLE MATTERS</span><h2>From a compact Etios to a 50-seater bus.</h2><p>Choose based on passenger count, luggage, comfort and route. Our fleet includes economical cars, 12/17/20-seater Tempo Travellers, premium Urbania options and buses for larger groups.</p></div><div className="about-stat"><strong>4</strong><span>fleet categories</span><strong>50</strong><span>maximum seats</span></div></div>
    </section>
  </Page>
}
