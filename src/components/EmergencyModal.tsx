import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Droplets, 
  KeyRound,
  ThermometerSnowflake
} from 'lucide-react';
import { Booking } from '../types/service';
import { saveBooking } from '../utils/storage';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onEmergencyBooked: (booking: Booking) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onEmergencyBooked
}) => {
  if (!isOpen) return null;

  const [issueType, setIssueType] = useState<string>('plumbing');
  const [phone, setPhone] = useState<string>('+1 (555) 389-4920');
  const [address, setAddress] = useState<string>('1244 Parkwood Boulevard');
  const [notes, setNotes] = useState<string>('');
  const [dispatched, setDispatched] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');

  const issues = [
    { id: 'plumbing', label: 'Burst Pipe / Water Leak', icon: Droplets, fee: 79 },
    { id: 'electrical', label: 'Power Spark / MCB Outage', icon: Zap, fee: 69 },
    { id: 'lockout', label: 'Broken Lock / Locked Out', icon: KeyRound, fee: 59 },
    { id: 'ac', label: 'AC Breakdown / Smoking Unit', icon: ThermometerSnowflake, fee: 75 }
  ];

  const selectedIssue = issues.find(i => i.id === issueType) || issues[0];

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `EMERG-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(newId);

    const emergencyBooking: Booking = {
      id: newId,
      serviceId: issueType === 'plumbing' ? 'plumbing' : issueType === 'electrical' ? 'electrician' : issueType === 'lockout' ? 'carpentry' : 'ac-appliances',
      serviceTitle: `Emergency: ${selectedIssue.label}`,
      packageId: 'emergency-callout',
      packageName: '45-Min Priority Dispatch',
      serviceImage: '/src/assets/images/service_plumbing_1791614461545.jpg',
      date: 'Today (Immediate)',
      timeSlot: 'Within 45 Minutes',
      price: selectedIssue.fee,
      discount: 0,
      totalPrice: selectedIssue.fee,
      customerName: 'Emergency Caller',
      phone,
      address: `${address}, ${currentCity}`,
      specialInstructions: notes || 'Urgent 45-minute arrival required',
      paymentMethod: 'pay_after_service',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      proAssigned: {
        name: 'Rapid Response Unit 4',
        phone: '+1 (800) 555-0199',
        rating: 4.98
      }
    };

    saveBooking(emergencyBooking);
    onEmergencyBooked(emergencyBooking);
    setDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Urgent styling */}
        <div className="p-5 bg-[#023047] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FB8500] text-white flex items-center justify-center shadow-xs">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <span>Emergency 45-Min Response</span>
                <span className="text-[10px] bg-red-500 text-white font-black px-2 py-0.5 rounded-full uppercase">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-[#8ECAE6]">
                Guaranteed arrival within 45 mins in {currentCity}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!dispatched ? (
            <form onSubmit={handleDispatch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-2">
                  Select Emergency Situation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {issues.map(iss => {
                    const Icon = iss.icon;
                    const isSelected = issueType === iss.id;
                    return (
                      <button
                        type="button"
                        key={iss.id}
                        onClick={() => setIssueType(iss.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? 'border-[#FB8500] bg-[#FB8500]/10 ring-1 ring-[#FB8500]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FB8500]' : 'text-slate-500'}`} />
                          <span className="text-xs font-black text-[#023047]">${iss.fee}</span>
                        </div>
                        <span className="text-xs font-bold text-[#023047] leading-tight">
                          {iss.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full text-xs font-medium px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FB8500]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Your Address in {currentCity}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street and house / apartment number"
                  required
                  className="w-full text-xs font-medium px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FB8500]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Situation Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Water is leaking rapidly from bathroom ceiling pipe"
                  className="w-full text-xs font-medium p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FB8500]"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FB8500] shrink-0" />
                <span>Our emergency technician on standby will reach your address in ~45 minutes. Pay after work.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FB8500] hover:bg-[#e07700] text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                Dispatch Emergency Pro Now (${selectedIssue.fee})
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-[#023047]">
                Unit Dispatched!
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Rapid Response Unit 4 is en route to <span className="font-bold text-[#023047]">{address}</span>. ETA is under 40 minutes.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border text-xs font-mono font-bold text-[#023047]">
                Reference #{bookingId}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#023047] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
