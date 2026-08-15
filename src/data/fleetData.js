import { images } from './siteData';

export const fleet = [
  { id:'etios', name:'Etios', category:'SEDAN', seats:'4+1', bags:'2', image:images.etios, local:'₹2,000/day', outstation:'₹15/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Local rides, temple visits, airport transfers and economical outstation trips.', slug:'car-rentals-in-tirupati' },
  { id:'ertiga', name:'Ertiga', category:'MUV', seats:'6+1', bags:'3', image:images.ertiga, local:'₹2,500/day', outstation:'₹20/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Family trips, temple tours and comfortable group travel.', slug:'car-rentals-in-tirupati' },
  { id:'innova-crysta', name:'Innova Crysta', category:'PREMIUM SUV', seats:'7+1', bags:'4', image:images.crysta, local:'₹3,000/day', outstation:'₹23/km', minimum:'300 km/day', fuel:'10 km/l', features:['AC','Music','USB'], use:'Premium family, corporate and long-distance travel.', slug:'car-rentals-in-tirupati' },
  { id:'tempo-12', name:'Tempo Traveller 12', category:'TEMPO TRAVELLER', seats:'12+1', bags:'8', image:images.tempo12, local:'₹4,000/day', outstation:'₹25/km', minimum:'300 km/day', fuel:'7 km/l', features:['AC','TV','USB','Push-back'], use:'Small group pilgrimages, local sightseeing and airport transfers.', slug:'tempo-traveller-rental-in-tirupati' },
  { id:'tempo-17', name:'Tempo Traveller 17', category:'TEMPO TRAVELLER', seats:'17+1', bags:'10', image:images.tempo17, local:'₹5,500/day', outstation:'₹35/km', minimum:'300 km/day', fuel:'6 km/l', features:['AC','TV','USB','Push-back'], use:'Larger family groups, pilgrimages and South India tours.', slug:'tempo-traveller-rental-in-tirupati' },
  { id:'tempo-20', name:'Tempo Traveller 20', category:'TEMPO TRAVELLER', seats:'20+1', bags:'12', image:images.tempo20, local:'₹7,500/day', outstation:'₹45/km', minimum:'300 km/day', fuel:'4 km/l', features:['AC','TV','USB','Push-back'], use:'Large group travel, events and extended pilgrimage tours.', slug:'tempo-traveller-rental-in-tirupati' },
  { id:'urbania-12', name:'Urbania 12', category:'PREMIUM URBANIA', seats:'12+1', bags:'8', image:'https://res.cloudinary.com/znbhjevm/image/upload/v1786732754/urbania12.png', local:'₹7,500/day', outstation:'₹45/km', minimum:'300 km/day', fuel:'6 km/l', features:['AC','USB','Push-back','Entertainment'], use:'Premium group travel with a modern cabin and enhanced comfort.', slug:'urbania-traveller-rental-in-tirupati' },
  { id:'urbania-16', name:'Urbania 16', category:'PREMIUM URBANIA', seats:'16+1', bags:'10', image:images.urbania16, local:'₹9,000/day', outstation:'₹55/km', minimum:'300 km/day', fuel:'5 km/l', features:['AC','USB','Push-back','Entertainment'], use:'Premium larger-group journeys, corporate travel and long-distance trips.', slug:'urbania-traveller-rental-in-tirupati' },
  { id:'bus-27', name:'Bus 27 Seater', category:'MINI BUS', seats:'27', bags:'15', image:images.bus27, local:'₹10,000/day', outstation:'₹55/km', minimum:'350 km/day', fuel:'5 km/l', features:['AC','TV','Music','USB'], use:'Group pilgrimages, events, family outings and organized tours.', slug:'bus-rental-in-tirupati' },
  { id:'bus-40', name:'Bus 40 Seater', category:'BUS', seats:'40', bags:'20', image:images.bus40, local:'₹14,000/day', outstation:'₹65/km', minimum:'350 km/day', fuel:'4 km/l', features:['AC','TV','Music','USB'], use:'Large pilgrimages, institutions, corporate groups and events.', slug:'bus-rental-in-tirupati' },
  { id:'bus-50', name:'Bus 50 Seater', category:'BUS', seats:'50', bags:'25', image:images.bus50, local:'₹16,000/day', outstation:'₹75/km', minimum:'350 km/day', fuel:'3 km/l', features:['AC','TV','Music','USB'], use:'Maximum-capacity group tours, events and large pilgrimages.', slug:'bus-rental-in-tirupati' }
];

export const fleetCategories = [
  { key:'all', label:'All Vehicles' },
  { key:'cars', label:'Cars', ids:['etios','ertiga','innova-crysta'] },
  { key:'tempo', label:'Tempo Travellers', ids:['tempo-12','tempo-17','tempo-20'] },
  { key:'urbania', label:'Urbania', ids:['urbania-12','urbania-16'] },
  { key:'bus', label:'Buses', ids:['bus-27','bus-40','bus-50'] }
];

export const fleetCapacityNote = 'The official fleet information also lists a 30-seater bus. A dedicated 30-seater image is not currently present in the repository assets, so it is not assigned a misleading vehicle image card.';
