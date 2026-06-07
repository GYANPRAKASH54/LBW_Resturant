"use client";

import { useState } from "react";
import { useApp, MenuItem } from "@/context/AppContext";
import { 
  QrCode, Bell, Coffee, Sparkles, User, Users, Receipt, 
  CreditCard, Smartphone, CheckCircle, HelpCircle, UtensilsCrossed, Trash2, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DineInSection() {
  const {
    activeTable,
    scanTableQR,
    clearTableSession,
    menu,
    dineInCart,
    addDineInCart,
    removeDineInCart,
    clearDineInCart,
    updateDineInQty,
    placeDineInOrder,
    dineInOrders,
    payDineInBill,
    requestService,
    callWaiter
  } = useApp();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [splitCount, setSplitCount] = useState(2);
  const [showPayModal, setShowPayModal] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [selectedPayMethod, setSelectedPayMethod] = useState("");
  const [payingProgress, setPayingProgress] = useState(0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleServiceClick = (type: string) => {
    requestService(type);
    triggerToast(`Service Request Sent: "${type}"`);
  };

  const handleCallWaiter = () => {
    callWaiter();
    triggerToast("Waiter has been called to your table!");
  };

  // Get active menu items for quick add in dine-in
  const quickRecommendations = menu
    .flatMap((cat) => cat.items)
    .filter((item) => item.isPopular)
    .slice(0, 4);

  // Calculate total bill
  const currentOrdersTotal = dineInOrders
    .filter((o) => o.tableId === activeTable && o.status !== "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const handlePaySubmit = () => {
    if (!selectedPayMethod) return;
    setPayingProgress(10);
    
    // Simulate payment loading
    const interval = setInterval(() => {
      setPayingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPaySuccess(true);
          payDineInBill(selectedPayMethod);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const downloadInvoice = () => {
    const invoiceText = `
=============================================
         LOUNGE BEFORE WICKET (LBW)
=============================================
Urja Stadium, Rajbansi Nagar, Patna, 801103
GSTIN: 10AAACL4892J1ZS
Date: ${new Date().toLocaleDateString()}
Table: Table #${activeTable}
=============================================
Itemized Invoice:
${dineInOrders
  .filter((o) => o.tableId === activeTable)
  .flatMap((o) => o.items)
  .map((ci) => `${ci.item.name} x ${ci.quantity} - ₹${parseInt(String(ci.item.price)) * ci.quantity}`)
  .join("\n")}
=============================================
Subtotal: ₹${currentOrdersTotal}
CGST (2.5%): ₹${(currentOrdersTotal * 0.025).toFixed(2)}
SGST (2.5%): ₹${(currentOrdersTotal * 0.025).toFixed(2)}
---------------------------------------------
NET AMOUNT PAID: ₹${(currentOrdersTotal * 1.05).toFixed(2)}
=============================================
Thank you for dining with us! Come back soon.
=============================================
`;
    const blob = new Blob([invoiceText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-Table-${activeTable}-${Date.now()}.txt`;
    link.click();
    triggerToast("GST Invoice downloaded successfully!");
  };

  return (
    <section id="dine-in" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#3a4f8c]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -40, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -40, x: "-50%" }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#070707] text-xs uppercase tracking-widest font-bold px-6 py-3.5 shadow-2xl border border-[#C5A880]/30 flex items-center space-x-2 rounded-none"
            >
              <CheckCircle className="w-4 h-4 text-emerald-950" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Smart Restaurant
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Table <span className="gradient-text-gold">Dine-In System</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Scan your table's QR code to call assistance, view your live order status, split checks, and make direct payments.
          </p>
        </div>

        {/* --- QR TABLE MOCK SELECTOR --- */}
        {activeTable === null ? (
          <div className="glass-card p-10 border border-white/5 text-center max-w-xl mx-auto space-y-8">
            <div className="w-20 h-20 mx-auto rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A880] glow-gold">
              <QrCode className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">Simulate Table QR Scan</h3>
              <p className="text-white/50 text-xs font-light max-w-sm mx-auto">
                Scan the QR code printed on your table. To simulate this feature, select any table below to activate Dine-In Mode.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-sm mx-auto">
              {[1, 2, 4, 7].map((num) => (
                <button
                  key={num}
                  onClick={() => scanTableQR(num)}
                  className="py-3 text-xs font-bold border border-white/10 text-white/80 hover:border-[#C5A880] hover:text-[#C5A880] bg-white/2 transition-colors uppercase tracking-wider"
                >
                  Table #{num}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // --- ACTIVE TABLE INTERFACE ---
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Requests & Cart */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Table Status Bar */}
              <div className="glass-card p-6 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-base font-serif font-bold text-white">
                    Logged in to <span className="text-[#C5A880]">Table #{activeTable}</span>
                  </h3>
                </div>
                <button
                  onClick={clearTableSession}
                  className="text-[10px] uppercase tracking-widest text-white/50 hover:text-rose-500 transition-colors border border-white/10 hover:border-rose-500/30 px-4 py-2"
                >
                  Close Session
                </button>
              </div>

              {/* Service Request Center */}
              <div className="glass-card p-8 border border-white/5 space-y-6">
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Service Request Center</h4>
                  <p className="text-white/40 text-[10px] mt-1 font-light">Need assistance? Tap any quick request below to notify our service team.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    onClick={handleCallWaiter}
                    className="p-4 bg-white/3 border border-white/10 hover:border-[#C5A880] hover:bg-[#C5A880]/5 text-left transition-all group flex flex-col justify-between h-28"
                  >
                    <Bell className="w-5 h-5 text-[#C5A880] group-hover:animate-bounce" />
                    <div>
                      <span className="text-xs text-white font-bold block">Call Waiter</span>
                      <span className="text-[9px] text-white/40">Staff assistance</span>
                    </div>
                  </button>

                  {[
                    { type: "Refill Water", desc: "Drinking water", icon: Coffee },
                    { type: "Extra Plates", desc: "Cutlery & plates", icon: UtensilsCrossed },
                    { type: "Request Bill", desc: "Live check request", icon: Receipt },
                    { type: "Clean Table", desc: "Clear dishes", icon: Sparkles },
                    { type: "Help Request", desc: "General assist", icon: HelpCircle }
                  ].map((req) => (
                    <button
                      key={req.type}
                      onClick={() => handleServiceClick(req.type)}
                      className="p-4 bg-white/3 border border-white/10 hover:border-[#C5A880] hover:bg-[#C5A880]/5 text-left transition-all group flex flex-col justify-between h-28"
                    >
                      <req.icon className="w-5 h-5 text-white/50 group-hover:text-[#C5A880] transition-colors" />
                      <div>
                        <span className="text-xs text-white font-bold block">{req.type}</span>
                        <span className="text-[9px] text-white/40">{req.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dine-In Cart Builder */}
              <div className="glass-card p-8 border border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Add to Table Order</h4>
                    <p className="text-white/40 text-[10px] mt-1 font-light">Add items to send to the kitchen.</p>
                  </div>
                  <span className="text-[10px] tracking-widest font-mono text-white/40">{dineInCart.length} Items Selected</span>
                </div>

                {dineInCart.length > 0 ? (
                  <div className="space-y-4">
                    <div className="border-y border-white/5 py-4 divide-y divide-white/5 max-h-[220px] overflow-y-auto">
                      {dineInCart.map((ci) => (
                        <div key={ci.item.id} className="flex justify-between items-center py-3">
                          <div className="flex items-center space-x-3">
                            <span className={`w-2 h-2 rounded-full ${ci.item.isVeg ? "bg-emerald-500" : "bg-rose-500"}`} />
                            <span className="text-xs text-white font-medium">{ci.item.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center bg-white/5 border border-white/10 p-0.5">
                              <button
                                onClick={() => updateDineInQty(ci.item.id, ci.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-xs font-mono text-white">{ci.quantity}</span>
                              <button
                                onClick={() => updateDineInQty(ci.item.id, ci.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs text-[#C5A880] font-mono w-16 text-right font-bold">
                              ₹{parseInt(String(ci.item.price)) * ci.quantity}
                            </span>
                            <button
                              onClick={() => removeDineInCart(ci.item.id)}
                              className="text-white/40 hover:text-rose-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={placeDineInOrder}
                      className="glow-btn w-full py-4 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] transition-all"
                    >
                      Send Order to Kitchen
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/1 border border-dashed border-white/5">
                    <p className="text-white/40 text-xs">Your order list is empty. Add items from recommendations below or scroll to the digital menu.</p>
                  </div>
                )}

                {/* Recommendations */}
                <div className="pt-4 border-t border-white/5">
                  <h5 className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold mb-4">Quick Recommendations</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickRecommendations.map((item) => (
                      <div key={item.id} className="bg-white/2 border border-white/5 p-4 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-white block">{item.name}</span>
                          <span className="text-xs text-[#C5A880] font-mono">₹{item.price}</span>
                        </div>
                        <button
                          onClick={() => {
                            addDineInCart(item);
                            triggerToast(`Added ${item.name} to list`);
                          }}
                          className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest hover:border-[#C5A880] hover:text-[#C5A880] text-white/80 font-bold transition-all"
                        >
                          Add +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Order status, split bill & payment */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Kitchen Status tracking */}
              <div className="glass-card p-8 border border-white/5 space-y-6">
                <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Kitchen Order Status</h4>
                
                {dineInOrders.filter((o) => o.tableId === activeTable).length > 0 ? (
                  <div className="space-y-4">
                    {dineInOrders
                      .filter((o) => o.tableId === activeTable)
                      .map((order) => (
                        <div key={order.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-white/40 uppercase font-mono font-bold">{order.id}</span>
                            <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 ${
                              order.status === "paid" ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20" :
                              order.status === "served" ? "bg-blue-950 text-blue-400 border border-blue-500/20" :
                              order.status === "preparing" ? "bg-amber-950 text-amber-400 border border-amber-500/20" :
                              "bg-white/5 text-white/60 border border-white/10"
                            }`}>
                              {order.status}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs text-white/60">
                            {order.items.map((ci) => (
                              <div key={ci.item.id} className="flex justify-between">
                                <span>{ci.item.name} <span className="text-white/30">x{ci.quantity}</span></span>
                                <span className="font-mono text-white/70">₹{parseInt(String(ci.item.price)) * ci.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-white/40 text-xs text-center py-4 bg-white/1 border border-dashed border-white/5">
                    No active orders sent yet during this visit.
                  </p>
                )}
              </div>

              {/* Billing System */}
              <div className="glass-card p-8 border border-white/5 space-y-6">
                <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Smart Billing</h4>

                {currentOrdersTotal > 0 ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/50">
                        <span>Table Check Total</span>
                        <span className="font-mono">₹{currentOrdersTotal}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/50 border-b border-white/5 pb-2">
                        <span>GST (5%)</span>
                        <span className="font-mono">₹{(currentOrdersTotal * 0.05).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-base font-serif font-bold text-white">
                        <span>Total Due</span>
                        <span className="text-[#C5A880] font-mono">₹{(currentOrdersTotal * 1.05).toFixed(0)}</span>
                      </div>
                    </div>

                    {/* Split Bill Calculator */}
                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Split Check Among Friends</span>
                      
                      <div className="flex justify-between items-center bg-white/3 border border-white/10 p-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-[#C5A880]" />
                          <span className="text-xs text-white">{splitCount} People</span>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold border border-white/5"
                          >
                            -
                          </button>
                          <button
                            onClick={() => setSplitCount(splitCount + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold border border-white/5"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs bg-[#C5A880]/5 border border-[#C5A880]/20 p-3">
                        <span className="text-white/60">Amount Per Person:</span>
                        <span className="text-[#C5A880] font-mono font-bold">
                          ₹{((currentOrdersTotal * 1.05) / splitCount).toFixed(0)}
                        </span>
                      </div>
                    </div>

                    {/* Direct Pay Action */}
                    <button
                      onClick={() => {
                        setSelectedPayMethod("");
                        setPaySuccess(false);
                        setShowPayModal(true);
                      }}
                      className="glow-btn w-full py-4 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] transition-all flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Payment</span>
                    </button>

                  </div>
                ) : (
                  <p className="text-white/40 text-xs text-center py-4 bg-white/1 border border-dashed border-white/5">
                    Order food to calculate the bill.
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* --- PAYMENT GATEWAY MODAL SIMULATOR --- */}
      <AnimatePresence>
        {showPayModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card max-w-md w-full p-8 border border-white/10 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2">
                  <Receipt className="w-5 h-5 text-[#C5A880]" />
                  <h4 className="text-base font-serif font-bold text-white">Smart Dine-In Checkout</h4>
                </div>
                <button 
                  onClick={() => setShowPayModal(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!paySuccess ? (
                // PAYMENT METHOD SELECTOR
                <div className="space-y-6">
                  <div className="text-center bg-white/2 p-4 border border-white/5 space-y-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Total Payable</span>
                    <h3 className="text-3xl font-mono font-bold text-[#C5A880]">₹{(currentOrdersTotal * 1.05).toFixed(0)}</h3>
                    <p className="text-[9px] text-white/30">Includes 5% Restaurant GST</p>
                  </div>

                  {payingProgress === 0 ? (
                    // OPTIONS
                    <div className="space-y-3">
                      <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold block mb-1">Choose Payment Option</span>
                      
                      {[
                        { id: "upi", name: "UPI Apps (GooglePay, PhonePe, Paytm)", icon: Smartphone },
                        { id: "card", name: "Credit / Debit Card / Netbanking", icon: CreditCard }
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayMethod(method.id)}
                          className={`w-full p-4 border text-xs text-left flex items-center justify-between font-bold transition-all ${
                            selectedPayMethod === method.id
                              ? "border-[#C5A880] bg-[#C5A880]/10 text-white"
                              : "border-white/10 hover:border-white/20 bg-white/2 text-white/70"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="w-5 h-5 text-[#C5A880]" />
                            <span>{method.name}</span>
                          </div>
                        </button>
                      ))}

                      <button
                        onClick={handlePaySubmit}
                        disabled={!selectedPayMethod}
                        className="w-full mt-4 py-4 text-xs font-bold uppercase tracking-widest bg-[#C5A880] disabled:bg-white/5 disabled:text-white/30 text-[#070707] transition-all"
                      >
                        Authorize & Pay
                      </button>
                    </div>
                  ) : (
                    // LOADING PROGRESS
                    <div className="py-8 text-center space-y-4">
                      <span className="text-xs text-white/60 animate-pulse block">Processing Secure Payment...</span>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden max-w-xs mx-auto">
                        <div 
                          className="h-full bg-gradient-to-r from-[#8C6D3E] to-[#C5A880] transition-all duration-300" 
                          style={{ width: `${payingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // SUCCESS SCREEN
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/45 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-1">
                    <h5 className="text-lg font-serif font-bold text-white">Payment Completed Successfully!</h5>
                    <p className="text-white/50 text-xs font-light max-w-xs mx-auto">
                      Receipt sent on your registered phone. Thank you for dining at Lounge Before Wicket.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto pt-4">
                    <button
                      onClick={downloadInvoice}
                      className="w-full py-3 text-xs font-bold uppercase tracking-widest border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#070707] transition-all"
                    >
                      Download GST Invoice
                    </button>
                    <button
                      onClick={() => setShowPayModal(false)}
                      className="w-full py-3 text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                    >
                      Return to Table
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
