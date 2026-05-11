"use client";

import { useState } from "react";
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
  const col = collections[active];
  if (!col) return null;

  return (
    <div>
      {/* ── Hero ───────────────────────────────────── */}
      <div className="relative w-full" style={{ minHeight: "clamp(360px, 55vw, 560px)" }}>

        {/* Background */}
        <img
          src={
            col.theme.badgeLabel === "NUTRIX"
              ? "https://ik.imagekit.io/kusosheutk/hf_20260510_194922_4f964c25-b7fd-43a6-8894-105b76d6dc66.jpg"
              : "https://ik.imagekit.io/kusosheutk/hf_20260510_202315_c5dd0f54-adbe-4d45-a9ed-77ee517df4c7.jpg"
          }
          alt={col.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />

        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/50" />

        {/* Liquid glass tab — above title text */}
        <div className="absolute bottom-[64px] left-0 right-0 flex justify-center z-20 px-4">
          <div
            className="relative flex items-center gap-0.5 rounded-full px-1 py-1"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {collections.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className="relative z-10 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-semibold tracking-tight transition-all duration-200"
                style={{
                  background: active === i ? "rgba(255,255,255,0.15)" : "transparent",
                  color: active === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                  boxShadow: active === i ? "inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                }}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Title + badge — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-6 lg:px-10 pb-8 sm:pb-12 pt-20 sm:pt-28">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-2 sm:mb-3">
              {col.theme.badgeLabel}
            </p>
            <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              {col.title.includes(" ")
                ? <>{col.title.split(" ")[0]}<br />{col.title.split(" ").slice(1).join(" ")}</>
                : col.title
              }
            </h1>
            <p className="mt-3 text-[13px] sm:text-[14px] text-white/50 leading-[1.7] max-w-[300px] sm:max-w-[340px]">
              {col.description || col.theme.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* ── Products — white background ──────────────── */}
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-14 bg-white">
        <div className="mx-auto max-w-[1600px]">
          <ProductGrid products={col.products} />
        </div>
      </div>
    </div>
  );
}
