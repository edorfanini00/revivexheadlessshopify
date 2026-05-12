"use client";

import Link from "next/link";

export default function HomeCTA() {
  return (
    <div className="relative z-20 bg-white">
      <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 pt-10 pb-40 border-t border-black/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* LEFT — Start with Testing */}
          <Link
            href="/testing"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-10 sm:p-14 min-h-[480px] transition-transform duration-300 hover:scale-[1.01]"
          >
            <img
              src="https://ik.imagekit.io/kusosheutk/hf_20260508_021901_7a55cf6e-3e5e-47de-9984-19b66ba4a807.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Coming Soon
                </span>
                <h2 className="text-[38px] sm:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                  Start with<br />Testing
                </h2>
                <p className="mt-4 text-[14px] text-white/50 leading-[1.7] max-w-[340px]">
                  Understand exactly what your body needs. Your biology, decoded.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Labs", "Biomarkers", "App", "Protocol", "Personalization"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-3.5 py-1 text-[12px] font-medium text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-[13px] font-semibold text-white/80 backdrop-blur-md transition-colors group-hover:bg-white/20">
                Learn more
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Link>

          {/* RIGHT — Shop Revivex */}
          <Link
            href="/search"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-10 sm:p-14 min-h-[480px] transition-transform duration-300 hover:scale-[1.01]"
          >
            <img
              src="https://ik.imagekit.io/kusosheutk/hf_20260510_155445_bc3484b3-43fb-4c0f-b92b-86065ff132a5.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">Shop</p>
                <h2 className="text-[38px] sm:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                  Shop<br />Revivex
                </h2>
                <p className="mt-4 text-[14px] text-white/60 leading-[1.7] max-w-[340px]">
                  Targeted supplements and wellness products built for real results.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Supplements", "Bracelets", "Wellness", "Recovery", "Products"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/20 px-3.5 py-1 text-[12px] font-medium text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black transition-colors group-hover:bg-white/90">
                Browse products
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}
