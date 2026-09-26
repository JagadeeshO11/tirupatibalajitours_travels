import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, MapPin, CheckCircle2, XCircle, Car, Phone, 
  MessageCircle, Sparkles, ShieldCheck, ArrowRight, ChevronRight, 
  CreditCard, Navigation, ChevronDown, Award, HelpCircle, Users
} from 'lucide-react';
import { getTourBySlug, packagesData, getVehicleInfo } from '../data/packageData';
import EasebuzzModal from '../components/EasebuzzModal';
import './TourDetail.css';

export default function TourDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tour = getTourBySlug(slug);
  const [payModalData, setPayModalData] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  if (!tour) {
    return (
      <div className="tour-not-found">
        <div className="not-found-container">
          <h2>Tour Package Not Found</h2>
          <p>We couldn't find the tour package you were looking for.</p>
          <Link to="/tours" className="button primary-btn">
            Browse All Tour Packages
          </Link>
        </div>
      </div>
    );
  }

  const phone = '+918688624758';
  const whatsappUrl = `https://wa.me/918688624758?text=${encodeURIComponent(`Hi, I would like to book or inquire about the ${tour.name} (${tour.duration}). Starting from ${tour.startingPrice}.`)}`;

  const faqs = [
    {
      q: 'Are toll charges, driver allowance, and parking included in the price?',
      a: tour.included || 'Yes! All outstation state taxes, toll gate fees, parking charges, and driver batta are completely included in the tariff.'
    },
    {
      q: 'Can we customize the departure timing or pickup point?',
      a: 'Absolutely! We offer 24x7 doorstep pickup from Tirupati Railway Station, Tirupati Airport, hotels, or home locations at your preferred departure time.'
    },
    {
      q: 'Is temple Special Entry Darshan (₹300) included in the package?',
      a: 'Darshan tickets and temple entrance fees are excluded. However, our experienced drivers guide you on optimal timings and ticket counter locations at every temple.'
    },
    {
      q: 'How do I confirm my tour booking?',
      a: 'You can instantly lock your booking by paying a nominal ₹1,000 advance token fee via our secure payment gateway or contacting us directly on WhatsApp.'
    }
  ];

  return (
    <div className="tour-detail-page">
      {/* BREADCRUMB */}
      <nav className="tour-breadcrumb" aria-label="Breadcrumb">
        <div className="tour-container">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/tours">Tours</Link>
          <ChevronRight size={14} />
          <span>{tour.name}</span>
        </div>
      </nav>

      {/* HERO BANNER SECTION */}
      <section 
        className="tour-hero-section"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.82) 100%), url(${tour.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="tour-container tour-hero-grid">
          <motion.div 
            className="tour-hero-content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tour-eyebrow-badge">
              <Sparkles size={14} /> PILGRIMAGE & SIGHTSEEING TOUR
            </span>
            <h1>{tour.name}</h1>
            
            <div className="tour-key-meta">
              <span className="meta-item"><Clock size={16} /> <strong>{tour.duration}</strong></span>
              <span className="meta-item"><MapPin size={16} /> <strong>Private AC Cab</strong></span>
              <span className="meta-item price-highlight"><Sparkles size={16} /> From <strong>{tour.startingPrice}</strong></span>
            </div>

            <p className="tour-hero-desc">
              Experience a smooth, comfortable, and soul-fulfilling temple journey with our professional drivers, clean AC vehicles, and transparent pricing with zero hidden charges.
            </p>

            <div className="tour-route-corridor">
              <div className="corridor-title">
                <Navigation size={15} /> <span>Route Corridor</span>
              </div>
              <p className="corridor-text">{tour.route}</p>
            </div>

            <div className="tour-hero-actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-hero-whatsapp">
                <MessageCircle size={18} /> Book via WhatsApp
              </a>
              <button 
                type="button"
                className="btn-hero-pay"
                onClick={() => setPayModalData({ name: tour.name, price: tour.startingPrice })}
              >
                <CreditCard size={18} /> Pay ₹1,000 Advance 💳
              </button>
              <a href={`tel:${phone}`} className="btn-hero-call">
                <Phone size={16} /> Call Now
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="tour-hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="hero-card-image">
              <img src={tour.image} alt={tour.name} />
              <div className="image-badge">★ Most Booked Package</div>
              <div className="trust-pill"><ShieldCheck size={14} /> Verified Private Cab</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TARIFF / VEHICLE PRICING SECTION */}
      <section className="tour-pricing-section">
        <div className="tour-container">
          <div className="section-header">
            <span className="sub-tag">TRANSPARENT RATES</span>
            <h2>Indicative Vehicle Tariffs for {tour.name}</h2>
            <p>Select your preferred vehicle type for a private, customized travel experience.</p>
          </div>

          <div className="vehicle-tariff-grid">
            {tour.prices?.map(([vehicle, price], i) => {
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
                      <span className="price-label">Fixed Package Rate</span>
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
                        onClick={() => setPayModalData({ name: `${tour.name} (${vehicle})`, price })}
                      >
                        Pay ₹1,000 Token 💳
                      </button>
                      <a 
                        href={`https://wa.me/918688624758?text=${encodeURIComponent(`Hi, I want to book ${tour.name} with ${vehicle} at ${price}.`)}`}
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
      <section className="tour-details-main">
        <div className="tour-container main-grid">
          
          {/* DAY-BY-DAY ITINERARY */}
          <div className="itinerary-column">
            <div className="column-title">
              <Calendar size={22} />
              <h2>Day-by-Day Tour Itinerary</h2>
            </div>

            <div className="itinerary-timeline">
              {tour.itinerary?.map((item, idx) => (
                <div className="timeline-item" key={item.day + idx}>
                  <div className="timeline-badge">{item.day}</div>
                  <div className="timeline-content">
                    <h3>{item.day} Detailed Route & Sightseeing</h3>
                    <p>{item.places}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INCLUSIONS & EXCLUSIONS */}
            <div className="inc-exc-box">
              <div className="inc-block">
                <h3><CheckCircle2 size={18} className="icon-inc" /> What’s Included</h3>
                <p>{tour.included}</p>
              </div>
              <div className="exc-block">
                <h3><XCircle size={18} className="icon-exc" /> What’s Excluded</h3>
                <p>{tour.excluded}</p>
              </div>
            </div>
          </div>

          {/* SIDEBAR BOOKING WIDGET */}
          <div className="sidebar-column">
            <div className="sidebar-sticky-card">
              <div className="card-top">
                <span className="sidebar-badge">QUICK ADVANCE BOOKING</span>
                <div className="sidebar-price">
                  <small>Package Starts At</small>
                  <h3>{tour.startingPrice}</h3>
                </div>
              </div>

              <div className="sidebar-perks">
                <div><ShieldCheck size={16} /> <span>100% Guaranteed Doorstep Pickup</span></div>
                <div><Award size={16} /> <span>Transparent Pricing - No Surprises</span></div>
                <div><Clock size={16} /> <span>24x7 Customer Support Hotline</span></div>
              </div>

              <div className="sidebar-actions">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="sidebar-wa-btn">
                  <MessageCircle size={18} /> Instant Booking on WhatsApp
                </a>
                <button 
                  type="button" 
                  className="sidebar-pay-btn"
                  onClick={() => setPayModalData({ name: tour.name, price: tour.startingPrice })}
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
      <section className="tour-faq-section">
        <div className="tour-container">
          <div className="section-header">
            <span className="sub-tag">GOT QUESTIONS?</span>
            <h2>Frequently Asked Questions</h2>
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

      {/* SIMILAR PACKAGES CAROUSEL / GRID */}
      <section className="tour-similar-section">
        <div className="tour-container">
          <div className="section-header">
            <span className="sub-tag">EXPLORE MORE</span>
            <h2>Other Popular Tour Packages</h2>
          </div>

          <div className="similar-grid">
            {packagesData
              .filter(p => p.slug !== tour.slug)
              .slice(0, 3)
              .map(p => (
                <div key={p.slug} className="similar-card">
                  <img src={p.image} alt={p.name} />
                  <div className="similar-content">
                    <span className="similar-duration">{p.duration}</span>
                    <h4>{p.name}</h4>
                    <p>{p.route}</p>
                    <Link to={`/tour/${p.slug}`} className="similar-link">
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
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
            fullAmount: payModalData.price || '3500'
          }}
        />
      )}
    </div>
  );
}
