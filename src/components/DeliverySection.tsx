"use client";

import { useState, useMemo } from "react";
import { useApp, MenuItem } from "@/context/AppContext";
import { 
  ShoppingBag, MapPin, Truck, Phone, Gift, Tag, Trash2, 
  RefreshCw, Map, ShieldCheck, Compass, CheckCircle2, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeliverySection() {
  const {
    menu,
    deliveryCart,
    addDeliveryCart,
    removeDeliveryCart,
    clearDeliveryCart,
    updateDeliveryQty,
    placeDeliveryOrder,
    deliveryOrders
  } = useApp();

  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
    couponCode: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  // Recommendations for Delivery
  const deliveryRecommendations = useMemo(() => {
    return menu
      .flatMap((cat) => cat.items)
      .filter((item) => item.isPopular)
      .slice(4, 8);
  }, [menu]);

  // Calculate order totals
  const subtotal = useMemo(() => {
    return deliveryCart.reduce((total, ci) => {
      let price = 0;
      if (typeof ci.item.price === "number") {
        price = ci.item.price;
      } else {
        const parsed = parseInt(String(ci.item.price).split("/")[0]);
        price = isNaN(parsed) ? 0 : parsed;
      }
      return total + price * ci.quantity;
    }, 0);
  }, [deliveryCart]);

  const discount = useMemo(() => {
    if (couponApplied) {
      return Math.floor(subtotal * 0.15); // 15% discount
    }
    return 0;
  }, [couponApplied, subtotal]);

  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const netTotal = subtotal - discount + deliveryCharge;

  const handleApplyCoupon = () => {
    const code = checkoutDetails.couponCode.toUpperCase();
    if (code === "FREEHIT" || code === "STADIUM15" || code === "LBW15") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCheckoutDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!checkoutDetails.name.trim()) newErrors.name = "Full name is required";
    if (!checkoutDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(checkoutDetails.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!checkoutDetails.address.trim()) newErrors.address = "Delivery address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      placeDeliveryOrder({
        name: checkoutDetails.name,
        phone: checkoutDetails.phone,
        address: checkoutDetails.address,
        paymentMethod: checkoutDetails.paymentMethod,
        couponCode: couponApplied ? checkoutDetails.couponCode : undefined
      });
      // Reset details
      setCheckoutDetails({
        name: "",
        phone: "",
        address: "",
        paymentMethod: "cod",
        couponCode: ""
      });
      setCouponApplied(false);
    }
  };

  const handleReorder = (order: typeof deliveryOrders[0]) => {
    clearDeliveryCart();
    order.items.forEach((ci) => {
      // Re-add to cart
      addDeliveryCart(ci.item);
    });
    // Jump to form
    const formElement = document.querySelector("#delivery-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="delivery" className="py-24 bg-[#070707] relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Home Ground Delivery
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Online Food <span className="gradient-text-gold">Delivery Platform</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Order fresh clay-grills, noodles, and drinks. Real-time GPS rider tracking from Urja Stadium straight to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form & Recommendations or active tracker */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Tracking Widget (if active orders exist) */}
            {deliveryOrders.length > 0 && (
              <div className="glass-card p-8 border border-white/5 space-y-6 glow-gold">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-[#C5A880]" />
                    <h3 className="text-base font-serif font-bold text-white">Active Order Tracker</h3>
                  </div>
                  <span className="text-xs font-mono text-[#C5A880] font-bold">{deliveryOrders[0].id}</span>
                </div>

                {/* Progress Status Bar */}
                <div className="relative pt-4 pb-8">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                  <div 
                    className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-[#8C6D3E] to-[#C5A880] -translate-y-1/2 z-0 transition-all duration-1000" 
                    style={{ 
                      width: 
                        deliveryOrders[0].status === "placed" ? "10%" :
                        deliveryOrders[0].status === "preparing" ? "45%" :
                        deliveryOrders[0].status === "out-for-delivery" ? "75%" : "100%"
                    }}
                  />

                  {/* Status Steps */}
                  <div className="relative z-10 flex justify-between">
                    {[
                      { status: "placed", label: "Placed" },
                      { status: "preparing", label: "Preparing" },
                      { status: "out-for-delivery", label: "In Transit" },
                      { status: "delivered", label: "Delivered" }
                    ].map((step, i) => {
                      const isCompleted = 
                        (step.status === "placed") ||
                        (step.status === "preparing" && deliveryOrders[0].status !== "placed") ||
                        (step.status === "out-for-delivery" && (deliveryOrders[0].status === "out-for-delivery" || deliveryOrders[0].status === "delivered")) ||
                        (step.status === "delivered" && deliveryOrders[0].status === "delivered");
                      
                      const isActive = deliveryOrders[0].status === step.status;

                      return (
                        <div key={step.status} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${
                            isActive ? "bg-[#C5A880] text-[#070707] border-[#C5A880]" :
                            isCompleted ? "bg-[#8C6D3E] text-white border-[#8C6D3E]" :
                            "bg-[#121212] text-white/30 border-white/10"
                          }`}>
                            {i + 1}
                          </div>
                          <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${
                            isActive ? "text-[#C5A880]" : "text-white/40"
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* GPS Mock Map Visualizer */}
                {deliveryOrders[0].status !== "delivered" && (
                  <div className="relative h-48 bg-white/2 border border-white/5 overflow-hidden flex items-center justify-center">
                    <Map className="absolute inset-0 w-full h-full text-white/5 opacity-10 object-cover" />
                    
                    <div className="text-center relative z-10 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">Simulated Rider Location</span>
                      
                      {/* Rider Details */}
                      <div className="flex justify-center items-center space-x-3 text-white/70">
                        <Truck className="w-5 h-5 text-[#C5A880] animate-bounce" />
                        <span className="text-xs font-semibold">Amit Kumar is on his way</span>
                      </div>

                      <div className="inline-flex items-center space-x-6 text-[10px] bg-white/5 border border-white/10 px-4 py-2 text-white/60">
                        <span>ETA: <strong className="text-white font-mono">{deliveryOrders[0].eta}</strong></span>
                        <span>Distance: <strong className="text-white font-mono">2.8 km away</strong></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Delivery Checkout Form */}
            <div id="delivery-form" className="glass-card p-8 border border-white/5 space-y-6">
              <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Delivery Details</h4>
              
              {deliveryCart.length > 0 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">Receiver Name</label>
                      <input
                        type="text"
                        name="name"
                        value={checkoutDetails.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-white/5 border text-xs py-3.5 px-4 focus:outline-none focus:border-[#C5A880] transition-colors ${
                          errors.name ? "border-rose-600/60" : "border-white/10"
                        }`}
                      />
                      {errors.name && <p className="text-rose-500 text-[10px]">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">Contact Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={checkoutDetails.phone}
                        onChange={handleInputChange}
                        placeholder="9117269999"
                        className={`w-full bg-white/5 border text-xs py-3.5 px-4 focus:outline-none focus:border-[#C5A880] transition-colors ${
                          errors.phone ? "border-rose-600/60" : "border-white/10"
                        }`}
                      />
                      {errors.phone && <p className="text-rose-500 text-[10px]">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">Full Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={checkoutDetails.address}
                      onChange={handleInputChange}
                      placeholder="Apartment #, Street name, Rajbansi Nagar, Patna"
                      className={`w-full bg-white/5 border text-xs py-3.5 px-4 focus:outline-none focus:border-[#C5A880] transition-colors ${
                        errors.address ? "border-rose-600/60" : "border-white/10"
                      }`}
                    />
                    {errors.address && <p className="text-rose-500 text-[10px]">{errors.address}</p>}
                  </div>

                  {/* Pay Method & Coupon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={checkoutDetails.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full bg-[#121212] border border-white/10 text-xs py-3.5 px-4 focus:outline-none focus:border-[#C5A880] transition-colors"
                      >
                        <option value="cod">Cash on Delivery</option>
                        <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                        <option value="card">Credit / Debit Card</option>
                      </select>
                    </div>

                    {/* Promo Coupon */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block">Promo Code</label>
                      <div className="flex">
                        <input
                          type="text"
                          name="couponCode"
                          value={checkoutDetails.couponCode}
                          onChange={handleInputChange}
                          placeholder="E.g., FREEHIT"
                          className="flex-1 bg-white/5 border border-white/10 text-xs py-3.5 px-4 focus:outline-none focus:border-[#C5A880] transition-colors uppercase"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 bg-white/5 hover:bg-white/10 border-y border-r border-white/10 text-xs uppercase tracking-widest text-[#C5A880] font-bold"
                        >
                          Apply
                        </button>
                      </div>
                      {couponApplied && <p className="text-emerald-500 text-[10px]">15% Discount Applied!</p>}
                      {couponError && <p className="text-rose-500 text-[10px]">Invalid Promo Code</p>}
                    </div>
                  </div>

                  {/* Submit Order */}
                  <button
                    type="submit"
                    className="glow-btn w-full py-4 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] transition-all"
                  >
                    Place Delivery Order (₹{netTotal})
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 bg-white/1 border border-dashed border-white/5">
                  <p className="text-white/40 text-xs">Your delivery basket is empty. Select items to order below.</p>
                </div>
              )}
            </div>

            {/* Previous Orders History */}
            {deliveryOrders.length > 0 && (
              <div className="glass-card p-8 border border-white/5 space-y-6">
                <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Order History</h4>
                
                <div className="space-y-4">
                  {deliveryOrders.map((order) => (
                    <div key={order.id} className="bg-white/2 border border-white/5 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xs font-bold text-white font-mono">{order.id}</span>
                          <span className="text-[10px] text-white/40">{order.timestamp}</span>
                        </div>
                        <p className="text-white/50 text-[11px] mt-1 leading-snug">
                          {order.items.map((ci) => `${ci.item.name} x${ci.quantity}`).join(", ")}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-[#C5A880] font-mono font-bold">₹{order.total}</span>
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest hover:border-[#C5A880] hover:text-[#C5A880] text-white transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reorder</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Checkout summary & recommendations */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Cart summary */}
            <div className="glass-card p-8 border border-white/5 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Delivery Basket</h3>
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
              </div>

              {deliveryCart.length > 0 ? (
                <div className="space-y-4">
                  <div className="divide-y divide-white/5 border-b border-white/5 max-h-[200px] overflow-y-auto pr-1">
                    {deliveryCart.map((ci) => (
                      <div key={ci.item.id} className="flex justify-between items-center py-3.5">
                        <div>
                          <span className="text-xs font-bold text-white block leading-snug">{ci.item.name}</span>
                          <span className="text-[10px] text-white/40">₹{parseInt(String(ci.item.price))} each</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center bg-white/5 border border-white/10 p-0.5">
                            <button
                              onClick={() => updateDeliveryQty(ci.item.id, ci.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-mono text-white">{ci.quantity}</span>
                            <button
                              onClick={() => updateDeliveryQty(ci.item.id, ci.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeDeliveryCart(ci.item.id)}
                            className="text-white/30 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-white/50">
                      <span>Order Subtotal</span>
                      <span className="font-mono">₹{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-500">
                        <span>Coupon Discount (15%)</span>
                        <span className="font-mono">-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/50">
                      <span>Delivery Charge</span>
                      <span className="font-mono">₹{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-bold text-white border-t border-white/5 pt-3">
                      <span>Grand Total</span>
                      <span className="text-[#C5A880] font-mono">₹{netTotal}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-white/40 text-xs text-center py-6">Your basket is empty. Browse recommendations below or choose from the main menu.</p>
              )}
            </div>

            {/* Delivery Recommendations */}
            <div className="glass-card p-8 border border-white/5 space-y-6">
              <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Frequently Added</h4>
              
              <div className="space-y-4">
                {deliveryRecommendations.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-white block">{item.name}</span>
                      <span className="text-xs text-[#C5A880] font-mono">₹{item.price}</span>
                    </div>
                    <button
                      onClick={() => addDeliveryCart(item)}
                      className="px-3 py-1 bg-white/5 border border-white/10 hover:border-[#C5A880] text-[9px] uppercase tracking-widest font-bold text-white transition-colors"
                    >
                      Add +
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
