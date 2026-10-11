import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Tag,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { ServiceItem, ServicePackage, Booking } from '../types/service';
import { saveBooking } from '../utils/storage';

interface BookingModalProps {
  service: ServiceItem | null;
  initialPackage: ServicePackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (newBooking: Booking) => void;
  currentCity: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  service,
  initialPackage,
  isOpen,
  onClose,
  onBookingComplete,
  currentCity
}) => {
  if (!isOpen || !service) return null;

  // Selected package
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(
    initialPackage || service.packages[0]
  );

  // Steps: 1: Schedule, 2: Address & Details, 3: Review & Payment, 4: Success Confirmation
  const [step, setStep] = useState<number>(1);

  // Scheduling state
  const [selectedDateType, setSelectedDateType] = useState<'today' | 'tomorrow' | 'custom'>('tomorrow');
  const [customDate, setCustomDate] = useState<string>('2026-10-12');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM - 12:00 PM');

  // Customer state
  const [customerName, setCustomerName] = useState<string>('Alex Morgan');
  const [phone, setPhone] = useState<string>('+1 (555) 389-4920');
  const [streetAddress, setStreetAddress] = useState<string>('1244 Parkwood Boulevard, Suite 5B');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Payment & Promo
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pay_after_service' | 'card_online' | 'cash_on_delivery'>('pay_after_service');

  // Completed booking data
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Available slots
  const timeSlots = [
    '08:30 AM - 10:00 AM',
    '10:30 AM - 12:00 PM',
    '01:30 PM - 03:00 PM',
    '03:30 PM - 05:00 PM',
    '05:30 PM - 07:00 PM'
  ];

  // Pricing calculations
  const basePrice = selectedPackage.price;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const safetyAndServiceFee = 3.50;
  const totalPrice = Math.max(0, basePrice - discountAmount + safetyAndServiceFee);

  const getReadableDate = () => {
    if (selectedDateType === 'today') return 'Today, Oct 10';
    if (selectedDateType === 'tomorrow') return 'Tomorrow, Oct 11';
    return customDate;
  };

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'SAVE20') {
      const disc = Math.round(basePrice * 0.2);
      setAppliedPromo({ code, discount: disc });
    } else if (code === 'HSFIRST10') {
      setAppliedPromo({ code, discount: 10 });
    } else {
      setPromoError('Invalid coupon code. Try SAVE20 or HSFIRST10');
    }
  };

  const handleConfirmBooking = () => {
    const bookingId = `HS-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullAddress = `${streetAddress}, ${currentCity}`;

    const newBooking: Booking = {
      id: bookingId,
      serviceId: service.id,
      serviceTitle: service.title,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      serviceImage: service.image,
      date: getReadableDate(),
      timeSlot: selectedTimeSlot,
      price: basePrice,
      discount: discountAmount,
      totalPrice: Number(totalPrice.toFixed(2)),
      promoCode: appliedPromo?.code,
      customerName,
      phone,
      address: fullAddress,
      specialInstructions,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      proAssigned: {
        name: 'David Rodriguez',
        phone: '+1 (555) 441-8920',
        rating: 4.95
      }
    };

    saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    onBookingComplete(newBooking);
    setStep(4);
  };

  const handleDownloadCalendar = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//HS.com//Home Service Booking//EN
BEGIN:VEVENT
SUMMARY:${service.title} - ${selectedPackage.name} (HS.com)
DESCRIPTION:Service booking ID: ${confirmedBooking?.id}\\nAddress: ${confirmedBooking?.address}
LOCATION:${confirmedBooking?.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${confirmedBooking?.id || 'service'}-booking.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#023047] text-white flex items-center justify-center text-xs font-bold">
              HS
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#023047] leading-tight">
                {step === 4 ? 'Booking Confirmed' : `Book ${service.title}`}
              </h3>
              <p className="text-[11px] text-slate-500">
                {step === 1 && 'Step 1 of 3: Select Date & Time'}
                {step === 2 && 'Step 2 of 3: Service Location & Contact'}
                {step === 3 && 'Step 3 of 3: Review & Payment'}
                {step === 4 && 'Your service professional has been scheduled'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar (steps 1 to 3) */}
        {step < 4 && (
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-[#219EBC] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Date & Time Picker */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Selected package pill */}
              <div className="p-3.5 rounded-2xl bg-[#8ECAE6]/15 border border-[#8ECAE6]/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#219EBC]">
                    Chosen Package
                  </div>
                  <div className="text-sm font-extrabold text-[#023047]">
                    {selectedPackage.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    Est. {selectedPackage.duration}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-[#023047] tabular-nums">
                    ${selectedPackage.price}
                  </div>
                  <select
                    value={selectedPackage.id}
                    onChange={(e) => {
                      const found = service.packages.find(p => p.id === e.target.value);
                      if (found) setSelectedPackage(found);
                    }}
                    className="text-[11px] font-bold text-[#219EBC] hover:underline bg-transparent cursor-pointer"
                  >
                    {service.packages.map(p => (
                      <option key={p.id} value={p.id}>Change to {p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-2.5">
                  Select Service Date
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDateType('today')}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedDateType === 'today'
                        ? 'border-[#219EBC] bg-[#219EBC] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] opacity-80">Urgent</div>
                    <div>Today</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDateType('tomorrow')}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedDateType === 'tomorrow'
                        ? 'border-[#219EBC] bg-[#219EBC] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] opacity-80">Recommended</div>
                    <div>Tomorrow</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDateType('custom')}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedDateType === 'custom'
                        ? 'border-[#219EBC] bg-[#219EBC] text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] opacity-80">Custom</div>
                    <div>Pick Date</div>
                  </button>
                </div>

                {selectedDateType === 'custom' && (
                  <div className="mt-3">
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 text-[#023047]"
                      min="2026-10-10"
                    />
                  </div>
                )}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-2.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-[#219EBC] bg-[#8ECAE6]/15 text-[#023047] ring-1 ring-[#219EBC]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#219EBC]' : 'text-slate-400'}`} />
                          <span>{slot}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#219EBC]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Address & Contact Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full text-xs font-medium pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#219EBC]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Phone Number (for technician updates)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs font-medium pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#219EBC]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Street Address & Apartment / Unit
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className="w-full text-xs font-medium pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#219EBC]"
                    required
                  />
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Serving City: <span className="font-bold text-[#023047]">{currentCity}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Special Notes / Entry Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Gate code #4921, ring doorbell twice, watch out for the friendly dog."
                  className="w-full text-xs font-medium p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#219EBC]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Review, Coupon & Payment */}
          {step === 3 && (
            <div className="space-y-5">
              
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                  <div>
                    <span className="font-extrabold text-[#023047]">{service.title}</span>
                    <span className="text-slate-500"> ({selectedPackage.name})</span>
                  </div>
                  <span className="font-bold tabular-nums text-[#023047]">${basePrice}</span>
                </div>

                <div className="py-2.5 space-y-1.5 text-xs text-slate-600 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Scheduled Date & Time</span>
                    <span className="font-semibold text-[#023047]">{getReadableDate()} · {selectedTimeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Service Address</span>
                    <span className="font-semibold text-[#023047] truncate max-w-[220px]">{streetAddress}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Safety & Guarantee Trust Fee</span>
                    <span className="tabular-nums text-[#023047]">${safetyAndServiceFee.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-emerald-600 font-bold">
                      <span>Promo Coupon ({appliedPromo.code})</span>
                      <span className="tabular-nums">-${appliedPromo.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex items-center justify-between text-sm font-extrabold text-[#023047]">
                  <span>Total Amount</span>
                  <span className="text-lg text-[#FB8500] tabular-nums">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo code input */}
              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-1.5">
                  Have a Promo Code?
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Try SAVE20 or HSFIRST10"
                      className="w-full text-xs font-medium pl-8 pr-3 py-2 border border-slate-200 rounded-xl uppercase focus:outline-none focus:ring-1 focus:ring-[#219EBC]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 text-xs font-bold text-[#023047] bg-[#8ECAE6]/30 hover:bg-[#8ECAE6]/50 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-bold">
                    ✓ Code {appliedPromo.code} applied! Saved ${appliedPromo.discount}.
                  </p>
                )}
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-[#023047] uppercase tracking-wider mb-2">
                  Select Payment Method
                </label>
                <div className="space-y-2">
                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'pay_after_service' ? 'border-[#219EBC] bg-[#8ECAE6]/10 ring-1 ring-[#219EBC]' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'pay_after_service'}
                        onChange={() => setPaymentMethod('pay_after_service')}
                        className="text-[#219EBC]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#023047]">Pay After Service (Recommended)</div>
                        <div className="text-[11px] text-slate-500">Pay by card, digital link or cash once job is done</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-[#219EBC] bg-[#8ECAE6]/25 px-2 py-0.5 rounded">
                      Zero Risk
                    </span>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'card_online' ? 'border-[#219EBC] bg-[#8ECAE6]/10 ring-1 ring-[#219EBC]' : 'border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card_online'}
                        onChange={() => setPaymentMethod('card_online')}
                        className="text-[#219EBC]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#023047]">Credit / Debit Card</div>
                        <div className="text-[11px] text-slate-500">Instant demo checkout with Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                    <CreditCard className="w-4 h-4 text-slate-400" />
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-extrabold text-[#023047] mt-1">
                  Booking #{confirmedBooking.id}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  A certified professional has been dispatched for your request. You will receive an SMS reminder 30 mins before arrival.
                </p>
              </div>

              {/* Booking Snapshot Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-[#023047]">{confirmedBooking.serviceTitle} ({confirmedBooking.packageName})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-bold text-[#023047]">{confirmedBooking.date} · {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Pro:</span>
                  <span className="font-bold text-[#219EBC]">David Rodriguez ★ 4.95</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Price:</span>
                  <span className="font-bold text-[#FB8500] tabular-nums">${confirmedBooking.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-bold capitalize">{confirmedBooking.paymentMethod.replace(/_/g, ' ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[#023047] bg-[#8ECAE6]/25 hover:bg-[#8ECAE6]/40 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <CalendarCheck className="w-4 h-4 text-[#219EBC]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#023047] hover:bg-[#219EBC] rounded-xl shadow-xs transition-colors"
                >
                  Done & View My Bookings
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Controls (steps 1 to 3) */}
        {step < 4 && (
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#023047] hover:bg-[#219EBC] rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#FB8500] hover:bg-[#e07700] rounded-xl shadow-sm transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FFB703]" />
                  <span>Confirm Booking (${totalPrice.toFixed(2)})</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
