import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {
  FaArrowRight, FaShieldHalved, FaClock, FaStar, FaLocationDot,
  FaChevronRight, FaCar, FaBus, FaPhone, FaWhatsapp, FaChevronDown,
  FaCircleCheck, FaRoute, FaLandmark, FaPlane, FaWandMagicSparkles
} from 'react-icons/fa6';
import { destinations, images, services, tours, vehicles, whatsapp, phone } from '../data/siteData';
import { cabRoutes } from '../data/cabRoutes';
import BookingForm from '../components/BookingForm';
import AnimatedCounter from '../components/AnimatedCounter';
import StatsBanner from '../components/StatsBanner';
import ScrollReveal from '../components/ScrollReveal';
import './Home.css';
import './HomeEnhancements.css';
import './TravelSimple.css';
import './MapSection.css';

const homeFaqs = [
  {
    q: 'How do I book a taxi in Tirupati with Tirupati Balaji Tours Travels?',
    a: 'You can book instantly by calling +91-8688624758 or sending a WhatsApp message with your travel date, pickup location, destination, passenger count, and preferred vehicle class.'
  },
  {
    q: 'Are airport transfers available from Tirupati Airport?',
    a: 'Yes! We provide 24/7 airport pickup and drop services between Tirupati Airport (TIR), Tirupati City, Tirumala, Chennai Airport (MAA), and Bangalore Airport (BLR).'
  },
  {
    q: 'Are toll charges, driver allowance, and parking fees included?',
    a: 'We offer transparent pricing. Inclusions (such as toll fees, driver bata, state permits) are clearly specified in your quote before travel.'
  },
  {
    q: 'Can I book a vehicle for Tirumala Balaji Darshan?',
    a: 'Yes! Our local drivers are experienced with Tirumala ghat road regulations, parking points, queue tokens, and local sightseeing in Tirumala.'
  },
  {
    q: 'What vehicle options are available for family and group travel?',
    a: 'Our fleet includes AC Sedans (Etios/Dzire), MUVs (Ertiga), SUVs (Innova Crysta), 12/17/20-seater Tempo Travellers, Force Urbania (12/16-seater), and 27/40/50-seater Luxury Buses.'
  }
];

const homeTestimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'Bengaluru',
    comment: 'Booked an Innova Crysta for our Tirumala family trip. Driver Sarath was very polite and skilled on the ghat road. Driver arrived on time at Tirupati station.',
    rating: 5
  },
  {
    name: 'Priya Sundaram',
    location: 'Chennai',
    comment: 'Excellent 12-seater Tempo Traveller service for our Arunachalam & Golden Temple tour. Clean vehicle, great AC, and transparent pricing without hidden charges.',
    rating: 5
  },
  {
    name: 'Venkat Rao',
    location: 'Hyderabad',
    comment: 'Punctual airport pickup from Tirupati Airport to hotel and Tirumala. Very reliable cab service with instant WhatsApp communication.',
    rating: 5
  }
];

const Slider = ({ children }) => (
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 3600, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    spaceBetween={18}
    slidesPerView={1.08}
    breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
    className="home-slider"
  >
    {children}
  </Swiper>
);

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = index => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>
      {/* --- HERO SECTION --- */}
      <section className="hero home-hero">
        <div className="hero-copy">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="eyebrow">NO. 1 TAXI & TOUR AGENCY IN TIRUPATI</p>
            <h1 className="type-title">
              Travel with <em>trust.</em>
              <br />
              Journey with <em>blessings.</em>
            </h1>
            <p className="hero-lead">
              Book Tirupati to Tirumala, Srikalahasti, Kanipakam, Golden Temple, Arunachalam & South India temple cab packages. Safe rides, flexible itineraries, and 24/7 support.
            </p>
            <p className="actions">
              <a className="button" href={whatsapp} target="_blank" rel="noreferrer">
                Book Cab on WhatsApp <FaArrowRight size={14} />
              </a>
              <Link className="button secondary" to="/tours">
                Explore Packages <FaChevronRight size={14} />
              </Link>
            </p>
          </motion.div>

          <div className="hero-trust-row">
            <span>
              <FaShieldHalved /> Verified Drivers
            </span>
            <span>
              <FaClock /> 24×7 Service
            </span>
            <span>
              <FaStar /> <AnimatedCounter end={4.9} decimals={1} suffix="★" /> Rated
            </span>
          </div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 55, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <img src={images.hero} alt="Tirupati Balaji luxury vehicle fleet" />
          <div className="hero-location">
            <FaLocationDot size={15} />
            <div>
              <strong>Tirupati & Tirumala</strong>
              <small>Andhra Pradesh · India</small>
            </div>
          </div>
          <div className="hero-rating">
            <FaStar size={14} fill="currentColor" />
            <strong><AnimatedCounter end={4.9} decimals={1} /></strong>
            <span>trusted journeys</span>
          </div>
        </motion.div>
      </section>

      {/* --- BOOKING FORM WIDGET --- */}
      <BookingForm />

      {/* --- OUR TAXI & PACKAGE SERVICES SECTION --- */}
      <section className="services-section-wrapper">
        <div className="services-section-backdrop" aria-hidden="true">
          <img src={images.tirumala} alt="" />
        </div>

        <div className="services-header-container">
          <span className="services-eyebrow-badge">OUR TAXI & PACKAGE SERVICES</span>
          <h2>
            Everything you need for
            <br />
            <span>a smooth journey.</span>
          </h2>
          <p>
            From airport pickups and local temple sightseeing to long-distance outstation tour circuits, we provide comfortable AC cabs and experienced drivers.
          </p>
        </div>

        <div className="services-cards-grid">
          {[
            { index: '01', title: 'One Way Cab', desc: 'Simple, comfortable point-to-point travel.', link: '/taxi-in-tirupati', Icon: FaCar },
            { index: '02', title: 'Round Trip', desc: 'Flexible return journeys at fair prices.', link: '/outstation-taxi-in-tirupati', Icon: FaRoute },
            { index: '03', title: 'Local Sightseeing', desc: 'Discover Tirupati at your own pace.', link: '/car-rentals-in-tirupati', Icon: FaLandmark },
            { index: '04', title: 'Airport Taxi', desc: 'Punctual pickup and drop, every time.', link: '/tirupati-airport-taxi', Icon: FaPlane },
            { index: '05', title: 'Temple Darshan Taxi', desc: 'Peaceful rides for your sacred visit.', link: '/services/balaji-darshan-packages', Icon: FaWandMagicSparkles },
            { index: '06', title: 'Outstation Taxi', desc: 'Go beyond Tirupati with confidence.', link: '/outstation-taxi-in-tirupati', Icon: FaLocationDot }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="service-glass-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div>
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <item.Icon size={24} />
                  </div>
                  <span className="service-index-number">{item.index}</span>
                </div>

                <div className="service-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>

              <Link to={item.link} className="service-explore-btn">
                Explore <FaArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- STATS COUNTER BANNER --- */}
      <StatsBanner title="Trusted by Devotees Nationwide" subtitle="OUR MILESTONES" />      {/* --- POPULAR CAB ROUTES --- */}
      <section className="section pale home-showcase">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">POPULAR OUTSTATION CAB ROUTES</p>
            <h2>Top Temple & City Routes from Tirupati</h2>
          </div>
          <Link className="all-link" to="/tirupati-cabs/tirupati-to-srikalahasti">
            All Cab Routes <FaArrowRight size={14} />
          </Link>
        </div>

        <Slider>
          {cabRoutes.map(r => (
            <SwiperSlide key={r.slug}>
              <article className="home-slide-card route-card">
                <div className="slide-image">
                  <img src={r.image || images.temple} alt={r.title} />
                  <span className="route-badge">{r.distance} · {r.time}</span>
                </div>
                <div className="card-body">
                  <div className="card-tag-row">
                    <small className="category-tag">OUTSTATION TAXI</small>
                    <span className="price-tag">Starting from {r.startPrice}</span>
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                  <Link to={`/tirupati-cabs/${r.slug}`} className="card-action-btn">
                    View Route Details <FaArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Slider>
      </section>

      {/* --- VEHICLE FLEET SHOWCASE --- */}
      <section className="section home-showcase">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">VEHICLE FLEET AVAILABILITY</p>
            <h2>Choose the Perfect Ride for Your Group</h2>
          </div>
          <Link className="all-link" to="/fleet">
            View Full Fleet <FaArrowRight size={14} />
          </Link>
        </div>

        <Slider>
          {vehicles.map(v => (
            <SwiperSlide key={v[0]}>
              <article className="home-slide-card vehicle-card">
                <div className="slide-image vehicle-image-bg">
                  <img src={v[3]} alt={v[0]} />
                  <span className="vehicle-ac-badge">{v[5]}</span>
                </div>
                <div className="card-body">
                  <div className="card-tag-row">
                    <small className="category-tag">{v[6]}</small>
                    <span className="rate-badge">From {v[4]}</span>
                  </div>
                  <h3>{v[0]}</h3>
                  <div className="vehicle-specs-row">
                    <span>👥 {v[1]}</span>
                    <span>🧳 {v[2]}</span>
                  </div>
                  <p className="vehicle-desc">{v[7] || v[2]}</p>
                  <Link to="/fleet#rentals" className="card-action-btn vehicle-btn">
                    View Specs & Rates <FaArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Slider>
      </section>

      {/* --- SACRED DESTINATIONS SHOWCASE --- */}
      <section className="section destinations-preview">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">SACRED DESTINATIONS</p>
            <h2>Explore Holy Temples & Tourist Attractions</h2>
          </div>
          <Link className="all-link" to="/destinations">
            All Destinations <FaArrowRight size={14} />
          </Link>
        </div>

        <Slider>
          {destinations.slice(0, 9).map(d => (
            <SwiperSlide key={d[0]}>
              <article className="home-slide-card destination-card">
                <div className="slide-image">
                  <img src={d[3]} alt={d[1]} />
                  <span className="price-badge-overlay">FROM {d[4]}</span>
                </div>
                <div className="card-body">
                  <small className="category-tag">PILGRIMAGE SITE</small>
                  <h3>{d[1]}</h3>
                  <p>{d[2]}</p>
                  <Link to={`/destinations/${d[0]}`} className="card-action-btn dest-btn">
                    Read Destination Guide <FaArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Slider>
      </section>

      {/* --- TOP TOUR PACKAGES --- */}
      <section className="section pale home-showcase">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">PILGRIMAGE TOUR PACKAGES</p>
            <h2>Curated South India Pilgrimage Packages</h2>
          </div>
          <Link className="all-link" to="/tours">
            View All Packages <FaArrowRight size={14} />
          </Link>
        </div>

        <Slider>
          {tours.map(t => (
            <SwiperSlide key={t[0]}>
              <article className="home-slide-card package-card">
                <div className="slide-image">
                  <img src={t[4]} alt={t[0]} />
                  <span className="duration-badge">{t[1]}</span>
                </div>
                <div className="card-body">
                  <div className="card-tag-row">
                    <small className="category-tag">PILGRIMAGE PACKAGE</small>
                    <span className="price-tag">From {t[3]}</span>
                  </div>
                  <h3>{t[0]}</h3>
                  <div className="package-route-pill">{t[2]}</div>
                  <Link to="/tours" className="card-action-btn package-btn">
                    View Package Itinerary <FaArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Slider>
      </section>

      {/* --- 3-STEP EASY BOOKING FLOW --- */}
      <section className="section home-booking-steps">
        <div className="section-heading">
          <div>
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>3 Easy Steps to Book Your Tirupati Cab</h2>
          </div>
        </div>

        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div className="legal-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffd700', display: 'block', marginBottom: '0.5rem' }}>01</span>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Share Travel Details</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Tell us your travel dates, pickup point, destination, passenger count, and preferred vehicle class.</p>
          </div>

          <div className="legal-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffd700', display: 'block', marginBottom: '0.5rem' }}>02</span>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Receive Instant Quote</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Get transparent fare details with verified driver assignment, AC status, and toll inclusions.</p>
          </div>

          <div className="legal-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffd700', display: 'block', marginBottom: '0.5rem' }}>03</span>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Travel Comfortably</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Your driver greets you on time at your hotel, airport, or railway station for a safe journey.</p>
          </div>
        </div>
      </section>

      {/* --- REVIEWS & TESTIMONIALS --- */}
      <section className="section pale">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PILGRIM FEEDBACK & REVIEWS</p>
            <h2>Trusted by Thousands of Devotees & Families</h2>
          </div>
        </div>

        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {homeTestimonials.map(review => (
            <div key={review.name} className="legal-card" style={{ padding: '1.75rem' }}>
              <div style={{ color: '#ffd700', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                {'★'.repeat(review.rating)}
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                "{review.comment}"
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{review.name}</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FREQUENTLY ASKED QUESTIONS --- */}
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>Everything You Need to Know Before Booking</h2>
          </div>
        </div>

        <div style={{ maxWidth: 850, margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {homeFaqs.map((faq, index) => (
            <div
              key={faq.q}
              className="legal-card"
              style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => toggleFaq(index)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', alignItems: 'center' }}>
                <h3 style={{ color: '#fff', fontSize: '1.05rem', margin: 0 }}>{faq.q}</h3>
                <FaChevronDown
                  size={16}
                  style={{
                    color: '#ffd700',
                    transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
              {openFaq === index && (
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.85rem', lineHeight: '1.6' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- GOOGLE MAPS LOCATION SECTION --- */}
      <section className="section map-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">FIND US IN TIRUPATI</p>
            <h2>Visit Our Local Office in Tirupati</h2>
          </div>
          <a
            className="all-link"
            href="https://www.google.com/maps/search/?api=1&query=Tirupati%20Balaji%20Tours%20Travels%20Taxi%20in%20Tirupati"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps <FaArrowRight size={14} />
          </a>
        </div>
        <div className="map-card">
          <iframe
            title="Tirupati Balaji Tours & Travels location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1985064.687311584!2d77.02313055625001!3d13.652929800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b244422c47f%3A0xf7585144979afd31!2sTirupati%20Balaji%20Tours%20Travels%20%7C%20Taxi%20in%20Tirupati!5e0!3m2!1sen!2sin!4v1786786636733!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* --- BOTTOM CALL TO ACTION --- */}
      <section className="home-cta">
        <div>
          <p className="eyebrow">LET’S PLAN YOUR JOURNEY</p>
          <h2>
            Planning your <em>Tirupati journey?</em>
          </h2>
          <p>Share your route and group size on WhatsApp. We will help you select the ideal vehicle and fare.</p>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="button">
            Chat on WhatsApp <FaArrowRight size={14} />
          </a>
        </div>
        <div className="cta-mark">
          <FaStar size={24} />
          <span>
            TRUSTED
            <br />
            TRAVEL
          </span>
        </div>
      </section>
    </main>
  );
}