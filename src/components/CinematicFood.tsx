"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Flame, Star } from "lucide-react";

export default function CinematicFood() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, targetX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = 300;
    let height = canvas.height = 250;

    // Handle mouse movement for interactive steam drift
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left - rect.width / 2;
      mouseRef.current.targetX = relativeX / (rect.width / 2); // Normalized between -1 and 1
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle class representing steam wisps
    class SteamParticle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      size: number = 0;
      maxSize: number = 0;
      alpha: number = 0;
      decay: number = 0;
      hue: number = 0;

      constructor() {
        this.reset();
        // Stagger spawn heights initially
        this.y = height - Math.random() * 50 - 40;
      }

      reset() {
        // Spawn from center base
        this.x = width / 2 + (Math.random() - 0.5) * 40;
        this.y = height - 40;
        // Float upwards
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -0.5 - Math.random() * 0.7;
        // Expand as it rises
        this.size = 6 + Math.random() * 8;
        this.maxSize = 25 + Math.random() * 20;
        this.alpha = 0.01; // Start faint
        this.decay = 0.0015 + Math.random() * 0.001;
        // Soft white with occasional amber hue
        this.hue = Math.random() > 0.85 ? 40 : 200; // 40 = Gold, 200 = Soft white/blue
      }

      update(drift: number) {
        // Apply wind drift based on mouse X and time
        this.x += this.vx + drift * 0.6;
        this.y += this.vy;
        
        // Expand size
        if (this.size < this.maxSize) {
          this.size += 0.12;
        }

        // Fade in first, then decay
        if (this.y > height - 100) {
          if (this.alpha < 0.18) this.alpha += 0.015;
        } else {
          this.alpha -= this.decay;
        }

        if (this.alpha <= 0 || this.y < 0) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        const gradient = c.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        if (this.hue === 40) {
          gradient.addColorStop(0, `rgba(253, 224, 71, ${this.alpha * 0.8})`);
          gradient.addColorStop(0.4, `rgba(245, 158, 11, ${this.alpha * 0.3})`);
          gradient.addColorStop(1, "rgba(7, 7, 7, 0)");
        } else {
          gradient.addColorStop(0, `rgba(244, 234, 212, ${this.alpha})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.alpha * 0.3})`);
          gradient.addColorStop(1, "rgba(7, 7, 7, 0)");
        }

        c.fillStyle = gradient;
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: SteamParticle[] = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new SteamParticle());
    }

    let time = 0;
    const drawLoop = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Smooth mouse input
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;

      // Calculate global drift (mouse movement + gentle horizontal breeze)
      const globalDrift = mouseRef.current.x + Math.sin(time) * 0.15;

      particles.forEach((p) => {
        p.update(globalDrift);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    // Resize listener to match dimensions
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="py-24 bg-[#070707] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#C5A880]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Cinematic Graphic with Steam Canvas Overlay */}
          <div className="lg:col-span-5 flex justify-center relative order-2 lg:order-1">
            <div 
              ref={containerRef}
              className="relative w-80 h-[400px] md:w-96 md:h-[450px] flex items-end justify-center pb-8"
            >
              {/* Earthen Clay Pot (Matka) base representation */}
              <motion.div 
                className="relative w-72 h-72 rounded-full overflow-hidden border border-white/10 glow-gold shadow-2xl z-10 bg-[#0d0d0c]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/mutton_handi.png"
                  alt="Clay cooked Matka Mutton simmering"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                
                {/* Glowing hot coal simulation under the handi */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-red-950 via-amber-950/80 to-transparent flex justify-center">
                  <div className="w-1/2 h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 blur-md opacity-45 animate-pulse" />
                </div>
              </motion.div>

              {/* Steam Particle Overlay Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-x-0 bottom-40 w-full h-[280px] pointer-events-none z-20"
              />

              {/* Tandoor glowing overlay */}
              <div className="absolute bottom-24 -z-10 w-80 h-12 bg-amber-500/10 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>

          {/* Right: Text Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left"
          >
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
                Clay-Oven Simmering
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                Traditional <br />
                <span className="gradient-text-gold">Clay Pot Gastronomy</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed text-sm md:text-base font-light">
              At Lounge Before Wicket, we keep the fire of heritage alive. Our signature Matka Mutton and clay-oven kebabs are slow-cooked in hand-made earthen vessels over embers of natural wood coal.
            </p>

            <p className="text-white/50 leading-relaxed text-xs md:text-sm font-light">
              This slow thermal cook retains the rich moisture of our spices and infuses the meat with a distinct organic wood smoke. Scan the QR code on your dining table to order these fresh, steaming creations instantly.
            </p>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center space-x-3 text-white/80">
                <Flame className="w-5 h-5 text-red-500 fill-current animate-pulse" />
                <span className="text-xs tracking-wider uppercase font-semibold">100% Charcoal Grilled</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <span className="text-xs tracking-wider uppercase font-semibold">Hand-made Clay Pots</span>
              </div>
            </div>

            {/* Direct Dine-In anchor jump */}
            <div className="pt-4">
              <a
                href="#dine-in"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-white font-bold transition-all border-b border-[#C5A880]/30 hover:border-white pb-1"
              >
                <span>Access Smart Dine-In Menu</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
