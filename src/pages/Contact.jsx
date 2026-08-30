import { useState } from 'react';
import {
  FaPhone, FaEnvelope, FaLocationDot, FaWhatsapp,
  FaClock, FaShieldHalved, FaHeadset, FaPaperPlane
} from 'react-icons/fa6';
import Page from './PageTemplate';
import { email, phone, whatsapp } from '../data/siteData';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = `Hello Tirupati Balaji Tours & Travels!%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AService Required: ${data.get('service')}%0ADate: ${data.get('date') || 'Flexible'}%0AMessage: ${data.get('message')}`;
    window.open(`${whatsapp}?text=${msg}`, '_blank', 'noopener');
    setSubmitted(true);
  }

  return (
    <Page
      eyebrow="24/7 SUPPORT & BOOKINGS"
      title="Contact Us for Fast & Reliable Tirupati Taxi Bookings"
      text="Have questions about temple darshan packages, cab rentals, or outstation tours? Reach out to our team 24/7 via Phone, WhatsApp, or Email for instant assistance."
      image="https://res.cloudinary.com/znbhjevm/image/upload/v1786735447/c346a3bf-d3de-452f-abc8-d79b13b21eb8.png"
    >
      <div className="contact-page-wrapper">
        <section className="contact-cards-grid">
          <a href={`tel:${phone}`} className="contact-card">
            <div className="card-icon phone-bg">
              <FaPhone size={22} />
            </div>
            <h3>Call Us 24/7</h3>
            <p>Speak directly with our travel expert Mr. Sarath for instant trip planning.</p>
            <span className="card-link">+91 8688624758</span>
          </a>

          <a href={whatsapp} target="_blank" rel="noreferrer" className="contact-card">
            <div className="card-icon wa-bg">
              <FaWhatsapp size={24} />
            </div>
            <h3>WhatsApp Support</h3>
            <p>Get instant cab fare quotes, vehicle photos, and booking confirmations.</p>
            <span className="card-link">Chat on WhatsApp</span>
          </a>

          <a href={`mailto:${email}`} className="contact-card">
            <div className="card-icon mail-bg">
              <FaEnvelope size={22} />
            </div>
            <h3>Email Us</h3>
            <p>Send itinerary requests, corporate package inquiries, or booking details.</p>
            <span className="card-link">{email}</span>
          </a>

          <div className="contact-card">
            <div className="card-icon pin-bg">
              <FaLocationDot size={22} />
            </div>
            <h3>Main Office</h3>
            <p>10-12A, Balakrishna Puram, Mangalam, Tirupati, Andhra Pradesh, India - 517501</p>
            <span className="card-tag">Open 24 Hours / 7 Days</span>
          </div>
        </section>

        <section className="contact-form-section">
          <div className="form-info-col">
            <p className="eyebrow">INSTANT INQUIRY</p>
            <h2>Book Your Cab or Tour Package Online</h2>
            <p>Fill out this form and our booking manager will instantly send vehicle options and transparent pricing to your WhatsApp / Phone.</p>

            <div className="feature-bullets">
              <div className="bullet-item">
                <FaClock className="bullet-icon" />
                <div>
                  <strong>Fast 15-Minute Response</strong>
                  <p>Guaranteed instant callbacks & trip itineraries.</p>
                </div>
              </div>
              <div className="bullet-item">
                <FaShieldHalved className="bullet-icon" />
                <div>
                  <strong>Transparent Zero-Surge Pricing</strong>
                  <p>No hidden charges, driver bata, or toll surprises.</p>
                </div>
              </div>
              <div className="bullet-item">
                <FaHeadset className="bullet-icon" />
                <div>
                  <strong>Dedicated Trip Assistant</strong>
                  <p>Driver details dispatched by 6:00 PM prior day.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="submitted-msg">
                <FaWhatsapp size={48} color="#22c55e" />
                <h3>Redirecting to WhatsApp...</h3>
                <p>Thank you! Your booking request details have been formatted and sent to our WhatsApp line.</p>
                <button onClick={() => setSubmitted(false)} className="resend-btn">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Online Taxi Booking Inquiry</h3>

                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input id="name" name="name" type="text" placeholder="e.g. Ramesh Kumar" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Required *</label>
                  <select id="service" name="service" required defaultValue="Tirupati to Tirumala Cab">
                    <option value="Tirupati to Tirumala Cab">Tirupati to Tirumala Cab</option>
                    <option value="Tirupati Local 5 Temples Package">Tirupati Local 5 Temples Package</option>
                    <option value="Tirupati to Srikalahasti Cab">Tirupati to Srikalahasti Cab</option>
                    <option value="Tirupati to Kanipakam Cab">Tirupati to Kanipakam Cab</option>
                    <option value="Outstation Taxi Rental">Outstation Taxi Rental</option>
                    <option value="Customized Devotional Tour">Customized Devotional Tour</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Travel Date</label>
                  <input id="date" name="date" type="date" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Trip Details / Special Requests</label>
                  <textarea id="message" name="message" rows="3" placeholder="Number of passengers, pickup point (Airport/Station/Hotel), pickup time..."></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <FaPaperPlane size={15} /> Send WhatsApp Booking Request
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </Page>
  );
}
