import React from 'react';
import { Scale, CheckSquare, Car, Shield, PhoneCall, ArrowRight } from 'lucide-react';
import { phone, whatsapp, email } from '../data/siteData';
import './LegalPage.css';

export default function TermsConditions() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <span className="legal-badge">TERMS OF SERVICE</span>
        <h1>Terms & Conditions</h1>
        <p>
          Please review the terms and conditions governing the use of Tirupati Balaji Tours Travels taxi services, tour packages, and vehicle rentals.
        </p>
      </div>

      <div className="legal-content-grid">
        <aside className="legal-toc">
          <h3>Quick Navigation</h3>
          <ul>
            <li><a href="#acceptance">Acceptance of Terms</a></li>
            <li><a href="#tariffs">Tariffs & Additional Charges</a></li>
            <li><a href="#passenger-duties">Passenger Responsibilities</a></li>
            <li><a href="#breakdown">Vehicle Maintenance & Support</a></li>
            <li><a href="#jurisdiction">Jurisdiction & Contact</a></li>
          </ul>
        </aside>

        <main className="legal-sections">
          <section id="acceptance" className="legal-card">
            <h2><Scale /> 1. Acceptance of Terms</h2>
            <p>
              By booking a cab, renting a vehicle, or purchasing a tour package with <strong>Tirupati Balaji Tours Travels</strong>, you agree to comply with and be bound by the following terms and conditions.
            </p>
          </section>

          <section id="tariffs" className="legal-card">
            <h2><Car /> 2. Tariffs, Inclusions & Route Charges</h2>
            <p>
              Our published vehicle rental and tour tariffs are designed with complete transparency:
            </p>
            <ul>
              <li><strong>Local Packages:</strong> Standard local day packages are based on 8 Hours / 80 KMs or 12 Hours / 150 KMs limits. Additional hours or KMs are charged as per applicable rates.</li>
              <li><strong>Outstation Tariffs:</strong> Outstation journeys are subject to a minimum billing of 300 KMs per calendar day for cars/travellers and 350 KMs per day for buses.</li>
              <li><strong>Extra Route Costs:</strong> Toll gate fees, parking charges, interstate border permits, and driver night allowances (where applicable) are charged as actuals unless explicitly specified in your package quotation.</li>
            </ul>
          </section>

          <section id="passenger-duties" className="legal-card">
            <h2><CheckSquare /> 3. Passenger Responsibilities</h2>
            <ul>
              <li>Passengers must adhere to TTD dress code and guidelines during Tirumala temple visits.</li>
              <li>Carrying illegal, hazardous, or prohibited items in the vehicle is strictly prohibited.</li>
              <li>Passengers are requested to take care of personal belongings and luggage during the journey.</li>
            </ul>
          </section>

          <section id="breakdown" className="legal-card">
            <h2><Shield /> 4. Fleet Safety & Vehicle Contingency</h2>
            <p>
              All vehicles in our fleet undergo routine mechanical checks and AC maintenance before trip dispatch.
            </p>
            <div className="legal-alert legal-alert-info">
              <strong>REPLACEMENT ASSURANCE:</strong> In the rare event of a mechanical breakdown during travel, we will arrange a replacement vehicle or alternative transport as quickly as possible.
            </div>
          </section>

          <div id="jurisdiction" className="legal-contact-box">
            <h3>Have Questions Regarding Our Terms?</h3>
            <p>Our team is available 24/7 to clarify any booking terms or commercial conditions.</p>
            <div className="legal-actions">
              <a href={`tel:${phone}`} className="legal-btn legal-btn-primary">
                <PhoneCall size={18} /> Call +91-8688624758
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="legal-btn legal-btn-secondary">
                <ArrowRight size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
