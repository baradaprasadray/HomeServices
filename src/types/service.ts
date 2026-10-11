export type PageView = 
  | 'home'
  | 'services'
  | 'how-it-works'
  | 'top-pros'
  | 'reviews'
  | 'bookings'
  | 'emergency';

export type ServiceCategory = 
  | 'all'
  | 'repairs'
  | 'cleaning'
  | 'renovation'
  | 'outdoor'
  | 'heavy';

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  image: string;
  fallbackGradient: string;
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  avgTime: string;
  warrantyDays: number;
  highlights: string[];
  packages: ServicePackage[];
  included: string[];
  excluded: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  packageId: string;
  packageName: string;
  serviceImage: string;
  date: string;
  timeSlot: string;
  price: number;
  discount: number;
  totalPrice: number;
  promoCode?: string;
  customerName: string;
  phone: string;
  address: string;
  specialInstructions?: string;
  paymentMethod: 'cash_on_delivery' | 'card_online' | 'pay_after_service';
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  proAssigned?: {
    name: string;
    phone: string;
    rating: number;
  };
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  completedJobs: number;
  avatar: string;
  badge: string;
  verified: boolean;
  ratePerHour: number;
  bio: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
