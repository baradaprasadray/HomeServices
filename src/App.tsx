import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceCatalog } from './components/ServiceCatalog';
import { HowItWorksSection } from './components/HowItWorksSection';
import { EmergencySection } from './components/EmergencySection';
import { TopProsSection } from './components/TopProsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';

import { SERVICES } from './data/servicesData';
import { ServiceItem, ServicePackage, Booking, PageView } from './types/service';
import { 
  getStoredBookings, 
  cancelBooking, 
  rescheduleBooking, 
  getFavorites, 
  toggleFavorite, 
  getActiveCity, 
  setActiveCity 
} from './utils/storage';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Sparkles,
  Zap,
  Droplets,
  KeyRound,
  ThermometerSnowflake
} from 'lucide-react';

export default function App() {
  // Master Single-Page Route State
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Global States
  const [currentCity, setCurrentCityState] = useState<string>('Austin, TX');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modals & Drawers
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const [bookingModalState, setBookingModalState] = useState<{
    isOpen: boolean;
    service: ServiceItem | null;
    pkg: ServicePackage | null;
  }>({
    isOpen: false,
    service: null,
    pkg: null
  });
  const [myBookingsDrawerOpen, setMyBookingsDrawerOpen] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  // Dedicated Bookings view filters & state
  const [bookingsFilter, setBookingsFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [viewingReceipt, setViewingReceipt] = useState<Booking | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen to URL hash for seamless page navigation directly from index.html
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      const validPages: PageView[] = ['home', 'services', 'how-it-works', 'top-pros', 'reviews', 'bookings', 'emergency'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize from localStorage
  useEffect(() => {
    setCurrentCityState(getActiveCity());
    setFavorites(getFavorites());
    setBookings(getStoredBookings());
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCityChange = (city: string) => {
    setCurrentCityState(city);
    setActiveCity(city);
    showToast(`Location set to ${city}`);
  };

  const handleToggleFavorite = (serviceId: string) => {
    const updated = toggleFavorite(serviceId);
    setFavorites(updated);
  };

  const handleOpenDetail = (service: ServiceItem) => {
    setDetailService(service);
  };

  const handleCloseDetail = () => {
    setDetailService(null);
  };

  const handleBookDirect = (service: ServiceItem) => {
    setBookingModalState({
      isOpen: true,
      service,
      pkg: service.packages[0]
    });
  };

  const handleBookFromDetail = (service: ServiceItem, pkg: ServicePackage) => {
    setDetailService(null);
    setBookingModalState({
      isOpen: true,
      service,
      pkg
    });
  };

  const handleBookingCompleted = (newBooking: Booking) => {
    setBookings(getStoredBookings());
    showToast(`Booking #${newBooking.id} confirmed!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
    setBookings(getStoredBookings());
    showToast(`Booking #${bookingId} was cancelled.`);
  };

  const handleRescheduleBooking = (bookingId: string, newDate: string, newSlot: string) => {
    rescheduleBooking(bookingId, newDate, newSlot);
    setBookings(getStoredBookings());
    showToast(`Booking #${bookingId} rescheduled to ${newDate}!`);
  };

  const handleSelectProSpecialty = (specialty: string) => {
    const match = SERVICES.find(s => 
      specialty.toLowerCase().includes(s.title.toLowerCase()) ||
      s.title.toLowerCase().includes(specialty.toLowerCase())
    );
    if (match) {
      handleBookDirect(match);
    } else {
      handleBookDirect(SERVICES[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#023047] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl border border-slate-700 animate-in slide-in-from-top duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Master Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        currentCity={currentCity}
        onCityChange={handleCityChange}
        bookingCount={bookings.filter(b => b.status === 'confirmed').length}
      />

      {/* Main Application Controller Area (All Views Controlled from index.html) */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE (Master Overview) */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-200">
            <HeroSection
              currentCity={currentCity}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectPopularTag={(tag) => {
                setSearchQuery(tag);
                navigateTo('services');
              }}
              onExploreClick={() => navigateTo('services')}
            />

            <ServiceCatalog
              services={SERVICES}
              searchQuery={searchQuery}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectService={handleOpenDetail}
              onBookDirect={handleBookDirect}
              onClearSearch={() => setSearchQuery('')}
            />

            <HowItWorksSection
              onExploreServices={() => navigateTo('services')}
            />

            <EmergencySection
              currentCity={currentCity}
              onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
            />

            <TopProsSection
              onSelectProSpecialty={handleSelectProSpecialty}
            />

            <ReviewsSection />
          </div>
        )}

        {/* VIEW 2: DEDICATED SERVICES DIRECTORY PAGE */}
        {currentPage === 'services' && (
          <div className="animate-in fade-in duration-200 pb-16">
            {/* Breadcrumbs Header */}
            <div className="bg-[#023047] text-white py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8ECAE6] hover:text-white mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  All 12 Home Services Directory
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Explore certified home repair, deep cleaning, electrical, carpentry, and renovation packages in {currentCity}.
                </p>
              </div>
            </div>

            <ServiceCatalog
              services={SERVICES}
              searchQuery={searchQuery}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectService={handleOpenDetail}
              onBookDirect={handleBookDirect}
              onClearSearch={() => setSearchQuery('')}
            />
          </div>
        )}

        {/* VIEW 3: DEDICATED HOW IT WORKS PAGE */}
        {currentPage === 'how-it-works' && (
          <div className="animate-in fade-in duration-200 pb-16">
            <div className="bg-[#023047] text-white py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8ECAE6] hover:text-white mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  How HS.com Works
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Transparent booking, licensed specialists, and our 100% satisfaction guarantee.
                </p>
              </div>
            </div>

            <HowItWorksSection onExploreServices={() => navigateTo('services')} />
          </div>
        )}

        {/* VIEW 4: DEDICATED VERIFIED PROS PAGE */}
        {currentPage === 'top-pros' && (
          <div className="animate-in fade-in duration-200 pb-16">
            <div className="bg-[#023047] text-white py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8ECAE6] hover:text-white mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Verified Local Professionals Directory
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Meet our highest-rated master plumbers, licensed electricians, and expert carpenters in {currentCity}.
                </p>
              </div>
            </div>

            <TopProsSection onSelectProSpecialty={handleSelectProSpecialty} />
          </div>
        )}

        {/* VIEW 5: DEDICATED CUSTOMER REVIEWS PAGE */}
        {currentPage === 'reviews' && (
          <div className="animate-in fade-in duration-200 pb-16">
            <div className="bg-[#023047] text-white py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8ECAE6] hover:text-white mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Customer Reviews & Job Galleries
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Real feedback with verified job photos from homeowners in {currentCity}.
                </p>
              </div>
            </div>

            <ReviewsSection />
          </div>
        )}

        {/* VIEW 6: DEDICATED FULL-PAGE BOOKINGS MANAGEMENT DASHBOARD */}
        {currentPage === 'bookings' && (
          <div className="animate-in fade-in duration-200 pb-16">
            <div className="bg-[#023047] text-white py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8ECAE6] hover:text-white mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      My Bookings & Service Orders
                    </h1>
                    <p className="text-sm text-slate-300 mt-1">
                      Manage appointments, reschedule slots, and inspect digital invoice receipts.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('services')}
                    className="px-5 py-2.5 bg-[#FB8500] hover:bg-[#e07700] text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer"
                  >
                    + Book New Service
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              {/* Tab Filters */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setBookingsFilter('all')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    bookingsFilter === 'all' ? 'bg-[#023047] text-white shadow-xs' : 'bg-white border text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Bookings ({bookings.length})
                </button>
                <button
                  onClick={() => setBookingsFilter('active')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    bookingsFilter === 'active' ? 'bg-[#023047] text-white shadow-xs' : 'bg-white border text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Upcoming / Active ({bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress').length})
                </button>
                <button
                  onClick={() => setBookingsFilter('completed')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    bookingsFilter === 'completed' ? 'bg-[#023047] text-white shadow-xs' : 'bg-white border text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Completed ({bookings.filter(b => b.status === 'completed').length})
                </button>
              </div>

              {/* Bookings Grid */}
              {bookings.filter(b => {
                if (bookingsFilter === 'active') return b.status === 'confirmed' || b.status === 'in_progress';
                if (bookingsFilter === 'completed') return b.status === 'completed';
                return true;
              }).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookings.filter(b => {
                    if (bookingsFilter === 'active') return b.status === 'confirmed' || b.status === 'in_progress';
                    if (bookingsFilter === 'completed') return b.status === 'completed';
                    return true;
                  }).map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-500">#{item.id}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                            item.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'completed' ? 'bg-slate-100 text-slate-700' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-extrabold text-[#023047]">{item.serviceTitle}</h3>
                          <p className="text-xs text-slate-500 font-medium">{item.packageName}</p>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#219EBC]" />
                            <span>{item.date} · {item.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#219EBC]" />
                            <span className="truncate">{item.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-base font-black text-[#023047] tabular-nums">
                          ${item.totalPrice.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewingReceipt(item)}
                            className="px-3 py-1.5 text-xs font-bold text-[#023047] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          >
                            Receipt
                          </button>
                          {item.status === 'confirmed' && (
                            <button
                              onClick={() => {
                                if (window.confirm('Cancel this booking?')) {
                                  handleCancelBooking(item.id);
                                }
                              }}
                              className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#023047]">No bookings found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    You have no scheduled bookings in this view.
                  </p>
                  <button
                    onClick={() => navigateTo('services')}
                    className="mt-4 px-5 py-2.5 bg-[#023047] hover:bg-[#219EBC] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Browse 12 Services & Book
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 7: DEDICATED EMERGENCY 45-MIN DISPATCH CENTER */}
        {currentPage === 'emergency' && (
          <div className="animate-in fade-in duration-200 pb-16">
            <div className="bg-[#023047] text-white py-10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8ECAE6] hover:text-white mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FB8500]/20 border border-[#FB8500]/40 text-[#FFB703] text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>24/7 Rapid Response Network</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Emergency 45-Minute Dispatch Center
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  Priority emergency response for burst pipes, severe short circuits, broken locks, and heating/cooling hazards in {currentCity}.
                </p>
              </div>
            </div>

            <EmergencySection
              currentCity={currentCity}
              onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
            />
          </div>
        )}

      </main>

      {/* Persistent Footer */}
      <Footer
        onSelectService={(serviceId) => {
          const s = SERVICES.find(item => item.id === serviceId);
          if (s) {
            handleOpenDetail(s);
          } else {
            navigateTo('services');
          }
        }}
        onScrollToSection={(sectionId) => {
          if (sectionId === 'services') navigateTo('services');
          else if (sectionId === 'how-it-works') navigateTo('how-it-works');
          else if (sectionId === 'top-pros') navigateTo('top-pros');
          else if (sectionId === 'reviews') navigateTo('reviews');
          else navigateTo('home');
        }}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
      />

      {/* Master Modals (Accessible from Any View) */}
      
      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={detailService}
        isOpen={Boolean(detailService)}
        onClose={handleCloseDetail}
        onBookPackage={handleBookFromDetail}
        isFavorite={detailService ? favorites.includes(detailService.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Multi-Step Booking Modal */}
      <BookingModal
        service={bookingModalState.service}
        initialPackage={bookingModalState.pkg}
        isOpen={bookingModalState.isOpen}
        onClose={() => setBookingModalState({ isOpen: false, service: null, pkg: null })}
        onBookingComplete={handleBookingCompleted}
        currentCity={currentCity}
      />

      {/* Emergency 45-Min Dispatch Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        currentCity={currentCity}
        onEmergencyBooked={(emergencyBooking) => {
          setBookings(getStoredBookings());
          showToast(`Emergency unit dispatched for ${emergencyBooking.id}!`);
        }}
      />

      {/* Invoice Receipt Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="font-extrabold text-base text-[#023047]">Service Invoice Receipt</h4>
              <button 
                onClick={() => setViewingReceipt(null)} 
                className="p-1 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice ID:</span>
                <span className="font-mono font-bold text-[#023047]">INV-{viewingReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold">{viewingReceipt.serviceTitle} ({viewingReceipt.packageName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span>{viewingReceipt.date} · {viewingReceipt.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span>{viewingReceipt.address}</span>
              </div>
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Base Labor & Service:</span>
                  <span>${viewingReceipt.price.toFixed(2)}</span>
                </div>
                {viewingReceipt.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied:</span>
                    <span>-${viewingReceipt.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm text-[#023047] border-t pt-1">
                  <span>Total Paid / Due:</span>
                  <span className="text-[#FB8500]">${viewingReceipt.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setViewingReceipt(null)}
              className="w-full py-2 bg-[#023047] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
