import { Booking } from '../types/service';

const BOOKINGS_KEY = 'hs_bookings_data';
const FAVORITES_KEY = 'hs_favorites_data';
const ACTIVE_CITY_KEY = 'hs_active_city';

// Initial sample bookings so the user experiences a live, populated dashboard immediately
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HS-84291',
    serviceId: 'ac-appliances',
    serviceTitle: 'AC & Appliances',
    packageId: 'ac-foamjet',
    packageName: 'AC Foam Jet Servicing',
    serviceImage: '/src/assets/images/service_ac_cooling_1791614539859.jpg',
    date: 'Tomorrow, Oct 11',
    timeSlot: '11:00 AM - 12:30 PM',
    price: 42,
    discount: 0,
    totalPrice: 42,
    customerName: 'Alex Morgan',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Apt 4B',
    specialInstructions: 'Ring doorbell twice. Outdoor AC compressor is on the patio.',
    paymentMethod: 'pay_after_service',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    proAssigned: {
      name: 'Marcus Chen',
      phone: '+1 (555) 912-3401',
      rating: 4.89
    }
  },
  {
    id: 'HS-79104',
    serviceId: 'plumbing',
    serviceTitle: 'Plumbing',
    packageId: 'plumb-leak',
    packageName: 'Tap & Pipe Leak Fix',
    serviceImage: '/src/assets/images/service_plumbing_1791614461545.jpg',
    date: 'Oct 04, 2026',
    timeSlot: '02:30 PM - 04:00 PM',
    price: 39,
    discount: 5,
    totalPrice: 34,
    customerName: 'Alex Morgan',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Apt 4B',
    specialInstructions: 'Main valve is under the kitchen island.',
    paymentMethod: 'card_online',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    proAssigned: {
      name: 'David Rodriguez',
      phone: '+1 (555) 441-8920',
      rating: 4.95
    }
  }
];

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BOOKINGS;
  }
}

export function saveBooking(booking: Booking): void {
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save booking to localStorage', e);
  }
}

export function cancelBooking(id: string): void {
  try {
    const current = getStoredBookings();
    const updated = current.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to cancel booking', e);
  }
}

export function rescheduleBooking(id: string, newDate: string, newTime: string): void {
  try {
    const current = getStoredBookings();
    const updated = current.map(b => b.id === id ? { ...b, date: newDate, timeSlot: newTime, status: 'confirmed' as const } : b);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to reschedule booking', e);
  }
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['plumbing', 'electrician'];
  } catch {
    return [];
  }
}

export function toggleFavorite(serviceId: string): string[] {
  try {
    const current = getFavorites();
    const next = current.includes(serviceId)
      ? current.filter(id => id !== serviceId)
      : [...current, serviceId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

export function getActiveCity(): string {
  try {
    return localStorage.getItem(ACTIVE_CITY_KEY) || 'Austin, TX';
  } catch {
    return 'Austin, TX';
  }
}

export function setActiveCity(city: string): void {
  try {
    localStorage.setItem(ACTIVE_CITY_KEY, city);
  } catch (e) {
    console.error('Failed to set city', e);
  }
}
