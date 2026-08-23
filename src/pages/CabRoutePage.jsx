import {Link,useParams} from 'react-router-dom';
import {ArrowRight,CheckCircle2,Clock3,MapPin,Phone,MessageCircle,Route as RouteIcon} from 'lucide-react';
import {phone,whatsappBooking,vehicles} from '../data/siteData';
import {getCabRoute} from '../data/cabRoutes';
import './CabRoutePage.css';

export default function CabRoutePage({route: routeProp}){
 const {slug}=useParams();
 const route=routeProp || getCabRoute(slug);
 if(!route) return <main className="cab-route-page"><section className="section"><h1>Cab route not found</h1><Link className="button" to="/tirupati-cabs/tirupati-to-srikalahasti">Back to Tirupati Cabs</Link></section></main>;
 const fleet=route.prices?.length?route.prices:vehicles.slice(0,5).map(v=>[v[0],v[4]]);
 return <main className="cab-route-page">
  <section className="cab-route-hero">
   <div className="cab-route-hero-copy"><p className="eyebrow">TIRUPATI CABS · OUTSTATION TAXI</p><h1>{route.title}</h1><p>{route.description}</p><div className="cab-route-actions"><a className="button" href={`tel:${phone}`}><Phone size={16}/>Call Now</a><a className="button secondary" href={whatsappBooking(`Hi, I would like to book ${route.title}. Please share availability and current fare.`)} target="_blank" rel="noreferrer"><MessageCircle size={16}/>WhatsApp</a></div></div>
   <div className="cab-route-hero-image"><img src={route.image} alt={route.title}/><div className="route-price"><small>STARTING FROM</small><strong>{route.starting}</strong></div></div>
  </section>
  <section className="section route-facts"><div><MapPin/><span>Distance<strong>{route.distance}</strong></span></div><div><Clock3/><span>Travel time<strong>{route.time}</strong></span></div><div><RouteIcon/><span>Route<strong>{route.shortTitle}</strong></span></div></section>
  <section className="section route-content-grid"><div><p className="eyebrow">ROUTE & EXPERIENCE</p><h2>Plan your journey with confidence.</h2><p>{route.description}</p><div className="route-map-line"><span>Tirupati</span>{route.route.split('→').slice(1,-1).map((stop,i)=><span key={i}>{stop.trim()}</span>)}<span>{route.route.split('→').at(-1).trim()}</span></div></div><div className="route-highlights"><h3>Journey highlights</h3>{route.highlights.map(x=><div key={x}><CheckCircle2 size={17}/>{x}</div>)}</div></section>
  <section className="section pale route-pricing"><div className="section-heading compact"><div><p className="eyebrow">QUICK TAXI BOOKING</p><h2>Vehicle & pricing</h2></div><span className="route-note">Indicative fares · confirm current fare before booking</span></div><div className="route-price-grid">{fleet.map(([name,price])=><article key={name}><div><strong>{name}</strong><small>AC · With driver</small></div><b>{price}</b><a href={whatsappBooking(`Hi, I need ${name} for ${route.title}. Please confirm the current price.`)} target="_blank" rel="noreferrer">Book <ArrowRight size={14}/></a></article>)}</div><p className="pricing-note">Tolls, parking, interstate permits and other applicable charges may be extra depending on the route. Driver bata and additional km/hour charges may apply. Confirm the final quote with the team before travel.</p></section>
  <section className="section route-why"><p className="eyebrow">WHY TRAVEL WITH US</p><h2>Comfortable, reliable, flexible.</h2><div className="why-grid"><div><CheckCircle2/>Professional drivers</div><div><CheckCircle2/>Clean, comfortable vehicles</div><div><CheckCircle2/>24×7 booking support</div><div><CheckCircle2/>Flexible pickup & sightseeing</div></div></section>
  <section className="route-cta"><div><p className="eyebrow">READY TO GO?</p><h2>Book your {route.shortTitle} cab.</h2><p>Share your travel date, passengers and vehicle preference. We’ll confirm availability and the current fare.</p></div><div className="cab-route-actions"><a className="button" href={`tel:${phone}`}><Phone size={16}/>Call Now</a><a className="button secondary" href={whatsappBooking(`Hi, I would like to enquire about ${route.title}.`)} target="_blank" rel="noreferrer"><MessageCircle size={16}/>WhatsApp</a></div></section>
 </main>;
}
