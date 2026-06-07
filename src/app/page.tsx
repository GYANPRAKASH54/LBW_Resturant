"use client";

import { useState } from "react";
import { Star, Phone, Calendar, ArrowDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProvider } from "@/context/AppContext";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroCanvas from "@/components/HeroCanvas";
import About from "@/components/About";
import SignatureDishes from "@/components/SignatureDishes";
import CinematicFood from "@/components/CinematicFood";
import Experience from "@/components/Experience";
import DineInSection from "@/components/DineInSection";
import DeliverySection from "@/components/DeliverySection";
import LoyaltySection from "@/components/LoyaltySection";
import MenuSection from "@/components/MenuSection";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import AdminDashboard from "@/components/AdminDashboard";
import Location from "@/components/Location";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll handler for hero CTA buttons
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
          {/* Header Navigation */}
          <Header />

          {/* 3D Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Three.js Interactive Background */}
            <HeroCanvas />

            {/* Dark Vignette Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/35 to-black/75 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 py-20 text-center lg:text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Text Info */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Slogan Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center space-x-2 bg-[#C5A880]/10 border border-[#C5A880]/30 px-4 py-2 rounded-none max-w-max mx-auto lg:mx-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase">
                      Urja Stadium • Patna
                    </span>
                  </motion.div>

                  {/* Main Headings */}
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-4xl md:text-7xl font-serif font-bold text-white tracking-wide leading-tight"
                    >
                      Lounge Before <br />
                      <span className="gradient-text-gold">Wicket</span>
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-white/70 max-w-xl text-sm md:text-lg leading-relaxed font-light mx-auto lg:mx-0"
                    >
                      Patna's ultimate luxury multi-cuisine sports lounge and dining room. Experience live match screening on giant projection overlays with world-class clay grills.
                    </motion.p>
                  </div>

                  {/* Rating Showcase Trust badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                  >
                    <div className="flex items-center space-x-1 text-[#FFBF00]">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      <Star className="w-5 h-5 text-white/20" />
                    </div>
                    <div className="text-xs text-white/50 tracking-wider font-light">
                      <span className="text-white font-semibold">4.0 Stars</span> rating based on{" "}
                      <span className="text-white font-semibold">3,285+ Google Reviews</span>
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
                  >
                    <a
                      href="tel:+919117269999"
                      className="w-full sm:w-auto glow-btn flex items-center justify-center space-x-2 bg-[#C5A880] text-[#070707] font-bold text-xs uppercase tracking-widest px-8 py-4.5 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call: 9117269999</span>
                    </a>
                    
                    <a
                      href="#reservation"
                      onClick={(e) => handleScrollToSection(e, "#reservation")}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 border border-white/15 transition-all"
                    >
                      <Calendar className="w-4 h-4 text-[#C5A880]" />
                      <span>Reserve Table</span>
                    </a>

                    <a
                      href="#menu"
                      onClick={(e) => handleScrollToSection(e, "#menu")}
                      className="w-full sm:w-auto text-center text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors py-4 px-6 font-bold"
                    >
                      Explore Menu
                    </a>
                  </motion.div>
                </div>

                {/* Right Area (Glass Cards displaying highlights in 3D-like float) */}
                <div className="lg:col-span-4 hidden lg:block relative h-[450px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute top-10 right-0 w-80 glass-card p-6 border border-white/10 shadow-2xl animate-float-slow bg-[#121212]/70"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
                        <Star className="w-4.5 h-4.5 fill-current" />
                      </div>
                      <h4 className="text-white font-serif font-bold text-sm">Patna's Premium Ground</h4>
                    </div>
                    <p className="text-white/50 text-[11px] leading-relaxed font-light">
                      Direct glass-panel views onto the lush grass outfield of Urja Stadium, creating an unparalleled sports bar dining view.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="absolute bottom-10 left-0 w-80 glass-card p-6 border border-white/10 shadow-2xl glow-gold bg-[#121212]/70"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#3a4f8c]/20 flex items-center justify-center text-[#C5A880]">
                        <Star className="w-4.5 h-4.5 fill-current" />
                      </div>
                      <h4 className="text-white font-serif font-bold text-sm">Authentic Clay Oven</h4>
                    </div>
                    <p className="text-white/50 text-[11px] leading-relaxed font-light">
                      Specialized clay-grill tandoors cooking spicy kebabs and aromatic handi mutton, prepared by top-tier Indian chefs.
                    </p>
                  </motion.div>
                </div>

              </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 space-y-2 pointer-events-none">
              <span className="text-[8px] uppercase tracking-[0.4em] font-semibold text-white/40">Scroll Field</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4 text-[#C5A880]" />
              </motion.div>
            </div>
          </section>

          {/* About Us Section */}
          <About />

          {/* Signature Dishes */}
          <SignatureDishes />

          {/* Cinematic Food Steam Animation */}
          <CinematicFood />

          {/* Experience Section */}
          <Experience />

          {/* Dine-In QR Table Management */}
          <DineInSection />

          {/* Home Delivery Ordering & GPS Tracker */}
          <DeliverySection />

          {/* Loyalty & Scratch Card Gamification */}
          <LoyaltySection />

          {/* Digital Menu Section */}
          <MenuSection />

          {/* Testimonials */}
          <Reviews />

          {/* Photo Gallery */}
          <Gallery />

          {/* Admin Dashboard Controls */}
          <AdminDashboard />

          {/* Location & Directions */}
          <Location />

          {/* Reservation Booking Form */}
          <Reservation />

          {/* Footer details */}
          <Footer />
        </div>
      )}
    </AppProvider>
  );
}
