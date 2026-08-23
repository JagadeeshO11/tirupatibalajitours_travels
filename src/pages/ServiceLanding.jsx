import { ChevronDown, MessageCircle, ShieldCheck, Sparkles, Snowflake, MonitorPlay, BatteryCharging, Armchair, Headphones, SprayCan, CalendarDays, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicePages } from '../data/servicePages';
import { whatsapp, phone } from '../data/siteData';
import './ServiceLanding.css';
const featureIcons=[Snowflake,MonitorPlay,BatteryCharging,Armchair,Headphones,SprayCan];
export default function ServiceLanding({slug:routeSlug}){
 const params=useParams(); const slug=routeSlug||params.slug; const data=servicePages[slug]; const [open,setOpen]=useState(null);
 if(!data) return <main className="service-page content"><h1>Service not found</h1><Link to="/services">Back to Services</Link></main>;
 const booking=`${whatsapp}?text=${encodeURIComponent(`Hi, I am interested in ${data.title}. Please share availability and the current quote.`)}`;
 return <main className="service-page">
  <section className="service-hero"><div className="service-hero-copy"><span className="eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><div className="service-actions"><a className="button" href={`tel:${phone}`}><Phone/> Call Now</a><a className="button" href={booking} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp</a></div></div><div className="service-hero-image"><img src={data.image} alt={data.title}/></div></section>
  <section className="content service-section"><div className="section-heading"><span className="eyebrow">WHY CHOOSE US</span><h2>{data.whyTitle || 'A practical travel service, built around your trip.'}</h2>{data.whyIntro&&<p>{data.whyIntro}</p>}</div><div className="service-highlights">{data.highlights.map(x=><div key={x}><ShieldCheck/><span>{x}</span></div>)}</div></section>
  {data.featureDetails&&<section className="service-section service-soft"><div className="content"><div className="section-heading"><span className="eyebrow">TOP FEATURES</span><h2>Comfort, convenience and a better group journey.</h2><p>Explore the features available across the published vehicle options.</p></div><div className="service-feature-grid">{data.featureDetails.map((x,i)=>{const Icon=featureIcons[i%featureIcons.length];return <article key={x[0]}><Icon/><h3>{x[0]}</h3><p>{x[1]}</p></article>})}</div></div></section>}
  <section className="service-section service-soft"><div className="content"><div className="section-heading"><span className="eyebrow">VEHICLE OPTIONS & PRICING</span><h2>Choose what fits your journey.</h2><p>{data.outstation}</p></div><div className="service-vehicles">{data.vehicles.map(([name,capacity,price])=><article key={name}><div><Sparkles/><h3>{name}</h3><p>{capacity}</p></div><strong>{price}</strong></article>)}</div></div></section>
  {data.packageNote&&<section className="content service-section service-package"><div className="service-package-card"><CalendarDays/><div><span className="eyebrow">LOCAL & OUTSTATION PACKAGES</span><h2>Plan the journey around your group.</h2><p>{data.packageNote}</p></div><a className="button" href={booking} target="_blank" rel="noreferrer"><MessageCircle/> Get package quote</a></div></section>}
  <section className="content service-section"><div className="section-heading"><span className="eyebrow">HOW IT WORKS</span><h2>Simple from enquiry to departure.</h2></div><div className="service-steps">{data.steps.map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div></section>
  <section className="content service-section"><div className="section-heading"><span className="eyebrow">FAQ</span><h2>Before you book.</h2></div><div className="service-faq">{data.faqs.map(([q,a],i)=><div className={open===i?'open':''} key={q}><button onClick={()=>setOpen(open===i?null:i)}>{q}<ChevronDown/></button>{open===i&&<p>{a}</p>}</div>)}</div></section>
  <section className="service-final"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Tell us where you’re going.</h2><p>Share your date, route and group size. We’ll suggest the right vehicle and current quote.</p><div className="service-actions"><a className="button" href={`tel:${phone}`}><Phone/> Call Now</a><a className="button" href={booking} target="_blank" rel="noreferrer"><MessageCircle/> Chat on WhatsApp</a></div></div></section>
 </main>;
}
