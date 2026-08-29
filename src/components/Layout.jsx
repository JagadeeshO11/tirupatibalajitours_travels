import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, X, ChevronDown } from 'lucide-react';
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

const Brand = ({ header = false } = {}) => (
  <Link to="/" className={`brand ${header ? 'header-brand' : ''}`}>
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

const CabDropdown = () => (
  <div className="nav-cabs">
    <button className="nav-cabs-trigger">
      Tirupati Cabs <ChevronDown size={13} />
    </button>
    <div className="nav-cabs-menu">
      {cabRoutes.map(r => (
        <NavLink key={r.slug} to={`/tirupati-cabs/${r.slug}`}>
          {r.title}
        </NavLink>
      ))}
    </div>
  </div>
);

const TaxiDropdown = () => (
  <div className="nav-cabs nav-taxi">
    <button className="nav-cabs-trigger">
      Taxi in Tirupati <ChevronDown size={13} />
    </button>
    <div className="nav-cabs-menu">
      {serviceLinks.map(r => (
        <NavLink key={r.slug} to={`/${r.slug}`}>
          {r.title}
        </NavLink>
      ))}
    </div>
  </div>
);

const ServicesDropdown = () => (
  <div className="nav-cabs nav-services">
    <NavLink to="/services" className="nav-cabs-trigger">
      Services <ChevronDown size={13} />
    </NavLink>
    <div className="nav-cabs-menu">
      {packageNavLinks.map(p => (
        <NavLink key={p.slug} to={`/services/${p.slug}`}>
          {p.title}
        </NavLink>
      ))}
    </div>
  </div>
);

const MoreDropdown = () => (
  <div className="nav-cabs nav-more">
    <button className="nav-cabs-trigger">
      More <ChevronDown size={13} />
    </button>
    <div className="nav-cabs-menu">
      {moreNavLinks.map(m => (
        <NavLink key={m.path} to={m.path}>
          {m.title}
        </NavLink>
      ))}
    </div>
  </div>
);

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <Brand header />
        <nav>
          <div className="desktop-nav-links">
            <NavLink to="/">Home</NavLink>
            <CabDropdown />
            <TaxiDropdown />
            <ServicesDropdown />
            <NavLink to="/fleet">Fleet & Rentals</NavLink>
            <NavLink to="/tours">Tours</NavLink>
            <NavLink to="/destinations">Destinations</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <MoreDropdown />
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

      <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer">
        <MessageCircle />
      </a>
    </>
  );
}
