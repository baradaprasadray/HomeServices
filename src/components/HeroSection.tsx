import React from 'react';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  Star, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import heroImg from '../assets/images/hero_home_repair_1791614439523.jpg';

interface HeroSectionProps {
  currentCity: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectPopularTag: (query: string) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCity,
  searchQuery,
  onSearchChange,
  onSelectPopularTag,
  onExploreClick
}) => {
  const popularKeywords = ['Plumbing', 'Electrician', 'AC & Appliances', 'Deep Cleaning', 'Painting', 'Carpentry'];

  return (
    <section id="hero" className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Interactive Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8ECAE6]/20 border border-[#8ECAE6]/50 text-[#023047] text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#219EBC]" />
              <span>Verified Home Pros Serving {currentCity}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#023047] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Quality home repairs & services, booked in minutes.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              From leak repairs and circuit breaker fixes to full home deep cleaning and renovation. Upfront pricing, vetted local specialists, and a 30-day workmanship guarantee.
            </p>

            {/* Interactive Search Bar Box */}
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1 flex items-center px-3.5 py-2">
                  <Search className="w-5 h-5 text-[#219EBC] shrink-0 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search e.g. Plumbing, AC jet wash, Masonry, Carpenter..."
                    className="w-full text-sm font-medium text-[#023047] placeholder:text-slate-400 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  onClick={onExploreClick}
                  className="px-6 py-3.5 bg-[#FB8500] hover:bg-[#e07700] text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="pt-3 pb-1 px-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 mr-1">Popular:</span>
                {popularKeywords.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onSelectPopularTag(tag)}
                    className="px-2.5 py-1 text-xs font-medium text-[#023047] bg-slate-100 hover:bg-[#8ECAE6]/30 hover:text-[#023047] rounded-md transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Key feature bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#219EBC]" />
                <span>Transparent pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#219EBC]" />
                <span>Pay after satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#219EBC]" />
                <span>Instant confirmation</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Fidelity Cinematic Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
              <img
                src={heroImg}
                alt="Professional technician consulting happy homeowner"
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#023047]/90 via-[#023047]/20 to-transparent pointer-events-none" />

              {/* Floating Verified Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#219EBC]/15 flex items-center justify-center text-[#219EBC]">
                  <Award className="w-4 h-4 text-[#219EBC]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#023047]">100% Background-Checked</div>
                  <div className="text-[11px] text-slate-500">Government ID & Police Verified</div>
                </div>
              </div>

              {/* Bottom Floating Review Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#023047] text-white text-[10px] font-bold flex items-center justify-center">DR</span>
                      <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#219EBC] text-white text-[10px] font-bold flex items-center justify-center">ER</span>
                      <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#FB8500] text-white text-[10px] font-bold flex items-center justify-center">MC</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-[#FFB703]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-black text-[#023047]">4.9 / 5.0</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Over 15,200 verified reviews</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-[#219EBC] bg-[#8ECAE6]/20 px-2 py-1 rounded-md">
                      Same-Day Slots Open
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI Trust Strip below hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#8ECAE6]/25 text-[#219EBC] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#023047] tabular-nums">15,000+</div>
              <div className="text-xs text-slate-500 font-medium">Completed Home Jobs</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFB703]/20 text-[#FB8500] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#023047] tabular-nums">4.9 / 5.0</div>
              <div className="text-xs text-slate-500 font-medium">Average Customer Rating</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#219EBC]/15 text-[#219EBC] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#023047] tabular-nums">45 Mins</div>
              <div className="text-xs text-slate-500 font-medium">Average Arrival Time</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#023047]/10 text-[#023047] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-[#023047] tabular-nums">30-Day</div>
              <div className="text-xs text-slate-500 font-medium">Workmanship Warranty</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
