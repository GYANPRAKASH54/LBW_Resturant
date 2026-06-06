"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

const signatureDishes = [
  {
    name: "Mutton @ LBW",
    price: "₹595",
    category: "Howzatt Main Course",
    description: "Our legendary chef-special goat meat. Slow-simmered in a sealed earthen clay pot with organic garlic bulbs and a customized blend of rustic spices.",
    image: "/images/mutton_handi.png",
    tag: "Most Ordered"
  },
  {
    name: "Murgh Malai Tikka",
    price: "₹390",
    category: "Clay Oven Tandoor",
    description: "Mouth-melting boneless chicken chunks marinated overnight in dairy cream, cheese, green cardamon dust, and roasted cashew paste.",
    image: "/images/malai_tikka.png",
    tag: "Tandoor Special"
  },
  {
    name: "Corn Salt and Pepper",
    price: "₹355",
    category: "Behind the Wicket Starter",
    description: "Crunchy sweet corn kernels battered and wok-tossed in a high flame with fresh scallions, crushed black pepper, sea salt, and green chillies.",
    image: "/images/corn_salt_pepper.png",
    tag: "Asian Best Seller"
  },
  {
    name: "Mewa Lassi",
    price: "₹175",
    category: "Drinks Break Cooler",
    description: "Thick, creamy clay-cup lassi sweet blended with pure organic saffron strands, cardamon seeds, and topped with a heavy load of sliced almonds and pistachios.",
    image: "/images/mewa_lassi.png",
    tag: "Classic Dessert"
  }
];

export default function SignatureDishes() {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#menu");
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
    <section className="py-24 bg-[#070707] relative overflow-hidden">
      {/* Glow spots */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#C5A880]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
              Chef's Masterpieces
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Signature <span className="gradient-text-gold">Dishes</span>
            </h2>
            <p className="text-white/50 text-xs md:text-sm font-light">
              Crafted by masters of the tandoor and wok. These legendary selections have earned Lounge Before Wicket its high reputation.
            </p>
          </div>

          <a
            href="#menu"
            onClick={handleScrollToMenu}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors duration-300 font-bold group pb-1 border-b border-[#C5A880]/30 hover:border-white"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card glass-card-hover border border-white/5 flex flex-col justify-between overflow-hidden"
            >
              
              {/* Image Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/2">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Float Badge Tag */}
                <div className="absolute top-4 left-4 bg-[#070707]/80 backdrop-blur-md text-[#C5A880] text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 border border-[#C5A880]/20 flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{dish.tag}</span>
                </div>
              </div>

              {/* Card Body details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block font-semibold">
                    {dish.category}
                  </span>
                  
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-serif font-bold text-white tracking-wide">
                      {dish.name}
                    </h3>
                    <span className="text-[#C5A880] font-semibold text-sm font-mono whitespace-nowrap ml-2">
                      {dish.price}
                    </span>
                  </div>

                  <p className="text-white/50 text-xs leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>

                {/* Micro CTA */}
                <div className="pt-2">
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A880]/70 font-semibold">
                    Multi-Cuisine Masterpiece
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
