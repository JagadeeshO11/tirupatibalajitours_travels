import { Car, Route, Landmark, Plane, Sparkles, MapPin, BriefcaseBusiness } from 'lucide-react';

export const phone = '+918688624758';
export const whatsapp = `https://wa.me/${phone}`;
export const whatsappBooking = (message = 'Hi, I would like to enquire about your travel services.') => `${whatsapp}?text=${encodeURIComponent(message)}`;
export const email = 'Taxi@TirupatiBalajiToursTravels.com';

export const images = {
  hero: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786735401/33e36867-e1e5-4785-bbf1-8255a659662e.png',
  temple: 'https://tirupatibalajitourstravels.com/wp-content/uploads/2025/07/Meenakshi-Amman-Temple.png',
  taxi: 'https://tirupatibalajitourstravels.com/wp-content/uploads/2025/10/Taxi-service-in-tirupati.jpeg',
  place: 'https://tirupatibalajitourstravels.com/wp-content/uploads/2025/02/Kanipakam_20200131151403.jpg',
  srikalahasti: 'https://www.templedairy.in/wp-content/uploads/2017/06/225.jpg',
  etios: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732680/etios.png',
  ertiga: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732675/ertiga.png',
  crysta: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732671/crysta.png',
  tempo12: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732715/tempo12.png',
  tempo17: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732725/tempo17.png',
  tempo20: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732743/tempo20.png',
  urbania16: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732761/urbania16.png',
  bus27: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732637/bus27.png',
  bus40: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732650/bus40.png',
  bus50: 'https://res.cloudinary.com/znbhjevm/image/upload/v1786732659/bus50.png'
};

export const services = [
  [Car, 'One Way Cab', 'Simple, comfortable point-to-point travel.'],
  [Route, 'Round Trip', 'Flexible return journeys at fair prices.'],
  [Landmark, 'Local Sightseeing', 'Discover Tirupati at your own pace.'],
  [Plane, 'Airport Taxi', 'Punctual pickup and drop, every time.'],
  [Sparkles, 'Temple Darshan Taxi', 'Peaceful rides for your sacred visit.'],
  [MapPin, 'Outstation Taxi', 'Go beyond Tirupati with confidence.'],
  [BriefcaseBusiness, 'Corporate Travel', 'Professional transport that keeps moving.'],
  [Car, 'Premium Car Rental', 'Elevated comfort for special journeys.']
];

export const vehicles = [
  ['Toyota Etios', '4 Passengers', '2 Bags', images.etios, '₹2,299/day'],
  ['Ertiga', '6 Passengers', '3 Bags', images.ertiga, '₹2,899/day'],
  ['Innova Crysta', '7 Passengers', '4 Bags', images.crysta, '₹3,999/day'],
  ['Tempo Traveller 12', '12 Passengers', '8 Bags', images.tempo12, '₹5,999/day'],
  ['Tempo Traveller 17', '17 Passengers', '10 Bags', images.tempo17, '₹6,999/day'],
  ['Tempo Traveller 20', '20 Passengers', '12 Bags', images.tempo20, '₹7,999/day'],
  ['Force Urbania 16', '16 Passengers', '10 Bags', images.urbania16, '₹7,499/day'],
  ['Bus 27 Seater', '27 Passengers', '15 Bags', images.bus27, '₹10,999/day'],
  ['Bus 40 Seater', '40 Passengers', '20 Bags', images.bus40, '₹13,999/day'],
  ['Bus 50 Seater', '50 Passengers', '25 Bags', images.bus50, '₹16,999/day']
];

export const destinations = [
  ['tirumala', 'Tirumala', 'Sri Venkateswara Temple and the seven sacred hills.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733399/8d17421f-0c51-490c-9fd1-34615a6a9dbd.png', '₹2,499'],
  ['tirupati', 'Tirupati', 'A complete local temple and sightseeing experience.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733408/39dd8a6a-1c70-433d-abb2-7a5491fddf57.png', '₹2,999'],
  ['tiruchanur', 'Tiruchanur', 'Visit the sacred Padmavathi Ammavari Temple.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733391/c167177a-f7b2-4705-b622-c6d9cf88070f.png', '₹2,299'],
  ['srikalahasti', 'Srikalahasti', 'A revered Shiva temple and traditional pilgrimage route.', images.srikalahasti, '₹2,999'],
  ['kanipakam', 'Kanipakam', 'Sri Varasiddhi Vinayaka Temple near Tirupati.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733245/2294ffc1-24a6-4284-bd31-20ada6598736.png', '₹3,499'],
  ['golden-temple', 'Golden Temple', 'Vellore Golden Temple spiritual day tour.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733338/113c0590-3a8d-4dfd-9ea4-c225fab55199.png', '₹5,999'],
  ['arunachalam', 'Arunachalam', 'Sacred Annamalaiyar Temple pilgrimage.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733151/78ba506e-406e-419e-9bd0-7310625bdb82.png', '₹7,499'],
  ['srisailam', 'Srisailam', 'A memorable hill temple journey.', 'https://res.cloudinary.com/znbhjevm/image/upload/v1786733358/3544fc65-3444-4a2e-80bc-320384a75b9b.png', '₹10,999']
];

const moreDestinationImages = [
  ['mysore','Mysore','https://res.cloudinary.com/znbhjevm/image/upload/v1786733509/f11ed58f-ecd1-4f0a-9bae-a9a4f12f9003.png'],['palakkad','Palakkad','https://res.cloudinary.com/znbhjevm/image/upload/v1786733501/8be483a8-5767-4774-bf16-bbf8547dfb73.png'],['kochi','Kochi','https://res.cloudinary.com/znbhjevm/image/upload/v1786733495/4982b20a-6439-460b-8543-b7f4701db6ea.png'],['coimbatore','Coimbatore','https://res.cloudinary.com/znbhjevm/image/upload/v1786733486/77df45e7-3253-405e-a0d3-6438765060ad.png'],['viyanagaram','Viyanagaram','https://res.cloudinary.com/znbhjevm/image/upload/v1786733480/7c8ee721-ee4c-4c61-abbb-1cbea0245625.png'],['pune','Pune','https://res.cloudinary.com/znbhjevm/image/upload/v1786733473/848dbd80-4e3d-4758-83df-37b47760b587.png'],['gujarat','Gujarat','https://res.cloudinary.com/znbhjevm/image/upload/v1786733468/5994d514-59ee-4667-ad5e-1b0c025e416e.png'],['maharastra','Maharastra','https://res.cloudinary.com/znbhjevm/image/upload/v1786733462/36c2bc34-0ba0-455a-8f19-acab2ff9250d.png'],['delhi','Delhi','https://res.cloudinary.com/znbhjevm/image/upload/v1786733455/634bd484-005a-4159-a18f-252b480f3149.png'],['kakinada','Kakinada','https://res.cloudinary.com/znbhjevm/image/upload/v1786733450/1bf3c6f5-bf16-4e66-8f7e-8db9e4d796ef.png'],['vizag','Vizag','https://res.cloudinary.com/znbhjevm/image/upload/v1786733443/010ec3bb-1834-4253-a8b5-fb1ee37b9b.png'],['chennai','Chennai','https://res.cloudinary.com/znbhjevm/image/upload/v1786733437/f0ef17ce-caab-45dc-aac2-5d1cfb917d95.png'],['hyderabad','Hyderabad','https://res.cloudinary.com/znbhjevm/image/upload/v1786733429/95f8f3fb-496a-4711-be13-224ad0fd3f60.png'],['bangalore','Bangalore','https://res.cloudinary.com/znbhjevm/image/upload/v1786733424/8cc38c53-23f6-4fae-9bd5-0879b2212923.png'],['trichy','Trichy','https://res.cloudinary.com/znbhjevm/image/upload/v1786733416/626867d8-7a51-4a31-ae66-7f1f7bf897c0.png'],['thiruvananthapuram','Thiruvananthapuram','https://res.cloudinary.com/znbhjevm/image/upload/v1786733385/1aa62ccd-7449-4ea9-879b-36d9e861d4ca.png'],['thirunallar','Thirunallar','https://res.cloudinary.com/znbhjevm/image/upload/v1786733373/a6c6e657-7d6a-4356-9fce-8185eca8f6b7.png'],['thanjavur','Thanjavur','https://res.cloudinary.com/znbhjevm/image/upload/v1786733363/90590760-eba9-462a-a7c8-3e8b50743708.png'],['srirangam','Srirangam','https://res.cloudinary.com/znbhjevm/image/upload/v1786733347/9f22f2e8-eff4-430a-b67b-021bdbdd056e.png'],['rameswaram','Rameswaram','https://res.cloudinary.com/znbhjevm/image/upload/v1786733314/324b7f65-5b9a-490e-adb5-c81416fb0d05.png'],['pondicherry','Pondicherry','https://res.cloudinary.com/znbhjevm/image/upload/v1786733307/ce934d82-a670-474a-91d9-2d7089abb2c3.png'],['mahabalipuram','Mahabalipuram','https://res.cloudinary.com/znbhjevm/image/upload/v1786733297/51d2c19a-22c0-41ce-b299-9ca4ba7cc078.png'],['madurai','Madurai','https://res.cloudinary.com/znbhjevm/image/upload/v1786733283/4db94717-d968-4688-8e3e-6d48b31613e0.png'],['kumbakonam','Kumbakonam','https://res.cloudinary.com/znbhjevm/image/upload/v1786733275/ac617c4f-5131-43c5-ac0d-b18f70b5ed5e.png'],['kerala','Kerala','https://res.cloudinary.com/znbhjevm/image/upload/v1786733267/a60cbb24-e65b-42b0-a95e-35ffcb4ffd4c.png'],['kanyakumari','Kanyakumari','https://res.cloudinary.com/znbhjevm/image/upload/v1786733253/e0e2138b-a218-4dfa-92bb-2c51919c4c8d.png'],['kanchipuram','Kanchipuram','https://res.cloudinary.com/znbhjevm/image/upload/v1786733229/896a9850-f84d-4db9-83cd-5133fe373dfc.png'],['dhanushkoti','Dhanushkoti','https://res.cloudinary.com/znbhjevm/image/upload/v1786733194/1c7b8df2-3fd0-446a-8de2-1de505a992b3.png']
];
moreDestinationImages.forEach(([slug,name,image], index) => destinations.push([slug, name, `A curated travel and temple experience in ${name}.`, image, `₹${(4999 + index * 500).toLocaleString('en-IN')}`]));

export const tours = [
  ['Tirupati 5 Temples Tour', '1 Day', 'Tirumala · Padmavathi · Kapila', '₹2,499', images.temple],
  ['Tirupati to Srikalahasti', 'Full Day', 'Srikalahasti · Tiruchanur', '₹2,999', images.srikalahasti],
  ['Tirupati to Kanipakam', 'Full Day', 'Kanipakam · Golden Temple', '₹3,499', images.place],
  ['South India Pilgrimage', '5 Days', 'Tirupati · Madurai · Rameshwaram', '₹18,999', images.taxi]
];
