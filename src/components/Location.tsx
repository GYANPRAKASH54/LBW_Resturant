"use client";

import { MapPin, Navigation, Compass, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Location() {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.9472648777086!2d85.10161131102914!3d25.610050677161472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed57f7eb06eb2b%3A0xe964c017d2f9ee80!2sLounge%20Before%20Wicket!5e0!3m2!1sen!2sin!4v1717684000000!5m2!1sen!2sin";

  return (
    <section id="location" className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Find the Ground
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Location & <span className="gradient-text-gold">Directions</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            We are conveniently located inside the Urja Stadium campus, with ample free parking space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Map Card */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[400px] border border-white/10 relative">
            <iframe
              title="Lounge Before Wicket Location Map"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Right: Directions Card */}
          <div className="lg:col-span-5 glass-card p-8 md:p-10 border border-white/5 flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Address details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5 text-[#C5A880]">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-lg font-serif font-bold text-white tracking-wide">Stadium Location</h3>
                </div>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light pl-7">
                  **Lounge Before Wicket** <br />
                  Urja Stadium, Near DAV School, <br />
                  Rajbansi Nagar, Patna, Bihar 801103
                </p>
              </div>

              {/* Landmark info */}
              <div className="space-y-3 border-t border-white/5 pt-6">
                <div className="flex items-center space-x-2.5 text-[#C5A880]">
                  <Compass className="w-5 h-5" />
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">Nearby Landmarks</h3>
                </div>
                <ul className="text-white/60 text-xs space-y-2 list-disc list-inside font-light pl-7">
                  <li>Directly inside the **Urja Stadium** sports campus</li>
                  <li>Just behind **DAV Public School**, Rajbansi Nagar</li>
                  <li>Approx. 1 km from **Sanjay Gandhi Biological Park (Patna Zoo)**</li>
                </ul>
              </div>

              {/* Directions details */}
              <div className="space-y-3 border-t border-white/5 pt-6">
                <div className="flex items-center space-x-2.5 text-[#C5A880]">
                  <Navigation className="w-5 h-5" />
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">Driving Directions</h3>
                </div>
                <p className="text-white/50 text-[11px] leading-relaxed font-light pl-7">
                  From Bailey Road, turn at Patel Nagar crossing towards Rajbansi Nagar / DAV School. Turn inside the Urja Stadium main gate. LBW features a dedicated entrance with secure, guarded parking.
                </p>
              </div>

            </div>

            {/* Direct Directions Button */}
            <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
              <a
                href="https://maps.app.goo.gl/o1v4wF4xHq9H6b8A8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4 text-[#C5A880]" />
                <span>Open in Google Maps</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
