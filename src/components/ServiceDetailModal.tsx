import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { ServiceItem, ServicePackage } from '../types/service';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookPackage: (service: ServiceItem, pkg: ServicePackage) => void;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onBookPackage,
  isFavorite,
  onToggleFavorite
}) => {
  if (!isOpen || !service) return null;

  const [selectedPkgId, setSelectedPkgId] = useState<string>(service.packages[0]?.id || '');

  const activePackage = service.packages.find(p => p.id === selectedPkgId) || service.packages[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Media Banner */}
        <div className="relative h-48 sm:h-64 bg-slate-900 shrink-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#023047] via-[#023047]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={() => onToggleFavorite(service.id)}
            className="absolute top-4 right-15 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-10"
            aria-label="Toggle favorite"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Title Lockup in Header */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#FFB703] text-[#023047]">
                HS.com Verified
              </span>
              <span className="text-xs text-[#8ECAE6] flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {service.warrantyDays}-Day Warranty Included
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {service.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-200 mt-1">
              <span className="flex items-center gap-1 text-[#FFB703] font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {service.rating} ({service.reviewsCount} reviews)
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8ECAE6]" />
                Est. {service.avgTime}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Overview Prose */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Service Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Service Packages Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Service Package
              </h4>
              <span className="text-xs font-medium text-slate-500">
                {service.packages.length} packages available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.packages.map((pkg) => {
                const isSelected = selectedPkgId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#219EBC] bg-[#8ECAE6]/10 shadow-xs ring-1 ring-[#219EBC]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-[#FB8500] text-white">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <span className="text-sm font-bold text-[#023047]">
                          {pkg.name}
                        </span>
                        <span className="text-base font-extrabold text-[#023047] tabular-nums">
                          ${pkg.price}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">
                        {pkg.description}
                      </p>
                      
                      <div className="space-y-1 mb-2">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#219EBC] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {pkg.duration}
                      </span>
                      <span className={`font-bold ${isSelected ? 'text-[#219EBC]' : 'text-slate-400'}`}>
                        {isSelected ? 'Selected' : 'Click to select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Included vs Excluded Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <h5 className="text-xs font-bold text-[#023047] flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What's Included</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {service.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-[#023047] flex items-center gap-1.5 mb-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>What's Excluded</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {service.excluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guarantee banner */}
          <div className="p-3.5 rounded-xl bg-[#8ECAE6]/15 border border-[#8ECAE6]/40 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#219EBC] shrink-0" />
            <div className="text-xs text-[#023047]">
              <span className="font-bold">HS.com Satisfaction Guarantee:</span> If you are not completely satisfied with the service provided, our pro will revisit and resolve it for free under the {service.warrantyDays}-day warranty.
            </div>
          </div>

        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Package Price
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#023047] tabular-nums">
                ${activePackage.price}
              </span>
              <span className="text-xs text-slate-400 font-medium">tax included</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => onBookPackage(service, activePackage)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#FB8500] hover:bg-[#e07700] rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <span>Book {activePackage.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
