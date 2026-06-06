"use client";

import { useState } from "react";
import { Calendar, User, Phone, Users, Clock, Compass, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2 Guests",
    zone: "Lounge Area",
    requests: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const timeSlots = [
    "11:30 AM", "12:30 PM", "01:30 PM", "02:30 PM",
    "06:30 PM", "07:30 PM", "08:30 PM", "09:30 PM", "10:30 PM"
  ];

  const guestCounts = [
    "1 Guest", "2 Guests", "3-4 Guests", "5-6 Guests", "7-10 Guests", "10+ Guests (Party)"
  ];

  const diningZones = [
    "Lounge Area", "Family Dining", "Live Screening Zone", "Stadium Turf View"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit number";
    }
    if (!formData.date) newErrors.date = "Date selection is required";
    if (!formData.time) newErrors.time = "Time selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Generate a mock booking ID
      const bid = "LBW-" + Math.floor(1000 + Math.random() * 9000);
      setBookingId(bid);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="reservation" className="py-24 md:py-32 bg-[#070707] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#C5A880]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Table Booking
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Secure Your <span className="gradient-text-gold">Grandstand Seat</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Reserve a table in your preferred dining zone. For direct instant booking or bulk parties, call us at +91 91172 69999.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 border border-white/5 relative">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              // BOOKING FORM
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-white/5 border text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors ${
                          errors.name ? "border-rose-600/60" : "border-white/10"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-rose-500 text-[10px]">{errors.name}</p>}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9117269999"
                        className={`w-full bg-white/5 border text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors ${
                          errors.phone ? "border-rose-600/60" : "border-white/10"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-rose-500 text-[10px]">{errors.phone}</p>}
                  </div>

                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      Select Date
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full bg-[#161616] border text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors [color-scheme:dark] ${
                          errors.date ? "border-rose-600/60" : "border-white/10"
                        }`}
                      />
                    </div>
                    {errors.date && <p className="text-rose-500 text-[10px]">{errors.date}</p>}
                  </div>

                  {/* Time Slot Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      Select Time
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
                        <Clock className="w-4 h-4" />
                      </span>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full bg-[#161616] border text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors appearance-none ${
                          errors.time ? "border-rose-600/60" : "border-white/10"
                        }`}
                      >
                        <option value="">Choose Time Slot</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.time && <p className="text-rose-500 text-[10px]">{errors.time}</p>}
                  </div>

                  {/* Guest Count Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      Total Guests
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
                        <Users className="w-4 h-4" />
                      </span>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-[#161616] border border-white/10 text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors appearance-none"
                      >
                        {guestCounts.map((count) => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dining Zone Select */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                      Dining Zone Preference
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-white/30">
                        <Compass className="w-4 h-4" />
                      </span>
                      <select
                        name="zone"
                        value={formData.zone}
                        onChange={handleInputChange}
                        className="w-full bg-[#161616] border border-white/10 text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] transition-colors appearance-none"
                      >
                        {diningZones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="requests"
                    value={formData.requests}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="E.g. anniversary decor, pure veg ingredients, birthday celebration cake..."
                    className="w-full bg-white/5 border border-white/10 text-xs p-4 focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="glow-btn w-full py-4 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] transition-all"
                >
                  Send Booking Request
                </button>
              </motion.form>
            ) : (
              // BOOKING CONFIRMATION
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-8 py-6"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950/45 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-bold">
                    Reservation Requested
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    Request Received Successfully
                  </h3>
                  <p className="text-white/50 text-xs max-w-md mx-auto">
                    We have received your booking details and are checking table availability. We will call you within 15 minutes to confirm.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="glass-card max-w-md mx-auto p-6 text-left border border-white/10 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Booking ID</span>
                    <span className="text-white font-mono font-bold text-sm tracking-wider">{bookingId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-white/40 block">Guest Name</span>
                      <span className="text-white font-medium">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Phone</span>
                      <span className="text-white font-medium">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Date & Time</span>
                      <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Dining Zone</span>
                      <span className="text-white font-medium text-[#C5A880]">{formData.zone}</span>
                    </div>
                  </div>
                </div>

                {/* Direct CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <a
                    href="tel:+919117269999"
                    className="flex-1 py-3.5 text-xs font-bold uppercase tracking-widest border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#070707] transition-all text-center"
                  >
                    Call Now to Confirm
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        date: "",
                        time: "",
                        guests: "2 Guests",
                        zone: "Lounge Area",
                        requests: ""
                      });
                    }}
                    className="flex-1 py-3.5 text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white/80 transition-all border border-white/10"
                  >
                    Book Another Table
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
