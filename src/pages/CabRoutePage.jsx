import {Link,useParams} from 'react-router-dom';
import {ArrowRight,CheckCircle2,Clock3,MapPin,Phone,MessageCircle,Route as RouteIcon,Info,ShieldCheck,Users,Landmark} from 'lucide-react';
import {phone,whatsappBooking,vehicles} from '../data/siteData';
import {getCabRoute} from '../data/cabRoutes';
import {srikalahastiContent} from '../data/srikalahastiContent';
import './CabRoutePage.css';

const ContentTable=({rows,headers})=><div className="content-table"><div className="content-table-head">{headers.map(h=><strong key={h}>{h}</strong>)}</div>{rows.map((row,i)=><div className="content-table-row" key={i}>{row.map((cell,j)=><span key={j}>{cell}</span>)}</div>)}</div>;

export default function CabRoutePage({route: routeProp}){
 const {slug}=useParams();
 const route=routeProp || getCabRoute(slug);
 if(!route) return <main className="cab-route-page"><section className="section"><h1>Cab route not found</h1><Link className="button" to="/tirupati-cabs/tirupati-to-srikalahasti">Back to Tirupati Cabs</Link></section></main>;
 const isSrikalahasti=route.slug==='tirupati-to-srikalahasti';
 const fleet=route.prices?.length?route.prices:vehicles.slice(0,5).map(v=>[v[0],v[4]]);
 return <main className="cab-route-page">
  <section className="cab-route-hero">
   <div className="cab-route-hero-copy"><p className="eyebrow">TIRUPATI CABS · OUTSTATION TAXI</p><h1>{isSrikalahasti?srikalahastiContent.title:route.title}</h1><p>{isSrikalahasti?srikalahastiContent.intro:route.description}</p><div className="cab-route-actions"><a className="button" href={`tel:${phone}`}><Phone size={16}/>Call Now</a><a className="button secondary" href={whatsappBooking(`Hi, I would like to book ${route.title}. Please share availability and current fare.`)} target="_blank" rel="noreferrer"><MessageCircle size={16}/>WhatsApp</a></div></div>
   <div className="cab-route-hero-image"><img src={route.image} alt={route.title}/><div className="route-price"><small>STARTING FROM</small><strong>{route.starting}</strong></div></div>
  </section>
  <section className="section route-facts"><div><MapPin/><span>Distance<strong>{route.distance}</strong></span></div><div><Clock3/><span>Travel time<strong>{route.time}</strong></span></div><div><RouteIcon/><span>Route<strong>{route.shortTitle}</strong></span></div></section>

  {isSrikalahasti ? <>
    <section className="section longform-section intro-section"><div className="longform-copy"><p className="eyebrow">SRIKALAHASTI TEMPLE</p><h2>Tirupati to Srikalahasti Distance & Temple Experience</h2><p>{srikalahastiContent.templeIntro}</p><div className="info-strip"><div><Landmark/><span><b>Vayu Sthalam</b><small>Air element shrine</small></span></div><div><MapPin/><span><b>Swarnamukhi River</b><small>Temple-side sacred geography</small></span></div><div><ShieldCheck/><span><b>Pilgrimage Route</b><small>Popular same-day journey</small></span></div></div></div></section>

    <section className="section longform-section"><div className="section-heading"><div><p className="eyebrow">ROUTE GUIDE</p><h2>{srikalahastiContent.route.heading}</h2></div></div><div className="route-guide-grid"><div><p><strong>Distance:</strong> {srikalahastiContent.route.distance}</p><p><strong>Travel time:</strong> {srikalahastiContent.route.time}</p><p><strong>Primary route:</strong> {srikalahastiContent.route.route}</p><div className="route-map-line">{srikalahastiContent.route.route.split('→').map((stop,i)=><span key={i}>{stop.trim()}</span>)}</div></div><div className="route-highlights"><h3>Route highlights</h3>{srikalahastiContent.route.details.map(x=><div key={x}><CheckCircle2 size={17}/>{x}</div>)}</div></div></section>

    <section className="section longform-section"><p className="eyebrow">TEMPLE INFORMATION</p><h2>Complete Temple Context</h2><div className="feature-list">{srikalahastiContent.temple.significance.map(x=><div key={x}><CheckCircle2 size={18}/><span>{x}</span></div>)}</div></section>

    <section className="section longform-section pale"><p className="eyebrow">DARSHAN GUIDE</p><h2>Darshan Timing & Schedule</h2><ContentTable headers={['Service','Timing','Duration']} rows={srikalahastiContent.darshan}/><h3 className="subheading">Special Darshan Options</h3><div className="option-grid">{srikalahastiContent.specialDarshan.map(([name,detail])=><div key={name}><strong>{name}</strong><span>{detail}</span></div>)}</div><div className="best-time-grid"><div><h3>Best Visit Times</h3><ul>{srikalahastiContent.bestTimes.map(x=><li key={x}>{x}</li>)}</ul></div><div className="callout"><Info/><div><strong>Planning note</strong><p>Temple schedules and queues can change. Confirm current timings and special-puja availability before travel.</p></div></div></div></section>

    <section className="section longform-section"><div className="two-col-copy"><div><p className="eyebrow">DRESS CODE</p><h2>Dress Code & Temple Guidelines</h2><h3>For Men</h3><ul>{srikalahastiContent.dressCode.men.map(x=><li key={x}>{x}</li>)}</ul><h3>For Women</h3><ul>{srikalahastiContent.dressCode.women.map(x=><li key={x}>{x}</li>)}</ul></div><div><p className="eyebrow">TEMPLE RULES</p><h2>Temple Rules</h2><div className="feature-list compact">{srikalahastiContent.rules.map(x=><div key={x}><ShieldCheck size={18}/><span>{x}</span></div>)}</div></div></div></section>

    <section className="section longform-section pale"><p className="eyebrow">TRAVEL TIPS</p><h2>Travel Tips for the Tirupati to Srikalahasti Journey</h2><div className="tip-grid"><div><h3>Planning Your Visit</h3><ul>{srikalahastiContent.travelTips.planning.map(x=><li key={x}>{x}</li>)}</ul></div><div><h3>Essential Tips</h3><ul>{srikalahastiContent.travelTips.essentials.map(x=><li key={x}>{x}</li>)}</ul></div><div><h3>What to Carry</h3><ul>{srikalahastiContent.travelTips.carry.map(x=><li key={x}>{x}</li>)}</ul></div></div></section>

    <section className="section longform-section"><p className="eyebrow">HOW IT WORKS</p><h2>Our Process Delivering Hassle-Free Travel</h2><div className="process-grid">{srikalahastiContent.process.map(([title,detail],i)=><div key={title}><span className="process-number">0{i+1}</span><h3>{title}</h3><p>{detail}</p></div>)}</div></section>

    <section className="section longform-section pale"><p className="eyebrow">TOUR PACKAGES</p><h2>Discover Tirupati & Srikalahasti Tour Packages</h2><div className="package-grid">{srikalahastiContent.packageHighlights.map(p=><article key={p.title}><span>{p.price}/-</span><h3>{p.title}</h3><small>{p.duration}</small><p>{p.route}</p><a href={whatsappBooking(`Hi, I would like to enquire about ${p.title}.`)} target="_blank" rel="noreferrer">Enquire Now <ArrowRight size={14}/></a></article>)}</div></section>

    <section className="section longform-section"><p className="eyebrow">OUR FLEET</p><h2>Our Fleet for Covering Tirupati to Srikalahasti</h2><div className="full-fleet-grid">{srikalahastiContent.fleet.map(v=><article key={v.name}><div className="fleet-card-top"><span>{v.category}</span><strong>{v.name}</strong><small>{v.type} · {v.persons} persons · AC · {v.bags} bags</small></div><div className="fleet-rates"><div><span>8 Hours / 80 KMs</span><b>{v.local8}</b></div><div><span>12 Hours / 150 KMs</span><b>{v.local12}</b></div><div><span>Outstation</span><b>{v.perKm}</b></div></div><small className="fleet-note">Minimum {v.minimum}. Toll, parking and permit charges may be extra.</small><a href={whatsappBooking(`Hi, I need ${v.name} for Tirupati to Srikalahasti. Please confirm current pricing.`)} target="_blank" rel="noreferrer">Book Now <ArrowRight size={14}/></a></article>)}</div></section>

    <section className="section longform-section pale"><p className="eyebrow">RENTAL REFERENCE</p><h2>Local & Outstation Rental Rates</h2><ContentTable headers={['Vehicle','Local Day Rent','Outstation Rate','Fuel Note','Minimum']} rows={srikalahastiContent.rentalRates}/><p className="table-note">Reference rates shown from the source page. Confirm the final quote, inclusions and applicable charges before booking.</p></section>

    <section className="section longform-section"><p className="eyebrow">WHY BOOK WITH US</p><h2>Comfortable, reliable, flexible.</h2><div className="why-grid six">{srikalahastiContent.whyUs.map(x=><div key={x}><CheckCircle2/>{x}</div>)}</div></section>

    <section className="section longform-section pale"><p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2>Frequently Asked Questions</h2><div className="faq-list">{srikalahastiContent.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  </> : <section className="section route-content-grid"><div><p className="eyebrow">ROUTE & EXPERIENCE</p><h2>Plan your journey with confidence.</h2><p>{route.description}</p><div className="route-map-line"><span>Tirupati</span>{route.route.split('→').slice(1,-1).map((stop,i)=><span key={i}>{stop.trim()}</span>)}<span>{route.route.split('→').at(-1).trim()}</span></div></div><div className="route-highlights"><h3>Journey highlights</h3>{route.highlights.map(x=><div key={x}><CheckCircle2 size={17}/>{x}</div>)}</div></section>}

  {!isSrikalahasti && <section className="section pale route-pricing"><div className="section-heading compact"><div><p className="eyebrow">QUICK TAXI BOOKING</p><h2>Vehicle & pricing</h2></div><span className="route-note">Indicative fares · confirm current fare before booking</span></div><div className="route-price-grid">{fleet.map(([name,price])=><article key={name}><div><strong>{name}</strong><small>AC · With driver</small></div><b>{price}</b><a href={whatsappBooking(`Hi, I need ${name} for ${route.title}. Please confirm the current price.`)} target="_blank" rel="noreferrer">Book <ArrowRight size={14}/></a></article>)}</div><p className="pricing-note">Tolls, parking, interstate permits and other applicable charges may be extra depending on the route. Driver bata and additional km/hour charges may apply. Confirm the final quote with the team before travel.</p></section>}

  <section className="route-cta"><div><p className="eyebrow">READY TO GO?</p><h2>Book your {route.shortTitle} cab.</h2><p>Share your travel date, passengers and vehicle preference. We’ll confirm availability and the current fare.</p></div><div className="cab-route-actions"><a className="button" href={`tel:${phone}`}><Phone size={16}/>Call Now</a><a className="button secondary" href={whatsappBooking(`Hi, I would like to enquire about ${route.title}.`)} target="_blank" rel="noreferrer"><MessageCircle size={16}/>WhatsApp</a></div></section>
 </main>;
}
