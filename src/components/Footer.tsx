import React from 'react';
import { Wrench, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { SERVICES, CITIES } from '../data/servicesData';

interface FooterProps {
  onSelectService: (serviceId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectService,
  onScrollToSection,
  onOpenEmergency
}) => {
  return (
    <footer className="bg-[#023047] text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Wrench className="w-5 h-5 text-[#FFB703]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                HS<span className="text-[#FB8500]">.com</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              The premier on-demand home service booking network. Connecting homeowners with background-checked plumbers, electricians, carpenters, cleaners, and renovation specialists.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 max-w-sm flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#8ECAE6] shrink-0" />
              <div className="text-[11px] text-slate-300">
                <strong className="text-white">30-Day Workmanship Warranty:</strong> If any service issue persists within 30 days, we fix it at no additional cost.
              </div>
            </div>
          </div>

          {/* Services Column 1 */}
          <div>
            <h4 className="text-xs font-bold text-[#8ECAE6] uppercase tracking-wider mb-3">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {SERVICES.slice(0, 6).map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.id)}
                    className="hover:text-[#FFB703] transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-[#8ECAE6] uppercase tracking-wider mb-3">
              More Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {SERVICES.slice(6, 12).map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.id)}
                    className="hover:text-[#FFB703] transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold text-[#8ECAE6] uppercase tracking-wider mb-3">
              Helpline & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FB8500]" />
                <span className="font-mono">1-800-472-HOME</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#219EBC]" />
                <span>support@hs.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8ECAE6]" />
                <span>Available nationwide across 8+ metros</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenEmergency}
                  className="w-full py-2 px-3 bg-[#FB8500] hover:bg-[#e07700] text-white font-bold rounded-lg text-[11px] transition-colors"
                >
                  Emergency 45-Min Callout
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Metro cities served strip */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white">Serving:</span>
            {CITIES.map((c, idx) => (
              <span key={c} className="hover:text-white transition-colors">
                {c}{idx < CITIES.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} HS.com - Home Service Network. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span className="text-[#8ECAE6]">Frontend Demo Platform</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
