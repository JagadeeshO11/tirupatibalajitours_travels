import { images } from './siteData';

export const blogCategories = [
  'All Guides',
  'Tirumala Darshan',
  'Temple Circuits',
  'Outstation Tips',
  'Cab Routes & Fares',
  'Local Sightseeing'
];

export const blogPosts = [
  {
    id: 'tirumala-darshan-guide-2026',
    slug: 'tirumala',
    category: 'Tirumala Darshan',
    title: 'The Complete Guide to Peaceful Tirumala Balaji Darshan (2026 Updates)',
    snippet: 'Essential guide covering Special Entry Darshan (₹300), Slotted Sarva Darshan (SSD) tokens, dress code regulations, luggage counter points, and mountain ghat road taxi tips.',
    readTime: '8 MIN READ',
    date: 'August 28, 2026',
    author: 'Srikant Sharma (Local Travel Expert)',
    views: '14,250+',
    featured: true,
    image: images.tirumala,
    tags: ['Tirumala', 'Balaji Darshan', 'Token Info', 'Dress Code', 'Ghat Road'],
    highlights: [
      'Pre-booking ₹300 Special Entry Darshan online via TTD Official Portal',
      'SSD Token counter locations at Alipiri, Bhudevi Complex, and Tirupati Railway Station',
      'Strict traditional dress code: Dhoti/Kurta for men, Saree/Chudidhar with Dupatta for women',
      'Ghat road travel rules: Operating timings 3:00 AM to 12:00 Midnight only',
      'Convenient pick-up from Tirupati Station & Airport in AC Sedans or Innova Crysta'
    ],
    fullContent: {
      intro: 'Visiting Lord Venkateswara on the sacred seven hills of Tirumala is a soul-stirring pilgrimage for millions of devotees worldwide. Proper planning ensures a smooth, stress-free darshan experience without unnecessary long queues or rush.',
      sections: [
        {
          heading: '1. Types of Darshan Tickets & Booking Tips',
          text: 'TTD (Tirumala Tirupati Devasthanams) releases ₹300 Special Entry Darshan tokens online 2 to 3 months in advance. Make sure to create a TTD portal account beforehand. For pilgrims without advance tickets, Slotted Sarva Darshan (SSD) tokens are issued offline at Tirupati counters (Bhudevi Complex near Alipiri, Srinivasam Complex, and Govindaraja Choultries).'
        },
        {
          heading: '2. Tirumala Ghat Road Timings & Taxi Regulations',
          text: 'The Alipiri Tollgate for Tirumala uphill is open from 3:00 AM to 12:00 AM midnight. Private yellow-plate cabs with experienced local drivers are recommended as mountain curves require skilled driving. Our drivers assist with luggage drop at Alipiri security screening.'
        },
        {
          heading: '3. Mandatory Dress Code & Rules',
          text: 'Men must wear a traditional Dhoti with Pyjama, Kurta, or Shirt. Pants, jeans, and T-shirts are not permitted inside temple queues. Women must wear Saree, Half-Saree, or Chudidhar with Dupatta. Mobile phones, electronic gadgets, and footwear are strictly prohibited inside the main temple area.'
        },
        {
          heading: '4. Recommended Vehicle Selection',
          text: 'For couples and small families (2-4 persons), Toyota Etios or Swift Dzire is optimal. For families of 6-7 with elders, Toyota Innova Crysta provides maximum legroom and suspension comfort for mountain curves. Larger group pilgrimages should opt for 12 or 17-seater AC Tempo Travellers.'
        }
      ]
    }
  },
  {
    id: 'tirupati-to-srikalahasti-guide',
    slug: 'srikalahasti',
    category: 'Temple Circuits',
    title: 'Tirupati to Srikalahasti: Complete Day Trip & Rahu Ketu Pooja Guide',
    snippet: 'Discover the sacred Vayu Lingam temple at Srikalahasti. Complete details on Rahu Ketu Sarpa Dosha Nivarana pooja timings, ticket prices, and cab package fares.',
    readTime: '6 MIN READ',
    date: 'August 24, 2026',
    author: 'Anand V. (Pilgrimage Guide)',
    views: '9,800+',
    featured: false,
    image: images.srikalahasti,
    tags: ['Srikalahasti', 'Rahu Ketu Pooja', 'Day Trip', 'Outstation Cab'],
    highlights: [
      'Distance: 38 km from Tirupati city (approx. 45 to 60 mins drive)',
      'Rahu Ketu Pooja tickets available from ₹500 to ₹5,000 for specialized mandapams',
      'Best travel window: Early morning 6:00 AM departure to avoid rush',
      'Combine with Tiruchanur Padmavathi Temple in a single-day roundtrip cab'
    ],
    fullContent: {
      intro: 'Srikalahasti is one of the most famous Pancha Bhoota Stalam temple shrines dedicated to Lord Shiva as Vayu Lingam (Air Element). It is renowned globally for performing Rahu Ketu Sarpa Dosha Nivarana Pooja.',
      sections: [
        {
          heading: '1. How to Perform Rahu Ketu Pooja',
          text: 'Pooja tickets can be purchased directly at the temple counters. Poojas are performed inside dedicated halls continuously from 6:00 AM to 6:00 PM. Rahu Kalam period on Sundays, Tuesdays, and Fridays is considered particularly auspicious by many devotees.'
        },
        {
          heading: '2. Tirupati to Srikalahasti Taxi Fare & Options',
          text: 'A roundtrip AC cab from Tirupati to Srikalahasti covers driver charges, toll fees, and waiting time. Sedan rates start from ₹2,200 roundtrip, while Innova Crysta is ₹3,500 roundtrip.'
        }
      ]
    }
  },
  {
    id: 'kanipakam-temple-day-trip',
    slug: 'kanipakam',
    category: 'Temple Circuits',
    title: 'Kanipakam Varasiddhi Vinayaka Temple: Planning Your Visit from Tirupati',
    snippet: 'Step-by-step itinerary for visiting the self-manifested (Swayambhu) Lord Ganesha idol at Kanipakam temple, including route maps, timings, and vehicle rentals.',
    readTime: '5 MIN READ',
    date: 'August 19, 2026',
    author: 'Srikant Sharma',
    views: '7,400+',
    featured: false,
    image: images.kanipakam,
    tags: ['Kanipakam', 'Ganesha Temple', 'Local Taxi', 'Chittoor'],
    highlights: [
      'Distance: 68 km from Tirupati via Chittoor highway (1 hr 30 mins drive)',
      'Famous for Swayambhu (self-growing) Ganesha idol submerged in water well',
      'Combine Kanipakam with Vellore Golden Temple in a full-day outstation tour'
    ],
    fullContent: {
      intro: 'Sri Varasiddhi Vinayaka Swamy Temple at Kanipakam is a miraculous shrine where the deity idol is located inside a water spring well that grows in size over time.',
      sections: [
        {
          heading: '1. Temple Timings & Abhishekam',
          text: 'Temple gates open at 4:00 AM for Nijaroopa Darshan. Special Quick Darshan tickets (₹100/₹300) allow fast entry during peak weekends and festival seasons.'
        },
        {
          heading: '2. Cab Package Recommendations',
          text: 'Book a comfortable AC Ertiga or Innova to combine Tirupati -> Kanipakam -> Golden Temple (Vellore) -> Tirupati in a seamless 10-hour day trip.'
        }
      ]
    }
  },
  {
    id: 'vellore-golden-temple-guide',
    slug: 'golden-temple',
    category: 'Outstation Tips',
    title: 'Planning a Vellore Golden Temple Visit from Tirupati (Sripuram Guide)',
    snippet: 'Detailed guide to Sripuram Sri Lakshmi Narayani Golden Temple in Vellore. Distance, dress code, star path walking route, security rules, and taxi packages.',
    readTime: '7 MIN READ',
    date: 'August 14, 2026',
    author: 'Kavitha R. (Travel Writer)',
    views: '11,100+',
    featured: false,
    image: images.goldentemple,
    tags: ['Golden Temple', 'Vellore', 'Sripuram', 'Outstation Tour'],
    highlights: [
      'Distance: 135 km from Tirupati (approx 3 hours via Chittoor highway)',
      'Constructed with over 1,500 kg of pure gold leaf gilding',
      'Star-shaped outer walking path lined with spiritual messages',
      'Dress code enforced: Western shorts and sleeveless attire strictly banned'
    ],
    fullContent: {
      intro: 'The Sri Lakshmi Narayani Golden Temple at Sripuram, Vellore, is a modern architectural marvel nestled at the foot of green hills, coated in 1.5 tons of pure gold.',
      sections: [
        {
          heading: '1. Key Visitor Rules & Electronic Restrictions',
          text: 'Mobile phones, smartwatches, cameras, and electronic items are strictly prohibited. Free secure lockers are available at the entrance plaza.'
        },
        {
          heading: '2. Travel Comfort & Vehicle Suggestions',
          text: 'Since it is a 3-hour one-way journey from Tirupati, hiring a smooth AC vehicle with experienced highway drivers is recommended. Tempo Travellers are popular for group pilgrimages.'
        }
      ]
    }
  },
  {
    id: 'tirupati-cab-booking-hacks',
    slug: 'cab-booking-tips',
    category: 'Cab Routes & Fares',
    title: 'Top 7 Taxi Booking Tips for First-Time Tirupati Pilgrims & Families',
    snippet: 'How to avoid hidden charges, choose the right vehicle size, verify driver ghat road permits, and get transparent fixed fares for Tirumala and outstation travel.',
    readTime: '5 MIN READ',
    date: 'August 10, 2026',
    author: 'Balaji Tours Team',
    views: '18,900+',
    featured: false,
    image: images.taxi,
    tags: ['Cab Tips', 'Fare Transparency', 'Airport Taxi', 'Family Trip'],
    highlights: [
      'Always request all-inclusive quotes (Toll + Driver Bata + State Permits)',
      'Book Tempo Travellers / Urbania early for festival & weekend peak seasons',
      'Verify luggage space before picking compact sedans vs MUVs',
      '24/7 airport pickup guarantees no late-night surcharge surprises'
    ],
    fullContent: {
      intro: 'Booking a cab in Tirupati should be transparent and straightforward. Understanding fare structures, vehicle capacities, and local permits ensures a hassle-free trip.',
      sections: [
        {
          heading: '1. All-Inclusive Fare Clarity',
          text: 'Reputable taxi agencies provide upfront quotes covering driver bata, tolls, and parking. At Tirupati Balaji Tours & Travels, all prices quoted on WhatsApp are 100% transparent.'
        },
        {
          heading: '2. Matching Group Size to Vehicle',
          text: 'Never squeeze 5 adults into a Sedan. For 5-6 adults with luggage, Maruti Ertiga or Innova Crysta guarantees a peaceful ride without cramped luggage seating.'
        }
      ]
    }
  },
  {
    id: 'local-temples-in-tirupati',
    slug: 'local-temples',
    category: 'Local Sightseeing',
    title: 'Must-Visit Local Temples in Tirupati City: 1-Day Sightseeing Itinerary',
    snippet: 'Explore Padmavathi Temple (Tiruchanur), Kapila Theertham, Govindaraja Swamy Temple, and Iskcon Tirupati in a single convenient day cab package.',
    readTime: '6 MIN READ',
    date: 'August 05, 2026',
    author: 'Ramesh K.',
    views: '8,600+',
    featured: false,
    image: images.tirupati,
    tags: ['Local Sightseeing', 'Tiruchanur', 'Kapila Theertham', 'City Cab'],
    highlights: [
      'Sri Padmavathi Ammavari Temple (Tiruchanur) - Sacred abode of Goddess Lakshmi',
      'Kapila Theertham - Ancient Shiva temple at the foothills with natural waterfall',
      'Sri Govindaraja Swamy Temple - Iconic tower right near Tirupati Railway Station',
      'ISKCON Lotus Temple - Peaceful evening aarathi & prasadam'
    ],
    fullContent: {
      intro: 'Tirupati city itself houses ancient sacred shrines deeply tied to the legend of Sri Venkateswara Swamy. A half-day or full-day city taxi tour allows you to visit all local temples conveniently.',
      sections: [
        {
          heading: '1. Morning Schedule (8:00 AM - 12:00 PM)',
          text: 'Start with Padmavathi Ammavari Temple at Tiruchanur (5 km from city), followed by Sri Kalahasteeswara / Sri Govindaraja Swamy Temple.'
        },
        {
          heading: '2. Afternoon & Evening Schedule (3:00 PM - 7:30 PM)',
          text: 'Visit Kapila Theertham waterfall temple at the foot of Tirumala hills and end with serene evening prayers at ISKCON Tirupati.'
        }
      ]
    }
  }
];
