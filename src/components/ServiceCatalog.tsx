import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types/service';
import { ServiceCard } from './ServiceCard';

interface ServiceCatalogProps {
  services: ServiceItem[];
  searchQuery: string;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onBookDirect: (service: ServiceItem) => void;
  onClearSearch: () => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  searchQuery,
  favorites,
  onToggleFavorite,
  onSelectService,
  onBookDirect,
  onClearSearch
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'repairs', label: 'Repairs & Electrical' },
    { id: 'cleaning', label: 'Cleaning & Pest' },
    { id: 'renovation', label: 'Carpentry & Decor' },
    { id: 'outdoor', label: 'Gardening & Outdoor' },
    { id: 'heavy', label: 'Labour & Relocation' },
    { id: 'favorites', label: `Saved (${favorites.length})` },
  ];

  // Filtering logic
  const filteredServices = useMemo(() => {
    let result = [...services];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.highlights.some(h => h.toLowerCase().includes(q)) ||
        s.packages.some(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory === 'favorites') {
      result = result.filter(s => favorites.includes(s.id));
    } else if (selectedCategory !== 'all') {
      result = result.filter(s => s.category === selectedCategory);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [services, searchQuery, selectedCategory, sortBy, favorites]);

  return (
    <section id="services" className="py-12 sm:py-16 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#219EBC] tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FB8500]" />
              <span>Full Service Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#023047] tracking-tight">
              Book a Certified Professional
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              12 certified categories with fixed transparent pricing, background-checked pros, and same-day availability.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-[#023047] focus:outline-none focus:ring-1 focus:ring-[#219EBC]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Segmented Control Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#023047] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#023047] hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Active Indicator */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-white border border-[#8ECAE6]/60 rounded-xl flex items-center justify-between">
            <div className="text-xs text-slate-600">
              Showing results for: <span className="font-bold text-[#023047]">"{searchQuery}"</span> ({filteredServices.length} found)
            </div>
            <button
              onClick={onClearSearch}
              className="text-xs font-bold text-[#FB8500] hover:underline"
            >
              Reset filter
            </button>
          </div>
        )}

        {/* Services Grid: Exactly 2 columns on phone, 4 columns on desktop */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isFavorite={favorites.includes(service.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectService={onSelectService}
                onBookDirect={onBookDirect}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#023047]">No services found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any service matching your criteria. Try resetting your search or select another category.
            </p>
            <button
              onClick={() => {
                onClearSearch();
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#023047] hover:bg-[#219EBC] rounded-lg transition-colors"
            >
              Show All 12 Services
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
