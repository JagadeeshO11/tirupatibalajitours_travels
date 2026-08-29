import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, CheckCircle2, MessageCircle, ArrowRight, Star, Clock } from 'lucide-react';
import { images, whatsapp } from '../data/siteData';
import { packageDetails } from '../data/packageDetails';
import StatsBanner from '../components/StatsBanner';
import ScrollReveal from '../components/ScrollReveal';
import './Tours.css';

const tourPackagesList = [
  {
    title: 'Tirupati 1 Day Taxi Package',
    duration: '1 Day',
    category: 'Local Pilgrimage',
    image: images.temple,
    description: 'Complete Tirupati & Tirumala local temple coverage including Tirumala Balaji Temple, Tiruchanur Padmavathi Temple, Kapila Theertham & Govindaraja Swamy Temple.',
    prices: packageDetails['Tirupati 1 Day Taxi Package']?.prices || [['Sedan (4 Seater)', '₹3,500'], ['Ertiga (6 Seater)', '₹4,000'], ['Innova Crysta (7 Seater)', '₹4,500'], ['Tempo Traveller 12 Seater', '₹5,500']],
    included: 'Includes Toll Charges, Parking, Driver Batta'
  },
  {
    title: 'Tirupati 2 Days Taxi Package',
    duration: '2 Days / 1 Night',
    category: 'Local & Nearby',
    image: images.tirumala,
    description: 'Relaxed 2-day temple circuit covering Tirumala Balaji, Tiruchanur, Srikalahasti Rahu-Ketu Kshetram, Kanipakam Vinayaka Temple, and local sightseeing.',
    prices: packageDetails['Tirupati 2 Days Taxi Package']?.prices || [['Sedan (4 Seater)', '₹7,500'], ['Ertiga (6 Seater)', '₹8,500'], ['Innova Crysta (7 Seater)', '₹9,500'], ['Tempo Traveller 12 Seater', '₹11,500']],
    included: 'Includes Toll Charges, Parking, Driver Batta'
  },
  {
    title: 'Tirupati 5 Local Temples Tour Package',
    duration: '1 Day',
    category: 'Local Pilgrimage',
    image: images.srikalahasti,
    description: 'Covers Tiruchanur Padmavathi Temple, Sri Govindaraja Swamy Temple, Kapila Theertham, ISKCON Tirupati, and Srinivasamangapuram.',
    prices: packageDetails['Tirupati 5 Local Temples Tour Package']?.prices || [['Etios / Dzire', '₹3,800'], ['Ertiga (6 Seater)', '₹4,500'], ['Innova Crysta', '₹5,000'], ['Tempo Traveller 12 Seater', '₹5,800']],
    included: 'Includes Toll Charges, Parking, Driver Batta'
  },
  {
    title: '1 Day Arunachalam Package',
    duration: '1 Day',
    category: 'Outstation Pilgrimage',
    image: images.arunachalam,
    description: 'Same-day round trip from Tirupati to Tiruvannamalai Arunachaleswarar Temple (Agni Lingam) with experienced highway drivers.',
    prices: packageDetails['1 Day Arunachalam Package']?.prices || [['Sedan (4 Seater)', '₹7,000'], ['Ertiga (6 Seater)', '₹10,000'], ['Innova Crysta (7 Seater)', '₹12,200'], ['Tempo Traveller 12 Seater', '₹15,000']],
    included: 'Includes Tolls, Parking, Driver Batta, TN Border Tax'
  },
  {
    title: '2 Days Arunachalam Package',
    duration: '2 Days / 1 Night',
    category: 'Outstation Pilgrimage',
    image: images.arunachalam,
    description: 'Detailed Tiruvannamalai pilgrimage with Girivalam circuit, Arunachaleswarar Temple darshan, and intermediate temple stops.',
    prices: packageDetails['2 Days Arunachalam Package']?.prices || [['Sedan (4 Seater)', '₹9,500'], ['Ertiga (6 Seater)', '₹12,500'], ['Innova Crysta (7 Seater)', '₹15,500'], ['Tempo Traveller 12 Seater', '₹18,500']],
    included: 'Includes Tolls, Parking, Driver Batta, TN Border Tax'
  },
  {
    title: 'Tirupati to Golden Temple Vellore Tour',
    duration: '1 Day',
    category: 'Outstation Pilgrimage',
    image: images.goldentemple,
    description: 'Day trip to Sripuram Vellore Golden Temple (Mahalakshmi Temple) with comfortable AC vehicle and doorstep pickup.',
    prices: packageDetails['Tirupati to Golden Temple Vellore Tour']?.prices || [['Etios / Swift Dzire', '₹5,000'], ['Ertiga (6 Seater)', '₹6,800'], ['Innova Crysta (7 Seater)', '₹8,200'], ['Tempo Traveller 12 Seater', '₹10,500']],
    included: 'Includes Toll, Parking, Driver Batta, TN Border Tax'
  },
  {
    title: 'Tirupati to Kanipakam Temple Tour',
    duration: '1 Day',
    category: 'Local & Nearby',
    image: images.kanipakam,
    description: 'Visit Varasiddhi Vinayaka Temple at Kanipakam along with local Tirupati shrines in a private AC cab.',
    prices: packageDetails['Tirupati to Kanipakam Temple Tour']?.prices || [['Etios / Swift Dzire', '₹3,580'], ['Ertiga (6 Seater)', '₹4,280'], ['Innova Crysta (7 Seater)', '₹4,780'], ['Tempo Traveller 12 Seater', '₹5,735']],
    included: 'Includes Toll Charges, Parking, Driver Batta'
  },
  {
    title: 'Tirupati to Kanchipuram Taxi Service',
    duration: '1 Day',
    category: 'Outstation Pilgrimage',
    image: images.kanchipuram,
    description: 'Explore ancient silk and temple city Kanchipuram covering Kamakshi Amman, Ekambareswarar, and Varadaraja Perumal temples.',
    prices: packageDetails['Tirupati to Kanchipuram Taxi Service']?.prices || [['Etios / Swift Dzire', '₹5,000'], ['Ertiga', '₹6,800'], ['Innova Crysta', '₹8,200'], ['Tempo Traveller 12 Seater', '₹10,500']],
    included: 'Includes Tolls, Parking, Driver Batta, TN Border Tax'
  },
  {
    title: 'Pondicherry Tour Package',
    duration: '2 Days / 1 Night',
    category: 'Leisure & Heritage',
    image: images.pondicherry,
    description: 'Coastal holiday package covering French Colony, Promenade Beach, Auroville, and Paradise Beach with private cab transport.',
    prices: packageDetails['Pondicherry Tour Package']?.prices || [['Etios / Swift Dzire', '₹10,000'], ['Ertiga', '₹12,500'], ['Innova Crysta', '₹15,000'], ['Tempo Traveller 12 Seater', '₹18,500']],
    included: 'Includes Tolls, Parking, Driver Batta, TN Border Tax'
  },
  {
    title: '2 Days Tirupati to Srisailam Taxi Package',
    duration: '2 Days / 1 Night',
    category: 'Outstation Pilgrimage',
    image: images.srisailam,
    description: 'Sacred pilgrimage to Srisailam Mallikarjuna Swamy Jyotirlinga & Bhramaramba Devi Shakti Peeth in Nallamala Hills.',
    prices: packageDetails['2 Days Tirupati to Srisailam Taxi Package']?.prices || [['Etios / Swift Dzire', '₹13,000'], ['Ertiga', '₹16,500'], ['Innova', '₹19,000'], ['Tempo Traveller 12 Seater', '₹21,600']],
    included: 'Includes Tolls, Parking, Driver Batta & State Taxes'
  },
  {
    title: '4 Days Tirupati Temple Tour Package',
    duration: '4 Days / 3 Nights',
    category: 'Multi-Day Circuit',
    image: images.tirumala,
    description: 'Comprehensive South India pilgrimage covering Tirupati Balaji, Srikalahasti, Kanipakam, Vellore Golden Temple, Arunachalam, and Kanchipuram.',
    prices: packageDetails['4 Days Tirupati Temple Tour Package – South India Pilgrimage Tour']?.prices || [['Etios / Dzire', '₹16,500'], ['Ertiga', '₹22,000'], ['Innova', '₹27,000'], ['Tempo Traveller 12 Seater', '₹30,000']],
    included: 'Includes Tolls, Parking, Driver Batta, TN Border Tax'
  },
  {
    title: 'Divine 5 Day South India Temple Tour Package',
    duration: '5 Days / 4 Nights',
    category: 'Multi-Day Circuit',
    image: images.goldentemple,
    description: 'Grand temple circuit from Tirupati through Tamil Nadu sacred heritage including Chidambaram, Tanjore, Madurai, and Rameshwaram.',
    prices: packageDetails['Divine 5 Day South India Temple Tour Package']?.prices || [['Etios / Dzire', '₹26,500'], ['Ertiga', '₹32,500'], ['Innova Crysta', '₹37,500'], ['Tempo Traveller 12 Seater', '₹46,000']],
    included: 'Includes Tolls, Parking, Driver Batta, TN Border Tax'
  }
];

export default function Tours() {
  const [filter, setFilter] = useState('All');

  const filteredPackages = tourPackagesList.filter(pkg => {
    if (filter === 'All') return true;
    if (filter === '1-Day') return pkg.duration.includes('1 Day') && !pkg.duration.includes('2 Days');
    if (filter === 'Multi-Day') return pkg.duration.includes('Days');
    if (filter === 'Outstation') return pkg.category.includes('Outstation');
    if (filter === 'Local') return pkg.category.includes('Local');
    return true;
  });

  return (
    <div className="tours-page">
      <ScrollReveal direction="zoom">
        <div className="tours-hero">
          <span className="tours-badge">
            <Sparkles size={16} /> PILGRIMAGE & TOUR PACKAGES
          </span>
          <h1>Curated Journeys of Faith & Discovery</h1>
          <p>
            Book private cab tour packages for Tirupati Balaji darshan, temple circuits across Andhra Pradesh & Tamil Nadu, and customized South India holiday getaways.
          </p>

          <div className="tours-filter-bar">
            <button className={`tours-filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>
              All Packages ({tourPackagesList.length})
            </button>
            <button className={`tours-filter-btn ${filter === '1-Day' ? 'active' : ''}`} onClick={() => setFilter('1-Day')}>
              1-Day Tours
            </button>
            <button className={`tours-filter-btn ${filter === 'Multi-Day' ? 'active' : ''}`} onClick={() => setFilter('Multi-Day')}>
              Multi-Day Circuits
            </button>
            <button className={`tours-filter-btn ${filter === 'Local' ? 'active' : ''}`} onClick={() => setFilter('Local')}>
              Local Tirupati
            </button>
            <button className={`tours-filter-btn ${filter === 'Outstation' ? 'active' : ''}`} onClick={() => setFilter('Outstation')}>
              Outstation Specials
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* --- STATS COUNTER BANNER --- */}
      <StatsBanner title="Trusted Tour Package Operator" subtitle="WHY TRAVEL WITH US" />

      <div className="tours-grid" style={{ marginTop: '3rem' }}>
        {filteredPackages.map((pkg, i) => (
          <ScrollReveal key={pkg.title} direction="up" delay={i * 0.05}>
            <article className="tour-card">
              <div className="tour-card-header">
                <img src={pkg.image} alt={pkg.title} />
                <span className="tour-duration-badge">
                  <Clock size={13} style={{ display: 'inline', marginRight: 4 }} /> {pkg.duration}
                </span>
                <span className="tour-price-badge">
                  From {pkg.prices[0][1]}
                </span>
              </div>

              <div className="tour-card-body">
                <span className="tour-category">{pkg.category}</span>
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>

                <div className="tour-pricing-grid">
                  {pkg.prices.slice(0, 3).map(([vehicle, price]) => (
                    <div key={vehicle} className="tour-price-row">
                      <span>{vehicle}</span>
                      <strong>{price}</strong>
                    </div>
                  ))}
                </div>

                <div className="tour-inclusions-summary">
                  <CheckCircle2 size={13} style={{ display: 'inline', marginRight: 4 }} /> {pkg.included}
                </div>

                <a
                  href={`${whatsapp}?text=${encodeURIComponent(`Hello! I want to book the ${pkg.title} (${pkg.duration}) starting from ${pkg.prices[0][1]}. Please share availability.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="tour-book-btn"
                >
                  <MessageCircle size={18} /> Book Package on WhatsApp
                </a>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up">
        <div className="tours-custom-banner">
          <h2>Want a Tailor-Made Custom Tour Itinerary?</h2>
          <p>
            We can customize your tour route, vehicle model, departure timings, and hotel arrangements for family groups, corporate delegations, and large pilgrim groups.
          </p>
          <div className="tours-custom-actions">
            <a
              href={`${whatsapp}?text=${encodeURIComponent('Hi Tirupati Balaji Tours! I want to request a customized tour itinerary for my group.')}`}
              target="_blank"
              rel="noreferrer"
              className="tour-book-btn"
              style={{ width: 'auto', padding: '0.9rem 2.2rem' }}
            >
              <MessageCircle size={20} /> Request Custom Quotation
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
