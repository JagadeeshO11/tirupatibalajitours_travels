import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, MessageCircle, X, ChevronDown, Phone, Mail,
  Home as HomeIcon, Car, Package, Sparkles, Grid, Info, ChevronRight, MapPin, ShieldCheck, CreditCard
} from 'lucide-react';
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaYoutube,
  FaLinkedinIn, FaWhatsapp
} from 'react-icons/fa6';
import { phone, whatsapp, email } from '../data/siteData';
import { cabRoutes } from '../data/cabRoutes';
import { serviceLinks } from '../data/servicePages';
import { blogPosts } from '../data/blogData';
import { useData } from '../context/DataContext';
import EasebuzzModal from './EasebuzzModal';
import './Layout.css';
import './LayoutDropdownFix.css';

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
  { path: '/refund-and-cancellation-policy', title: 'Refund & Cancellation' },
  { path: '/privacy-policy', title: 'Privacy Policy' },
  { path: '/terms-and-conditions', title: 'Terms & Conditions' }
];

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/tirupatibalajitourstravel', Icon: FaFacebookF },
  { name: 'Twitter', url: 'https://x.com/tirupati_tours', Icon: FaXTwitter },
  { name: 'Instagram', url: 'https://www.instagram.com/tirupatibalajitourstravel', Icon: FaInstagram },
  { name: 'YouTube', url: 'https://www.youtube.com/@tirupatibalajitourstravel', Icon: FaYoutube },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/chandra-sekhar-59aa502b9', Icon: FaLinkedinIn }
];

const Brand = ({ header = false, logoOnly = false } = {}) => (
  <Link to="/" className={`brand ${header ? 'header-brand-only' : ''}`}>
    <img
      src="https://res.cloudinary.com/znbhjevm/image/upload/v1786735614/6a36504b-4108-47ac-8a09-34f153b10f97.png"
      alt="Tirupati Balaji Tours & Travels"
    />
    {!header && !logoOnly && (
      <strong>
        TIRUPATI BALAJI<small>TOURS & TRAVELS</small>
      </strong>
    )}
  </Link>
);

function HeaderDropdown({ id, activeDropdown, onEnter, onLeave, label, to, links, getSlug, isMore, className = '' }) {
  const isOpen = activeDropdown === id;
  const isMultiCol = links.length > 6;

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

      <div className={`nav-cabs-menu ${isOpen ? 'is-open' : ''} ${isMultiCol ? 'multi-col' : ''}`}>
        {isMultiCol && (
          <div className="nav-dropdown-header">{label}</div>
        )}
        {links.map(item => {
          const path = item.path || (getSlug ? getSlug(item) : `/${item.slug}`);
          const lbl = item.shortTitle || item.title;
          return (
            <NavLink key={path} to={path} onClick={() => onLeave(true)}>
              {lbl}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default function Layout() {
  const { blogs } = useData();
  const blogList = blogs && blogs.length > 0 ? blogs : blogPosts;
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState('cabs');
  const [scrolled, setScrolled] = useState(false);
  const [headerPayModalOpen, setHeaderPayModalOpen] = useState(false);
  const timerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 34);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const toggleMobileMenu = () => {
    setOpen(prev => !prev);
    setActiveTab('cabs');
  };

  return (
    <>
      <div className={`header-top-bar${scrolled ? ' is-hidden' : ''}`}>
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
              <a key={name} href={url} target="_blank" rel="noreferrer" className="top-social-icon" title={name}>
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`sticky-header-wrapper${scrolled ? ' is-scrolled' : ''}`}>
        <header className="navbar">
          <Brand header />
          <nav>
            <div className="desktop-nav-links">
              <NavLink to="/" onMouseEnter={() => handleDropdownLeave(true)}>Home</NavLink>
              <HeaderDropdown id="cabs" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Tirupati Cabs" links={cabRoutes} getSlug={r => `/tirupati-cabs/${r.slug}`} />
              <HeaderDropdown id="taxi" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Taxi in Tirupati" className="nav-taxi" links={serviceLinks} getSlug={r => `/${r.slug}`} />
              <HeaderDropdown id="services" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Services" to="/services" className="nav-services" links={packageNavLinks} getSlug={p => `/services/${p.slug}`} />
              <NavLink to="/fleet" onMouseEnter={() => handleDropdownLeave(true)}>Fleet & Rentals</NavLink>
              <NavLink to="/tours" onMouseEnter={() => handleDropdownLeave(true)}>Tours</NavLink>
              <NavLink to="/destinations" onMouseEnter={() => handleDropdownLeave(true)}>Destinations</NavLink>
              <HeaderDropdown id="blogs" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Blogs" className="nav-blogs" links={blogList} getSlug={b => `/blog/${b.slug}`} />
              <HeaderDropdown id="more" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="More" isMore className="nav-more" links={moreNavLinks} />
            </div>
          </nav>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              className="nav-book-btn"
              onClick={() => setHeaderPayModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#ffffff',
                border: '1px solid #0284c7',
                padding: '8px 14px',
                borderRadius: '7px',
                display: 'inline-flex',
                gap: '5px',
                alignItems: 'center',
                fontSize: '11px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              <CreditCard size={14} /> Book Cab 💳
            </button>
            <a className="nav-wa" href={whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <button
            type="button"
            className="menu"
            onClick={toggleMobileMenu}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="overlay" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside
              className="drawer executive-mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className="drawer-header-row">
                <Brand logoOnly />
                <div className="drawer-header-actions">
                  <button type="button" className="drawer-x-icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="mobile-drawer-tab-bar">
                <button type="button" className={`drawer-tab drawer-tab-primary ${activeTab === 'cabs' ? 'is-active' : ''}`} onClick={() => setActiveTab('cabs')}>
                  <Car size={14} /> Cabs
                </button>
                <button type="button" className={`drawer-tab ${activeTab === 'more' ? 'is-active' : ''}`} onClick={() => setActiveTab('more')}>
                  <Info size={14} /> More Info
                </button>
                <button type="button" className={`drawer-tab ${activeTab === 'packages' ? 'is-active' : ''}`} onClick={() => setActiveTab('packages')}>
                  <Package size={14} /> Packages
                </button>
              </div>

              <div className="drawer-scroll-content">
                {activeTab === 'cabs' && (
                  <div className="drawer-section-block">
                    <span className="drawer-badge-pill">Popular Cab Routes</span>
                    <div className="drawer-link-card-grid">
                      {cabRoutes.map(r => (
                        <NavLink key={r.slug} onClick={() => setOpen(false)} to={`/tirupati-cabs/${r.slug}`} className="mob-link-card">
                          <span>{r.shortTitle || r.title}</span><ChevronRight size={14} />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'packages' && (
                  <div className="drawer-section-block">
                    <span className="drawer-badge-pill">Taxi & Tour Packages</span>
                    <div className="drawer-link-card-grid">
                      {packageNavLinks.map(p => (
                        <NavLink key={p.slug} onClick={() => setOpen(false)} to={`/services/${p.slug}`} className="mob-link-card">
                          <span>{p.title}</span><ChevronRight size={14} />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'more' && (
                  <>
                    <div className="drawer-section-block">
                      <span className="drawer-badge-pill">Travel Blogs</span>
                      <div className="drawer-link-card-grid">
                        {blogList.map(b => (
                          <NavLink key={b.slug} onClick={() => setOpen(false)} to={`/blog/${b.slug}`} className="mob-link-card">
                            <span>{b.shortTitle || b.title}</span><ChevronRight size={14} />
                          </NavLink>
                        ))}
                      </div>
                    </div>
                    <div className="drawer-section-block" style={{ marginTop: '1.5rem' }}>
                      <span className="drawer-badge-pill">Information & Pages</span>
                      <div className="drawer-link-card-grid">
                        {moreNavLinks.map(m => (
                          <NavLink key={m.path} onClick={() => setOpen(false)} to={m.path} className="mob-link-card">
                            <span>{m.title}</span><ChevronRight size={14} />
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="drawer-footer-row"><ShieldCheck size={16} /> 24/7 Verified Tirupati Taxi Service</div>
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
              <a key={name} href={url} target="_blank" rel="noreferrer" className="footer-social-btn" title={name}><Icon size={14} /></a>
            ))}
          </div>
        </div>
        <div>
          <h4>Services & Packages</h4>
          {packageNavLinks.slice(0, 5).map(p => <Link key={p.slug} to={`/services/${p.slug}`}>{p.title}</Link>)}
        </div>
        <div>
          <h4>More Info</h4>
          {moreNavLinks.map(m => <Link key={m.path} to={m.path}>{m.title}</Link>)}
        </div>
        <div>
          <h4>Get in touch</h4>
          <a href={`tel:${phone}`}>+91 8688624758</a>
          <a href={whatsapp}>WhatsApp Us</a>
          <a href={`mailto:${email}`}>{email}</a>
          <p>10-12A, Balakrishna Puram, Mangalam, Tirupati</p>
        </div>
      </footer>

      <div className="floating-whatsapp-container">
        <div className="whatsapp-tooltip"><span className="online-dot" /> Need a Cab? <strong>Chat Now!</strong></div>
        <a className="whatsapp-pulse-btn" href={whatsapp} target="_blank" rel="noreferrer" title="Chat on WhatsApp">
          <span className="pulse-ring" /><span className="pulse-ring-outer" /><FaWhatsapp size={26} />
        </a>
      </div>

      <nav className="mobile-pop-bottom-nav" aria-label="Mobile Quick Navigation">
        <NavLink to="/" className={({ isActive }) => `mob-pop-nav-item ${isActive ? 'active' : ''}`}><HomeIcon size={18} /><span>Home</span></NavLink>
        <NavLink to="/fleet" className={({ isActive }) => `mob-pop-nav-item ${isActive ? 'active' : ''}`}><Car size={18} /><span>Fleets</span></NavLink>
        <NavLink to="/destinations" className={({ isActive }) => `mob-pop-nav-item ${isActive ? 'active' : ''}`}><MapPin size={18} /><span>Destinations</span></NavLink>
        <NavLink to="/tours" className={({ isActive }) => `mob-pop-nav-item ${isActive ? 'active' : ''}`}><Package size={18} /><span>Tours</span></NavLink>
      </nav>

      {/* Header Pay & Book Modal */}
      {headerPayModalOpen && (
        <EasebuzzModal
          isOpen={headerPayModalOpen}
          onClose={() => setHeaderPayModalOpen(false)}
          initialData={{
            service: 'Tirupati Cab & Tour Booking',
            amount: '500'
          }}
        />
      )}
    </>
  );
}
