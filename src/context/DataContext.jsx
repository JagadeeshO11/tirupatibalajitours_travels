import { createContext, useContext, useState, useEffect } from 'react';
import { fleet as initialFleet } from '../data/fleetData';
import { tours as initialTours } from '../data/siteData';
import { destinations as initialDestinations } from '../data/siteData';
import { blogPosts as initialBlogs } from '../data/blogData';
import { samplePayments } from '../services/easebuzzService';

const DataContext = createContext();

const initialQueries = [
  {
    id: 'Q-101',
    name: 'Venkatesh Rao',
    phone: '+91 98490 12345',
    from: 'Tirupati Railway Station',
    to: 'Tirumala Balaji Temple',
    date: '2026-09-28',
    trip: 'Round Trip',
    vehicle: 'Innova Crysta',
    passengers: '5',
    status: 'Confirmed',
    createdAt: '2026-09-23 15:40'
  },
  {
    id: 'Q-102',
    name: 'Suhasini Reddy',
    phone: '+91 94401 67890',
    from: 'Tirupati Airport (TIR)',
    to: 'Srikalahasti Temple',
    date: '2026-09-30',
    trip: 'One Way',
    vehicle: 'Sedan (Dzire)',
    passengers: '3',
    status: 'Pending',
    createdAt: '2026-09-23 17:15'
  },
  {
    id: 'Q-103',
    name: 'Karthik Subbaraman',
    phone: '+91 98840 99887',
    from: 'Tirupati City Hotel',
    to: 'Arunachalam (Tiruvannamalai)',
    date: '2026-10-05',
    trip: 'Round Trip',
    vehicle: 'Tempo Traveller 16 Seater',
    passengers: '14',
    status: 'Contacted',
    createdAt: '2026-09-22 11:10'
  }
];

export function DataProvider({ children }) {
  // --- Fleets State ---
  const [fleets, setFleets] = useState(() => {
    try {
      const saved = localStorage.getItem('app_fleets');
      if (!saved) return initialFleet;
      const parsed = JSON.parse(saved);
      // Auto-update images to latest Cloudinary links
      return parsed.map(v => {
        const matching = initialFleet.find(f => f.id === v.id);
        return matching ? { ...v, image: matching.image } : v;
      });
    } catch {
      return initialFleet;
    }
  });

  // --- Tours State ---
  const [tours, setTours] = useState(() => {
    try {
      const saved = localStorage.getItem('app_tours');
      return saved ? JSON.parse(saved) : initialTours;
    } catch {
      return initialTours;
    }
  });

  // --- Destinations State ---
  const [destinations, setDestinations] = useState(() => {
    try {
      const saved = localStorage.getItem('app_destinations');
      return saved ? JSON.parse(saved) : initialDestinations;
    } catch {
      return initialDestinations;
    }
  });

  // --- Blogs State ---
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem('app_blogs');
      if (!saved) return initialBlogs;
      const parsed = JSON.parse(saved);
      const merged = initialBlogs.map(ib => {
        const matching = parsed.find(b => b.id === ib.id || b.slug === ib.slug);
        return matching ? { ...ib, ...matching, image: ib.image, fullContent: ib.fullContent } : ib;
      });
      // Also include any user-created blogs from admin panel
      const customBlogs = parsed.filter(p => !initialBlogs.some(ib => ib.id === p.id || ib.slug === p.slug));
      return [...merged, ...customBlogs];
    } catch {
      return initialBlogs;
    }
  });

  // --- Queries State ---
  const [queries, setQueries] = useState(() => {
    try {
      const saved = localStorage.getItem('app_queries');
      return saved ? JSON.parse(saved) : initialQueries;
    } catch {
      return initialQueries;
    }
  });

  // --- Payments State ---
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('app_payments');
      return saved ? JSON.parse(saved) : samplePayments;
    } catch {
      return samplePayments;
    }
  });

  // Auto-Save effects
  useEffect(() => { localStorage.setItem('app_fleets', JSON.stringify(fleets)); }, [fleets]);
  useEffect(() => { localStorage.setItem('app_tours', JSON.stringify(tours)); }, [tours]);
  useEffect(() => { localStorage.setItem('app_destinations', JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem('app_blogs', JSON.stringify(blogs)); }, [blogs]);
  useEffect(() => { localStorage.setItem('app_queries', JSON.stringify(queries)); }, [queries]);
  useEffect(() => { localStorage.setItem('app_payments', JSON.stringify(payments)); }, [payments]);

  // --- Fleet CRUD ---
  const addVehicle = (vehicle) => {
    const newVehicle = { ...vehicle, id: vehicle.id || vehicle.name.toLowerCase().replace(/\s+/g, '-') };
    setFleets(prev => [newVehicle, ...prev]);
  };

  const updateVehicle = (id, updatedVehicle) => {
    setFleets(prev => prev.map(v => (v.id === id ? { ...v, ...updatedVehicle } : v)));
  };

  const deleteVehicle = (id) => {
    setFleets(prev => prev.filter(v => v.id !== id));
  };

  // --- Tour CRUD ---
  const addTour = (tour) => {
    setTours(prev => [tour, ...prev]);
  };

  const updateTour = (index, updatedTour) => {
    setTours(prev => prev.map((t, idx) => (idx === index ? updatedTour : t)));
  };

  const deleteTour = (index) => {
    setTours(prev => prev.filter((_, idx) => idx !== index));
  };

  // --- Destination CRUD ---
  const addDestination = (dest) => {
    setDestinations(prev => [dest, ...prev]);
  };

  const updateDestination = (slug, updatedDest) => {
    setDestinations(prev => prev.map(d => (d[0] === slug ? updatedDest : d)));
  };

  const deleteDestination = (slug) => {
    setDestinations(prev => prev.filter(d => d[0] !== slug));
  };

  // --- Blog CRUD ---
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: blog.id || String(Date.now()),
      slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };
    setBlogs(prev => [newBlog, ...prev]);
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs(prev => prev.map(b => (b.id === id ? { ...b, ...updatedBlog } : b)));
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // --- Query CRUD ---
  const addQuery = (queryData) => {
    const newQuery = {
      id: `Q-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toLocaleString(),
      status: 'Pending',
      ...queryData
    };
    setQueries(prev => [newQuery, ...prev]);
    return newQuery;
  };

  const updateQueryStatus = (id, status) => {
    setQueries(prev => prev.map(q => (q.id === id ? { ...q, status } : q)));
  };

  const deleteQuery = (id) => {
    setQueries(prev => prev.filter(q => q.id !== id));
  };

  // --- Payment Logging ---
  const recordPayment = (paymentData) => {
    const newPayment = {
      date: new Date().toLocaleString(),
      status: 'SUCCESS',
      ...paymentData
    };
    setPayments(prev => [newPayment, ...prev]);
    return newPayment;
  };

  // Reset to Default Demo Data
  const resetToDefaults = () => {
    setFleets(initialFleet);
    setTours(initialTours);
    setDestinations(initialDestinations);
    setBlogs(initialBlogs);
    setQueries(initialQueries);
    setPayments(samplePayments);
    localStorage.removeItem('app_fleets');
    localStorage.removeItem('app_tours');
    localStorage.removeItem('app_destinations');
    localStorage.removeItem('app_blogs');
    localStorage.removeItem('app_queries');
    localStorage.removeItem('app_payments');
  };

  return (
    <DataContext.Provider value={{
      fleets,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      tours,
      addTour,
      updateTour,
      deleteTour,
      destinations,
      addDestination,
      updateDestination,
      deleteDestination,
      blogs,
      addBlog,
      updateBlog,
      deleteBlog,
      queries,
      addQuery,
      updateQueryStatus,
      deleteQuery,
      payments,
      recordPayment,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
