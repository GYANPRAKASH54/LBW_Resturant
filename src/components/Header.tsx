"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Dine-In", href: "#dine-in" },
  { name: "Delivery", href: "#delivery" },
  { name: "Rewards", href: "#loyalty" },
  { name: "Admin", href: "#admin" },
  { name: "Reviews", href: "#reviews" }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme, activeTable } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-nav py-4 shadow-lg shadow-black/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex flex-col select-none group"
          >
            <span className="text-xl md:text-2xl font-serif tracking-widest font-bold text-white group-hover:text-[#C5A880] transition-colors duration-300">
              LBW
            </span>
            <span className="text-[8px] tracking-[0.4em] text-[#C5A880] -mt-1 uppercase">
              Lounge Before Wicket
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-white/80 hover:text-[#C5A880] hover:glow-text-gold transition-all duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Active Table indicator */}
            {activeTable !== null && (
              <div className="flex items-center space-x-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Table #{activeTable}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-white/10 text-white/70 hover:text-[#C5A880] transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="tel:+919117269999"
              className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors duration-300 px-3 py-2 font-semibold"
            >
              <Phone className="w-4.5 h-4.5" />
              <span>9117269999</span>
            </a>
            
            <a
              href="#reservation"
              onClick={(e) => handleLinkClick(e, "#reservation")}
              className="glow-btn flex items-center space-x-2 text-xs uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] font-bold px-5 py-3 rounded-none border border-[#C5A880]/30 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </a>
          </div>

          {/* Mobile Actions (Menu & Theme) */}
          <div className="lg:hidden flex items-center space-x-4">
            
            {/* Active Table indicator Mobile */}
            {activeTable !== null && (
              <div className="border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider text-emerald-400">
                <span>T#{activeTable}</span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-1.5 border border-white/10 text-white"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#C5A880] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-30 lg:hidden flex flex-col bg-[#070707]/98 backdrop-blur-xl pt-24 pb-8 px-8 border-b border-white/5"
          >
            <div className="flex flex-col space-y-5 items-center text-center my-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base uppercase tracking-[0.2em] text-white/80 hover:text-[#C5A880] transition-colors duration-300 font-serif"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col space-y-4 items-center mt-auto">
              <a
                href="tel:+919117269999"
                className="flex items-center space-x-2 text-sm uppercase tracking-widest text-[#C5A880]"
              >
                <Phone className="w-4 h-4" />
                <span>+91 91172 69999</span>
              </a>
              <a
                href="#reservation"
                onClick={(e) => handleLinkClick(e, "#reservation")}
                className="w-full text-center text-sm uppercase tracking-widest bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#8C6D3E] text-[#070707] font-bold py-4 rounded-none border border-[#C5A880]/30"
              >
                Book Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
