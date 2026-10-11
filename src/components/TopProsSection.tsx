import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Award, ArrowUpRight, Wrench } from 'lucide-react';
import { TOP_PROS } from '../data/servicesData';
import { Professional } from '../types/service';

interface TopProsSectionProps {
  onSelectProSpecialty: (specialty: string) => void;
}

export const TopProsSection: React.FC<TopProsSectionProps> = ({ onSelectProSpecialty }) => {
  return (
    <section id="top-pros" className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#219EBC] tracking-wider uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-[#219EBC]" />
              <span>Vetted & Insured Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#023047] tracking-tight">
              Meet Our Top-Rated Local Pros
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Each professional on HS.com undergoes background verification, license audits, and maintains an average customer rating of 4.8+.
            </p>
          </div>
        </div>

        {/* Pros Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOP_PROS.map((pro) => (
            <div 
              key={pro.id}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#219EBC]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Pro Full Photo Header */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#023047]/90 via-[#023047]/20 to-transparent pointer-events-none" />

                  {/* Verified Badge */}
                  <div className="absolute top-3 left-3 bg-[#023047]/85 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8ECAE6]" />
                    <span>ID Verified</span>
                  </div>

                  {/* Hourly Rate */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#023047] text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-xs">
                    ${pro.ratePerHour}/hr
                  </div>

                  {/* Name & Specialty Overlaid */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-extrabold leading-snug">
                      {pro.name}
                    </h3>
                    <p className="text-xs text-[#8ECAE6] font-semibold">
                      {pro.specialty}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 space-y-3">
                  {/* Rating & Badge */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1 font-bold text-[#023047]">
                      <Star className="w-3.5 h-3.5 fill-[#FFB703] text-[#FFB703]" />
                      <span className="tabular-nums">{pro.rating}</span>
                      <span className="text-slate-400 font-normal">({pro.completedJobs} jobs)</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#023047] bg-[#8ECAE6]/30 px-2 py-0.5 rounded-md">
                      {pro.badge}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {pro.bio}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => onSelectProSpecialty(pro.specialty)}
                  className="w-full py-2.5 px-3 text-xs font-bold text-[#023047] hover:text-white bg-slate-100 hover:bg-[#023047] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Book {pro.name.split(' ')[0]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
