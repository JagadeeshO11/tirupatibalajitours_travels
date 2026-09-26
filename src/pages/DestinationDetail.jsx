import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, CheckCircle2, XCircle, Car, Phone, 
  MessageCircle, Sparkles, ShieldCheck, ArrowRight, ChevronRight, 
  CreditCard, Navigation, ChevronDown, Award, Users, Compass
} from 'lucide-react';
import { destinations, phone, whatsapp } from '../data/siteData';
import { getVehicleInfo } from '../data/packageData';
import { fleet } from '../data/fleetData';
import EasebuzzModal from '../components/EasebuzzModal';
import './DestinationDetail.css';

export default function DestinationDetail() {
  const { slug } = useParams();
  const [payModalData, setPayModalData] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Find destination by slug
  const d = destinations.find(x => x[0] === slug) || destinations.find(x => x[0] === 'srikalahasti') || destinations[0];
  const [destSlug, destName, destDesc, destImage, destPrice] = d;

  const whatsappUrl = `${whatsapp}?text=${encodeURIComponent(`Hi, I would like to book or inquire about the ${destName} Tour starting from ${destPrice}. Please share vehicle availability.`)}`;

  const faqs = [
    {
      q: `What is included in the ${destName} cab package?`,
      a: `The package includes a private AC vehicle with a dedicated driver, fuel charges for the entire round trip from Tirupati, and basic route guidance.`
    },
    {
      q: `Where will the driver pick us up for ${destName}?`,
      a: `We provide 24/7 doorstep pickup from Tirupati Railway Station, Tirupati Airport, hotels, or your residence in Tirupati.`
    },
    {
      q: `Can we visit additional nearby temples on the ${destName} route?`,
      a: `Yes! Our itineraries are flexible. You can request customized en-route stops when booking via WhatsApp or directly with your assigned driver.`
    },
    {
      q: `How do I confirm my booking for ${destName}?`,
      a: `You can instantly reserve your cab by paying a ₹1,000 advance token fee via our secure payment gateway or contacting us on WhatsApp.`
    }
  ];

  // Map destination specific indicative vehicle rates
  const basePriceNum = parseInt(destPrice.replace(/[^0-9]/g, '')) || 2999;

  const vehicleRates = [
    { name: 'Sedan (Dzire / Etios)', price: `₹${basePriceNum.toLocaleString('en-IN')}` },
    { name: 'Ertiga (6 Seater)', price: `₹${Math.round(basePriceNum * 1.25).toLocaleString('en-IN')}` },
    { name: 'Innova Crysta (7 Seater)', price: `₹${Math.round(basePriceNum * 1.55).toLocaleString('en-IN')}` },
    { name: 'Hycross (7 Seater)', price: `₹${Math.round(basePriceNum * 1.9).toLocaleString('en-IN')}` },
    { name: 'Fortuner (7 Seater)', price: `₹${Math.round(basePriceNum * 2.5).toLocaleString('en-IN')}` },
    { name: 'Tempo Traveller 12 Seater', price: `₹${Math.round(basePriceNum * 1.8).toLocaleString('en-IN')}` },
    { name: 'Urbania 12 Seater', price: `₹${Math.round(basePriceNum * 2.6).toLocaleString('en-IN')}` },
    { name: 'Tempo Traveller 16 Seater', price: `₹${Math.round(basePriceNum * 2.2).toLocaleString('en-IN')}` },
    { name: 'Urbania 16 Seater', price: `₹${Math.round(basePriceNum * 2.9).toLocaleString('en-IN')}` },
    { name: 'Tempo Traveller 20 Seater', price: `₹${Math.round(basePriceNum * 2.7).toLocaleString('en-IN')}` },
    { name: 'Mini Bus 27 Seater', price: `₹${Math.round(basePriceNum * 3.4).toLocaleString('en-IN')}` }
  ];

  return (
    <div className="dest-detail-page">
      {/* BREADCRUMB */}
      <nav className="dest-breadcrumb" aria-label="Breadcrumb">
        <div className="dest-container">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/destinations">Destinations</Link>
          <ChevronRight size={14} />
          <span>{destName}</span>
        </div>
      </nav>

      {/* HERO BANNER SECTION */}
      <section 
        className="dest-hero-section"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.82) 100%), url(${destImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="dest-container dest-hero-grid">
          <motion.div 
            className="dest-hero-content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="dest-eyebrow-badge">
              <Compass size={14} /> SACRED PILGRIMAGE DESTINATION
            </span>
            <h1>{destName} Tour Package</h1>
            
            <div className="dest-key-meta">
              <span className="meta-item"><Clock size={16} /> <strong>Flexible Timings</strong></span>
              <span className="meta-item"><MapPin size={16} /> <strong>Doorstep Tirupati Pickup</strong></span>
              <span className="meta-item price-highlight"><Sparkles size={16} /> Starts at <strong>{destPrice}</strong></span>
            </div>

            <p className="dest-hero-desc">
              {destDesc} Enjoy a private, comfortable cab journey from Tirupati with courteous local drivers who know the best routes and temple schedules.
            </p>

            <div className="dest-route-corridor">
              <div className="corridor-title">
                <Navigation size={15} /> <span>Route Corridor</span>
              </div>
              <p className="corridor-text">Tirupati Pickup → {destName} Sightseeing & Temple Darshan → Tirupati Drop</p>
            </div>

            <div className="dest-hero-actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-hero-whatsapp">
                <MessageCircle size={18} /> Book via WhatsApp
              </a>
              <button 
                type="button"
                className="btn-hero-pay"
                onClick={() => setPayModalData({ name: `${destName} Tour`, price: destPrice })}
              >
                <CreditCard size={18} /> Pay ₹1,000 Advance 💳
              </button>
              <a href={`tel:${phone}`} className="btn-hero-call">
                <Phone size={16} /> Call Driver/Manager
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="dest-hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="hero-card-image">
              <img src={destImage} alt={destName} />
              <div className="image-badge">★ Top Destination</div>
              <div className="trust-pill"><ShieldCheck size={14} /> Verified AC Cab</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TARIFF / VEHICLE SELECTION SECTION */}
      <section className="dest-pricing-section">
        <div className="dest-container">
          <div className="section-header">
            <span className="sub-tag">TRANSPARENT TARIFFS</span>
            <h2>Select Vehicle for {destName} Tour</h2>
            <p>Choose your vehicle based on group size and luxury preferences.</p>
          </div>

          <div className="vehicle-tariff-grid">
            {vehicleRates.map(({ name: vehicle, price }, i) => {
              const vInfo = getVehicleInfo(vehicle);
              return (
                <motion.div 
                  className="tariff-card"
                  key={vehicle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div className="tariff-card-media">
                    <img src={vInfo.image} alt={vehicle} loading="lazy" />
                    <span className="vehicle-cat-badge">{vInfo.category || 'AC CAB'}</span>
                    <span className="vehicle-seat-badge"><Users size={12}/> {vInfo.seats}</span>
                  </div>
                  <div className="tariff-card-header">
                    <h3>{vehicle}</h3>
                  </div>
                  <div className="tariff-card-body">
                    <div className="tariff-price">
                      <span className="price-val">{price}</span>
                      <span className="price-label">Indicative Tour Fare</span>
                    </div>

                    <div className="vehicle-rate-sheet-box">
                      <div className="rate-row">
                        <span>Local (8h / 80km):</span>
                        <strong>{vInfo.local}</strong>
                      </div>
                      <div className="rate-row">
                        <span>Local (12h / 150km):</span>
                        <strong>{vInfo.localLong}</strong>
                      </div>
                      <div className="rate-row highlight-rate">
                        <span>Outstation Tariff:</span>
                        <strong>{vInfo.outstation} <small>(Min {vInfo.minimum})</small></strong>
                      </div>
                    </div>

                    <div className="tariff-card-actions">
                      <button 
                        type="button" 
                        className="tariff-book-btn"
                        onClick={() => setPayModalData({ name: `${destName} (${vehicle})`, price })}
                      >
                        Pay ₹1,000 Token 💳
                      </button>
                      <a 
                        href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to book ${vehicle} for ${destName} Tour at ${price}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tariff-wa-btn"
                      >
                        <MessageCircle size={15}/> WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ITINERARY & INCLUSIONS GRID */}
      <section className="dest-details-main">
        <div className="dest-container main-grid">
          
          {/* SIGHTSEEING HIGHLIGHTS */}
          <div className="itinerary-column">
            <div className="column-title">
              <Calendar size={22} />
              <h2>{destName} Tour Highlights & Sightseeing</h2>
            </div>

            <div className="itinerary-timeline">
              <div className="timeline-item">
                <div className="timeline-badge">STEP 1</div>
                <div className="timeline-content">
                  <h3>Tirupati Doorstep Pickup</h3>
                  <p>Our driver picks you up from Tirupati Railway Station, Airport, or your hotel at your convenient time.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge">STEP 2</div>
                <div className="timeline-content">
                  <h3>Scenic Drive to {destName}</h3>
                  <p>Enjoy a comfortable, smooth ride in an air-conditioned vehicle with complimentary bottled water guidance.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge">STEP 3</div>
                <div className="timeline-content">
                  <h3>Temple Darshan & Sightseeing</h3>
                  <p>Visit the main temple complex, historical heritage points, and local markets at your own pace.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge">STEP 4</div>
                <div className="timeline-content">
                  <h3>Return Drop at Tirupati</h3>
                  <p>Relax as our driver safely brings you back to your Tirupati stay or transit point.</p>
                </div>
              </div>
            </div>

            {/* INCLUSIONS & EXCLUSIONS */}
            <div className="inc-exc-box">
              <div className="inc-block">
                <h3><CheckCircle2 size={18} className="icon-inc" /> What’s Included</h3>
                <p>Private AC vehicle with driver, fuel for the route corridor, Tirupati pickup & drop, and route assistance.</p>
              </div>
              <div className="exc-block">
                <h3><XCircle size={18} className="icon-exc" /> What’s Excluded</h3>
                <p>Darshan tickets, temple entry fees, toll gates, parking charges, meals, accommodation, and personal expenses.</p>
              </div>
            </div>
          </div>

          {/* SIDEBAR BOOKING WIDGET */}
          <div className="sidebar-column">
            <div className="sidebar-sticky-card">
              <div className="card-top">
                <span className="sidebar-badge">QUICK TOUR BOOKING</span>
                <div className="sidebar-price">
                  <small>Package Starts At</small>
                  <h3>{destPrice}</h3>
                </div>
              </div>

              <div className="sidebar-perks">
                <div><ShieldCheck size={16} /> <span>100% Guaranteed Doorstep Pickup</span></div>
                <div><Award size={16} /> <span>Transparent Rates & Verified Cabs</span></div>
                <div><Clock size={16} /> <span>24x7 Customer Support Line</span></div>
              </div>

              <div className="sidebar-actions">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sidebar-wa-btn">
                  <MessageCircle size={18} /> Book on WhatsApp
                </a>
                <button 
                  type="button" 
                  className="sidebar-pay-btn"
                  onClick={() => setPayModalData({ name: `${destName} Tour`, price: destPrice })}
                >
                  <CreditCard size={18} /> Pay ₹1,000 Advance Token 💳
                </button>
                <a href={`tel:${phone}`} className="sidebar-call-btn">
                  <Phone size={16} /> Call Driver/Manager: {phone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="dest-faq-section">
        <div className="dest-container">
          <div className="section-header">
            <span className="sub-tag">GOT QUESTIONS?</span>
            <h2>Frequently Asked Questions for {destName}</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EASEBUZZ PAYMENT MODAL */}
      {payModalData && (
        <EasebuzzModal 
          isOpen={Boolean(payModalData)}
          onClose={() => setPayModalData(null)}
          initialData={{
            service: `${payModalData.name}`,
            amount: '1000',
            fullAmount: payModalData.price || '2999'
          }}
        />
      )}
    </div>
  );
}
