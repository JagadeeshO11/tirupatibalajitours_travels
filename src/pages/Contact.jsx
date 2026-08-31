import { useState } from 'react';
import {
  FaPhone, FaEnvelope, FaLocationDot, FaWhatsapp,
  FaClock, FaShieldHalved, FaHeadset, FaPaperPlane,
  FaMapLocationDot, FaCircleCheck, FaChevronDown
} from 'react-icons/fa6';
import Page from './PageTemplate';
import { email, phone, whatsapp } from '../data/siteData';
import StatsBanner from '../components/StatsBanner';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = `Hello Tirupati Balaji Tours & Travels!%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AService Required: ${data.get('service')}%0ADate: ${data.get('date') || 'Flexible'}%0AMessage: ${data.get('message')}`;
    window.open(`${whatsapp}?text=${msg}`, '_blank', 'noopener');
    setSubmitted(true);
  }

  const contactFaqs = [
    {
      q: 'How quickly will I receive cab fare confirmation on WhatsApp?',
      a: 'Instantly! Once you submit the form or send a WhatsApp message, our booking executive will reply within 5 to 15 minutes with exact vehicle options, driver details, and transparent fares.'
    },
    {
      q: 'Can I book a cab for early morning 3:00 AM Tirumala Darshan?',
      a: 'Yes. We operate 24/7. Your assigned driver will arrive punctually at your hotel, airport, or Tirupati Railway Station regardless of the pickup time.'
    },
    {
      q: 'Are toll fees, driver allowance, and parking charges included?',
      a: 'Yes! All quotes provided on WhatsApp are transparent and all-inclusive. There are no hidden fees or surge pricing on trip day.'
    },
    {
      q: 'What details are required for booking an outstation cab?',
      a: 'Just share your travel date, passenger count, destination (e.g. Srikalahasti, Kanipakam, Kanchipuram), and pickup point. No complicated paperwork required.'
    }
  ];

  return (
    <Page
      eyebrow="24/7 SUPPORT & BOOKINGS"
      title="Contact Us for Fast & Reliable Tirupati Taxi Bookings"
      text="Have questions about temple darshan packages, cab rentals, or outstation tours? Reach out to our team 24/7 via Phone, WhatsApp, or Email for instant assistance."
      image="https://res.cloudinary.com/znbhjevm/image/upload/v1786735447/c346a3bf-d3de-452f-abc8-d79b13b21eb8.png"
    >
      <div className="contact-page-wrapper">
        {/* --- 4 QUICK CONTACT CARDS --- */}
        <section className="contact-cards-grid">
          <a href={`tel:${phone}`} className="contact-card">
            <div className="card-icon phone-bg">
              <FaPhone size={20} />
            </div>
            <span className="card-badge">24x7 DIRECT CALL</span>
            <h3>Call Us 24/7</h3>
            <p>Speak directly with our travel expert Mr. Sarath for instant trip planning.</p>
            <span className="card-link">+91 8688624758</span>
          </a>

          <a href={whatsapp} target="_blank" rel="noreferrer" className="contact-card highlight-card">
            <div className="card-icon wa-bg">
              <FaWhatsapp size={22} />
            </div>
            <span className="card-badge green-badge">INSTANT REPLY</span>
            <h3>WhatsApp Support</h3>
            <p>Get instant cab fare quotes, vehicle photos, and booking confirmations.</p>
            <span className="card-link wa-link">Chat on WhatsApp</span>
          </a>

          <a href={`mailto:${email}`} className="contact-card">
            <div className="card-icon mail-bg">
              <FaEnvelope size={20} />
            </div>
            <span className="card-badge gold-badge">EMAIL ENQUIRY</span>
            <h3>Email Us</h3>
            <p>Send itinerary requests, corporate package inquiries, or booking details.</p>
            <span className="card-link">{email}</span>
          </a>

          <div className="contact-card">
            <div className="card-icon pin-bg">
              <FaLocationDot size={20} />
            </div>
            <span className="card-badge navy-badge">MAIN HUB</span>
            <h3>Main Office</h3>
            <p>10-12A, Balakrishna Puram, Mangalam, Tirupati, Andhra Pradesh - 517501</p>
            <span className="card-tag">Open 24 Hours / 7 Days</span>
          </div>
        </section>

        {/* --- ONLINE BOOKING FORM & VALUE PROPOSITION --- */}
        <section className="contact-form-section">
          <div className="form-info-col">
            <span className="badge-pill gold"><FaClock size={12} /> INSTANT INQUIRY</span>
            <h2>Book Your Cab or Tour Package Online</h2>
            <p className="lead-desc">
              Fill out this form and our booking manager will instantly send verified vehicle options and transparent pricing to your WhatsApp / Phone.
            </p>

            <div className="feature-bullets">
              <div className="bullet-item">
                <div className="bullet-icon-wrap"><FaClock className="bullet-icon" /></div>
                <div>
                  <strong>Fast 15-Minute Response</strong>
                  <p>Guaranteed instant callbacks & trip itineraries tailored to your schedule.</p>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon-wrap"><FaShieldHalved className="bullet-icon" /></div>
                <div>
                  <strong>Transparent Zero-Surge Fares</strong>
                  <p>All-inclusive transparent rates with no surprise driver bata or toll charges.</p>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon-wrap"><FaHeadset className="bullet-icon" /></div>
                <div>
                  <strong>Dedicated Travel Assistant</strong>
                  <p>Driver details and vehicle registration numbers dispatched by 6:00 PM prior day.</p>
                </div>
              </div>
            </div>

            <div className="guarantee-box">
              <FaCircleCheck size={20} className="guarantee-icon" />
              <div>
                <strong>Punctuality & Safety Guarantee</strong>
                <p>100% verified, clean AC vehicles with safe, courteous local drivers experienced on ghat roads.</p>
              </div>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="submitted-msg">
                <FaWhatsapp size={52} color="#25d366" />
                <h3>Redirecting to WhatsApp...</h3>
                <p>Thank you! Your booking request details have been formatted and sent to our official WhatsApp line.</p>
                <button onClick={() => setSubmitted(false)} className="resend-btn">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>Online Taxi Booking Inquiry</h3>
                  <p>Get instant quote & vehicle availability</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input id="name" name="name" type="text" placeholder="e.g. Ramesh Kumar" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp Number *</label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="form-row">
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
                </div>

                <div className="form-group">
                  <label htmlFor="message">Trip Details / Special Requests</label>
                  <textarea id="message" name="message" rows="3" placeholder="Number of passengers, pickup point (Airport / Station / Hotel), pickup time..."></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <FaPaperPlane size={15} /> Send WhatsApp Booking Request
                </button>
              </form>
            )}
          </div>
        </section>

        {/* --- STATS COUNTER BANNER --- */}
        <StatsBanner title="24/7 Dedicated Devotee Support" subtitle="TRUSTED SERVICE" />

        {/* --- OFFICE LOCATION & INFORMATION STRIP --- */}
        <section className="location-section">
          <div className="location-info-card">
            <div className="location-header">
              <FaMapLocationDot size={26} className="location-icon" />
              <div>
                <h2>Visit Our Office in Tirupati</h2>
                <p>Located near Mangalam connection for easy access from Tirupati Airport & Railway Station</p>
              </div>
            </div>
            <div className="location-details-grid">
              <div className="loc-item">
                <strong>Main Office Address:</strong>
                <p>10-12A, Balakrishna Puram, Mangalam, Tirupati, Andhra Pradesh, India - 517501</p>
              </div>
              <div className="loc-item">
                <strong>Operating Hours:</strong>
                <p>Open 24 Hours / 7 Days a Week (Round the Clock)</p>
              </div>
              <div className="loc-item">
                <strong>Direct Support Lines:</strong>
                <p>Phone: +91 8688624758 | WhatsApp: +91 8688624758</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT FAQ ACCORDION --- */}
        <section className="contact-faq-section">
          <div className="section-header-centered">
            <span className="badge-pill"><FaHeadset size={12} /> HELP & FAQ</span>
            <h2>Common Booking & Contact Questions</h2>
            <p>Everything you need to know about getting in touch and confirming your taxi booking</p>
          </div>

          <div className="contact-faq-list">
            {contactFaqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`contact-faq-card ${openFaq === index ? 'active' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-question-row">
                  <h3>{faq.q}</h3>
                  <FaChevronDown className="faq-chevron" size={15} />
                </div>
                {openFaq === index && (
                  <p className="faq-answer-text">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
