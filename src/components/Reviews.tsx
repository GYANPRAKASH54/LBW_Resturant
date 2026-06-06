"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Rohan Sinha",
    location: "Patna Central",
    rating: 5,
    text: "Located right inside Urja Stadium, LBW is a game-changer! The live screening atmosphere during IPL was electric. Food was exceptional, especially the signature Mutton @ LBW and the Murgh Malai Tikka. Service was prompt despite the crowd.",
    date: "1 week ago"
  },
  {
    name: "Shreya Gupta",
    location: "Kankarbagh, Patna",
    rating: 5,
    text: "The perfect place for family gatherings. The family dining area is very peaceful and beautifully designed. The Paneer Butter Masala and Butter Naan were extremely rich and flavorful. Highly recommended for dining near Rajbansi Nagar.",
    date: "3 weeks ago"
  },
  {
    name: "Abhishek Kumar",
    location: "Bailey Road, Patna",
    rating: 4,
    text: "Best sports bar and lounge in Bihar. Large projection screens, excellent seating arrangement, and delicious starters. The Chilli Chicken and Corn Salt & Pepper are absolute must-tries here.",
    date: "1 month ago"
  },
  {
    name: "Neha Sharma",
    location: "Rajbansi Nagar, Patna",
    rating: 5,
    text: "I loved the cricket-themed menu! Items like Net Practice (coffees) and Howzatt (curries) are so creative. The Mutton Galouti Kebab literally melted in my mouth, and the mocktails are very premium. Will definitely visit again.",
    date: "2 months ago"
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="reviews" className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Glow spots */}
      <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] bg-[#C5A880]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Guest Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            What Our <span className="gradient-text-gold">Customers Say</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            With over 3,285+ reviews, our visitors have ranked us as Patna's premium destination for food, cricket excitement, and service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Google Rating Statistics Badge */}
          <div className="lg:col-span-4 glass-card p-8 border border-white/5 flex flex-col justify-between text-center md:text-left h-full">
            <div>
              <div className="flex justify-center md:justify-start items-center space-x-1.5 mb-4">
                <Star className="w-6 h-6 fill-[#FFBF00] text-[#FFBF00]" />
                <span className="text-white font-bold text-lg">Google Verified</span>
              </div>
              <h3 className="text-6xl font-serif font-bold text-white mb-2">4.0</h3>
              <div className="flex justify-center md:justify-start items-center space-x-1 text-[#FFBF00] mb-3">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <Star className="w-5 h-5 text-white/20" />
              </div>
              <p className="text-white/50 text-xs tracking-wide">
                Based on <span className="text-white font-semibold">3,285+ ratings</span>
              </p>
            </div>

            {/* Distribution chart representation */}
            <div className="mt-8 space-y-3 text-left">
              {[
                { star: 5, pct: 68 },
                { star: 4, pct: 20 },
                { star: 3, pct: 8 },
                { star: 2, pct: 3 },
                { star: 1, pct: 1 }
              ].map((row) => (
                <div key={row.star} className="flex items-center text-[10px] text-white/50 font-semibold space-x-3">
                  <span className="w-3">{row.star}★</span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8C6D3E] to-[#C5A880]" style={{ width: `${row.pct}%` }} />
                  </div>
                  <span className="w-6 text-right">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Testimonial Carousel */}
          <div className="lg:col-span-8 relative flex flex-col justify-center h-full min-h-[350px]">
            <Quote className="absolute top-0 right-0 w-36 h-36 text-white/3 pointer-events-none -z-10" />

            <div className="overflow-hidden relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Rating Stars */}
                  <div className="flex text-[#FFBF00] space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <blockquote className="text-white/80 font-serif text-lg md:text-xl italic leading-relaxed font-light">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Customer Profile Details */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div>
                      <h4 className="text-white font-serif font-bold text-sm tracking-wide">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-[#C5A880] text-[10px] tracking-widest uppercase mt-0.5 font-medium">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                    <span className="text-white/30 text-[10px] tracking-wider">
                      {testimonials[currentIndex].date}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex space-x-3 mt-8 justify-end">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-white/10 hover:border-[#C5A880]/50 text-white/50 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-white/10 hover:border-[#C5A880]/50 text-white/50 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
