"use client";

import { useRef, useEffect, useState } from "react";

export default function BiomarkersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"before" | "locked" | "after">("before");
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const LOCK_DISTANCE = 1500;
    const TRIGGER = 0.35; // 35% scroll triggers the switch

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollY = window.scrollY;

      if (scrollY < sectionTop) {
        setPhase("before");
        setShowSecond(false);
      } else if (scrollY < sectionTop + LOCK_DISTANCE) {
        setPhase("locked");
        const progress = (scrollY - sectionTop) / LOCK_DISTANCE;
        setShowSecond(progress > TRIGGER);
      } else {
        setPhase("after");
        setShowSecond(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LOCK_DISTANCE = 1500;

  return (
    <div className="relative bg-white pt-12 sm:pt-28">
      <div
        ref={sectionRef}
        style={{ height: `calc(100vh + ${LOCK_DISTANCE}px)` }}
        className="relative"
      >
        <div
          className="w-full overflow-hidden rounded-none sm:rounded-[10px]"
          style={{
            position: phase === "locked" ? "fixed" : "absolute",
            top: phase === "locked" ? 0 : phase === "after" ? `${LOCK_DISTANCE}px` : 0,
            left: 0,
            right: 0,
            height: "100vh",
            zIndex: 30,
          }}
        >
          {/* Card 1 — base layer */}
          <img
            src="/images/biomarkers-hero.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:bg-gradient-to-l sm:from-black/60 sm:via-black/20 sm:to-transparent" />

          <div className="absolute inset-0 z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-6 lg:px-10 flex items-end sm:items-start justify-start sm:justify-end">
            <div
              className="pb-10 sm:pb-0 sm:pt-[35vh] text-left sm:text-right max-w-[500px]"
              style={{
                opacity: showSecond ? 0 : 1,
                transition: "opacity 0.6s ease",
              }}
            >
              <h2
                className="text-[26px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white mb-4 sm:mb-5"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
              >
                Beyond wellness.<br />Beyond healthcare.
              </h2>
              <p className="text-[12px] sm:text-[14px] text-white/70 leading-[1.75] sm:ml-auto max-w-[340px] sm:max-w-[400px]">
                A health ecosystem built to help you understand your body, optimize how you feel, and take control of your wellness through personalized products, intelligent insights, and connected experiences.
              </p>
            </div>
          </div>

          {/* Card 2 — slides in from bottom (down) or card 1 slides in from top (up) */}
          <div
            className="absolute inset-0 z-20"
            style={{
              transform: showSecond ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <img
              src="/images/section-after.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
