"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Digital Menu", href: "#menu" },
  { name: "Reviews", href: "#reviews" },
  { name: "Reservation", href: "#reservation" }
];

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
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
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-8 text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Brand details */}
        <div className="space-y-6">
          <a href="#home" className="flex flex-col select-none max-w-max">
            <span className="text-2xl font-serif tracking-widest font-bold text-white">LBW</span>
            <span className="text-[8px] tracking-[0.4em] text-[#C5A880] -mt-1 uppercase">Lounge Before Wicket</span>
          </a>
          <p className="text-white/40 text-xs leading-relaxed font-light">
            Patna's premier luxury multi-cuisine sports lounge and dining establishment, situated within the iconic Urja Stadium. Experience gold-standard hospitality, fine clay tandoors, and energetic matches.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            {[
              {
                name: "Instagram",
                url: "https://instagram.com/loungebeforewicket",
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.2-4.358-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                )
              },
              {
                name: "Facebook",
                url: "https://facebook.com/loungebeforewicket",
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                )
              },
              {
                name: "WhatsApp",
                url: "https://wa.me/919117269999",
                svg: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.989-1.874-1.875-4.355-2.907-6.992-2.908-5.442 0-9.87 4.42-9.874 9.865-.001 1.738.468 3.433 1.36 4.957l-.985 3.597 3.702-.971z" />
                  </svg>
                )
              }
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-[#C5A880] text-white/50 hover:text-[#C5A880] flex items-center justify-center transition-all"
                title={soc.name}
              >
                {soc.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Hours */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold">
            Stadium Hours
          </h4>
          <ul className="space-y-3 text-xs text-white/50 font-light">
            <li className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
              <div>
                <span className="block font-medium text-white/80">Everyday Operating Hours</span>
                <span className="text-[10px]">11:00 AM – 11:00 PM</span>
              </div>
            </li>
            <li className="pt-2">
              <span className="block font-medium text-white/80">Matchday Overtime</span>
              <span className="text-[10px] block mt-0.5">Open during select night match events.</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact / Directions */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold">
            Contact & Location
          </h4>
          <ul className="space-y-3.5 text-xs text-white/50 font-light">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>
                Urja Stadium, Near DAV School, <br />
                Rajbansi Nagar, Patna, <br />
                Bihar - 801103
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a href="tel:+919117269999" className="hover:text-white transition-colors">
                +91 91172 69999
              </a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <a href="mailto:info@loungebeforewicket.com" className="hover:text-white transition-colors">
                info@loungebeforewicket.com
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-white/50 hover:text-[#C5A880] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 tracking-wider">
        <p>© {new Date().getFullYear()} Lounge Before Wicket. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
