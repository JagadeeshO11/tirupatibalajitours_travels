import { Luggage, Wind, ShieldCheck, Clock3, Fuel, Users, MapPin, Car, BusFront, Sparkles, ArrowRight } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';
import { fleet, fleetCategories } from '../data/fleetData';
import AnimatedCounter from '../components/AnimatedCounter';
import StatsBanner from '../components/StatsBanner';
import ScrollReveal from '../components/ScrollReveal';
import './Fleet.css';
import './FleetOverride.css';
import { Link } from 'react-router-dom';

const categoryIcons = { cars: Car, tempo: Users, urbania: Sparkles, bus: BusFront };

export default function Fleet() {
  return (
    <Page
      eyebrow="FLEET & RENTALS"
      title="Choose the right vehicle for your journey."
      text="From economical Tirupati cabs to premium Urbania, Tempo Travellers and large buses, choose the space, comfort and price point that fits your trip."
      image={images.hero}
    >
      <section className="content" id="rentals">
        <ScrollReveal direction="up">
          <div className="fleet-intro">
            <div>
              <p className="eyebrow">OUR FLEET</p>
              <h2>Comfort for small groups. Space for everyone.</h2>
              <p className="fleet-subcopy">
                Official fleet options cover local day rentals and outstation travel. Every quote is confirmed for your exact route and itinerary.
              </p>
            </div>
            <div className="fleet-trust">
              <span><ShieldCheck /> Professional drivers</span>
              <span><Wind /> AC vehicles</span>
              <span><Clock3 /> 24/7 support</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="fleet-chooser" aria-label="Choose vehicle">
          <div className="fleet-chooser-copy">
            <span className="eyebrow">CHOOSE VEHICLE</span>
            <strong>What are you travelling with?</strong>
            <small>Jump directly to the vehicle type that fits your group.</small>
          </div>
          <nav className="fleet-filter-row">
            {fleetCategories.slice(1).map(c => {
              const Icon = categoryIcons[c.key] || Car;
              return (
                <a className="fleet-choice" key={c.key} href={`#${c.key}`}>
                  <span className="fleet-choice-icon"><Icon /></span>
                  <span><b>{c.label}</b><small>{c.ids.length} options</small></span>
                  <span className="fleet-choice-arrow"><ArrowRight /></span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="fleet-pricing-strip">
          <div>
            <span>LOCAL DAY RENT</span>
            <strong>From ₹2,000/day</strong>
          </div>
          <div>
            <span>OUTSTATION</span>
            <strong>From ₹15/km</strong>
          </div>
          <div>
            <span>GROUP OPTIONS</span>
            <strong>Up to <AnimatedCounter end={50} suffix=" seats" /></strong>
          </div>
        </div>

        {/* --- STATS COUNTER BANNER --- */}
        <StatsBanner title="Extensive Vehicle Availability" subtitle="FLEET ADVANTAGE" />

        {fleetCategories.slice(1).map(category => {
          const items = fleet.filter(v => category.ids.includes(v.id));
          return (
            <section className="fleet-group" id={category.key} key={category.key} style={{ marginTop: '2.5rem' }}>
              <div className="fleet-group-heading">
                <div>
                  <span className="eyebrow">
                    {category.key === 'cars'
                      ? 'CARS'
                      : category.key === 'tempo'
                      ? 'TEMPO TRAVELLERS'
                      : category.key === 'urbania'
                      ? 'PREMIUM GROUP TRAVEL'
                      : 'LARGE GROUP TRAVEL'}
                  </span>
                  <h3>{category.label}</h3>
                  {category.key === 'cars' && (
                    <p className="fleet-category-note">
                      Available for local travel in Tirupati, Tirupati Airport transfers, and outstation trips.
                    </p>
                  )}
                </div>
                <span>{items.length} options</span>
              </div>
              <div className="vehicle-slider">
                {items.map((v, idx) => (
                  <ScrollReveal key={v.id} direction="up" delay={idx * 0.06}>
                    <article className="rental-card">
                      <div className="vehicle-media">
                        <img src={v.image} alt={`${v.name} rental in Tirupati`} loading="lazy" />
                        <span className="media-type">{v.category}</span>
                        <div className="media-bottom">
                          <span className="media-rate">{v.local}</span>
                          <span className="media-seats"><Users /> {v.seats}</span>
                        </div>
                      </div>
                      <div className="rental-info">
                        <div className="vehicle-heading">
                          <div>
                            <span className="vehicle-category">{v.category}</span>
                            <h3>{v.name}</h3>
                          </div>
                          <span className="vehicle-capacity">{v.seats} seats</span>
                        </div>
                        <p className="vehicle-summary">{v.use}</p>
                        <div className="vehicle-features">
                          {v.features.map(feature => (
                            <span key={feature}><Wind /> {feature}</span>
                          ))}
                          <span><Luggage /> {v.bags} bags</span>
                          <span><Fuel /> {v.fuel}</span>
                        </div>
                        <div className="vehicle-price-grid">
                          <span><small>Local</small><b>{v.local}</b></span>
                          <span><small>Outstation</small><b>{v.outstation}</b></span>
                        </div>
                        <p className="vehicle-minimum"><MapPin /> Minimum {v.minimum}</p>
                        <Link className="view-details" to={`/fleet/${v.id}`}>View Details</Link>
                        <div className="rent-actions">
                          <a
                            className="button"
                            href={`${whatsapp}?text=${encodeURIComponent(`Hi, I want to book ${v.name} in Tirupati. Please share availability and the exact quote.`)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Book on WhatsApp
                          </a>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          );
        })}

        <div className="fleet-pricing-note" style={{ marginTop: '3rem' }}>
          <strong>Pricing note</strong>
          <span>
            These are indicative figures published on the official service pages. Tolls, parking, permits, state taxes and other trip-specific charges may apply. Final pricing is confirmed on WhatsApp.
          </span>
        </div>
      </section>
    </Page>
  );
}
