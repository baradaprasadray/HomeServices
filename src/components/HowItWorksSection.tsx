import React from 'react';
import { CalendarCheck, ShieldCheck, ThumbsUp, ArrowRight, CheckCircle2 } from 'lucide-react';

import step1Img from '../assets/images/step_booking_1791616716359.jpg';
import step2Img from '../assets/images/step_arrival_1791616727711.jpg';
import step3Img from '../assets/images/step_satisfaction_1791616740161.jpg';

interface HowItWorksSectionProps {
  onExploreServices: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onExploreServices }) => {
  const steps = [
    {
      num: '01',
      title: 'Choose Service & Slot',
      desc: 'Browse 12 certified categories, select your package, and pick a guaranteed arrival slot that fits your schedule.',
      icon: CalendarCheck,
      image: step1Img,
      badge: 'Step 1: Simple Booking'
    },
    {
      num: '02',
      title: 'Certified Pro Arrives',
      desc: 'An insured, background-checked professional arrives equipped with specialized tools and authentic replacement components.',
      icon: ShieldCheck,
      image: step2Img,
      badge: 'Step 2: On-Time Arrival'
    },
    {
      num: '03',
      title: 'Inspect & Pay Later',
      desc: 'Inspect the completed work thoroughly. Pay securely only after 100% satisfaction, backed by our 30-day warranty.',
      icon: ThumbsUp,
      image: step3Img,
      badge: 'Step 3: Quality Guaranteed'
    }
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-[#219EBC] uppercase tracking-wider mb-2">
            Seamless & Transparent
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#023047] tracking-tight">
            How HS.com Works
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Booking home repairs shouldn't feel like a gamble. Experience standard-setting dependability in 3 easy steps.
          </p>
        </div>

        {/* 3 Step Cards with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="group rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#219EBC] transition-all overflow-hidden flex flex-col shadow-xs hover:shadow-xl"
              >
                {/* Step Photographic Card Header */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#023047]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Number Tag */}
                  <div className="absolute top-3 left-3 bg-[#023047]/90 backdrop-blur-xs text-white font-mono text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {step.num}
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-[#8ECAE6]">
                      <Icon className="w-3.5 h-3.5 text-[#FFB703]" />
                      {step.badge}
                    </span>
                  </div>
                </div>

                {/* Step Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#023047] mb-2 group-hover:text-[#219EBC] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#219EBC]">
                    <CheckCircle2 className="w-4 h-4 text-[#219EBC]" />
                    <span>Verified standard at every step</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#023047] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold">Have an urgent repair needed today?</h3>
            <p className="text-xs text-[#8ECAE6] mt-1">Same-day service slots open right now with certified technicians.</p>
          </div>
          <button
            onClick={onExploreServices}
            className="px-6 py-3 bg-[#FB8500] hover:bg-[#e07700] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book Your Service Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
