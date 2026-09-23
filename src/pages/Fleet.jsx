import { Luggage, Wind, ShieldCheck, Clock3, Fuel, Users, MapPin } from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsapp } from '../data/siteData';
import { fleet, fleetCategories } from '../data/fleetData';
import AnimatedCounter from '../components/AnimatedCounter';
import StatsBanner from '../components/StatsBanner';
import ScrollReveal from '../components/ScrollReveal';
import './Fleet.css';
import './FleetOverride.css';
import './FleetMobileOrder.css';
import { Link } from 'react-router-dom';

export default function Fleet() {
  return (
    <Page
      eyebrow="FLEET & RENTALS"
      title="Choose the right vehicle for your journey."
      text="From economical Tirupati cabs to premium Urbania, Tempo Travellers and large buses, choose the space, comfort and price point that fits your trip."
      image={images.hero}
    >
      <section className="content" id="rentals">
        <div className="fleet-pricing-strip">
          <div>
            <span>LOCAL • 8 HOURS / 80 KM</span>
            <strong>From ₹2,880</strong>
          </div>
          <div>
            <span>LOCAL • 12 HOURS / 150 KM</span>
            <strong>From ₹3,650</strong>
          </div>
          <div>
            <span>OUTSTATION</span>
            <strong>From ₹15/km • 300 km/day min</strong>
          </div>
        </div>

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
                      Local packages below are 8 hours / 80 km and 12 hours / 150 km. Outstation pricing is charged per km.
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
                          <span><small>Local • 8 hrs / 80 km</small><b>{v.local}</b></span>
                          <span><small>Local • 12 hrs / 150 km</small><b>{v.localLong}</b></span>
                          <span><small>Outstation • Per km</small><b>{v.outstation}</b></span>
                          <span><small>Minimum per day</small><b>{v.minimum}</b></span>
                        </div>

                        <p className="vehicle-minimum"><MapPin /> Outstation minimum {v.minimum}</p>

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

        <ScrollReveal direction="up">
          <div className="fleet-intro">
            <div>
              <p className="eyebrow">OUR FLEET</p>
              <h2>Comfort for small groups. Space for everyone.</h2>
              <p className="fleet-subcopy">
                Local rates are shown for 8-hour / 80-km and 12-hour / 150-km packages. Outstation travel uses the published per-kilometre rate with a 300 km/day minimum.
              </p>
            </div>
            <div className="fleet-trust">
              <span><ShieldCheck /> Professional drivers</span>
              <span><Wind /> AC vehicles</span>
              <span><Clock3 /> 24/7 support</span>
            </div>
          </div>
        </ScrollReveal>

        <StatsBanner title="Extensive Vehicle Availability" subtitle="FLEET ADVANTAGE" />

        <div className="fleet-pricing-note" style={{ marginTop: '3rem' }}>
          <strong>Pricing note</strong>
          <span>
            Rates are based on the supplied fleet rate sheet. Tolls, parking, permits, state taxes and other trip-specific charges may apply. Final pricing is confirmed on WhatsApp.
          </span>
        </div>
      </section>
    </Page>
  );
}
