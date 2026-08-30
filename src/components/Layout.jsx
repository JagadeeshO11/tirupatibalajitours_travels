import { useState, useRef } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, X, ChevronDown, Phone, Mail } from 'lucide-react';
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaYoutube,
  FaLinkedinIn, FaWhatsapp
} from 'react-icons/fa6';
import { phone, whatsapp, email } from '../data/siteData';
import { cabRoutes } from '../data/cabRoutes';
import { serviceLinks } from '../data/servicePages';
import './Layout.css';

const packageNavLinks = [
  { slug: 'local-packages', title: 'Local Packages' },
  { slug: 'outstation-packages', title: 'Outstation Packages' },
  { slug: 'balaji-darshan-packages', title: 'Balaji Darshan Packages' },
  { slug: 'corporate-packages', title: 'Corporate Packages' },
  { slug: 'customized-packages', title: 'Customized Packages' },
  { slug: 'holiday-packages', title: 'Holiday Packages' },
  { slug: 'family-packages', title: 'Family Packages' },
  { slug: 'student-packages', title: 'Student Packages' },
  { slug: 'wedding-packages', title: 'Wedding Packages' },
  { slug: 'devotional-packages', title: 'Devotional Packages' }
];

const moreNavLinks = [
  { path: '/contact-us', title: 'Contact Us' },
  { path: '/about-us', title: 'About Us' },
  { path: '/refund-and-cancellation-policy', title: 'Refund and Cancellation Policy' },
  { path: '/privacy-policy', title: 'Privacy Policy' },
  { path: '/terms-and-conditions', title: 'Terms and Conditions' }
];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/tirupatibalajitourstravel', Icon: FaFacebookF },
  { name: 'Twitter', url: 'https://x.com/tirupati_tours', Icon: FaXTwitter },
  { name: 'Instagram', url: 'https://www.instagram.com/tirupatibalajitourstravel', Icon: FaInstagram },
  { name: 'YouTube', url: 'https://www.youtube.com/@tirupatibalajitourstravel', Icon: FaYoutube },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/chandra-sekhar-59aa502b9', Icon: FaLinkedinIn }
];

const TopBar = () => (
  <div className="header-top-bar">
    <div className="top-bar-container social-only">
      <div className="top-bar-social-wrapper">
        <span className="top-bar-social-label">Follow Us:</span>
        {socialLinks.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="top-social-icon"
            title={name}
          >
            <Icon size={13} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Brand = ({ header = false } = {}) => (
  <Link to="/" className={`brand ${header ? 'header-brand-only' : ''}`}>
    <img
      src="https://res.cloudinary.com/znbhjevm/image/upload/v1786735614/6a36504b-4108-47ac-8a09-34f153b10f97.png"
      alt="Tirupati Balaji Tours & Travels"
    />
    {!header && (
      <strong>
        TIRUPATI BALAJI<small>TOURS & TRAVELS</small>
      </strong>
    )}
  </Link>
);

function HeaderDropdown({ id, activeDropdown, onEnter, onLeave, label, to, links, getSlug, isMore, className = '' }) {
  const isOpen = activeDropdown === id;

  return (
    <div
      className={`nav-cabs ${className} ${isMore ? 'nav-more' : ''} ${isOpen ? 'is-open' : ''}`}
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={onLeave}
    >
      {to ? (
        <NavLink to={to} className="nav-cabs-trigger" onClick={() => onLeave(true)}>
          {label} <ChevronDown size={13} />
        </NavLink>
      ) : (
        <button className="nav-cabs-trigger">
          {label} <ChevronDown size={13} />
        </button>
      )}

      <div className={`nav-cabs-menu ${isOpen ? 'is-open' : ''}`}>
        {links.map(item => {
          const path = item.path || (getSlug ? getSlug(item) : `/${item.slug}`);
          return (
            <NavLink key={path} to={path} onClick={() => onLeave(true)}>
              {item.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timerRef = useRef(null);

  const handleDropdownEnter = id => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveDropdown(id);
  };

  const handleDropdownLeave = immediate => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (immediate === true) {
      setActiveDropdown(null);
    } else {
      timerRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 180);
    }
  };

  return (
    <>
      <div className="header-top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <a href={`tel:${phone}`} className="top-bar-link">
              <Phone size={13} /> +91 8688624758
            </a>
            <a href={`mailto:${email}`} className="top-bar-link">
              <Mail size={13} /> {email}
            </a>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-social-label">Follow Us:</span>
            {socialLinks.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="top-social-icon"
                title={name}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="navbar">
        <Brand header />
        <nav>
          <div className="desktop-nav-links">
            <NavLink to="/" onMouseEnter={() => handleDropdownLeave(true)}>
              Home
            </NavLink>
            <HeaderDropdown
              id="cabs"
              activeDropdown={activeDropdown}
              onEnter={handleDropdownEnter}
              onLeave={handleDropdownLeave}
              label="Tirupati Cabs"
              links={cabRoutes}
              getSlug={r => `/tirupati-cabs/${r.slug}`}
            />
            <HeaderDropdown
              id="taxi"
              activeDropdown={activeDropdown}
              onEnter={handleDropdownEnter}
              onLeave={handleDropdownLeave}
              label="Taxi in Tirupati"
              className="nav-taxi"
              links={serviceLinks}
              getSlug={r => `/${r.slug}`}
            />
            <HeaderDropdown
              id="services"
              activeDropdown={activeDropdown}
              onEnter={handleDropdownEnter}
              onLeave={handleDropdownLeave}
              label="Services"
              to="/services"
              className="nav-services"
              links={packageNavLinks}
              getSlug={p => `/services/${p.slug}`}
            />
            <NavLink to="/fleet" onMouseEnter={() => handleDropdownLeave(true)}>
              Fleet & Rentals
            </NavLink>
            <NavLink to="/tours" onMouseEnter={() => handleDropdownLeave(true)}>
              Tours
            </NavLink>
            <NavLink to="/destinations" onMouseEnter={() => handleDropdownLeave(true)}>
              Destinations
            </NavLink>
            <NavLink to="/blog" onMouseEnter={() => handleDropdownLeave(true)}>
              Blog
            </NavLink>
            <HeaderDropdown
              id="more"
              activeDropdown={activeDropdown}
              onEnter={handleDropdownEnter}
              onLeave={handleDropdownLeave}
              label="More"
              isMore
              className="nav-more"
              links={moreNavLinks}
            />
          </div>
        </nav>
        <a className="nav-wa" href={whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> WhatsApp
        </a>
        <button className="menu" onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
            >
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
              <Brand />
              <NavLink onClick={() => setOpen(false)} to="/">
                Home
              </NavLink>

              <div className="drawer-cabs">
                <strong>Tirupati Cabs</strong>
                {cabRoutes.map(r => (
                  <NavLink key={r.slug} onClick={() => setOpen(false)} to={`/tirupati-cabs/${r.slug}`}>
                    {r.title}
                  </NavLink>
                ))}
              </div>

              <div className="drawer-cabs">
                <strong>Taxi in Tirupati</strong>
                {serviceLinks.map(r => (
                  <NavLink key={r.slug} onClick={() => setOpen(false)} to={`/${r.slug}`}>
                    {r.title}
                  </NavLink>
                ))}
              </div>

              <div className="drawer-cabs">
                <strong>Services & Packages</strong>
                {packageNavLinks.map(p => (
                  <NavLink key={p.slug} onClick={() => setOpen(false)} to={`/services/${p.slug}`}>
                    {p.title}
                  </NavLink>
                ))}
              </div>

              <div className="drawer-cabs">
                <strong>More Information</strong>
                {moreNavLinks.map(m => (
                  <NavLink key={m.path} onClick={() => setOpen(false)} to={m.path}>
                    {m.title}
                  </NavLink>
                ))}
              </div>

              <NavLink onClick={() => setOpen(false)} to="/fleet">
                Fleet & Rentals
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/tours">
                Tours
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/destinations">
                Destinations
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/blog">
                Blog
              </NavLink>

              <a className="button" href={whatsapp}>
                WhatsApp Us
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Outlet />

      <footer className="site-footer">
        <div>
          <Brand />
          <p>Faithful journeys, comfortable miles, and memories that stay with you.</p>
          <div className="footer-social-row">
            {socialLinks.map(({ name, url, Icon }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="footer-social-btn" title={name}>
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4>Services & Packages</h4>
          {packageNavLinks.slice(0, 5).map(p => (
            <Link key={p.slug} to={`/services/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </div>
        <div>
          <h4>More Info</h4>
          {moreNavLinks.map(m => (
            <Link key={m.path} to={m.path}>
              {m.title}
            </Link>
          ))}
        </div>
        <div>
          <h4>Get in touch</h4>
          <a href={`tel:${phone}`}>+91 8688624758</a>
          <a href={whatsapp}>WhatsApp Us</a>
          <a href={`mailto:${email}`}>{email}</a>
          <p>10-12A, Balakrishna Puram, Mangalam, Tirupati</p>
        </div>
      </footer>

      {/* --- FLOATING ACTION BUTTON (POPUP ACTION) --- */}
      <div className="floating-whatsapp-container">
        <div className="whatsapp-tooltip">
          <span className="online-dot" /> Need a Cab? <strong>Chat Now!</strong>
        </div>
        <a className="whatsapp-pulse-btn" href={whatsapp} target="_blank" rel="noreferrer" title="Chat on WhatsApp">
          <span className="pulse-ring" />
          <span className="pulse-ring-outer" />
          <FaWhatsapp size={26} />
        </a>
      </div>
    </>
  );
}

