import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Clock3, MapPin, Phone, MessageCircle, 
  Route as RouteIcon, ShieldCheck, Landmark, Info, Sparkles, Car, 
  Users, Fuel, ChevronDown, Award, Calendar, Navigation
} from 'lucide-react';
import { phone, whatsappBooking, vehicles } from '../data/siteData';
import { getCabRoute } from '../data/cabRoutes';
import { srikalahastiContent } from '../data/srikalahastiContent';
import { cabRouteContent } from '../data/cabRouteContent';
import StatsBanner from '../components/StatsBanner';
import './CabRoutePage.css';

const ContentTable = ({ rows, headers, routeTitle }) => (
  <div className="content-table-card">
    <div className="content-table-header-strip">
      <div className="table-title">
        <Car className="table-title-icon" size={18} />
        <div>
          <h3>Vehicle Tariff & Fare Chart</h3>
          <p>Transparent pricing for {routeTitle || 'your journey'}</p>
        </div>
      </div>
    </div>
    <div className="content-table">
      <div className="content-table-head">
        {headers.map(h => <strong key={h}>{h}</strong>)}
        <span>Action</span>
      </div>
      {rows.map((row, i) => (
        <div className="content-table-row" key={i}>
          {row.map((cell, j) => (
            <span key={j} className={j === 1 ? 'fare-cell' : 'vehicle-cell'}>
              {cell}
            </span>
          ))}
          <a 
            className="table-book-btn" 
            href={whatsappBooking(`Hi, I would like to book ${row[0]} for ${routeTitle || 'cab service'}. Please share exact fare and availability.`)}
            target="_blank" 
            rel="noreferrer"
          >
            <MessageCircle size={13} /> Book
          </a>
        </div>
      ))}
    </div>
    <p className="table-note">
      <Info size={13} /> Rates are indicative starting fares. Final pricing may vary based on exact pickup point, toll gates, state permits, parking fees, and seasonal demand.
    </p>
  </div>
);

function DetailedRouteContent({ content, route }) {
  const [activeTab, setActiveTab] = useState('vehicles');
  const fleet = route.prices?.length ? route.prices : vehicles.slice(0, 5).map(v => [v[0], v[4]]);
  const stops = route.route.split('→').map(s => s.trim());

  return (
    <>
      {/* Visual Route Timeline & Highlights Section */}
      <section className="section route-timeline-section">
        <div className="section-header-centered">
          <span className="badge-pill"><Navigation size={13} /> JOURNEY CORRIDOR</span>
          <h2>Route Map & Travel Experience</h2>
          <p>Detailed road overview from Tirupati to {route.shortTitle.split('→')[1]?.trim() || 'destination'}</p>
        </div>

        <div className="route-guide-grid">
          <div className="timeline-card">
            <div className="card-badge"><RouteIcon size={16} /> Route Stops</div>
            <div className="route-timeline">
              {stops.map((stop, i) => (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot ${i === 0 ? 'start' : i === stops.length - 1 ? 'end' : 'stop'}`}>
                    <span>{i + 1}</span>
                  </div>
                  <div className="timeline-content">
                    <h4>{stop}</h4>
                    <p>{i === 0 ? 'Starting Point • Pickup from Tirupati Airport / Railway Station / Hotel' : i === stops.length - 1 ? 'Final Destination • Temple Shrine / Sightseeing Drop' : 'En-route Stop / Highway Connection'}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="route-desc-text">{content.routeText}</p>
          </div>

          <div className="highlights-card">
            <div className="highlights-header">
              <Sparkles size={18} />
              <h3>Journey Highlights</h3>
            </div>
            <div className="highlights-list">
              {content.highlights.map(x => (
                <div key={x} className="highlight-chip">
                  <CheckCircle2 size={16} />
                  <span>{x}</span>
                </div>
              ))}
            </div>
            <div className="driver-guarantee-box">
              <ShieldCheck size={20} />
              <div>
                <strong>Experienced Outstation Driver</strong>
                <p>Well-versed with local temple routes, state border procedures, and safe highway driving.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Experience & Information */}
      <section className="section longform-section pale">
        <div className="temple-experience-card">
          <div className="longform-copy">
            <span className="badge-pill gold"><Landmark size={13} /> {content.eyebrow}</span>
            <h2>{content.templeTitle}</h2>
            <p className="lead-text">{content.templeText}</p>

            <div className="info-strip">
              {content.facts.map(([label, value]) => (
                <div key={label} className="fact-box">
                  <Info size={16} />
                  <div>
                    <b>{label}</b>
                    <small>{value}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Fleet & Tariff Section */}
      <section className="section longform-section" id="tariff">
        <div className="section-header-centered">
          <span className="badge-pill"><Car size={13} /> OUTSTATION FLEET & FARES</span>
          <h2>Select Your Preferred Vehicle</h2>
          <p>Clean, sanitized, comfortable AC cabs with professional drivers</p>
        </div>

        <div className="fleet-card-grid">
          {[
            { name: 'Swift Dzire / Etios', type: 'Sedan', seats: '4 Passengers', luggage: '2 Bags', price: route.prices?.[0]?.[1] || '₹3,500', icon: 'sedan', popular: false },
            { name: 'Maruti Ertiga', type: 'MUV', seats: '6 Passengers', luggage: '3 Bags', price: route.prices?.[1]?.[1] || '₹4,800', icon: 'suv', popular: true },
            { name: 'Toyota Innova Crysta', type: 'Premium SUV', seats: '7 Passengers', luggage: '4 Bags', price: route.prices?.[2]?.[1] || '₹5,800', icon: 'premium', popular: false },
            { name: 'Tempo Traveller', type: 'Minibus', seats: '12 / 16 Seater', luggage: '6+ Bags', price: route.prices?.[3]?.[1] || '₹7,500', icon: 'minibus', popular: false }
          ].map((car, idx) => (
            <div className={`fleet-pricing-card ${car.popular ? 'featured' : ''}`} key={idx}>
              {car.popular && <span className="popular-tag">MOST POPULAR</span>}
              <div className="car-card-header">
                <span className="car-type">{car.type}</span>
                <h3>{car.name}</h3>
              </div>
              <div className="car-price-tag">
                <small>Starting from</small>
                <strong>{car.price}</strong>
              </div>
              <ul className="car-specs">
                <li><Users size={14} /> {car.seats}</li>
                <li><Car size={14} /> {car.luggage}</li>
                <li><CheckCircle2 size={14} /> Air Conditioned (AC)</li>
                <li><CheckCircle2 size={14} /> Clean & Sanitized Interior</li>
                <li><CheckCircle2 size={14} /> Fuel & Driver Allowance Incl.</li>
              </ul>
              <a 
                href={whatsappBooking(`Hi, I would like to book a ${car.name} for ${route.title}. Please confirm exact fare and availability.`)}
                target="_blank" 
                rel="noreferrer" 
                className="button full-width"
              >
                <MessageCircle size={15} /> Book {car.name}
              </a>
            </div>
          ))}
        </div>

        <ContentTable headers={['Vehicle Category', 'Indicative Fare']} rows={fleet} routeTitle={route.title} />
      </section>

      {/* Visitor Guide & Guidelines */}
      <section className="section longform-section pale">
        <div className="section-header">
          <span className="badge-pill"><ShieldCheck size={13} /> PILGRIM & VISITOR ADVISORY</span>
          <h2>Temple Guidelines & Travel Tips</h2>
          <p>Essential information to help you plan a seamless pilgrimage</p>
        </div>

        <div className="feature-list">
          {content.guide.map(([title, text]) => (
            <div key={title} className="guide-card">
              <div className="guide-icon"><ShieldCheck size={20} /></div>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="section longform-section">
        <div className="section-header">
          <span className="badge-pill gold"><Calendar size={13} /> RECOMMENDED CIRCUITS</span>
          <h2>Popular Tour & Pilgrimage Packages</h2>
          <p>Combine multiple temples and sightseeing spots in one customized itinerary</p>
        </div>

        <div className="package-grid">
          {content.packages.map(([title, duration, routeText, price]) => (
            <article key={title} className="package-card">
              <div className="package-card-badge">{duration}</div>
              <h3>{title}</h3>
              <p className="package-route-text">{routeText}</p>
              <div className="package-footer">
                <div className="package-price">
                  <small>Starting from</small>
                  <strong>{price}</strong>
                </div>
                <a 
                  href={whatsappBooking(`Hi, I would like to enquire about the package: ${title}.`)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="package-btn"
                >
                  Enquire Now <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Book With Us Section */}
      <section className="section longform-section pale">
        <div className="section-header-centered">
          <span className="badge-pill"><Award size={13} /> TRUST & RELIABILITY</span>
          <h2>Why Devotees Choose Tirupati Balaji Tours</h2>
          <p>Your comfort, safety, and spiritual journey are our top priority</p>
        </div>

        <div className="why-grid six">
          {[
            { title: 'Punctual Doorstep Pickup', desc: 'Pickup directly from Airport, Railway Station, or Hotel at your chosen time.' },
            { title: 'Experienced Local Drivers', desc: 'Drivers who know temple routes, darshan rules, and highway conditions thoroughly.' },
            { title: '100% Transparent Fares', desc: 'No surprise charges or hidden fees. All toll and permit details explained clearly.' },
            { title: 'Clean & Sanitized Cabs', desc: 'Regularly serviced AC vehicles with comfortable seats and ample luggage space.' },
            { title: '24/7 Booking Support', desc: 'Instant WhatsApp and call assistance before, during, and after your trip.' },
            { title: 'Flexible Multi-Stop Plans', desc: 'Customize your itinerary to add nearby temples, restaurants, or sightseeing stops.' }
          ].map(x => (
            <div key={x.title} className="why-card">
              <CheckCircle2 className="why-icon" size={22} />
              <div>
                <strong>{x.title}</strong>
                <p>{x.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section longform-section">
        <div className="section-header">
          <span className="badge-pill"><Info size={13} /> GOT QUESTIONS?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Tirupati to {route.shortTitle.split('→')[1]?.trim() || 'destination'} cab service</p>
        </div>

        <div className="faq-list">
          {content.faqs.map(([q, a]) => (
            <details key={q} className="faq-item">
              <summary className="faq-question">
                <span>{q}</span>
                <ChevronDown className="faq-chevron" size={18} />
              </summary>
              <div className="faq-answer">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

export default function CabRoutePage({ route: routeProp }) {
  const { slug } = useParams();
  const route = routeProp || getCabRoute(slug);

  if (!route) {
    return (
      <main className="cab-route-page">
        <section className="section not-found-section">
          <h1>Cab Route Not Found</h1>
          <p>We couldn't find the specific cab route you were looking for.</p>
          <Link className="button" to="/tirupati-cabs/tirupati-to-srikalahasti">
            Browse Tirupati Cab Routes
          </Link>
        </section>
      </main>
    );
  }

  const isSrikalahasti = route.slug === 'tirupati-to-srikalahasti';
  const content = cabRouteContent[route.slug] || {
    eyebrow: 'OUTSTATION PILGRIMAGE TAXI',
    intro: route.description,
    facts: [
      ['Distance', route.distance],
      ['Typical drive', route.time],
      ['Primary route', route.route]
    ],
    templeTitle: `${route.title}: Journey & Pilgrimage Details`,
    templeText: route.description,
    routeTitle: `Route & Distance Information`,
    routeText: `The journey covers approximately ${route.distance} and takes around ${route.time} depending on traffic and road conditions.`,
    highlights: route.highlights || ['Comfortable AC cab', 'Doorstep pickup', 'Experienced driver'],
    guideTitle: 'Travel Guidelines',
    guide: [
      ['Booking', 'Advance booking is recommended for weekend and festival rush.'],
      ['Timings', 'Departure time can be customized according to your convenience.']
    ],
    packages: [
      [`${route.title} Round Trip`, '1 Day', route.route, route.starting]
    ],
    faqs: [
      [`What is the distance for ${route.title}?`, `The road distance is ${route.distance}.`],
      [`How long does the journey take?`, `It takes approximately ${route.time} by private cab.`]
    ]
  };

  const fleet = route.prices?.length ? route.prices : vehicles.slice(0, 5).map(v => [v[0], v[4]]);

  return (
    <main className="cab-route-page">
      {/* Hero Section */}
      <section className="cab-route-hero">
        <div className="cab-route-hero-backdrop"></div>
        <div className="cab-route-hero-copy">
          <div className="hero-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>TIRUPATI OUTSTATION CABS • 24x7 TAXI SERVICE</span>
          </div>

          <h1>{isSrikalahasti ? srikalahastiContent.title : route.title}</h1>
          
          <p className="hero-intro-text">
            {isSrikalahasti ? srikalahastiContent.intro : content?.intro || route.description}
          </p>

          <div className="hero-badges-row">
            <span><CheckCircle2 size={14} /> Doorstep Pickup</span>
            <span><CheckCircle2 size={14} /> Verified Drivers</span>
            <span><CheckCircle2 size={14} /> Instant Confirmation</span>
          </div>

          <div className="cab-route-actions">
            <a className="button hero-call-btn" href={`tel:${phone}`}>
              <Phone size={16} /> Call {phone}
            </a>
            <a 
              className="button secondary hero-wa-btn" 
              href={whatsappBooking(`Hi, I would like to book ${route.title}. Please share availability and current fare.`)} 
              target="_blank" 
              rel="noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp Booking
            </a>
          </div>
        </div>

        <div className="cab-route-hero-image">
          <img src={route.image} alt={route.title} />
          <div className="route-price-glass">
            <span className="price-label">STARTING FARE</span>
            <strong className="price-val">{route.starting}</strong>
            <small className="price-sub">Includes vehicle & driver</small>
          </div>
        </div>
      </section>

      {/* Quick Route Facts Strip */}
      <section className="section route-facts-container">
        <div className="route-facts">
          <div className="fact-item">
            <div className="fact-icon-wrap"><MapPin size={20} /></div>
            <div>
              <span>Road Distance</span>
              <strong>{route.distance}</strong>
            </div>
          </div>

          <div className="fact-item">
            <div className="fact-icon-wrap"><Clock3 size={20} /></div>
            <div>
              <span>Estimated Time</span>
              <strong>{route.time}</strong>
            </div>
          </div>

          <div className="fact-item">
            <div className="fact-icon-wrap"><RouteIcon size={20} /></div>
            <div>
              <span>Route Corridor</span>
              <strong>{route.shortTitle}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      {isSrikalahasti ? (
        <>
          <section className="section longform-section intro-section">
            <div className="longform-copy">
              <span className="badge-pill gold"><Landmark size={13} /> SRIKALAHASTI TEMPLE</span>
              <h2>Tirupati to Srikalahasti Distance & Temple Experience</h2>
              <p className="lead-text">{srikalahastiContent.templeIntro}</p>
              
              <div className="info-strip">
                <div className="fact-box">
                  <Landmark size={18} />
                  <div>
                    <b>Vayu Sthalam</b>
                    <small>Air element Panchabhoota shrine</small>
                  </div>
                </div>
                <div className="fact-box">
                  <MapPin size={18} />
                  <div>
                    <b>Swarnamukhi River</b>
                    <small>Sacred riverbank geography</small>
                  </div>
                </div>
                <div className="fact-box">
                  <ShieldCheck size={18} />
                  <div>
                    <b>Pilgrimage Route</b>
                    <small>Popular 37km same-day trip</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section longform-section">
            <div className="section-header">
              <span className="badge-pill"><Navigation size={13} /> ROUTE DETAILS</span>
              <h2>{srikalahastiContent.route.heading}</h2>
            </div>
            
            <div className="route-guide-grid">
              <div className="timeline-card">
                <p><strong>Distance:</strong> {srikalahastiContent.route.distance}</p>
                <p><strong>Travel time:</strong> {srikalahastiContent.route.time}</p>
                <p><strong>Primary route:</strong> {srikalahastiContent.route.route}</p>
                
                <div className="route-map-line">
                  {srikalahastiContent.route.route.split('→').map((stop, i) => (
                    <span key={i}>{stop.trim()}</span>
                  ))}
                </div>
              </div>

              <div className="highlights-card">
                <h3>Route highlights</h3>
                <div className="highlights-list">
                  {srikalahastiContent.route.details.map(x => (
                    <div key={x} className="highlight-chip">
                      <CheckCircle2 size={16} />
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section longform-section pale">
            <div className="section-header">
              <span className="badge-pill"><Clock3 size={13} /> DARSHAN TIMINGS</span>
              <h2>Darshan Timing & Schedule</h2>
            </div>
            <ContentTable headers={['Service', 'Timing', 'Duration']} rows={srikalahastiContent.darshan} routeTitle="Srikalahasti Temple" />
            
            <h3 className="subheading">Special Darshan Options</h3>
            <div className="option-grid">
              {srikalahastiContent.specialDarshan.map(([name, detail]) => (
                <div key={name} className="option-card">
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section longform-section">
            <div className="two-col-copy">
              <div>
                <h2>Dress Code Guidelines</h2>
                <h3>For Men</h3>
                <ul>{srikalahastiContent.dressCode.men.map(x => <li key={x}>{x}</li>)}</ul>
                <h3>For Women</h3>
                <ul>{srikalahastiContent.dressCode.women.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h2>Temple Rules</h2>
                <div className="feature-list compact">
                  {srikalahastiContent.rules.map(x => (
                    <div key={x} className="guide-card">
                      <ShieldCheck size={18} />
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section longform-section pale">
            <div className="section-header-centered">
              <span className="badge-pill"><Sparkles size={13} /> TOUR PACKAGES</span>
              <h2>Srikalahasti Tour Packages</h2>
            </div>
            <div className="package-grid">
              {srikalahastiContent.packageHighlights.map(p => (
                <article key={p.title} className="package-card">
                  <div className="package-card-badge">{p.duration}</div>
                  <h3>{p.title}</h3>
                  <p className="package-route-text">{p.route}</p>
                  <div className="package-footer">
                    <div className="package-price">
                      <small>Fare</small>
                      <strong>{p.price}/-</strong>
                    </div>
                    <a 
                      href={whatsappBooking(`Hi, I would like to enquire about ${p.title}.`)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="package-btn"
                    >
                      Enquire Now <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section longform-section">
            <div className="section-header-centered">
              <span className="badge-pill"><Car size={13} /> VEHICLE FLEET</span>
              <h2>Fleet for Tirupati to Srikalahasti</h2>
            </div>
            <div className="full-fleet-grid">
              {srikalahastiContent.fleet.map(v => (
                <article key={v.name} className="fleet-card">
                  <div className="fleet-card-top">
                    <span>{v.category}</span>
                    <strong>{v.name}</strong>
                    <small>{v.type} • {v.persons} persons • AC • {v.bags} bags</small>
                  </div>
                  <div className="fleet-rates">
                    <div>
                      <span>8 Hours / 80 KMs</span>
                      <b>{v.local8}</b>
                    </div>
                    <div>
                      <span>12 Hours / 150 KMs</span>
                      <b>{v.local12}</b>
                    </div>
                    <div>
                      <span>Outstation Rate</span>
                      <b>{v.perKm}</b>
                    </div>
                  </div>
                  <a 
                    href={whatsappBooking(`Hi, I need ${v.name} for Tirupati to Srikalahasti. Please confirm current pricing.`)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="button full-width"
                  >
                    <MessageCircle size={15} /> Book Now
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="section longform-section pale">
            <div className="section-header">
              <span className="badge-pill"><Info size={13} /> FAQ</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              {srikalahastiContent.faqs.map(([q, a]) => (
                <details key={q} className="faq-item">
                  <summary className="faq-question">
                    <span>{q}</span>
                    <ChevronDown size={18} />
                  </summary>
                  <div className="faq-answer">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </>
      ) : (
        <DetailedRouteContent content={content} route={route} />
      )}

      {/* --- STATS COUNTER BANNER --- */}
      <StatsBanner title="Trusted Outstation Taxi Partner" subtitle="SERVICE HIGHLIGHTS" />

      {/* Bottom Call to Action Banner */}
      <section className="route-cta">
        <div className="cta-content">
          <span className="badge-pill gold"><Sparkles size={13} /> READY FOR A COMFORTABLE JOURNEY?</span>
          <h2>Book your {route.shortTitle} Cab Today</h2>
          <p>Share your travel date, passenger count, and vehicle choice. We'll send you an instant fare quotation with vehicle details.</p>
        </div>

        <div className="cab-route-actions cta-actions">
          <a className="button hero-call-btn" href={`tel:${phone}`}>
            <Phone size={16} /> Call Now: {phone}
          </a>
          <a 
            className="button secondary hero-wa-btn" 
            href={whatsappBooking(`Hi, I would like to enquire about booking ${route.title}.`)} 
            target="_blank" 
            rel="noreferrer"
          >
            <MessageCircle size={16} /> WhatsApp Inquiry
          </a>
        </div>
      </section>

      {/* Floating Bottom Sticky Bar for Quick Mobile Access */}
      <div className="mobile-sticky-bar">
        <a href={`tel:${phone}`} className="sticky-btn call">
          <Phone size={16} /> Call Now
        </a>
        <a 
          href={whatsappBooking(`Hi, I want to book a cab for ${route.title}.`)} 
          target="_blank" 
          rel="noreferrer" 
          className="sticky-btn whatsapp"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </main>
  );
}
