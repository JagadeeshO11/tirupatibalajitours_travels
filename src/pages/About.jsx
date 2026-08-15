import { ShieldCheck, Headphones, Clock3, Users, MapPin, Sparkles, CheckCircle2, MessageCircle, Route, Car, BusFront, Plane, HeartHandshake, Navigation, Star } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';
import './About.css';

const values = [
  [ShieldCheck, 'Safety first', 'Clean, maintained vehicles and experienced drivers for temple, airport and long-distance travel.'],
  [Users, 'Group-ready fleet', 'Cars, Tempo Travellers, Urbania and buses for families, pilgrims, corporate groups and events.'],
  [Clock3, 'Punctual service', 'We plan around pickup times, temple visits, airport schedules and your complete itinerary.'],
  [MessageCircle, 'Clear communication', 'Share your route and requirements on WhatsApp and receive a straightforward travel plan before booking.']
];

const services = [
  [MapPin, 'Tirupati & Tirumala', 'Temple visits, local sightseeing and flexible city travel.'],
  [Plane, 'Airport Transfers', 'Comfortable pickup and drop between Tirupati and the airport.'],
  [Car, 'Car Rentals', 'Cars for local day rentals, airport trips and outstation journeys.'],
  [BusFront, 'Group Travel', 'Tempo Travellers, Urbania and buses for larger groups and tours.']
];

const promises = [
  'Experienced drivers familiar with Tirupati, Tirumala and nearby temple routes',
  'AC vehicles selected around your group size and comfort requirements',
  'Local day rentals, airport transfers and outstation journeys',
  'Flexible travel plans for families, pilgrims, corporate groups and events',
  'Vehicles cleaned and prepared before every trip',
  'WhatsApp-first booking with simple, direct communication'
];

export default function About(){
  return <Page eyebrow="ABOUT TIRUPATI BALAJI TOURS & TRAVELS" title="Travel through Tirupati with a team that understands the journey." text="We provide cars, Tempo Travellers, Urbania and buses for temple visits, airport transfers, local travel, family trips, group tours and outstation journeys." image={images.hero}>
    <section className="content prose">
      <div className="about-story">
        <div><span className="eyebrow">WHO WE ARE</span><h2>Local travel knowledge, comfortable vehicles and service built around your itinerary.</h2></div>
        <p>Tirupati travel often means more than one destination. A family may need Tirumala darshan, Padmavathi Temple, local sightseeing, an airport transfer and an outstation journey within the same trip. We make those connections easier by helping you choose the right vehicle and plan the journey around your schedule.</p>
      </div>

      <div className="about-highlight"><div className="about-highlight-icon"><HeartHandshake/></div><div><span className="eyebrow">OUR APPROACH</span><h2>Comfort should be planned, not discovered halfway through the trip.</h2><p>From a compact car for a couple to a large bus for a group, we match the vehicle to passengers, luggage, route and travel purpose. Every booking is discussed directly so your final plan is clear before you travel.</p></div></div>

      <div className="about-section-head"><span className="eyebrow">WHY CHOOSE US</span><h2>A dependable travel partner for Tirupati.</h2></div>
      <div className="card-grid about-values">{values.map(([Icon,title,text])=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>

      <div className="about-section-head services-head"><span className="eyebrow">WHAT WE DO</span><h2>One service for many kinds of journeys.</h2></div>
      <div className="about-services">{services.map(([Icon,title,text])=><article key={title}><div className="about-service-icon"><Icon/></div><div><h3>{title}</h3><p>{text}</p></div><Navigation/></article>)}</div>

      <div className="about-split">
        <div className="about-panel"><span className="eyebrow">OUR COVERAGE</span><h2>From temple streets to long-distance roads.</h2><div className="about-route-list"><span><MapPin/> Tirupati & Tirumala temple travel</span><span><Route/> Airport & railway station transfers</span><span><Users/> Family and group rentals</span><span><Sparkles/> Outstation and multi-day tours</span></div></div>
        <div className="about-panel about-check-panel"><span className="eyebrow">OUR PROMISE</span><h2>Simple, safe and transparent.</h2>{promises.map(item=><p key={item}><CheckCircle2/>{item}</p>)}<a className="button" href={`${whatsapp}?text=${encodeURIComponent('Hi, I want to plan a trip with Tirupati Balaji Tours & Travels. Please help me choose the right vehicle.')}`} target="_blank" rel="noreferrer">Plan my trip on WhatsApp</a></div>
      </div>

      <div className="about-trust"><div><span className="eyebrow">BUILT FOR REAL TRIPS</span><h2>Whether it is darshan, a family holiday or a group tour, the details matter.</h2><p>We focus on clean vehicles, experienced drivers, practical pickup planning and clear communication. Tell us where you are going, how many people are travelling and what comfort you need. We will help you choose an appropriate vehicle.</p></div><div className="about-trust-points"><span><Star/> Customer-focused service</span><span><ShieldCheck/> Safety-conscious travel</span><span><Headphones/> 24/7 travel support</span></div></div>

      <div className="about-bottom"><div><span className="eyebrow">THE RIGHT VEHICLE MATTERS</span><h2>From a compact Etios to a 50-seater bus.</h2><p>Choose based on passenger count, luggage, comfort and route. Our fleet includes economical cars, 12/17/20-seater Tempo Travellers, premium Urbania options and buses for larger groups.</p></div><div className="about-stat"><strong>4</strong><span>fleet categories</span><strong>50</strong><span>maximum seats</span></div></div>
    </section>
  </Page>
}
