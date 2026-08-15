import { ChevronDown, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicePages } from '../data/servicePages';
import { whatsapp } from '../data/siteData';
import './ServiceLanding.css';

export default function ServiceLanding(){
 const {slug}=useParams(); const data=servicePages[slug]; const [open,setOpen]=useState(null);
 if(!data) return <main className="service-page content"><h1>Service not found</h1><Link to="/services">Back to Services</Link></main>;
 const booking=`${whatsapp}?text=${encodeURIComponent(`Hi, I am interested in ${data.title}. Please share availability and the current quote.`)}`;
 return <main className="service-page">
  <section className="service-hero"><div className="service-hero-copy"><span className="eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><a className="button" href={booking} target="_blank" rel="noreferrer"><MessageCircle/> Enquire on WhatsApp</a></div><div className="service-hero-image"><img src={data.image} alt={data.title}/></div></section>
  <section className="content service-section"><div className="section-heading"><span className="eyebrow">WHY CHOOSE US</span><h2>A practical travel service, built around your trip.</h2></div><div className="service-highlights">{data.highlights.map(x=><div key={x}><ShieldCheck/><span>{x}</span></div>)}</div></section>
  <section className="service-section service-soft"><div className="content"><div className="section-heading"><span className="eyebrow">OPTIONS</span><h2>Choose what fits your journey.</h2></div><div className="service-vehicles">{data.vehicles.map(([name,capacity,price])=><article key={name}><div><Sparkles/><h3>{name}</h3><p>{capacity}</p></div><strong>{price}</strong></article>)}</div><p className="service-note">{data.outstation}</p></div></section>
  <section className="content service-section"><div className="section-heading"><span className="eyebrow">HOW IT WORKS</span><h2>Simple from enquiry to departure.</h2></div><div className="service-steps">{data.steps.map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div></section>
  <section className="content service-section"><div className="section-heading"><span className="eyebrow">FAQ</span><h2>Before you book.</h2></div><div className="service-faq">{data.faqs.map(([q,a],i)=><div className={open===i?'open':''} key={q}><button onClick={()=>setOpen(open===i?null:i)}>{q}<ChevronDown/></button>{open===i&&<p>{a}</p>}</div>)}</div></section>
  <section className="service-final"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Tell us where you’re going.</h2><p>Share your date, route and group size. We’ll suggest the right vehicle and current quote.</p><a className="button" href={booking} target="_blank" rel="noreferrer"><MessageCircle/> Chat on WhatsApp</a></div></section>
 </main>;
}
