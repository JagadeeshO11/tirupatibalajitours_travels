import React from 'react';
import { ShieldAlert, AlertTriangle, FileText, HelpCircle, PhoneCall, Mail, ArrowRight } from 'lucide-react';
import { phone, whatsapp, email } from '../data/siteData';
import './LegalPage.css';

export default function RefundPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <span className="legal-badge">BOOKING TERMS & CONDITIONS</span>
        <h1>Refund & Cancellation Policy</h1>
        <p>
          Transparent guidelines regarding cancellations, booking modifications, and refund terms for all Tirupati Balaji Tours Travels services.
        </p>
      </div>

      <div className="legal-content-grid">
        <aside className="legal-toc">
          <h3>Quick Navigation</h3>
          <ul>
            <li><a href="#no-refund">No-Refund Policy</a></li>
            <li><a href="#cancellations">Cancellation Process</a></li>
            <li><a href="#modifications">Date & Route Changes</a></li>
            <li><a href="#unforeseen">Weather & TTD Delays</a></li>
            <li><a href="#contact-support">Contact Support</a></li>
          </ul>
        </aside>

        <main className="legal-sections">
          <section id="no-refund" className="legal-card">
            <h2><ShieldAlert /> 1. No-Refund Policy</h2>
            <p>
              Thank you for choosing <strong>Tirupati Balaji Tours Travels</strong> for your pilgrimage and travel needs in Tirupati. Please note that Tirupati Balaji Tours Travels maintains a transparent policy regarding advance booking amounts.
            </p>
            <div className="legal-alert">
              <strong>IMPORTANT NOTICE:</strong> Advance payments made for cab reservations, temple packages, vehicle rentals, and accommodation arrangements are non-refundable once confirmed.
            </div>
            <p>
              This policy applies to all bookings including local cab rentals, Tirumala temple packages, outstation journeys, and group vehicle hires.
            </p>
          </section>

          <section id="cancellations" className="legal-card">
            <h2><FileText /> 2. Cancellation Process</h2>
            <p>
              If you need to cancel your upcoming journey, please notify our customer support team as early as possible.
            </p>
            <ul>
              <li>Cancellation requests must be communicated directly via WhatsApp or phone call to <strong>+91-8688624758</strong>.</li>
              <li>You may also submit a written cancellation request via email to <strong>{email}</strong>.</li>
              <li>Timely notification helps us adjust driver schedules and vehicle dispatch plans efficiently.</li>
            </ul>
          </section>

          <section id="modifications" className="legal-card">
            <h2><AlertTriangle /> 3. Booking Modifications & Rescheduling</h2>
            <p>
              We understand that pilgrimage plans and darshan slots may occasionally change due to TTD token updates or flight/train timing adjustments.
            </p>
            <div className="legal-alert legal-alert-info">
              <strong>FLEXIBLE RESCHEDULING:</strong> Subject to vehicle availability, we allow date or timing adjustments if requested at least 24 hours prior to scheduled pickup time.
            </div>
            <ul>
              <li>Rescheduling is subject to available vehicle capacity on your new requested travel dates.</li>
              <li>Any difference in seasonal fares or revised vehicle class tariffs will be communicated transparently.</li>
            </ul>
          </section>

          <section id="unforeseen" className="legal-card">
            <h2><HelpCircle /> 4. Unforeseen Circumstances & TTD Guidelines</h2>
            <p>
              Tirupati Balaji Tours Travels is not liable for travel interruptions caused by unforeseen events beyond our control, including:
            </p>
            <ul>
              <li>Sudden changes in TTD (Tirumala Tirupati Devasthanams) darshan rules or queue closures.</li>
              <li>Extreme weather conditions, natural road blockages, or state border regulation updates.</li>
              <li>Flight or train cancellations/delays by transport authorities.</li>
            </ul>
            <p>
              In such scenarios, our team will make every effort to assist you with alternative travel arrangements or rescheduled itineraries.
            </p>
          </section>

          <div id="contact-support" className="legal-contact-box">
            <h3>Need Assistance with Your Booking?</h3>
            <p>Our dedicated travel desk is available 24/7 to resolve your booking queries.</p>
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
