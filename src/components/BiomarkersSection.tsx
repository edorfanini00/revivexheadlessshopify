"use client";

import { useRef, useEffect, useState } from "react";

const points = [
  { number: "01", title: "A new health baseline", desc: "100+ biomarkers measured from a single blood draw." },
  { number: "02", title: "All your health data", desc: "Every result in one place, explained in plain language." },
  { number: "03", title: "Your action plan", desc: "AI-built protocols tailored to your exact biology." },
  { number: "04", title: "Personalized protocols", desc: "Supplements, habits, and lifestyle — all aligned to you." },
];

// Each point gets 1 full viewport height of scroll distance
const SCROLL_PER_STEP = 1;

export default function BiomarkersSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0); // how many points are revealed

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight - window.innerHeight;
      // How far we've scrolled into this sticky container (0 → 1)
      const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
      const step = Math.floor(progress * (points.length + 1));
      setRevealed(Math.min(step, points.length));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Total scroll height = (points + 1 intro beat) × viewport
  const scrollHeight = `${(points.length + 1) * 100}vh`;

  return (
    <div ref={containerRef} style={{ height: scrollHeight }} className="relative bg-white pt-20 sm:pt-28">
      {/* Sticky inner panel */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Image constrained to hero margins */}
        <div className="absolute inset-0 mx-auto max-w-[1600px] px-5 sm:px-6 lg:px-10">
          <div className="relative w-full h-full rounded-[24px] overflow-hidden">
            <img
              src="/images/biomarkers-hero.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* LEFT — Numbered list, items reveal as you scroll */}
            <div className="flex flex-col gap-0 order-2 lg:order-1">
              {points.map((pt, i) => {
                const isVisible = i < revealed;
                return (
                  <div
                    key={pt.number}
                    className="flex items-start gap-5 border-t border-white/10 py-5 transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0.2,
                      transform: isVisible ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    <span className="text-[11px] font-bold tracking-[0.15em] text-white/30 tabular-nums pt-0.5 flex-shrink-0 w-6">
                      {pt.number}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="text-[15px] sm:text-[16px] font-semibold leading-snug mb-1 transition-colors duration-300"
                        style={{ color: isVisible ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)" }}
                      >
                        {pt.title}
                      </h3>
                      <p className="text-[13px] text-white/45 leading-[1.65]">{pt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — Heading */}
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-4">Testing</p>
              <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-5">
                Every Revivex journey starts with 100+ biomarkers
              </h2>
              <p className="text-[13px] sm:text-[14px] text-white/50 leading-[1.75] max-w-[400px]">
                A full-body test with a quick 10-min lab draw. Understand your hormones, metabolic markers, nutrients, and more.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
