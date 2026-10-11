import React from 'react';
import { Star, Heart, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types/service';

interface ServiceCardProps {
  service: ServiceItem;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
  onSelectService: (service: ServiceItem) => void;
  onBookDirect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isFavorite,
  onToggleFavorite,
  onSelectService,
  onBookDirect
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#219EBC]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Card Image Area with Zoom effect */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback to gradient if needed
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(service.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-white shadow-xs transition-colors z-10"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Starting Price Pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-[#023047]/95 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
          <span className="text-[#8ECAE6] text-[10px] font-normal mr-1">From</span>
          <span className="font-extrabold tabular-nums">${service.startingPrice}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1 font-bold text-[#023047]">
              <Star className="w-3.5 h-3.5 fill-[#FFB703] text-[#FFB703]" />
              <span className="tabular-nums">{service.rating}</span>
              <span className="text-slate-400 font-normal">({service.reviewsCount})</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#219EBC]" />
              <span>{service.avgTime}</span>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-base font-bold text-[#023047] group-hover:text-[#219EBC] transition-colors leading-snug line-clamp-1">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onSelectService(service)}
            className="flex-1 py-2 px-2.5 text-xs font-bold text-[#023047] bg-slate-100 hover:bg-[#8ECAE6]/25 hover:text-[#023047] rounded-lg transition-colors text-center truncate"
          >
            Details
          </button>
          <button
            onClick={() => onBookDirect(service)}
            className="flex-1 py-2 px-2.5 text-xs font-bold text-white bg-[#023047] group-hover:bg-[#FB8500] rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1 truncate"
          >
            <span>Book</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>

    </div>
  );
};
