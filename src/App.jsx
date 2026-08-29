import { useEffect, Fragment } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Layout from './components/Layout';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import VehicleDetails from './pages/VehicleDetails';
import ServiceLanding from './pages/ServiceLanding';
import Tours from './pages/Tours';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CabRoutePage from './pages/CabRoutePage';
import { cabRoutes } from './data/cabRoutes';

const serviceRouteAliases = [
  ['/car-rentals-in-tirupati', 'car-rentals-in-tirupati'],
  ['/tempo-traveller-rental-in-tirupati', 'tempo-traveller-rental-in-tirupati'],
  ['/force-urbania-rental-in-tirupati', 'urbania-traveller-rental-in-tirupati'],
  ['/urbania-traveller-rental-in-tirupati', 'urbania-traveller-rental-in-tirupati'],
  ['/bus-rental-in-tirupati', 'bus-rental-in-tirupati'],
  ['/outstation-taxi-service-in-tirupati', 'outstation-taxi-in-tirupati'],
  ['/outstation-taxi-in-tirupati', 'outstation-taxi-in-tirupati'],
  ['/taxi-service-in-tirupati', 'taxi-in-tirupati'],
  ['/taxi-in-tirupati', 'taxi-in-tirupati'],
  ['/tirupati-airport-taxi-service', 'tirupati-airport-taxi'],
  ['/tirupati-airport-taxi', 'tirupati-airport-taxi'],
  ['/car-for-rent-in-tirupati', 'car-for-rent-in-tirupati-day-rentals'],
  ['/car-for-rent-in-tirupati-day-rentals', 'car-for-rent-in-tirupati-day-rentals']
];

const packageRouteSlugs = [
  'local-packages',
  'outstation-packages',
  'balaji-darshan-packages',
  'corporate-packages',
  'customized-packages',
  'holiday-packages',
  'family-packages',
  'student-packages',
  'wedding-packages',
  'devotional-packages'
];

export default function App() {
  useEffect(() => {
    const l = new Lenis({ lerp: 0.08 });
    let id;
    const f = t => {
      l.raf(t);
      id = requestAnimationFrame(f);
    };
    id = requestAnimationFrame(f);
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cabs" element={<Navigate to="/tirupati-cabs/tirupati-to-srikalahasti" replace />} />
        
        {/* Fixed routes for exact cab slugs */}
        {cabRoutes.map(route => (
          <Fragment key={route.slug}>
            <Route path={`/tirupati-cabs/${route.slug}`} element={<CabRoutePage route={route} />} />
            <Route path={`/tirupati-cabs/${route.slug}-distance`} element={<CabRoutePage route={route} />} />
            <Route path={`/cabs/${route.slug}`} element={<CabRoutePage route={route} />} />
            <Route path={`/cabs/${route.slug}-distance`} element={<CabRoutePage route={route} />} />
          </Fragment>
        ))}

        {/* Dynamic fallback for cab routes */}
        <Route path="/tirupati-cabs/:slug" element={<CabRoutePage />} />
        <Route path="/cabs/:slug" element={<CabRoutePage />} />

        <Route path="/cabs/rentals" element={<Navigate to="/fleet#rentals" replace />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/fleet/:vehicleId" element={<VehicleDetails />} />
        <Route path="/services" element={<Services />} />

        {/* Vehicle / Taxi Service Aliases */}
        {serviceRouteAliases.map(([path, slug]) => (
          <Route key={path} path={path} element={<ServiceLanding slug={slug} />} />
        ))}

        {/* 10 Package Routes under /services/ and root */}
        {packageRouteSlugs.map(slug => (
          <Fragment key={slug}>
            <Route path={`/services/${slug}`} element={<ServiceLanding slug={slug} />} />
            <Route path={`/${slug}`} element={<ServiceLanding slug={slug} />} />
          </Fragment>
        ))}

        {/* Dynamic fallback for services */}
        <Route path="/services/:slug" element={<ServiceLanding />} />

        <Route path="/tours" element={<Tours />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/blog" element={<Blog />} />

        {/* More Dropdown Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/refund-and-cancellation-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
      </Route>
    </Routes>
  );
}
