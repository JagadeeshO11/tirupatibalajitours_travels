import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronDown, MessageCircle, ShieldCheck, Sparkles, Snowflake, MonitorPlay, 
  BatteryCharging, Armchair, Headphones, SprayCan, CalendarDays, Phone, MapPin, 
  Clock3, ArrowRight, CheckCircle2, CarFront, Luggage, Users, Route as RouteIcon, 
  Car, Award, Navigation, Info, Fuel
} from 'lucide-react';
import { servicePages } from '../data/servicePages';
import { images, whatsapp, phone } from '../data/siteData';
import StatsBanner from '../components/StatsBanner';
import './ServiceLanding.css';

const featureIcons = [Snowflake, MonitorPlay, BatteryCharging, Armchair, Headphones, SprayCan];

const defaultTrips = [
  ['Tirumala Darshan', 'Tirupati → Tirumala', 'Temple visit • Same day'],
  ['Srikalahasti Temple', 'Tirupati → Srikalahasti', 'Pilgrimage • Same day'],
  ['Kanipakam Temple', 'Tirupati → Kanipakam', 'Pilgrimage • Same day'],
  ['Golden Temple', 'Tirupati → Vellore', 'Temple tour • Same day'],
  ['Kanchipuram', 'Tirupati → Kanchipuram', 'Temple circuit • Same day'],
  ['Pondicherry', 'Tirupati → Pondicherry', 'Sightseeing • 1–2 days']
];

const tripMap = {
  'car-rentals-in-tirupati': defaultTrips,
  'tempo-traveller-rental-in-tirupati': defaultTrips,
  'urbania-traveller-rental-in-tirupati': defaultTrips,
  'bus-rental-in-tirupati': [
    ['Tirupati Temple Circuit', 'Tirupati → Tirumala', 'Group pilgrimage • 1 day'],
    ['Srikalahasti & Kanipakam', 'Tirupati → Srikalahasti → Kanipakam', 'Temple tour • 1 day'],
    ['Kanchipuram Tour', 'Tirupati → Kanchipuram', 'Group pilgrimage • 1 day'],
    ['Arunachalam Tour', 'Tirupati → Arunachalam', 'Pilgrimage • 2 days'],
    ['Pondicherry Tour', 'Tirupati → Pondicherry', 'Group sightseeing • 2 days'],
    ['South India Temple Tour', 'Multi-city route', 'Custom multi-day group trip']
  ],
  'outstation-taxi-in-tirupati': [
    ['Srikalahasti', 'Tirupati → Srikalahasti', 'Temple trip • Same day'],
    ['Kanipakam', 'Tirupati → Kanipakam', 'Temple trip • Same day'],
    ['Golden Temple', 'Tirupati → Vellore', 'Temple trip • Same day'],
    ['Kanchipuram', 'Tirupati → Kanchipuram', 'Temple circuit • Same day'],
    ['Madurai', 'Tirupati → Madurai', 'Pilgrimage • Multi-day'],
    ['Srisailam', 'Tirupati → Srisailam', 'Pilgrimage • Multi-day']
  ],
  'taxi-in-tirupati': defaultTrips,
  'tirupati-airport-taxi': [
    ['Tirupati Airport → Tirupati', 'Airport → Hotel / City', 'Pickup • 30–40 min'],
    ['Tirupati Airport → Tirumala', 'Airport → Tirumala', 'Temple transfer'],
    ['Airport → Railway Station', 'Airport → Tirupati Railway Station', 'Transfer service'],
    ['Airport → Srikalahasti', 'Airport → Srikalahasti', 'Temple transfer'],
    ['Airport → Kanipakam', 'Airport → Kanipakam', 'Temple transfer'],
    ['Airport → Vellore', 'Airport → Golden Temple', 'Outstation transfer']
  ],
  'car-for-rent-in-tirupati-day-rentals': defaultTrips
};

const carRoutes = [
  ['Tirupati → Tirumala', '22 km', '~40 min'],
  ['Tirupati → Sri Kalahasti', '36 km', '~50 min'],
  ['Tirupati → Kanipakam', '72 km', '~1.5–2 hrs'],
  ['Tirupati → Vellore (Golden Temple)', '110 km', '~2.5 hrs'],
  ['Tirupati → Arunachalam', '200 km', '~5 hrs'],
  ['Tirupati → Chennai', '135 km', '~3 hrs'],
  ['Tirupati → Pondicherry', '200 km', '~5 hrs'],
  ['Tirupati → Bangalore', '250 km', '~5–6 hrs'],
  ['Tirupati → Hyderabad', '570 km', '~10–11 hrs'],
  ['Tirupati → Madurai', '430 km', '~8.5–9 hrs'],
  ['Tirupati → Coimbatore', '470 km', '~9–10 hrs'],
  ['Tirupati → Trichy', '390 km', '~7.5–8 hrs']
];

const vehicleImage = (name) => {
  const n = name.toLowerCase();
  if (n.includes('etios')) return images.etios;
  if (n.includes('ertiga')) return images.ertiga;
  if (n.includes('crysta')) return images.crysta;
  if (n.includes('urbania')) return images.urbania16;
  if (n.includes('tempo')) return images.tempo12;
  if (n.includes('27')) return images.bus27;
  if (n.includes('40')) return images.bus40;
  if (n.includes('50')) return images.bus50;
  return images.taxi;
};

export default function ServiceLanding({ slug: routeSlug }) {
  const params = useParams();
  const slug = routeSlug || params.slug;
  const data = servicePages[slug];
  const [openFaq, setOpenFaq] = useState(null);

  if (!data) {
    return (
      <main className="service-page content not-found-page">
        <h1>Service Page Not Found</h1>
        <p>The requested rental or taxi service page could not be found.</p>
        <Link className="button" to="/services">
          View All Services
        </Link>
      </main>
    );
  }

  const booking = `${whatsapp}?text=${encodeURIComponent(
    `Hi, I am interested in ${data.title}. Please share vehicle availability and exact trip fare.`
  )}`;
  
  const trips = tripMap[slug] || defaultTrips;

  return (
    <main className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="hero-backdrop-gradient"></div>
        <div className="service-hero-copy">
          <div className="hero-badge-pill">
            <Sparkles size={14} className="sparkle-icon" />
            <span>TIRUPATI BALAJI TOURS & TRAVELS • 24x7 SERVICE</span>
          </div>

          <span className="hero-kicker-tag">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p className="hero-description">{data.intro}</p>

          <div className="hero-trust-badges">
            <span><CheckCircle2 size={15} /> Verified Local Drivers</span>
            <span><CheckCircle2 size={15} /> Clean Sanitized AC Fleet</span>
            <span><CheckCircle2 size={15} /> Doorstep Pickup & Drop</span>
          </div>

          <div className="service-actions">
            <a className="button hero-call-btn" href={`tel:${phone}`}>
              <Phone size={16} /> Call {phone}
            </a>
            <a className="button hero-wa-btn" href={booking} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Instant WhatsApp Quote
            </a>
          </div>
        </div>

        <div className="service-hero-image-card">
          <img src={data.image || images.etios} alt={data.title} />
          <div className="hero-image-glass-tag">
            <Award size={18} />
            <div>
              <strong>Top Rated Service</strong>
              <small>Doorstep Pickup & 24/7 Support</small>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs Container */}
      <section className="section service-quick-container">
        <div className="service-quick-grid">
          <div className="quick-item">
            <MapPin size={22} />
            <div>
              <b>Local & Outstation</b>
              <small>Flexible pickup from airport, station, hotel</small>
            </div>
          </div>
          <div className="quick-item">
            <Clock3 size={22} />
            <div>
              <b>24×7 Instant Booking</b>
              <small>Round-the-clock driver & vehicle assistance</small>
            </div>
          </div>
          <div className="quick-item">
            <ShieldCheck size={22} />
            <div>
              <b>Experienced Drivers</b>
              <small>Familiar with Tirumala & South India routes</small>
            </div>
          </div>
          <div className="quick-action-box">
            <a href={booking} target="_blank" rel="noreferrer" className="button quick-book-btn">
              Get Trip Quote <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* About & Key Features Section */}
      <section className="section longform-section service-about-section">
        <div className="service-about-grid">
          <div>
            <span className="badge-pill"><CarFront size={13} /> ABOUT THIS SERVICE</span>
            <h2>{slug === 'car-rentals-in-tirupati' ? 'Car Rentals in Tirupati — Your Reliable Partner for Every Journey' : data.whyTitle || 'Travel around Tirupati with a plan tailored to your group'}</h2>
            <p className="lead-about-text">
              {data.intro} Whether you need a short temple transfer, a full-day city trip, or a multi-day South India pilgrimage circuit, choose the exact vehicle model that fits your group size and budget.
            </p>
          </div>

          <div className="service-about-points">
            <div className="point-card">
              <CheckCircle2 size={20} />
              <div>
                <strong>Doorstep Pickup & Drop</strong>
                <p>Pickup directly from Tirupati Airport, Railway Station, Hotel, or your home address.</p>
              </div>
            </div>
            <div className="point-card">
              <CheckCircle2 size={20} />
              <div>
                <strong>Local & Outstation Circuits</strong>
                <p>Cover Tirumala, Srikalahasti, Kanipakam, Vellore Golden Temple, Arunachalam, Pondicherry & more.</p>
              </div>
            </div>
            <div className="point-card">
              <CheckCircle2 size={20} />
              <div>
                <strong>Versatile Vehicle Options</strong>
                <p>Sedans, MUVs, Innova Crysta, 12-20 Seater Tempo Travellers, Urbania & Luxury Buses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple 3-Step Booking Process */}
      <section className="section longform-section pale">
        <div className="section-header-centered">
          <span className="badge-pill"><Navigation size={13} /> EASY 3-STEP BOOKING</span>
          <h2>Simple Booking. Exceptional Travel.</h2>
          <p>Book your preferred vehicle in under two minutes with zero hassle</p>
        </div>

        <div className="booking-steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Share Your Plan</h3>
            <p>Call or WhatsApp us your travel date, pickup location, destination, and passenger count.</p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Select Vehicle</h3>
            <p>Choose from our wide fleet of Sedans, SUVs, Tempo Travellers, or Buses matching your group size.</p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Travel comfortably</h3>
            <p>Confirm availability and quote. Your driver arrives punctually at your chosen pickup spot.</p>
          </div>
        </div>
      </section>

      {/* Vehicle Options & Pricing Grid */}
      <section className="section longform-section" id="vehicles">
        <div className="section-header">
          <span className="badge-pill gold"><Car size={13} /> {slug === 'car-rentals-in-tirupati' ? 'OUR CAR RENTAL PACKAGES' : 'VEHICLE OPTIONS & TARIFFS'}</span>
          <h2>{slug === 'car-rentals-in-tirupati' ? 'Select Your Car — Comfort, Space or Luxury' : 'Choose the Perfect Vehicle for Your Trip'}</h2>
          <p>{data.outstation}</p>
        </div>

        <div className="service-vehicles-grid">
          {data.vehicles.map(([name, capacity, price]) => (
            <article key={name} className="vehicle-card">
              <div className="vehicle-photo-wrap">
                <img src={vehicleImage(name)} alt={name} />
                <span className="vehicle-driver-tag">WITH EXPERIENCED DRIVER</span>
              </div>
              <div className="vehicle-card-content">
                <div className="vehicle-top-badge">
                  <Sparkles size={14} />
                  <span>{name.toUpperCase()}</span>
                </div>
                <h3>{name}</h3>
                <p className="vehicle-capacity">{capacity}</p>

                <div className="vehicle-specs-pills">
                  <span><Users size={13} /> Group Friendly</span>
                  <span><Luggage size={13} /> Ample Luggage</span>
                  <span><Snowflake size={13} /> Air Conditioned</span>
                </div>

                <div className="vehicle-price-box">
                  <small>Indicative Tariff</small>
                  <strong>{price}</strong>
                </div>

                <a 
                  href={`${whatsapp}?text=${encodeURIComponent(`Hi, I would like to book/enquire about ${name} for ${data.title}. Please share availability and current fare.`)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="button vehicle-book-btn"
                >
                  <MessageCircle size={15} /> Book / Check Availability
                </a>
              </div>
            </article>
          ))}
        </div>

        {slug === 'car-rentals-in-tirupati' && (
          <div className="fare-note-box">
            <Info size={18} />
            <p>
              <b>Important Tariff Note:</b> Tolls, parking, state/interstate permit fees, driver bata, and additional hour/km charges apply as per actual trip usage. Minimum billing distances are calculated from our Tirupati office.
            </p>
          </div>
        )}
      </section>

      {/* Popular Routes Distance Chart for Car Rentals / Outstation */}
      {(slug === 'car-rentals-in-tirupati' || slug === 'car-for-rent-in-tirupati-day-rentals' || slug === 'outstation-taxi-in-tirupati' || slug === 'taxi-in-tirupati') && (
        <section className="section longform-section pale">
          <div className="section-header">
            <span className="badge-pill"><RouteIcon size={13} /> DISTANCE & TIME GUIDE</span>
            <h2>Popular Outstation Routes & Travel Times</h2>
            <p>Quick reference distances from Tirupati to major pilgrimage destinations and cities</p>
          </div>

          <div className="route-table-card">
            <div className="route-table-grid">
              {carRoutes.map(([route, distance, time]) => (
                <div className="route-row-item" key={route}>
                  <span className="route-name"><RouteIcon size={16} /> {route}</span>
                  <b className="route-dist">{distance}</b>
                  <small className="route-time">{time}</small>
                  <a 
                    href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to plan a cab trip from ${route}.`)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="route-plan-link"
                  >
                    Plan Trip <ArrowRight size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Features Grid */}
      {data.featureDetails && (
        <section className="section longform-section">
          <div className="section-header">
            <span className="badge-pill"><Award size={13} /> VEHICLE AMENITIES</span>
            <h2>Comfort & Features On-Board</h2>
            <p>Enjoy premium amenities designed for a smooth and relaxing journey</p>
          </div>

          <div className="features-grid">
            {data.featureDetails.map((x, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <article key={x[0]} className="feature-card">
                  <div className="feature-icon-box"><Icon size={22} /></div>
                  <h3>{x[0]}</h3>
                  <p>{x[1]}</p>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Popular Trips Grid */}
      <section className="section longform-section pale">
        <div className="section-header">
          <span className="badge-pill gold"><MapPin size={13} /> POPULAR TRIPS & DESTINATIONS</span>
          <h2>Favorite Circuits Customers Plan from Tirupati</h2>
          <p>Choose an itinerary below or send us your customized travel plan</p>
        </div>

        <div className="service-trip-grid">
          {trips.map(([title, route, meta]) => (
            <article key={title} className="trip-card">
              <div className="trip-image-wrap">
                <img src={slug === 'car-rentals-in-tirupati' ? images.tirumala : data.image} alt={title} />
              </div>
              <div className="trip-card-content">
                <small className="trip-meta-tag">{meta}</small>
                <h3>{title}</h3>
                <p className="trip-route-desc">{route}</p>
                <a 
                  href={`${whatsapp}?text=${encodeURIComponent(`Hi, I would like to plan the trip: ${title} (${route}). Please share details.`)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="trip-plan-btn"
                >
                  Plan This Trip <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Included & Additional Details Card */}
      <section className="section longform-section">
        <div className="section-header">
          <span className="badge-pill"><ShieldCheck size={13} /> TRANSPARENT TERMS</span>
          <h2>What's Included & Arranged</h2>
        </div>

        <div className="inclusions-grid">
          <div className="inclusion-card">
            <h3>Included & Arranged</h3>
            <p>Air-conditioned vehicle with fuel, experienced driver for confirmed itinerary, doorstep pickup & drop, and trip coordination support.</p>
          </div>
          <div className="inclusion-card">
            <h3>Usually Additional</h3>
            <p>Interstate permits, toll gate fees, parking charges, driver bata, and entry tickets as per actual trip route usage.</p>
          </div>
          <div className="inclusion-card">
            <h3>Pre-Trip Advice</h3>
            <p>Share your departure date, pickup location, destination, group size, and preferred vehicle to receive a finalized quotation.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section longform-section pale">
        <div className="section-header">
          <span className="badge-pill"><Info size={13} /> FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions regarding our taxi and rental services</p>
        </div>

        <div className="service-faq-list">
          {data.faqs.map(([q, a], i) => (
            <details 
              key={q} 
              className="service-faq-item"
              open={openFaq === i}
              onClick={(e) => {
                e.preventDefault();
                setOpenFaq(openFaq === i ? null : i);
              }}
            >
              <summary className="service-faq-summary">
                <span>{q}</span>
                <ChevronDown className="faq-chevron" size={18} />
              </summary>
              <div className="service-faq-answer">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* --- STATS COUNTER BANNER --- */}
      <StatsBanner title="Trusted Vehicle Rentals & Cab Services" subtitle="WHY CHOOSE US" />

      {/* Bottom CTA Banner */}
      <section className="service-final-cta">
        <div className="final-cta-copy">
          <span className="badge-pill gold"><Sparkles size={13} /> READY FOR YOUR TRIP?</span>
          <h2>Plan Your Journey with Tirupati Balaji Tours</h2>
          <p>Share your travel date, pickup point, destination, and vehicle preference. We will confirm vehicle availability and send an instant quote.</p>
          
          <div className="service-actions cta-actions">
            <a className="button hero-call-btn" href={`tel:${phone}`}>
              <Phone size={16} /> Call {phone}
            </a>
            <a className="button hero-wa-btn" href={booking} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="mobile-sticky-bar">
        <a href={`tel:${phone}`} className="sticky-btn call">
          <Phone size={16} /> Call Now
        </a>
        <a href={booking} target="_blank" rel="noreferrer" className="sticky-btn whatsapp">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </main>
  );
}
