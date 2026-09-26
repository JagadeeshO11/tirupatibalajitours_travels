import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CarFront, CheckCircle2, ChevronDown, MessageCircle, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { packageItineraries } from '../data/packageItineraries';
import { packageDetails } from '../data/packageDetails';
import { packagesData, getVehicleInfo } from '../data/packageData';
import EasebuzzModal from './EasebuzzModal';
import './PopularPackages.css';

export default function PopularPackages() {
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [payPkg, setPayPkg] = useState(null);
  const openPanel = (name, type) => setSelectedPanel({ name, type });
  const closePanel = () => setSelectedPanel(null);
  const whatsapp = (name) => `https://wa.me/918688624758?text=${encodeURIComponent(`Hi, I want to book ${name}`)}`;

  return <>
    <section className="popular-packages-section">
      <div className="popular-heading"><div><p className="eyebrow">🔥 MOST BOOKED PACKAGES</p><h2>Explore Our Popular Temple Tour Packages</h2><p>Safe, Comfortable & Memorable Journeys to Sacred Destinations</p></div><div className="popular-benefits"><span>🚕 Tolls Included</span><span>🅿️ Parkings Included</span><span>👨‍✈️ Driver Batta Included</span><span>🏛️ TN Border Tax Included</span><span>📞 24×7 Support</span><span>💰 Best Price Guaranteed</span></div></div>
      <div className="popular-package-grid">{packagesData.map((pkg, i) => { const { name, duration, route, image, slug } = pkg; const hasItinerary = Boolean(packageItineraries[name]); const data = packageDetails[name]; const startingPrice = data?.prices?.[0]?.[1] || '₹3,500'; return <motion.article className="popular-package-card" key={name} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.4,delay:(i%3)*.05}}><div className="popular-package-image"><img src={image} alt={name} loading="lazy"/><span className="popular-badge">★ Most Popular</span><span className="popular-duration">{duration} · From {startingPrice}</span></div><div className="popular-package-content"><h3>{name}</h3>
        <details className="popular-route-details">
          <summary className="popular-route-summary">
            <span>Route Corridor</span>
            <ChevronDown size={12} className="summary-chevron" />
          </summary>
          <p className="popular-route-text">{route}</p>
        </details>
        <div className="popular-actions-two">
          <button 
            type="button" 
            className="popular-btn-pay"
            onClick={() => setPayPkg({ name, price: startingPrice })}
          >
            <span>Pay 💳</span>
          </button>
          <Link to={`/tour/${slug}`} className="popular-btn-details">
            <span>Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div></motion.article>; })}</div>
    </section>
    {selectedPanel && <div className="itinerary-overlay" role="presentation" onClick={closePanel}><div className="itinerary-modal package-info-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button type="button" className="itinerary-close" aria-label="Close" onClick={closePanel}><X size={20}/></button>{(() => { const {name,type}=selectedPanel; const data=packageDetails[name]; if(type==='itinerary'){ return <><div className="itinerary-modal-header"><span className="itinerary-icon"><CalendarDays size={20}/></span><div><p>PACKAGE ITINERARY</p><h3>{name}</h3></div></div><div className="itinerary-days">{packageItineraries[name]?.map(({day,places}) => <div className="itinerary-day" key={day}><div className="itinerary-day-label">{day}</div><p>{places}</p></div>)}</div></>; } if(type==='prices'){ return <><div className="itinerary-modal-header"><span className="itinerary-icon"><CarFront size={20}/></span><div><p>VEHICLE & PRICES</p><h3>{name}</h3></div></div><div className="vehicle-price-list">{data?.prices.map(([vehicle,price]) => { const vInfo = getVehicleInfo(vehicle); return <div className="vehicle-price-row" key={vehicle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><img src={vInfo.image} alt={vehicle} style={{ width: 40, height: 28, objectFit: 'contain' }}/><span>{vehicle}</span></div><strong>{price}</strong></div>; })}</div></>; } return <><div className="itinerary-modal-header"><span className="itinerary-icon"><CheckCircle2 size={20}/></span><div><p>PACKAGE INCLUSIONS</p><h3>{name}</h3></div></div><div className="inclusion-box"><div><CheckCircle2 size={17}/><span>{data?.included}</span></div><div className="excluded"><X size={17}/><span>{data?.excluded}</span></div></div></>; })()}<div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}><button type="button" className="button" style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7' }} onClick={() => { setPayPkg({ name: selectedPanel.name, price: packageDetails[selectedPanel.name]?.prices?.[0]?.[1] || '3500' }); closePanel(); }}>Pay 💳</button><a className="itinerary-book" style={{ flex: 1 }} href={whatsapp(selectedPanel.name)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/> WhatsApp</a></div></div></div>}

    {payPkg && (
      <EasebuzzModal 
        isOpen={Boolean(payPkg)}
        onClose={() => setPayPkg(null)}
        initialData={{
          service: `${payPkg.name}`,
          amount: '1000',
          fullAmount: payPkg.price || '3500'
        }}
      />
    )}
  </>;
}

