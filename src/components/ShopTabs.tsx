"use client";

import { useState, useRef, useEffect } from "react";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

interface CollectionTab {
  id: string;
  title: string;
  handle: string;
  description?: string;
  products: Product[];
  theme: {
    tagline: string;
    bannerGradient: string;
    pillBg: string;
    pillText: string;
    pillBorder: string;
    badgeLabel: string;
  };
}

export default function ShopTabs({ collections }: { collections: CollectionTab[] }) {
  const [active, setActive] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  const col = collections[active];
  if (!col) return null;

  return (
    <div>
      {/* ── Hero + Tab Bar ─────────────────────────── */}
      <div className="relative w-full" style={{ minHeight: "480px" }}>

        {/* Background */}
        {col.theme.badgeLabel === "NUTRIX" ? (
          <img
            src="https://ik.imagekit.io/kusosheutk/hf_20260510_175201_e55b54aa-eb74-46b4-9795-58a4aeec7d4c.jpg"
            alt="Revivex Nutrix"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: col.theme.bannerGradient }} />
        )}

        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/50" />

        {/* Tab bar overlaid at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-24 px-6 z-10">
          <div
            className="relative flex items-center gap-1 rounded-full px-1.5 py-1.5"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Sliding pill */}
            <span
              className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                background: "rgba(255,255,255,0.15)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            />
            {collections.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => setActive(i)}
                className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-tight transition-colors duration-200"
                style={{ color: active === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.40)" }}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Title + badge — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pb-12">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">
              {col.theme.badgeLabel}
            </p>
            <h1 className="text-[38px] sm:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              {col.title.includes(" ")
                ? <>{col.title.split(" ")[0]}<br />{col.title.split(" ").slice(1).join(" ")}</>
                : col.title
              }
            </h1>
            <p className="mt-4 text-[14px] text-white/50 leading-[1.7] max-w-[340px]">
              {col.description || col.theme.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* ── Products — white background ──────────────── */}
      <div className="w-full px-6 lg:px-10 py-14 bg-white">
        <div className="mx-auto max-w-[1600px]">
          <ProductGrid products={col.products} />
        </div>
      </div>
    </div>
  );
}
