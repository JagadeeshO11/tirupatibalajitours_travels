import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, BookOpen, Clock, Eye, User, Sparkles,
  CheckCircle2, ChevronRight, MessageCircle, Star, ShieldCheck,
  Calendar, Tag, Share2, HelpCircle, ChevronDown
} from 'lucide-react';
import Page from './PageTemplate';
import { images, whatsappBooking, whatsapp } from '../data/siteData';
import { blogPosts, blogCategories } from '../data/blogData';
import AnimatedCounter from '../components/AnimatedCounter';
import StatsBanner from '../components/StatsBanner';
import ScrollReveal from '../components/ScrollReveal';
import './Blog.css';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Guides');
  const [selectedPost, setSelectedPost] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory =
        activeCategory === 'All Guides' || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = useMemo(() => {
    return blogPosts.find(p => p.featured) || blogPosts[0];
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <Page
      eyebrow="TRAVEL & PILGRIMAGE JOURNAL"
      title="Sacred Journey Guides & Travel Insights"
      text="Expert guidance for your Tirumala Balaji Darshan, local temple circuits, outstation taxi packages, and South India tours."
      image={images.temple}
    >
      {/* --- HERO COUNTER STATS BAR --- */}
      <section className="blog-hero-section">
        <div className="blog-hero-container">
          <ScrollReveal direction="zoom">
            <span className="blog-hero-badge">
              <Sparkles size={14} /> OFFICIAL TIRUPATI TRAVEL JOURNAL
            </span>
            <h1 className="blog-hero-title">
              Insights for your <em>sacred journey.</em>
            </h1>
            <p className="blog-hero-lead">
              Verified darshan timing tips, temple dress codes, ghat road cab guidelines, and comprehensive travel itineraries written by local pilgrimage experts.
            </p>
          </ScrollReveal>

          {/* HERO ANIMATED COUNTERS */}
          <div className="blog-hero-stats">
            <div className="blog-stat-item">
              <span className="stat-num">
                <AnimatedCounter end={120} suffix="+" />
              </span>
              <span className="stat-txt">Verified Guides</span>
            </div>
            <div className="blog-stat-item">
              <span className="stat-num">
                <AnimatedCounter end={50000} suffix="+" />
              </span>
              <span className="stat-txt">Happy Pilgrims</span>
            </div>
            <div className="blog-stat-item">
              <span className="stat-num">
                <AnimatedCounter end={15} suffix="+ Yrs" />
              </span>
              <span className="stat-txt">Local Expertise</span>
            </div>
            <div className="blog-stat-item">
              <span className="stat-num">
                <AnimatedCounter end={4.9} decimals={1} suffix=" / 5" />
              </span>
              <span className="stat-txt">Devotee Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEARCH & CATEGORY CONTROLS --- */}
      <div className="blog-controls-wrapper">
        <div className="blog-search-box">
          <Search size={18} className="blog-search-icon" />
          <input
            type="text"
            placeholder="Search guides by temple, keyword, or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="blog-search-clear" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="blog-category-tabs">
          {blogCategories.map(cat => (
            <button
              key={cat}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- FEATURED ARTICLE BANNER (SHOW IF NO SEARCH QUERY & IN ALL GUIDES) --- */}
      {!searchQuery && activeCategory === 'All Guides' && featuredPost && (
        <ScrollReveal direction="up" delay={0.1}>
          <div className="blog-featured-card">
            <div className="blog-featured-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="blog-featured-badge">FEATURED GUIDE</span>
            </div>
            <div className="blog-featured-content">
              <div className="blog-featured-meta">
                <span>{featuredPost.category}</span>
                <span>•</span>
                <span><Clock size={13} style={{ display: 'inline', marginRight: 4 }} />{featuredPost.readTime}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.snippet}</p>
              
              <div className="blog-tags-row">
                {featuredPost.tags.map(t => (
                  <span key={t} className="tag-chip">#{t}</span>
                ))}
              </div>

              <button
                className="blog-read-btn"
                onClick={() => setSelectedPost(featuredPost)}
              >
                Read Full Guide <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* --- BLOG GRID --- */}
      <section className="blog-grid-section">
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
            <h3>No guides found matching "{searchQuery}"</h3>
            <p>Try searching for Tirumala, Srikalahasti, Cab, or Darshan.</p>
            <button
              className="blog-read-btn"
              style={{ margin: '1.5rem auto 0' }}
              onClick={() => { setSearchQuery(''); setActiveCategory('All Guides'); }}
            >
              View All Travel Guides
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post, i) => (
              <ScrollReveal key={post.id} direction="up" delay={i * 0.08}>
                <article className="blog-card">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    <span className="blog-category-tag">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span><Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />{post.date}</span>
                      <span><Clock size={12} style={{ display: 'inline', marginRight: 4 }} />{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.snippet}</p>
                    <div className="blog-card-footer">
                      <div className="blog-author-info">
                        <User size={13} style={{ color: '#ffd700' }} />
                        <span>{post.author.split(' ')[0]}</span>
                      </div>
                      <button
                        className="blog-card-link-btn"
                        onClick={() => setSelectedPost(post)}
                      >
                        Read Guide <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* --- LIVE STATS BANNER COMPONENT --- */}
      <StatsBanner
        title="Trusted Pilgrimage & Outstation Taxi Service"
        subtitle="WHY DEVOTEES CHOOSE US"
      />

      {/* --- DEVOTEE FAQ & TRAVEL TIPS SECTION --- */}
      <section className="section" style={{ maxWidth: 900, margin: '3rem auto' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">PILGRIM FREQUENTLY ASKED QUESTIONS</p>
            <h2>Essential Tips for Tirupati & Tirumala Travel</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          {[
            {
              q: 'What is the best way to travel from Tirupati Railway Station to Tirumala Uphill?',
              a: 'Hiring a dedicated yellow-plate AC taxi is the fastest and most convenient method. The distance is 22 km via Alipiri Tollgate taking around 45 to 50 minutes.'
            },
            {
              q: 'Are cab services available 24/7 at Tirupati Airport (TIR)?',
              a: 'Yes, Tirupati Balaji Tours & Travels provides guaranteed 24/7 airport pickups and drops with driver track links and fixed transparent fares.'
            },
            {
              q: 'Can we book a single cab for Tirupati, Srikalahasti, and Kanipakam temple tour?',
              a: 'Absolutely! Our 1-Day and 2-Day custom package cabs cover all major temples seamlessly with experienced local drivers.'
            }
          ].map((item, idx) => (
            <div
              key={item.q}
              style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '14px', boxShadow: 'var(--shadow-sm)', padding: '1.25rem 1.5rem', cursor: 'pointer' }}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h3 style={{ color: 'var(--blue-950, #060c2c)', fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>{item.q}</h3>
                <ChevronDown
                  size={18}
                  style={{
                    color: 'var(--gold-dark, #d97706)',
                    transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0
                  }}
                />
              </div>
              {openFaq === idx && (
                <p style={{ color: 'var(--muted, #334155)', fontSize: '0.95rem', marginTop: '0.85rem', lineHeight: '1.65', margin: '0.85rem 0 0' }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="blog-newsletter-section">
        <ScrollReveal direction="zoom">
          <div className="blog-newsletter-card">
            <h3>Subscribe for Darshan Updates & Travel Tips</h3>
            <p>Get instant updates on TTD ticket releases, temple festival schedules, and exclusive taxi package discounts delivered to your inbox.</p>
            {subscribed ? (
              <div style={{ color: '#ffd700', fontWeight: 700, fontSize: '1.1rem' }}>
                <CheckCircle2 style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                Thank you for subscribing! We will keep you updated.
              </div>
            ) : (
              <form className="blog-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                />
                <button type="submit">Subscribe Now</button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* --- FULL ARTICLE INTERACTIVE MODAL --- */}
      <AnimatePresence>
        {selectedPost && (
          <div className="blog-modal-backdrop" onClick={() => setSelectedPost(null)}>
            <motion.div
              className="blog-modal-container"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="blog-modal-close"
                onClick={() => setSelectedPost(null)}
                aria-label="Close guide"
              >
                <X size={20} />
              </button>

              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="blog-modal-header-img"
              />

              <div className="blog-modal-body">
                <span className="blog-category-tag" style={{ position: 'static', marginBottom: '0.75rem', display: 'inline-block' }}>
                  {selectedPost.category}
                </span>

                <h2 className="blog-modal-title">{selectedPost.title}</h2>

                <div className="blog-modal-meta">
                  <span>By <strong>{selectedPost.author}</strong></span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                {/* KEY HIGHLIGHTS CHECKLIST */}
                {selectedPost.highlights && (
                  <div className="blog-highlights-box">
                    <h4>Key Takeaways & Travel Highlights:</h4>
                    <ul>
                      {selectedPost.highlights.map(hl => (
                        <li key={hl}>
                          <CheckCircle2 size={16} />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FULL CONTENT SECTIONS */}
                {selectedPost.fullContent && (
                  <div>
                    <p style={{ fontSize: '1.05rem', color: '#e2e8f0', lineHeight: '1.65', marginBottom: '2rem', fontStyle: 'italic' }}>
                      "{selectedPost.fullContent.intro}"
                    </p>

                    {selectedPost.fullContent.sections.map(sec => (
                      <div key={sec.heading} className="blog-section-block">
                        <h3>{sec.heading}</h3>
                        <p>{sec.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* CALL TO ACTION BOX INSIDE MODAL */}
                <div className="blog-cta-box">
                  <h4>Need a Reliable Cab for this Journey?</h4>
                  <p>Book an AC Sedan, Innova Crysta, or Tempo Traveller with experienced local drivers for a peaceful trip.</p>
                  <a
                    href={whatsappBooking(`Hi, I read your guide "${selectedPost.title}" and would like to enquire about cab package options for my travel.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                    style={{ background: 'linear-gradient(135deg, #ffd700 0%, #ff9900 100%)', color: '#0f172a', fontWeight: 800 }}
                  >
                    Enquire on WhatsApp <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Page>
  );
}
