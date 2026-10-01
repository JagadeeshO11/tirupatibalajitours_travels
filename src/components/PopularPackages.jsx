import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CarFront, CheckCircle2, ChevronDown, MessageCircle, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { packageItineraries } from '../data/packageItineraries';
import { packageDetails } from '../data/packageDetails';
import { packagesData, getVehicleInfo } from '../data/packageData';
import EasebuzzModal from './EasebuzzModal';
import './PopularPackages.css';

export default function PopularPackages() {
  const [selectedDetailPkg, setSelectedDetailPkg] = useState(null);
  const [payPkg, setPayPkg] = useState(null);
  const whatsapp = (name) => `https://wa.me/918688624758?text=${encodeURIComponent(`Hi, I want to inquire about ${name}`)}`;

  useEffect(() => {
    if (selectedDetailPkg || payPkg) {
      const prevOverflowBody = document.body.style.overflow;
      const prevOverflowHtml = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
      return () => {
        document.body.style.overflow = prevOverflowBody;
        document.documentElement.style.overflow = prevOverflowHtml;
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
      };
    }
  }, [selectedDetailPkg, payPkg]);


  return (
    <>
      <section className="popular-packages-section">
        <div className="popular-heading">
          <div>
            <p className="eyebrow">🔥 MOST BOOKED PACKAGES</p>
            <h2>Explore Our Popular Temple Tour Packages</h2>
            <p>Safe, Comfortable & Memorable Journeys to Sacred Destinations</p>
          </div>
          <div className="popular-benefits">
            <span>🚕 Tolls Included</span>
            <span>🅿️ Parkings Included</span>
            <span>👨‍✈️ Driver Batta Included</span>
            <span>🏛️ TN Border Tax Included</span>
            <span>📞 24×7 Support</span>
            <span>💰 Best Price Guaranteed</span>
          </div>
        </div>

        <div className="popular-package-grid">
          {packagesData.map((pkg, i) => {
            const { name, duration, route, image } = pkg;
            const data = packageDetails[name];
            const startingPrice = data?.prices?.[0]?.[1] || '₹3,500';
            const placesList = route ? route.split(' → ') : [];

            return (
              <motion.article 
                className="popular-package-card" 
                key={name} 
                initial={{ opacity: 0, y: 24 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.1 }} 
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              >
                <div className="popular-package-image">
                  <img src={image} alt={name} loading="lazy"/>
                  <span className="popular-badge">★ Most Popular</span>
                  <span className="popular-duration">{duration} · From {startingPrice}</span>
                </div>
                <div className="popular-package-content">
                  <h3>{name}</h3>
                  <div className="popular-places-box">
                    <h4 className="places-visit-heading">Places Visit</h4>
                    <div className="places-visit-grid">
                      {placesList.map((place, idx) => (
                        <span className="place-item-chip" key={idx}>
                          📍 {place}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="popular-actions-two">
                    <button 
                      type="button" 
                      className="popular-btn-pay"
                      onClick={() => setPayPkg({ name, price: startingPrice })}
                    >
                      <span>Book 💳</span>
                    </button>
                    <button 
                      type="button" 
                      className="popular-btn-details"
                      onClick={() => setSelectedDetailPkg(pkg)}
                    >
                      <span>Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* POPUP MODAL FOR DETAILS BUTTON - ULTRA COMPACT MODEL */}
      {selectedDetailPkg && (
        <div className="itinerary-overlay" role="presentation" onClick={() => setSelectedDetailPkg(null)}>
          <div 
            className="itinerary-modal package-detail-popup-modal compact-modal-shell" 
            role="dialog" 
            aria-modal="true" 
            onClick={(event) => event.stopPropagation()}
          >
            <button 
              type="button" 
              className="itinerary-close" 
              aria-label="Close" 
              onClick={() => setSelectedDetailPkg(null)}
            >
              <X size={18}/>
            </button>

            {(() => {
              const { name, duration, route } = selectedDetailPkg;
              const data = packageDetails[name];
              const startingPrice = data?.prices?.[0]?.[1] || '₹3,500';
              const itinerary = packageItineraries[name];
              const placesList = route ? route.split(' → ') : [];

              return (
                <>
                  {/* CLEAN TEXT HEADER - NO HERO IMAGE */}
                  <div className="compact-modal-header">
                    <div>
                      <span className="compact-badge">{duration} Package</span>
                      <h3>{name}</h3>
                    </div>
                    <div className="compact-price-tag">
                      <small>Starting from</small>
                      <strong>{startingPrice}</strong>
                    </div>
                  </div>

                  <div className="compact-modal-body">
                    {/* 1. ROUTE CORRIDOR */}
                    <div className="compact-section">
                      <span className="compact-label">📍 Route Corridor:</span>
                      <p className="compact-route-text">{placesList.join(' → ')}</p>
                    </div>

                    {/* 2. VEHICLE PRICES (TEXT ONLY 2-COLUMN GRID) */}
                    {data?.prices && data.prices.length > 0 && (
                      <div className="compact-section">
                        <span className="compact-label">🚗 Vehicle Fares:</span>
                        <div className="compact-prices-grid">
                          {data.prices.map(([vehicle, price]) => (
                            <div className="compact-price-row" key={vehicle}>
                              <span className="v-title">{vehicle}</span>
                              <strong className="v-fare">{price}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. ITINERARY */}
                    {itinerary && itinerary.length > 0 && (
                      <div className="compact-section">
                        <span className="compact-label">🗓️ Itinerary Summary:</span>
                        <div className="compact-itinerary-list">
                          {itinerary.map(({ day, places }) => (
                            <div className="compact-day-item" key={day}>
                              <strong>{day}:</strong> <span>{places}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. RULES & INCLUSIONS */}
                    <div className="compact-section">
                      <span className="compact-label">📋 Rules & Inclusions:</span>
                      <div className="compact-rules-box">
                        <div className="rule-inc">✔ {data?.included || 'Includes Tolls, Parking Charges, Driver Batta & AC Cab Transport'}</div>
                        {data?.excluded && <div className="rule-exc">✖ {data.excluded}</div>}
                      </div>
                    </div>
                  </div>

                  {/* MODAL ACTION FOOTER */}
                  <div className="compact-modal-footer">
                    <button 
                      type="button" 
                      className="compact-book-btn" 
                      onClick={() => { 
                        setPayPkg({ name, price: startingPrice }); 
                        setSelectedDetailPkg(null); 
                      }}
                    >
                      Book ₹1,000 Advance 💳
                    </button>
                    <a 
                      className="compact-wa-btn" 
                      href={whatsapp(name)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={15}/> WhatsApp Inquiry
                    </a>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

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
    </>
  );
}

