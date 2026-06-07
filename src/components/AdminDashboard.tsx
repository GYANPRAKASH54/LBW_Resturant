"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Bell, Truck, Edit3, BarChart3, MessageSquare, Check, AlertCircle, 
  Search, RefreshCw, DollarSign, Users, ShoppingBag, ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const {
    menu,
    updateMenuItemPrice,
    serviceRequests,
    adminResolveRequest,
    deliveryOrders,
    adminUpdateDeliveryStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<"requests" | "delivery" | "menu" | "analytics">("requests");
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(menu[0].id);
  const [editingPrice, setEditingPrice] = useState<Record<string, string>>({});
  
  // Marketing states
  const [smsText, setSmsText] = useState("");
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const pendingRequests = serviceRequests.filter((r) => r.status === "pending");
  const activeDeliveries = deliveryOrders.filter((o) => o.status !== "delivered");

  const handlePriceSave = (catId: string, itemId: string) => {
    const newPrice = parseFloat(editingPrice[itemId]);
    if (!isNaN(newPrice) && newPrice > 0) {
      updateMenuItemPrice(catId, itemId, newPrice);
      setEditingPrice((prev) => {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      });
      triggerAlert("Price updated successfully!");
    }
  };

  const triggerAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  const handleSendMarketing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsText.trim()) return;
    triggerAlert(`Campaign broadcast sent successfully to 3,285+ registered customers via WhatsApp & Email!`);
    setSmsText("");
  };

  return (
    <section id="admin" className="py-24 bg-[#070707] relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3a4f8c]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Toast Alert */}
        {alertMsg && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#070707] text-xs uppercase tracking-widest font-bold px-6 py-3.5 shadow-2xl border border-[#C5A880]/30 flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-950" />
            <span>{alertMsg}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Management Control Room
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Restaurant <span className="gradient-text-gold">Admin Console</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Monitor active table service requests, update menu pricing in real-time, trace delivery riders, and dispatch campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Dashboard Menu tabs */}
          <div className="lg:col-span-3 glass-card p-6 border border-white/5 h-fit divide-y divide-white/5">
            <div className="pb-4 space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Lounge Operations</span>
              <h4 className="text-xs text-white/50">Urja Stadium Patna Branch</h4>
            </div>

            <div className="pt-4 flex flex-col space-y-1.5">
              {[
                { id: "requests", label: "Dine-In Requests", badge: pendingRequests.length, icon: Bell },
                { id: "delivery", label: "Delivery Orders", badge: activeDeliveries.length, icon: Truck },
                { id: "menu", label: "Menu Management", icon: Edit3 },
                { id: "analytics", label: "Analytics & Marketing", icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-3 text-xs uppercase tracking-widest font-bold flex justify-between items-center transition-all ${
                    activeTab === tab.id
                      ? "bg-[#C5A880] text-[#070707]"
                      : "text-white/60 hover:text-white hover:bg-white/3"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="w-4.5 h-4.5" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                      activeTab === tab.id ? "bg-[#070707] text-[#C5A880]" : "bg-rose-950 text-rose-400 border border-rose-500/20"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Tab View Panels */}
          <div className="lg:col-span-9 glass-card p-8 border border-white/5 min-h-[500px]">
            
            {/* 1. DINE-IN SERVICE REQUEST PANEL */}
            {activeTab === "requests" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">Live Dine-In Service Board</h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Real-time Table Callouts</span>
                </div>

                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((req) => (
                      <div key={req.id} className="bg-white/2 border border-white/5 p-5 flex justify-between items-center transition-all hover:bg-white/3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-bold text-white">Table #{req.tableId}</span>
                            <span className="text-[10px] text-white/40 font-mono">{req.timestamp}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                            <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                            <span>{req.type}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => adminResolveRequest(req.id)}
                          className="px-4 py-2 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 bg-emerald-950/20 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center space-x-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/1 border border-dashed border-white/5">
                    <p className="text-white/40 text-xs">No pending table requests. All tables are fully served!</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. DELIVERY ORDERS PANEL */}
            {activeTab === "delivery" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">Home Delivery Dispatch</h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Track & Prepare Orders</span>
                </div>

                {activeDeliveries.length > 0 ? (
                  <div className="space-y-6">
                    {activeDeliveries.map((order) => (
                      <div key={order.id} className="bg-white/2 border border-white/5 p-6 space-y-4">
                        <div className="flex justify-between items-start border-b border-white/5 pb-3">
                          <div>
                            <span className="text-xs font-bold text-white font-mono">{order.id}</span>
                            <div className="text-[10px] text-white/50 mt-1 leading-snug">
                              <strong>Client:</strong> {order.name} ({order.phone}) <br />
                              <strong>Address:</strong> {order.address}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-[#C5A880] font-mono font-bold block">₹{order.total}</span>
                            <span className="text-[9px] uppercase text-white/40 font-mono font-semibold">{order.paymentMethod}</span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="text-xs text-white/60 space-y-1">
                          {order.items.map((ci) => (
                            <div key={ci.item.id} className="flex justify-between">
                              <span>{ci.item.name} <span className="text-white/30">x{ci.quantity}</span></span>
                              <span className="font-mono">₹{parseInt(String(ci.item.price)) * ci.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Status Pipeline Controls */}
                        <div className="flex flex-wrap gap-2.5 pt-3 border-t border-white/5 items-center justify-between">
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Advance order stage:</span>
                          
                          <div className="flex gap-2">
                            {order.status === "placed" && (
                              <button
                                onClick={() => adminUpdateDeliveryStatus(order.id, "preparing")}
                                className="px-4 py-2 border border-amber-500/30 text-amber-400 bg-amber-950/20 text-[10px] uppercase font-bold tracking-widest hover:border-amber-400"
                              >
                                Set Preparing
                              </button>
                            )}
                            {order.status === "preparing" && (
                              <button
                                onClick={() => adminUpdateDeliveryStatus(order.id, "out-for-delivery")}
                                className="px-4 py-2 border border-blue-500/30 text-blue-400 bg-blue-950/20 text-[10px] uppercase font-bold tracking-widest hover:border-blue-400"
                              >
                                Dispatch Rider
                              </button>
                            )}
                            {order.status === "out-for-delivery" && (
                              <button
                                onClick={() => adminUpdateDeliveryStatus(order.id, "delivered")}
                                className="px-4 py-2 border border-emerald-500/30 text-emerald-400 bg-emerald-950/20 text-[10px] uppercase font-bold tracking-widest hover:border-emerald-400"
                              >
                                Mark Delivered
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/1 border border-dashed border-white/5">
                    <p className="text-white/40 text-xs">No active delivery orders pending dispatch.</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. MENU MANAGEMENT PANEL */}
            {activeTab === "menu" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">Live Price Modifier</h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Real-time Updates</span>
                </div>

                {/* Categories & Search */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex overflow-x-auto gap-1.5 w-full sm:w-auto pb-2 sm:pb-0">
                    {menu.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-[#C5A880] text-[#070707]"
                            : "bg-white/5 border border-white/10 text-white hover:border-[#C5A880]"
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  {/* Search */}
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search menu..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-xs py-2.5 pl-9 pr-4 text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Items Price List */}
                <div className="border-t border-white/5 pt-4 divide-y divide-white/5 max-h-[300px] overflow-y-auto">
                  {menu
                    .find((cat) => cat.id === selectedCategory)
                    ?.items.filter((item) => item.name.toLowerCase().includes(menuSearch.toLowerCase()))
                    .map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-3">
                        <span className="text-xs text-white font-medium">{item.name}</span>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] text-white/40 font-mono">Current: ₹{item.price}</span>
                          
                          {/* Price input */}
                          <input
                            type="number"
                            placeholder="New Price"
                            value={editingPrice[item.id] || ""}
                            onChange={(e) =>
                              setEditingPrice((prev) => ({ ...prev, [item.id]: e.target.value }))
                            }
                            className="w-20 bg-white/5 border border-white/10 text-xs py-1.5 px-2.5 text-center text-white focus:outline-none focus:border-[#C5A880]"
                          />
                          
                          <button
                            onClick={() => handlePriceSave(selectedCategory, item.id)}
                            disabled={!editingPrice[item.id]}
                            className="px-3 py-1.5 bg-emerald-600 disabled:bg-white/5 disabled:text-white/30 text-white font-bold text-[9px] uppercase tracking-widest transition-all"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 4. ANALYTICS & MARKETING PANEL */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">Revenue & Bulk Campaigns</h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Growth Engine</span>
                </div>

                {/* Cards metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Today's Net Revenue", value: "₹24,850", diff: "+12.4% vs yesterday", icon: DollarSign },
                    { label: "Active Dine-In Guests", value: "84 Guests", diff: "Over 14 active tables", icon: Users },
                    { label: "Delivery Orders Today", value: "58 Deliveries", diff: "Completed with average 35m", icon: ShoppingBag }
                  ].map((metric) => (
                    <div key={metric.label} className="bg-white/2 border border-white/5 p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase text-white/40 tracking-wider font-semibold">{metric.label}</span>
                        <metric.icon className="w-5 h-5 text-[#C5A880]" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-mono font-bold text-white">{metric.value}</h4>
                        <span className="text-[9px] text-emerald-400 flex items-center mt-1">
                          <ArrowUpRight className="w-3 h-3 mr-0.5" />
                          <span>{metric.diff}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Marketing broadcast console */}
                <div className="border-t border-white/5 pt-8 space-y-4">
                  <h4 className="text-sm uppercase tracking-widest text-[#C5A880] font-bold">Dispatch WhatsApp & Email Campaign</h4>
                  <p className="text-white/40 text-[10px] font-light leading-snug">Notify all 3,285+ registered customers with promotions or live screening alerts immediately.</p>
                  
                  <form onSubmit={handleSendMarketing} className="space-y-4">
                    <textarea
                      rows={3}
                      value={smsText}
                      onChange={(e) => setSmsText(e.target.value)}
                      placeholder="E.g., Match started! Get 15% off on all Matka Mutton handis. Use code FREEHIT on table QR scan or delivery order. Book your seats now at Urja Stadium!"
                      className="w-full bg-white/5 border border-white/10 text-xs p-4 focus:outline-none focus:border-[#C5A880] resize-none"
                    />
                    
                    <button
                      type="submit"
                      disabled={!smsText.trim()}
                      className="glow-btn px-6 py-3.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] disabled:from-white/5 disabled:to-white/5 disabled:text-white/30 transition-all flex items-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Campaign Blast</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
