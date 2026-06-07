"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, UtensilsCrossed, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function MenuSection() {
  const { menu, activeTable, addDineInCart, addDeliveryCart } = useApp();
  const [activeTab, setActiveTab] = useState(menu[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const activeCategory = useMemo(() => {
    return menu.find((cat) => cat.id === activeTab);
  }, [activeTab, menu]);

  // Filter items globally or by active category
  const filteredItems = useMemo(() => {
    if (!activeCategory) return [];

    return activeCategory.items.filter((item) => {
      // 1. Search Query filter
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Veg/Non-Veg Diet filter
      let matchesDiet = true;
      if (dietFilter === "veg") {
        matchesDiet = item.isVeg === true;
      } else if (dietFilter === "non-veg") {
        matchesDiet = item.isVeg === false;
      }

      return matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, dietFilter]);

  return (
    <section id="menu" className="py-24 bg-[#070707] relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating notification alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-[#C5A880] text-[#070707] text-xs uppercase tracking-widest font-bold px-6 py-3 shadow-2xl flex items-center space-x-2"
          >
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Extensive Selections
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Our Digital <span className="gradient-text-gold">Stadium Menu</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Browse our curated cricket-themed selections. Multi-cuisine masterpieces crafted from fresh ingredients, ready to bowl you over.
          </p>
        </div>

        {/* Filter Controls (Search + Diet Toggles) */}
        <div className="glass-card p-6 border border-white/5 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-4 flex items-center text-white/40">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search dish name or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs py-3.5 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/30 transition-all font-medium"
            />
          </div>

          {/* Diet Filters (All / Veg / Non-Veg) */}
          <div className="flex bg-white/5 p-1 border border-white/10 rounded-none w-full md:w-auto">
            <button
              onClick={() => setDietFilter("all")}
              className={`flex-1 md:flex-none text-center px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all ${
                dietFilter === "all"
                  ? "bg-[#C5A880] text-[#070707]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              className={`flex-1 md:flex-none text-center px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 ${
                dietFilter === "veg"
                  ? "bg-emerald-600 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 border border-white" />
              <span>Veg</span>
            </button>
            <button
              onClick={() => setDietFilter("non-veg")}
              className={`flex-1 md:flex-none text-center px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 ${
                dietFilter === "non-veg"
                  ? "bg-rose-700 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span className="w-2.5 h-2.5 bg-rose-500 border border-white flex items-center justify-center rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Scroll Tabs */}
        <div className="overflow-x-auto scrollbar-none pb-4 mb-12 border-b border-white/5 flex space-x-2 scroll-smooth">
          {menu.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSearchQuery(""); // Clear search when changing tabs
              }}
              className={`whitespace-nowrap px-6 py-3.5 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all duration-300 ${
                activeTab === cat.id
                  ? "border-[#C5A880] text-[#C5A880] bg-white/3"
                  : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/1"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        {activeCategory && (
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
              {activeCategory.title}
            </h3>
            <p className="text-xs text-[#C5A880] tracking-widest uppercase mt-1">
              {activeCategory.subtitle}
            </p>
          </div>
        )}

        {/* Menu Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card glass-card-hover p-6 flex flex-col justify-between border border-white/5 relative"
              >
                {/* Popular Badge */}
                {item.isPopular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-[#8C6D3E] to-[#C5A880] text-[#070707] text-[8px] font-bold tracking-widest uppercase px-3 py-1 flex items-center space-x-1 shadow-lg shadow-black/50">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Popular</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top line: Name & Diet Dot */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      {/* Diet Indicator (Veg / Non Veg box dot) */}
                      <div
                        className={`w-4 h-4 border flex items-center justify-center p-0.5 shrink-0 ${
                          item.isVeg ? "border-emerald-600" : "border-rose-600"
                        }`}
                        title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        />
                      </div>
                      <h4 className="text-base font-serif font-semibold text-white tracking-wide leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    {/* Price */}
                    <span className="text-[#C5A880] font-semibold text-sm font-mono whitespace-nowrap ml-4">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-xs leading-relaxed font-light">
                    {item.description}
                  </p>

                  {/* Quick Cart Actions */}
                  <div className="pt-2 flex justify-end">
                    {activeTable !== null ? (
                      <button
                        onClick={() => {
                          addDineInCart(item);
                          triggerNotify(`Added ${item.name} to Table #${activeTable} Order`);
                        }}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#C5A880] hover:text-[#C5A880] text-[10px] uppercase font-bold tracking-widest text-white transition-colors"
                      >
                        <Plus className="w-3 h-3 text-[#C5A880]" />
                        <span>Add to Table</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addDeliveryCart(item);
                          triggerNotify(`Added ${item.name} to Delivery Basket`);
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#C5A880] hover:text-[#C5A880] text-[10px] uppercase font-bold tracking-widest text-white transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Order Delivery</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 glass-card border border-white/5 space-y-4">
            <UtensilsCrossed className="w-12 h-12 text-white/20 mx-auto" />
            <h4 className="text-lg font-serif text-white font-medium">No Dishes Found</h4>
            <p className="text-white/40 text-xs max-w-md mx-auto">
              We couldn't find any items matching your search or filters. Try adjusting your diet selection or clearing the search box.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
