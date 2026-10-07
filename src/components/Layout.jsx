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
import { serviceLinks, taxiLinks } from '../data/servicePages';
import { blogPosts } from '../data/blogData';
import { useData } from '../context/DataContext';
import EasebuzzModal from './EasebuzzModal';
import './Layout.css';
import './LayoutDropdownFix.css';

const packageNavLinks = [
  { slug: 'local-packages', title: 'Local Packages', starting: '₹2,880' },
  { slug: 'outstation-packages', title: 'Outstation Packages', starting: '₹15/km' },
  { slug: 'balaji-darshan-packages', title: 'Balaji Darshan Packages', starting: '₹3,500' },
  { slug: 'corporate-packages', title: 'Corporate Packages', starting: '₹3,000' },
  { slug: 'customized-packages', title: 'Customized Packages', starting: 'Custom Quote' },
  { slug: 'holiday-packages', title: 'Holiday Packages', starting: '₹9,500' },
  { slug: 'family-packages', title: 'Family Packages', starting: '₹3,380' },
  { slug: 'student-packages', title: 'Student Packages', starting: 'Group Rate' },
  { slug: 'wedding-packages', title: 'Wedding Packages', starting: 'Event Rate' },
  { slug: 'devotional-packages', title: 'Devotional Packages', starting: '₹3,500' }
];

const fleetNavLinks = [
  { path: '/fleet/sedan', title: 'Sedan (Dzire / Etios)', starting: '₹2,880' },
  { path: '/fleet/ertiga', title: 'Maruti Ertiga (MUV)', starting: '₹3,380' },
  { path: '/fleet/innova-crysta', title: 'Toyota Innova Crysta', starting: '₹4,380' },
  { path: '/fleet/hycross', title: 'Toyota Hycross', starting: '₹6,100' },
  { path: '/fleet/fortuner', title: 'Toyota Fortuner', starting: '₹8,800' },
  { path: '/fleet/tempo-12', title: 'Tempo Traveller 12 Seater', starting: '₹5,100' },
  { path: '/fleet/urbania-12', title: 'Urbania 12 Seater', starting: '₹10,000' },
  { path: '/fleet/tempo-16', title: 'Tempo Traveller 16 Seater', starting: '₹6,800' },
  { path: '/fleet/urbania-16', title: 'Urbania 16 Seater', starting: '₹12,000' },
  { path: '/fleet/tempo-20', title: 'Tempo Traveller 20 Seater', starting: '₹9,000' },
  { path: '/fleet/bus-27', title: 'Mini Bus 27 Seater', starting: '₹12,000' },
  { path: '/fleet/bus-40', title: 'Bus 40 Seater', starting: '₹15,200' },
  { path: '/fleet/bus-45', title: 'Bus 45 Seater', starting: '₹18,000' }
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
          const rate = item.starting;
          return (
            <NavLink key={path} to={path} onClick={() => onLeave(true)} className="nav-dropdown-item">
              <span className="nav-dropdown-item-title">{lbl}</span>
              {rate && rate !== 'Call for current fare' && (
                <span className="nav-dropdown-price-tag">{rate}</span>
              )}
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

  useEffect(() => {
    if (open || headerPayModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.classList.remove('modal-open');
      };
    }
  }, [open, headerPayModalOpen]);

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
            <a href={`tel:${phone}`} className="top-bar-link top-bar-phone">
              <Phone size={13} /> +91 86886 24758
            </a>
            <a href="tel:+916303524758" className="top-bar-link top-bar-phone">
              <Phone size={13} /> +91 63035 24758
            </a>
            <a href={`mailto:${email}`} className="top-bar-link top-bar-email">
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
              <HeaderDropdown id="taxi" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Taxi in Tirupati" className="nav-taxi" links={taxiLinks} getSlug={r => `/${r.slug}`} />
              <HeaderDropdown id="services" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Services" to="/services" className="nav-services" links={packageNavLinks} getSlug={p => `/services/${p.slug}`} />
              <HeaderDropdown id="fleet" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="Fleet & Rentals" to="/fleet" className="nav-fleet" links={fleetNavLinks} />
              <NavLink to="/tours" onMouseEnter={() => handleDropdownLeave(true)}>Tours</NavLink>
              <NavLink to="/destinations" onMouseEnter={() => handleDropdownLeave(true)}>Destinations</NavLink>
              <NavLink to="/blog" onMouseEnter={() => handleDropdownLeave(true)}>Blog</NavLink>
              <HeaderDropdown id="more" activeDropdown={activeDropdown} onEnter={handleDropdownEnter} onLeave={handleDropdownLeave} label="More" isMore className="nav-more" links={moreNavLinks} />
            </div>
          </nav>
          <div className="nav-right-controls" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
            <button
              type="button"
              className="menu"
              onClick={toggleMobileMenu}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                <Brand header />
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
                <button type="button" className={`drawer-tab ${activeTab === 'fleet' ? 'is-active' : ''}`} onClick={() => setActiveTab('fleet')}>
                  <Car size={14} /> Fleet
                </button>
                <button type="button" className={`drawer-tab ${activeTab === 'packages' ? 'is-active' : ''}`} onClick={() => setActiveTab('packages')}>
                  <Package size={14} /> Packages
                </button>
                <button type="button" className={`drawer-tab ${activeTab === 'more' ? 'is-active' : ''}`} onClick={() => setActiveTab('more')}>
                  <Info size={14} /> More Info
                </button>
              </div>

              <div className="drawer-scroll-content">
                {activeTab === 'cabs' && (
                  <div className="drawer-section-block">
                    <span className="drawer-badge-pill">Popular Cab Routes</span>
                    <div className="drawer-link-card-grid">
                      {cabRoutes.map(r => (
                        <NavLink key={r.slug} onClick={() => setOpen(false)} to={`/tirupati-cabs/${r.slug}`} className="mob-link-card">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                            <span>{r.shortTitle || r.title}</span>
                            {r.starting && <small style={{ color: '#0284c7', fontWeight: 700, fontSize: '11px' }}>Starting from {r.starting}</small>}
                          </div>
                          <ChevronRight size={14} />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'fleet' && (
                  <div className="drawer-section-block">
                    <span className="drawer-badge-pill">Vehicle Fleet & Rates</span>
                    <div className="drawer-link-card-grid">
                      {fleetNavLinks.map(f => (
                        <NavLink key={f.path} onClick={() => setOpen(false)} to={f.path} className="mob-link-card">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                            <span>{f.title}</span>
                            {f.starting && <small style={{ color: '#0284c7', fontWeight: 700, fontSize: '11px' }}>Starting from {f.starting}</small>}
                          </div>
                          <ChevronRight size={14} />
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
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                            <span>{p.title}</span>
                            {p.starting && <small style={{ color: '#0284c7', fontWeight: 700, fontSize: '11px' }}>Starting from {p.starting}</small>}
                          </div>
                          <ChevronRight size={14} />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'more' && (
                  <div className="drawer-section-block">
                    <span className="drawer-badge-pill">Information & Pages</span>
                    <div className="drawer-link-card-grid">
                      <NavLink onClick={() => setOpen(false)} to="/blog" className="mob-link-card">
                        <span>📰 Travel Blogs & Guides</span><ChevronRight size={14} />
                      </NavLink>
                      {moreNavLinks.map(m => (
                        <NavLink key={m.path} onClick={() => setOpen(false)} to={m.path} className="mob-link-card">
                          <span>{m.title}</span><ChevronRight size={14} />
                        </NavLink>
                      ))}
                    </div>
                  </div>
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
          <p>Faithful journeys, comfortable miles, and memories that stay with you. No. 1 trusted cab service & pilgrimage operator in Tirupati.</p>
          <div className="footer-contact-details" style={{ margin: '12px 0 16px', fontSize: '11px', lineHeight: '1.8' }}>
            <div>📞 <a href={`tel:${phone}`}>+91 86886 24758</a> / <a href="tel:+916303524758">+91 63035 24758</a></div>
            <div>✉️ <a href={`mailto:${email}`}>{email}</a></div>
            <div>📍 10-12A, Balakrishna Puram, Mangalam, Tirupati, AP 517507</div>
          </div>
          <div className="footer-social-row">
            {socialLinks.map(({ name, url, Icon }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="footer-social-btn" title={name}><Icon size={14} /></a>
            ))}
          </div>
        </div>

        <div>
          <h4>Services & Rentals</h4>
          <Link to="/car-rentals-in-tirupati">Car Rentals in Tirupati</Link>
          <Link to="/tempo-traveller-rental-in-tirupati">Tempo Traveller Rental</Link>
          <Link to="/urbania-traveller-rental-in-tirupati">Force Urbania Rental</Link>
          <Link to="/bus-rental-in-tirupati">Luxury Bus Rental</Link>
          <Link to="/tirupati-airport-taxi">Tirupati Airport Taxi</Link>
          <Link to="/outstation-taxi-in-tirupati">Outstation Taxi Service</Link>
          <Link to="/taxi-in-tirupati">Taxi Service in Tirupati</Link>
          <Link to="/fleet">View Full Vehicle Fleet</Link>
        </div>

        <div>
          <h4>Popular Cab Routes</h4>
          <Link to="/tirupati-cabs/tirupati-to-srikalahasti-distance">Tirupati to Srikalahasti Cab</Link>
          <Link to="/tirupati-cabs/tirupati-to-arunachalam-distance">Tirupati to Arunachalam Cab</Link>
          <Link to="/tirupati-cabs/tirupati-to-tirumala-distance">Tirupati to Tirumala Cab</Link>
          <Link to="/tirupati-cabs/tirupati-to-kanipakam-distance">Tirupati to Kanipakam Cab</Link>
          <Link to="/tirupati-cabs/tirupati-to-vellore-golden-temple-distance">Tirupati to Vellore Golden Temple</Link>
          <Link to="/tirupati-cabs/tirupati-to-chennai-distance">Tirupati to Chennai Airport Cab</Link>
          <Link to="/tirupati-cabs/tirupati-to-bangalore-distance">Tirupati to Bangalore Cab</Link>
          <Link to="/tirupati-cabs/tirupati-to-kanchipuram-distance">Tirupati to Kanchipuram Cab</Link>
        </div>

        <div>
          <h4>Tour Packages</h4>
          {packageNavLinks.map(p => (
            <Link key={p.slug} to={`/services/${p.slug}`}>{p.title}</Link>
          ))}
          <Link to="/tours">View All Tour Packages</Link>
        </div>

        <div>
          <h4>Destinations & Policies</h4>
          <Link to="/destinations/tirumala">Tirumala Balaji Temple</Link>
          <Link to="/destinations/srikalahasti">Srikalahasti Temple</Link>
          <Link to="/destinations/kanipakam">Kanipakam Vinayaka Temple</Link>
          <Link to="/destinations/golden-temple">Vellore Golden Temple</Link>
          <Link to="/destinations/arunachalam">Arunachalam (Tiruvannamalai)</Link>
          <Link to="/blog">Travel Blog & News</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/refund-and-cancellation-policy">Refund Policy</Link>
        </div>
      </footer>

      <div className="footer-copyright-strip" style={{ background: '#050b28', color: '#94a3b8', fontSize: '11px', textAlign: 'center', padding: '14px clamp(20px, 3vw, 50px)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span>© {new Date().getFullYear()} Tirupati Balaji Tours & Travels. All Rights Reserved.</span>
          <span>No. 1 Taxi & Tour Agency in Tirupati · 24/7 Verified Service</span>
        </div>
      </div>

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
