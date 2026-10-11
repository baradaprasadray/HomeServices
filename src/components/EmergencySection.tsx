import React from 'react';
import { PhoneCall, Clock, ShieldAlert, CheckCircle2, Zap, Droplets, ArrowRight } from 'lucide-react';
import emergencyImg from '../assets/images/emergency_response_team_1791616652460.jpg';

interface EmergencySectionProps {
  currentCity: string;
  onOpenEmergencyModal: () => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({
  currentCity,
  onOpenEmergencyModal
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#023047] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image with Rapid Response Van & Pro */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <img
                src={emergencyImg}
                alt="HS.com Emergency Rapid Response Team and Service Van"
                className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#023047]/80 via-transparent to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-[#FB8500] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>On-Call Units Active in {currentCity}</span>
              </div>

              {/* Bottom ETA pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl text-[#023047] flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FB8500]" />
                  <span className="text-xs font-extrabold">Average Dispatch ETA: 38 Minutes</span>
                </div>
                <span className="text-[10px] font-black uppercase bg-[#219EBC]/15 text-[#219EBC] px-2 py-0.5 rounded">
                  24/7 Priority
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FB8500]/20 border border-[#FB8500]/40 text-[#FFB703] text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Rapid Emergency Response</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Burst pipe? Power sparks? We're at your door in 45 minutes.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              When an urgent home crisis strikes, waiting days for an appointment isn't an option. Our dedicated rapid response fleet in {currentCity} is equipped to isolate leaks, restore electrical circuits, and secure emergency locks immediately.
            </p>

            {/* Emergency Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#8ECAE6]" />
                <span>Water line burst & flooding</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FFB703]" />
                <span>MCB tripping & power outage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8ECAE6]" />
                <span>Front door lock failure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8ECAE6]" />
                <span>AC compressor smoking / failure</span>
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenEmergencyModal}
                className="px-6 py-3.5 bg-[#FB8500] hover:bg-[#e07700] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request 45-Min Emergency Callout</span>
              </button>

              <div className="text-center sm:text-left text-xs text-slate-400">
                Or call toll-free: <span className="font-mono font-bold text-white">1-800-472-HOME</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
