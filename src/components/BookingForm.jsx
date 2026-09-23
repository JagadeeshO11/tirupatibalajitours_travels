import { useState } from 'react';
import { CalendarDays, MapPin, Route, MessageCircle, CreditCard } from 'lucide-react';
import { whatsappBooking } from '../data/siteData';
import PopularPackages from './PopularPackages';
import EasebuzzModal from './EasebuzzModal';
import { useData } from '../context/DataContext';
import './BookingForm.css';

export default function BookingForm() {
  const { addQuery } = useData();
  const [f, setF] = useState({ from: 'Tirupati', to: 'Tirumala', date: '', trip: 'One Way', name: '', phone: '' });
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  function submit(e) {
    e.preventDefault();
    // Record in admin queries
    addQuery({
      name: f.name || 'Site Visitor',
      phone: f.phone || 'WhatsApp Visitor',
      from: f.from,
      to: f.to,
      date: f.date || 'Not specified',
      trip: f.trip,
      vehicle: 'Standard Cab Enquiry',
      status: 'Pending'
    });

    const message = `Hi, I would like to enquire about a cab.\nFrom: ${f.from}\nTo: ${f.to}\nDate: ${f.date || 'Not specified'}\nTrip type: ${f.trip}`;
    window.open(whatsappBooking(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <form className="booking" onSubmit={submit}>
        <label>
          From
          <span>
            <MapPin size={16} />
            <input value={f.from} onChange={e => setF({ ...f, from: e.target.value })} />
          </span>
        </label>
        <label>
          To
          <span>
            <MapPin size={16} />
            <input value={f.to} onChange={e => setF({ ...f, to: e.target.value })} />
          </span>
        </label>
        <label>
          Date
          <span>
            <CalendarDays size={16} />
            <input type="date" value={f.date} onChange={e => setF({ ...f, date: e.target.value })} />
          </span>
        </label>
        <label>
          Trip type
          <span>
            <Route size={16} />
            <select value={f.trip} onChange={e => setF({ ...f, trip: e.target.value })}>
              <option>One Way</option>
              <option>Round Trip</option>
            </select>
          </span>
        </label>
        
        <div style={{ display: 'flex', gap: '0.5rem', gridColumn: 'span 2', marginTop: '0.25rem' }}>
          <button className="button" type="submit" style={{ flex: 1 }}>
            <MessageCircle size={16} /> Enquire on WhatsApp
          </button>
          <button 
            className="button" 
            type="button" 
            onClick={() => setIsPayModalOpen(true)}
            style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7, #0369a1)', borderColor: '#0284c7' }}
          >
            <CreditCard size={16} /> Pay Deposit (Easebuzz)
          </button>
        </div>
      </form>

      <PopularPackages />

      <EasebuzzModal 
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)}
        initialData={{
          service: `${f.from} to ${f.to} Cab Booking Deposit`,
          name: f.name,
          phone: f.phone
        }}
      />
    </>
  );
}
