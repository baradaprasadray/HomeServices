import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  FileText,
  UserCheck
} from 'lucide-react';
import { Booking } from '../types/service';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onRescheduleBooking: (id: string, date: string, time: string) => void;
  onBookNewService: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onRescheduleBooking,
  onBookNewService
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('Tomorrow, Oct 11');
  const [rescheduleSlot, setRescheduleSlot] = useState<string>('02:00 PM - 03:30 PM');
  const [viewingReceipt, setViewingReceipt] = useState<Booking | null>(null);

  const filtered = bookings.filter(b => {
    if (activeTab === 'active') return b.status === 'confirmed' || b.status === 'in_progress';
    if (activeTab === 'completed') return b.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
            <Clock className="w-3 h-3 text-sky-600" />
            <span>In Progress</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            <span>Completed</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/70">
          <div>
            <h3 className="text-base font-extrabold text-[#023047]">
              My Bookings & Orders
            </h3>
            <p className="text-xs text-slate-500">
              Manage your upcoming visits, past records & invoices
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-[#023047] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'active'
                ? 'bg-[#023047] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Upcoming / Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'completed'
                ? 'bg-[#023047] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Bookings List Area */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white shadow-xs space-y-3 transition-all"
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      #{item.id}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                  <span className="text-sm font-extrabold text-[#023047] tabular-nums">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Service info */}
                <div>
                  <h4 className="text-sm font-extrabold text-[#023047]">
                    {item.serviceTitle}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Package: {item.packageName}
                  </p>
                </div>

                {/* Date & Address details */}
                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#219EBC]" />
                    <span>{item.date} · {item.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#219EBC]" />
                    <span className="truncate">{item.address}</span>
                  </div>
                  {item.proAssigned && (
                    <div className="flex items-center gap-2 text-slate-700 font-semibold pt-1 border-t border-slate-200/50">
                      <UserCheck className="w-3.5 h-3.5 text-[#023047]" />
                      <span>Assigned Pro: {item.proAssigned.name} ({item.proAssigned.phone})</span>
                    </div>
                  )}
                </div>

                {/* Reschedule inline drawer if active */}
                {reschedulingId === item.id && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs">
                    <div className="font-bold text-[#023047]">Choose New Date & Slot:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs"
                      >
                        <option value="Tomorrow, Oct 11">Tomorrow, Oct 11</option>
                        <option value="Monday, Oct 12">Monday, Oct 12</option>
                        <option value="Tuesday, Oct 13">Tuesday, Oct 13</option>
                      </select>
                      <select
                        value={rescheduleSlot}
                        onChange={(e) => setRescheduleSlot(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs"
                      >
                        <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM</option>
                        <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                        <option value="05:00 PM - 06:30 PM">05:00 PM - 06:30 PM</option>
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        onClick={() => setReschedulingId(null)}
                        className="px-2.5 py-1 text-slate-600 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onRescheduleBooking(item.id, rescheduleDate, rescheduleSlot);
                          setReschedulingId(null);
                        }}
                        className="px-3 py-1 bg-[#219EBC] text-white font-bold rounded-md"
                      >
                        Save New Time
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => setViewingReceipt(item)}
                    className="flex items-center gap-1 font-semibold text-[#023047] hover:text-[#219EBC]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {item.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => setReschedulingId(reschedulingId === item.id ? null : item.id)}
                          className="px-2.5 py-1 text-slate-600 hover:text-[#023047] font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this booking?')) {
                              onCancelBooking(item.id);
                            }
                          }}
                          className="px-2.5 py-1 text-rose-600 hover:text-rose-700 font-semibold border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {item.status === 'completed' && (
                      <span className="text-[11px] font-bold text-slate-400">
                        Warranty Active (30 days)
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-extrabold text-[#023047]">No bookings found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                You haven't scheduled any service in this category yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNewService();
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#023047] hover:bg-[#219EBC] rounded-xl transition-colors"
              >
                Browse Services & Book
              </button>
            </div>
          )}
        </div>

        {/* Modal for Invoice / Receipt */}
        {viewingReceipt && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="font-extrabold text-base text-[#023047]">Service Invoice Receipt</h4>
                <button onClick={() => setViewingReceipt(null)} className="p-1 hover:bg-slate-100 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Invoice ID:</span>
                  <span className="font-mono font-bold text-[#023047]">INV-{viewingReceipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold">{viewingReceipt.serviceTitle} ({viewingReceipt.packageName})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span>{viewingReceipt.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span>{viewingReceipt.address}</span>
                </div>
                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Base Labor & Service:</span>
                    <span>${viewingReceipt.price.toFixed(2)}</span>
                  </div>
                  {viewingReceipt.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount Coupon:</span>
                      <span>-${viewingReceipt.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-extrabold text-sm text-[#023047] border-t pt-1">
                    <span>Total Paid / Due:</span>
                    <span className="text-[#FB8500]">${viewingReceipt.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingReceipt(null)}
                className="w-full py-2 bg-[#023047] text-white text-xs font-bold rounded-xl"
              >
                Close Receipt
              </button>
            </div>
          </div>
        )}

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onBookNewService();
            }}
            className="w-full py-2.5 text-xs font-bold text-white bg-[#023047] hover:bg-[#219EBC] rounded-xl transition-colors text-center"
          >
            Schedule Another Service
          </button>
        </div>

      </div>
    </div>
  );
};
