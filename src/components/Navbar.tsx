import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  CalendarDays, 
  PhoneCall, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Home
} from 'lucide-react';
import { CITIES } from '../data/servicesData';
import { PageView } from '../types/service';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  currentCity: string;
  onCityChange: (city: string) => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentCity,
  onCityChange,
  bookingCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single element Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => handleNavClick('home')} 
              className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#219EBC] rounded-lg cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#023047] flex items-center justify-center text-white shadow-sm group-hover:bg-[#219EBC] transition-colors">
                <Wrench className="w-5 h-5 text-[#FFB703]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#023047] group-hover:text-[#219EBC] transition-colors">
                  HS<span className="text-[#FB8500]">.com</span>
                </span>
              </div>
            </button>

            {/* City Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#023047] bg-[#8ECAE6]/15 hover:bg-[#8ECAE6]/30 border border-[#8ECAE6]/40 rounded-lg transition-colors cursor-pointer"
                aria-expanded={cityDropdownOpen}
              >
                <MapPin className="w-3.5 h-3.5 text-[#219EBC]" />
                <span className="truncate max-w-[110px]">{currentCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#023047]/60" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Your City
                  </div>
                  {CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        onCityChange(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        currentCity === city ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : 'text-slate-700'
                      }`}
                    >
                      <span>{city}</span>
                      {currentCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#219EBC]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Zone 2: Navigation Links with Active Page Indicators */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#023047]/80">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#219EBC] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'home' ? 'text-[#219EBC] font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`hover:text-[#219EBC] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'services' ? 'text-[#219EBC] font-bold' : ''
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`hover:text-[#219EBC] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'how-it-works' ? 'text-[#219EBC] font-bold' : ''
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('top-pros')}
              className={`hover:text-[#219EBC] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'top-pros' ? 'text-[#219EBC] font-bold' : ''
              }`}
            >
              Verified Pros
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className={`hover:text-[#219EBC] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'reviews' ? 'text-[#219EBC] font-bold' : ''
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('bookings')}
              className={`relative flex items-center gap-1.5 hover:text-[#219EBC] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'bookings' ? 'text-[#219EBC] font-bold' : ''
              }`}
            >
              <CalendarDays className="w-4 h-4 text-[#219EBC]" />
              <span>My Bookings</span>
              {bookingCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[11px] font-bold bg-[#FB8500] text-white rounded-full">
                  {bookingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('emergency')}
              className={`hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold border rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'emergency'
                  ? 'border-[#FB8500] bg-[#FB8500]/10 text-[#FB8500]'
                  : 'text-[#023047] hover:text-[#FB8500] border-slate-200 hover:border-[#FB8500]/40'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FB8500]" />
              <span>Emergency 45-Min</span>
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#023047] hover:bg-[#219EBC] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>Book a Service</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="px-2 pb-2 border-b border-slate-100">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Your Location
              </label>
              <select
                value={currentCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-[#023047]"
              >
                {CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1 px-2 text-sm font-semibold text-[#023047]">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-2 px-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 ${
                  currentPage === 'home' ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : ''
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className={`text-left py-2 px-2 rounded-lg hover:bg-slate-100 ${
                  currentPage === 'services' ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : ''
                }`}
              >
                All 12 Services
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className={`text-left py-2 px-2 rounded-lg hover:bg-slate-100 ${
                  currentPage === 'how-it-works' ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : ''
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('top-pros')}
                className={`text-left py-2 px-2 rounded-lg hover:bg-slate-100 ${
                  currentPage === 'top-pros' ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : ''
                }`}
              >
                Verified Pros
              </button>
              <button
                onClick={() => handleNavClick('reviews')}
                className={`text-left py-2 px-2 rounded-lg hover:bg-slate-100 ${
                  currentPage === 'reviews' ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : ''
                }`}
              >
                Customer Reviews
              </button>
              <button
                onClick={() => handleNavClick('bookings')}
                className={`text-left py-2 px-2 rounded-lg hover:bg-slate-100 flex items-center justify-between ${
                  currentPage === 'bookings' ? 'text-[#219EBC] font-bold bg-[#8ECAE6]/10' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#219EBC]" />
                  <span>My Bookings</span>
                </span>
                {bookingCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-[#FB8500] text-white rounded-full">
                    {bookingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleNavClick('emergency')}
                className="text-left py-2 px-2 rounded-lg flex items-center gap-2 text-[#FB8500] font-bold hover:bg-amber-50"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency 45-Min Response</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
