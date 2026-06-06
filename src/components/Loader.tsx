"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling when loading
    document.body.style.overflow = "hidden";

    // Create a smooth count-up progress animation
    const obj = { val: 0 };
    const progressTween = gsap.to(obj, {
      val: 100,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      },
    });

    // Main GSAP animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
        "-=0.4"
      )
      .to(textRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.in",
        delay: 0.5,
      })
      .to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      progressTween.kill();
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070707]"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="w-full max-w-md px-6 text-center select-none">
        <div ref={textRef} className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] block font-light">
            Luxury Dining & Lounge
          </span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-wider font-bold gradient-text-gold">
            LOUNGE BEFORE WICKET
          </h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/40">
            Urja Stadium • Patna
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="relative mt-12 h-[1px] w-full bg-white/10 overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8C6D3E] via-[#C5A880] to-[#FFBF00] origin-left w-full"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <div className="mt-3 flex justify-between items-center text-[10px] tracking-widest text-[#C5A880]/70 font-mono">
          <span>INITIALIZING EXPERIENCE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
