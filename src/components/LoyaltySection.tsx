"use client";

import { useEffect, useRef, useState } from "react";
import { useApp, ScratchCard } from "@/context/AppContext";
import { Award, Gift, Sparkles, User, HelpCircle, CheckCircle2, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoyaltySection() {
  const { loyaltyPoints, membershipTier, scratchCards, scratchCardComplete } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCard, setActiveCard] = useState<ScratchCard | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);

  // Set the first unscratched card as active automatically
  useEffect(() => {
    const unscratched = scratchCards.find((c) => !c.scratched);
    if (unscratched) {
      setActiveCard(unscratched);
      setPercentScratched(0);
    } else {
      setActiveCard(null);
    }
  }, [scratchCards]);

  // Set up the scratch card canvas
  useEffect(() => {
    if (!activeCard || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset dimensions
    canvas.width = 300;
    canvas.height = 150;

    // Fill with silver-gold gradient representing foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#A3A3A3");
    grad.addColorStop(0.5, "#D4D4D4");
    grad.addColorStop(1, "#737373");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Write instructions overlay
    ctx.fillStyle = "#1e1b18";
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH WITH MOUSE / FINGER", canvas.width / 2, canvas.height / 2);
    ctx.font = "8px Inter, sans-serif";
    ctx.fillStyle = "#404040";
    ctx.fillText("LBW STADIUM REWARD", canvas.width / 2, canvas.height / 2 + 18);

  }, [activeCard]);

  // Calculate percentage of scratched pixels
  const checkScratchPercentage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    let transparentCount = 0;

    // Check alpha values (fourth element in pixel data)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalPixels = width * height;
    const percent = Math.floor((transparentCount / totalPixels) * 100);
    setPercentScratched(percent);

    if (percent > 65 && activeCard) {
      // Complete scratching automatically
      scratchCardComplete(activeCard.id);
    }
  };

  const drawScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isScratching) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get position relative to canvas
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out"; // Erase effect
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchPercentage(ctx, canvas.width, canvas.height);
  };

  // Next tier details
  const tierProgress = () => {
    if (membershipTier === "Bronze") return { next: "Silver", limit: 500, current: loyaltyPoints };
    if (membershipTier === "Silver") return { next: "Gold", limit: 1000, current: loyaltyPoints };
    if (membershipTier === "Gold") return { next: "Platinum", limit: 2500, current: loyaltyPoints };
    return { next: "Max Tier", limit: 2500, current: 2500 };
  };

  const progress = tierProgress();
  const pct = Math.min(100, Math.floor((progress.current / progress.limit) * 100));

  return (
    <section id="loyalty" className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#C5A880]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">
            Exclusive Rewards
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Club Member <span className="gradient-text-gold">Loyalty Program</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-light">
            Earn 10% back on dine-in and 5% back on delivery bills in reward points. Unlock scratch cards, exclusive event entries, and premium discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Loyalty card display */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Membership Card */}
            <div className="glass-card p-8 md:p-10 border border-white/5 relative bg-gradient-to-br from-[#121212] via-[#0d0d0c] to-[#1a1c24] glow-gold flex flex-col justify-between min-h-[260px] overflow-hidden">
              {/* Gold watermark */}
              <Award className="absolute -bottom-8 -right-8 w-48 h-48 text-[#C5A880]/5 pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Lounge Before Wicket Club</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Stadium Gold Elite</h3>
                </div>
                
                <div className="px-4 py-2 border border-[#C5A880]/30 bg-[#C5A880]/10 text-xs uppercase tracking-widest text-[#C5A880] font-bold">
                  {membershipTier} TIER
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Accumulated Balance</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-mono font-bold text-white">{loyaltyPoints}</span>
                    <span className="text-[#C5A880] text-xs font-semibold uppercase tracking-wider">Points</span>
                  </div>
                </div>

                {/* Progress bar to next tier */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-white/40 font-bold uppercase tracking-wider">
                    <span>Progress to next tier ({progress.next})</span>
                    <span>{progress.current} / {progress.limit} pts</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#FFBF00] rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusive benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Saffron Happy Hours", desc: "Access 1+1 on selected drinks and appetizers from 4 PM - 7 PM." },
                { title: "Birthday Double-Points", desc: "Earn 2x reward points on all bills during your birthday/anniversary week." },
                { title: "Rider Delivery Coupons", desc: "Enjoy flat free delivery on all orders above ₹499." },
                { title: "Valet & Box Booking", desc: "Platinum members unlock VIP valet and advance stadium seat reservations." }
              ].map((ben) => (
                <div key={ben.title} className="glass-card p-6 border border-white/5 space-y-2 bg-white/1">
                  <div className="flex items-center space-x-2 text-[#C5A880]">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">{ben.title}</h4>
                  </div>
                  <p className="text-white/50 text-[10px] leading-relaxed font-light">{ben.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Scratch Card Gamification */}
          <div className="lg:col-span-5 glass-card p-8 border border-white/5 flex flex-col justify-between items-center text-center">
            
            <div className="space-y-3 w-full">
              <div className="mx-auto w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A880]">
                <Gift className="w-5 h-5 animate-pulse" />
              </div>
              
              <h3 className="text-lg font-serif font-bold text-white tracking-wide">Dine-In Scratch Rewards</h3>
              <p className="text-white/50 text-xs font-light max-w-xs mx-auto">
                Erasing the silver coating reveals reward coupons. Earn additional cards by placing delivery or dine-in orders.
              </p>
            </div>

            {/* Scratch Card Canvas Container */}
            <div className="my-8 relative w-[300px] h-[150px] overflow-hidden select-none cursor-crosshair border border-white/10 shadow-2xl">
              {activeCard ? (
                <>
                  {/* Reward Underlay (revealed) */}
                  <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center px-6 text-center space-y-2.5">
                    <Ticket className="w-6 h-6 text-[#C5A880]" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Coupon Reward</span>
                      <h4 className="text-xs font-bold text-white">{activeCard.reward}</h4>
                    </div>
                    
                    <div className="border border-dashed border-[#C5A880]/30 bg-[#C5A880]/10 px-4 py-1.5 text-xs font-mono font-bold text-[#C5A880] tracking-wider uppercase select-all">
                      {activeCard.code}
                    </div>
                  </div>

                  {/* Interactive Scratch Canvas */}
                  {!activeCard.scratched && (
                    <canvas
                      ref={canvasRef}
                      onMouseDown={() => setIsScratching(true)}
                      onMouseUp={() => setIsScratching(false)}
                      onMouseLeave={() => setIsScratching(false)}
                      onMouseMove={drawScratch}
                      onTouchStart={() => setIsScratching(true)}
                      onTouchEnd={() => setIsScratching(false)}
                      onTouchMove={drawScratch}
                      className="absolute inset-0 z-10 transition-opacity duration-300"
                      style={{ opacity: percentScratched > 65 ? 0 : 1, pointerEvents: percentScratched > 65 ? "none" : "auto" }}
                    />
                  )}
                </>
              ) : (
                <div className="absolute inset-0 bg-white/2 flex flex-col items-center justify-center p-6 text-center border border-dashed border-white/5 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-white/20" />
                  <p className="text-white/40 text-xs font-light">All active scratch cards used. Place orders of ₹500+ to earn more cards.</p>
                </div>
              )}
            </div>

            {/* Scratch progress stats */}
            {activeCard && !activeCard.scratched && (
              <div className="text-[10px] text-white/40 tracking-wider uppercase font-medium">
                Scratching progress: <span className="text-[#C5A880] font-bold font-mono">{percentScratched}%</span> (Reveal at 65%)
              </div>
            )}
            
            {activeCard && activeCard.scratched && (
              <div className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center justify-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Unlocked! Copy Code Above</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
