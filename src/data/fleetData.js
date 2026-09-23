const fleetImages = {
  etios: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482140/tirupatibalaji/fleet/cars/etios-new.png',
  ertiga: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482149/tirupatibalaji/fleet/cars/ertiga-new.png',
  crysta: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482158/tirupatibalaji/fleet/cars/crysta-new.jpg',
  hycross: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1790142006/tirupatibalaji/fleet/hycross.jpg',
  fortuner: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1790142131/tirupatibalaji/fleet/fortuner.jpg',
  tempo12: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482230/tirupatibalaji/fleet/tempo/tempo12-new.jpg',
  tempo16: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1790142105/tirupatibalaji/fleet/tempo-16.webp',
  tempo20: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482253/tirupatibalaji/fleet/tempo/tempo20-new.jpg',
  urbania12: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482264/tirupatibalaji/fleet/urbania/urbania12-new.webp',
  urbania16: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1790142019/tirupatibalaji/fleet/urbania-16.jpg',
  tempo20alt: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482253/tirupatibalaji/fleet/tempo/tempo20-new.jpg',
  bus27: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482280/tirupatibalaji/fleet/buses/bus27-new.jpg',
  bus40: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1789482290/tirupatibalaji/fleet/buses/bus40-new.jpg',
  bus45: 'https://res.cloudinary.com/znbhjevm/image/upload/f_auto,q_auto,w_800/v1790142111/tirupatibalaji/fleet/bus-45.jpg'
};

export const fleet = [
  { id:'sedan', name:'Sedan', category:'SEDAN', seats:'4+1', bags:'2', image:fleetImages.etios, local:'₹2,880 / 8 hrs', localLong:'₹3,650 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹15/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Economical local and outstation travel for small groups.', slug:'car-rentals-in-tirupati' },
  { id:'ertiga', name:'Ertiga', category:'MUV', seats:'6+1', bags:'3', image:fleetImages.ertiga, local:'₹3,380 / 8 hrs', localLong:'₹4,150 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹19/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Comfortable family travel, temple visits and group trips.', slug:'car-rentals-in-tirupati' },
  { id:'innova-crysta', name:'Innova Crysta', category:'PREMIUM SUV', seats:'7+1', bags:'4', image:fleetImages.crysta, local:'₹4,380 / 8 hrs', localLong:'₹5,150 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹23/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Premium family, corporate and long-distance travel.', slug:'car-rentals-in-tirupati' },
  { id:'hycross', name:'Hycross', category:'PREMIUM SUV', seats:'7+1', bags:'4', image:fleetImages.hycross, local:'₹6,100 / 8 hrs', localLong:'₹7,100 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹32/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Premium comfort for family, corporate and outstation journeys.', slug:'car-rentals-in-tirupati' },
  { id:'fortuner', name:'Fortuner', category:'PREMIUM SUV', seats:'7+1', bags:'4', image:fleetImages.fortuner, local:'₹8,800 / 8 hrs', localLong:'₹10,500 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹43/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Executive premium SUV travel for special and long-distance trips.', slug:'car-rentals-in-tirupati' },
  { id:'tempo-12', name:'Tempo Traveller 12 Seater', category:'TEMPO TRAVELLER', seats:'12', bags:'8', image:fleetImages.tempo12, local:'₹5,100 / 8 hrs', localLong:'₹6,000 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹26/km', minimum:'300 km/day', fuel:'7 km/l', features:['AC','TV','USB','Push-back'], use:'Small group pilgrimages, local sightseeing and airport transfers.', slug:'tempo-traveller-rental-in-tirupati' },
  { id:'urbania-12', name:'Urbania 12 Seater', category:'PREMIUM URBANIA', seats:'12', bags:'8', image:fleetImages.urbania12, local:'₹10,000 / 8 hrs', localLong:'₹12,000 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹45/km', minimum:'300 km/day', fuel:'6 km/l', features:['AC','USB','Push-back','Entertainment'], use:'Premium group travel with a modern cabin and enhanced comfort.', slug:'urbania-traveller-rental-in-tirupati' },
  { id:'tempo-16', name:'Tempo Traveller 16 Seater', category:'TEMPO TRAVELLER', seats:'16', bags:'10', image:fleetImages.tempo16, local:'₹6,800 / 8 hrs', localLong:'₹7,800 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹35/km', minimum:'300 km/day', fuel:'6 km/l', features:['AC','TV','USB','Push-back'], use:'Larger family groups, pilgrimages and South India tours.', slug:'tempo-traveller-rental-in-tirupati' },
  { id:'urbania-16', name:'Urbania 16 Seater', category:'PREMIUM URBANIA', seats:'16', bags:'10', image:fleetImages.urbania16, local:'₹12,000 / 8 hrs', localLong:'₹15,000 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹48/km', minimum:'300 km/day', fuel:'5 km/l', features:['AC','USB','Push-back','Entertainment'], use:'Premium larger-group journeys, corporate travel and long-distance trips.', slug:'urbania-traveller-rental-in-tirupati' },
  { id:'tempo-20', name:'Tempo Traveller 20 Seater', category:'TEMPO TRAVELLER', seats:'20', bags:'12', image:fleetImages.tempo20alt, local:'₹9,000 / 8 hrs', localLong:'₹10,500 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹45/km', minimum:'300 km/day', fuel:'4 km/l', features:['AC','TV','USB','Push-back'], use:'Large group travel, events and extended pilgrimage tours.', slug:'tempo-traveller-rental-in-tirupati' },
  { id:'bus-27', name:'Mini Bus 27 Seater', category:'MINI BUS', seats:'27', bags:'15', image:fleetImages.bus27, local:'₹12,000 / 8 hrs', localLong:'₹13,500 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹55/km', minimum:'300 km/day', fuel:'5 km/l', features:['AC','TV','Music','USB'], use:'Group pilgrimages, events, family outings and organized tours.', slug:'bus-rental-in-tirupati' },
  { id:'bus-40', name:'Bus 40 Seater', category:'BUS', seats:'40', bags:'20', image:fleetImages.bus40, local:'₹15,200 / 8 hrs', localLong:'₹17,500 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹65/km', minimum:'300 km/day', fuel:'4 km/l', features:['AC','TV','Music','USB'], use:'Large pilgrimages, institutions, corporate groups and events.', slug:'bus-rental-in-tirupati' },
  { id:'bus-45', name:'Bus 45 Seater', category:'BUS', seats:'45', bags:'22', image:fleetImages.bus45, local:'₹18,000 / 8 hrs', localLong:'₹20,500 / 12 hrs', localKmShort:'80 km', localKmLong:'150 km', outstation:'₹75/km', minimum:'300 km/day', fuel:'3 km/l', features:['AC','TV','Music','USB'], use:'Maximum-capacity group tours, events and large pilgrimages.', slug:'bus-rental-in-tirupati' }
];

export const rentalOptions = [
  { id:'car-day', label:'Car Rent for a Day', title:'Full-day car rental', detail:'Choose a sedan, MUV or premium SUV for a local Tirupati day plan.', price:'From ₹2,880', note:'8-hour / 80 km package', message:'Hi, I need a car rental for a full day in Tirupati. Please share the available cars, hours/km packages and final quote.' },
  { id:'tirupati-local', label:'In Tirupati', title:'Local Tirupati rental', detail:'Ideal for temple visits, city travel and flexible hourly local use.', price:'From ₹2,880', note:'8 hr / 80 km package', message:'Hi, I need a local taxi rental in Tirupati. Please share the available vehicles and 8-hour and 12-hour packages.' },
  { id:'tirupati-airport', label:'Tirupati → Airport', title:'Tirupati Airport transfer', detail:'One-way pickup or drop to Tirupati Airport (TIR).', price:'From ₹1,200', note:'Vehicle and final fare confirmed on request', message:'Hi, I need a taxi from Tirupati to Tirupati Airport. Please share vehicle options and the final one-way fare.' }
];

export const fleetCategories = [
  { key:'all', label:'All Vehicles' },
  { key:'cars', label:'Cars', ids:['sedan','ertiga','innova-crysta','hycross','fortuner'] },
  { key:'tempo', label:'Tempo Travellers', ids:['tempo-12','tempo-16','tempo-20'] },
  { key:'urbania', label:'Urbania', ids:['urbania-12','urbania-16'] },
  { key:'bus', label:'Buses', ids:['bus-27','bus-40','bus-45'] }
];

export const fleetCapacityNote = 'Fleet pricing has been updated from the supplied rate sheet. Local packages are shown for 8 hours / 80 km and 12 hours / 150 km, with outstation per-kilometre rates and a 300 km/day minimum.';
