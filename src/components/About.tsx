"use client";

import { motion } from "framer-motion";
import { Award, Compass, Heart, Users, Star } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: "4.0", label: "Google Rating", icon: Star, suffix: " ★" },
  { value: "3,285", label: "Happy Reviews", icon: Users, suffix: "+" },
  { value: "250", label: "Capacity Seats", icon: Compass, suffix: "+" },
  { value: "100", label: "Premium Dishes", icon: Award, suffix: "+" }
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0a]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#3a4f8c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Text Content (Framer Motion) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                The Pitch & The Plate
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                Where Sports Passion Meets <br />
                <span className="gradient-text-gold">Luxury Gastronomy</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed text-sm md:text-base font-light">
              Nestled inside the iconic **Urja Stadium in Patna**, Lounge Before Wicket (LBW) is a pioneer in sports-themed luxury dining. We offer a dual experience: the vibrant high-energy atmosphere of live stadium match screenings, combined with the premium comfort, exquisite lighting, and gold-accented style of an upscale multi-cuisine restaurant.
            </p>

            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Whether you are here to cheer for your favorite cricket team on our giant screens, enjoy a serene dinner with your family, or celebrate special milestones, LBW sets the perfect field. Our chefs craft authentic clay-oven tandoori grills, wok-tossed Pan-Asian specialties, and signature drinks that are sure to bowl you over.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none text-[#C5A880]">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-serif font-medium text-base">Stadium Ambient</h4>
                  <p className="text-white/50 text-xs mt-1">Stunning glass-panel views directly looking onto the lush green turf of Urja Stadium.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-none text-[#C5A880]">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-serif font-medium text-base">Elite Hospitality</h4>
                  <p className="text-white/50 text-xs mt-1">Impeccable table-side service designed for family gatherings and corporate celebrations.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium Image Ambient Box & Stat Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/15 glow-gold">
              {/* Image background - using our stadium lounge image since it is highly relevant */}
              <Image
                src="/stadium_lounge_bg.png"
                alt="Lounge Before Wicket Ambience"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 glass-card p-6 border border-white/10">
                <p className="text-[#C5A880] text-xs font-semibold tracking-widest uppercase">Signature Lounge Experience</p>
                <p className="text-white/80 text-[11px] mt-1 italic font-light">"An incredible blend of sports excitement and luxury hospitality. Truly a class apart in Bihar."</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-6 glass-card border border-white/5"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A880] mb-4">
                <stat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                {stat.value}
                <span className="text-[#C5A880]">{stat.suffix}</span>
              </h3>
              <p className="text-white/40 text-xs tracking-widest uppercase mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
