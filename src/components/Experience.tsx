"use client";

import { motion } from "framer-motion";
import { Tv, Coffee, Users2, Cake, ShieldCheck } from "lucide-react";

const experiences = [
  {
    icon: Tv,
    title: "Live Sports Screening",
    description: "Located right inside Urja Stadium, we feature giant projection screens and state-of-the-art surround sound. Catch every boundaries, wickets, and goals live in high definition with fellow fans.",
    tag: "STADIUM VIBE"
  },
  {
    icon: Coffee,
    title: "Luxury Lounge Vibe",
    description: "Relax in our plush velvet and leather booths. Styled with warm gold lighting, obsidian black tables, and volumetric shadows, it's the perfect setting to enjoy mocktails and rich coffee brews.",
    tag: "PREMIUM COMFORT"
  },
  {
    icon: Users2,
    title: "Family Dining Area",
    description: "A refined space designed specifically for family dinners. Enjoy a cozy, quiet dinner with your loved ones away from the high-energy bar noise, featuring our signature multi-cuisine curries and platters.",
    tag: "WARM HOSPITALITY"
  },
  {
    icon: Cake,
    title: "Group Celebrations",
    description: "Host your birthday parties, corporate lunches, or anniversary dinners in style. We customize menus, provide customized decor setups, and offer dedicated serving staff for groups of 15 to 80 guests.",
    tag: "MEMORABLE EVENTS"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-[#0a0a0a] relative">
      {/* Decorative ambient color blur */}
      <div className="absolute top-1/3 -right-1/4 w-[450px] h-[450px] bg-[#3a4f8c]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-1/4 w-[450px] h-[450px] bg-[#C5A880]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
              Beyond Dining
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              The Lounge <span className="gradient-text-gold">Experience</span>
            </h2>
            <p className="text-white/50 text-xs md:text-sm font-light">
              We design spaces that cater to every mood. From high-octane matchdays to quiet family gatherings, LBW is Patna's ultimate dining ground.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#C5A880] bg-white/5 border border-white/10 px-4 py-2 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt. Verified Safety</span>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card glass-card-hover p-8 md:p-10 border border-white/5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880]/80 font-bold block">
                  {exp.tag}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                    {exp.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-[#C5A880]">
                    <exp.icon className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>

              {/* Decorative line inside card */}
              <div className="mt-8 h-[1px] w-12 bg-[#C5A880]/40 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Call to action details */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-[11px] uppercase tracking-[0.25em]">
            Planning a private event? {" "}
            <a href="#reservation" className="text-[#C5A880] underline hover:text-white transition-colors">
              Book a Party Package
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
