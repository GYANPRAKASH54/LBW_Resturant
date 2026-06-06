"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  {
    id: 1,
    title: "Premium Lounge & Gold Seating",
    category: "Ambiance",
    image: "/stadium_lounge_bg.png"
  },
  {
    id: 2,
    title: "Clay Oven Grilled Chicken Tandoori",
    category: "Signature Dish",
    image: "/stadium_lounge_bg.png" // Using the premium visual we generated
  },
  {
    id: 3,
    title: "Giant Screens Live Match Screening",
    category: "Experience",
    image: "/stadium_lounge_bg.png"
  },
  {
    id: 4,
    title: "Aromatic Handi Matka Biryani",
    category: "Signature Dish",
    image: "/stadium_lounge_bg.png"
  },
  {
    id: 5,
    title: "Premium Mint Mojitos & Coolers",
    category: "Beverage",
    image: "/stadium_lounge_bg.png"
  },
  {
    id: 6,
    title: "Sports Screening Crowd Cheer",
    category: "Experience",
    image: "/stadium_lounge_bg.png"
  }
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Visual Ambiance
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Captured <span className="gradient-text-gold">Moments</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Step inside our premium field. Tour the luxurious seating, the giant screens, and get a taste of our fine dining settings.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedImg(item.image)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative aspect-square cursor-pointer overflow-hidden border border-white/5 group bg-white/2"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Photo */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:blur-[2px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover Dark Vignette & Info Card */}
              <div className="absolute inset-0 bg-[#070707]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              <div className="absolute inset-x-6 bottom-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">
                  {item.category}
                </span>
                <h4 className="text-base font-serif font-bold text-white mt-1 leading-snug">
                  {item.title}
                </h4>
                
                <div className="mt-3 flex items-center space-x-1.5 text-xs text-white/70">
                  <ZoomIn className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span className="text-[10px] tracking-wider uppercase font-medium">Click to Enlarge</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors focus:outline-none p-2 border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Enlarged Image container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-[4/3] max-h-[85vh] border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            >
              <Image
                src={selectedImg}
                alt="Enlarged gallery photo"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
