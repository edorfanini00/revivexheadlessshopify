export const dynamic = "force-dynamic";

import Link from "next/link";
import { Check } from "lucide-react";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY, COLLECTIONS_QUERY } from "@/lib/queries";
import type { Product, Collection } from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";

async function getFeaturedProducts() {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({ query: PRODUCTS_QUERY, variables: { first: 8 } });
  return data.products.edges.map((e) => e.node);
}

async function getCollections() {
  const data = await shopifyFetch<{
    collections: { edges: { node: Collection }[] };
  }>({ query: COLLECTIONS_QUERY, variables: { first: 3 } });
  return data.collections.edges.map((e) => e.node);
}

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getFeaturedProducts(),
    getCollections(),
  ]);

  return (
    <div className="relative flex-1 flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen sm:min-h-[calc(100vh-12px)] flex flex-col rounded-none sm:rounded-[10px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-bg.png"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col px-6 sm:px-6 lg:px-20 w-full max-w-[1600px] mx-auto">
          
          <div className="h-[88px]" />

          <div className="flex-1 flex flex-col justify-end sm:justify-center max-w-[650px] pb-24 sm:pb-44 pt-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-white mb-4 tracking-wide">
              <Check className="h-[12px] w-[12px]" strokeWidth={3} />
              <span>HSA/ FSA eligible</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.05] tracking-[-0.03em] mb-4 text-white">
              Personalized health. <br /> Based on your biology.
            </h1>

            <p className="text-[14px] sm:text-[15px] text-white/90 leading-[1.6] font-medium mb-8 max-w-[460px]">
              A smarter health system. Built as one. Evolving with you.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/collections"
                className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-black transition-colors hover:bg-white/90"
              >
                Become a member
              </Link>
              <Link
                href="/search"
                className="rounded-full bg-white/10 border border-white/20 px-6 py-2.5 text-[13px] font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Shop now
              </Link>
            </div>
          </div>

          <div className="absolute bottom-44 left-10 lg:left-20 hidden sm:flex flex-col sm:flex-row items-center gap-8 sm:gap-12 text-white">
            <div className="flex flex-col gap-1.5 pr-8 sm:pr-12 sm:border-r border-white/20">
              <h3 className="text-[22px] font-semibold tracking-tight">Understand your biology</h3>
              <p className="text-[15px] font-medium text-white/70 tracking-tight">Through advanced biomarker and diagnostic testing.</p>
            </div>
            <div className="flex flex-col gap-1.5 pr-8 sm:pr-12 sm:border-r border-white/20">
              <h3 className="text-[22px] font-semibold tracking-tight">Connect the full picture</h3>
              <p className="text-[15px] font-medium text-white/70 tracking-tight">With a system that continuously interprets your data.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[22px] font-semibold tracking-tight">Support what matters</h3>
              <p className="text-[15px] font-medium text-white/70 tracking-tight">With targeted solutions aligned to your needs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- TRUST / SOCIAL PROOF BAR --- */}
      <div className="relative z-20 bg-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-14 border-t border-black/10">

          {/* Avatars + tagline */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Overlapping avatar circles */}
              <div className="flex -space-x-3">
                <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#c9b99a] to-[#a89278] flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-white">
                  <img src="/advisor-1.jpg" alt="Advisor" className="h-full w-full object-cover" />
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#8fafc4] to-[#6a90ab] flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-white z-10">
                  <img src="/advisor-2.jpg" alt="Advisor" className="h-full w-full object-cover" />
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#b5c4a1] to-[#8ea47a] flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-white z-20">
                  <img src="/advisor-3.jpg" alt="Advisor" className="h-full w-full object-cover" />
                </div>
              </div>
              <p className="text-[15px] font-medium text-[#0A0A0A] tracking-tight">
                Built by the world&apos;s top doctors and scientists
              </p>
            </div>

            {/* Institution logos (text-based, muted) */}
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
              <span className="text-[22px] font-light tracking-[-0.02em] text-black/25 font-serif">
                Stanford
              </span>
              <div className="flex items-center gap-2 opacity-25">
                <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none">
                  <rect x="2" y="2" width="44" height="44" rx="4" stroke="currentColor" strokeWidth="2.5" className="text-black"/>
                  <path d="M14 34V14h8a8 8 0 010 16h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-black"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[11px] font-bold tracking-[0.08em] text-black uppercase">Harvard</span>
                  <span className="text-[9px] font-medium tracking-[0.06em] text-black/70 uppercase">Medical School</span>
                </div>
              </div>
              <div className="flex items-baseline gap-[1px] opacity-25">
                <span className="text-[26px] font-bold tracking-tight text-black">UC</span>
                <span className="text-[26px] font-light tracking-tight text-black">SF</span>
              </div>
              <div className="flex items-center gap-2 opacity-25">
                <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-black"/>
                  <path d="M20 8c6.627 0 12 5.373 12 12S26.627 32 20 32 8 26.627 8 20 13.373 8 20 8z" stroke="currentColor" strokeWidth="1.5" className="text-black"/>
                  <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-black"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] font-medium tracking-[0.1em] text-black uppercase">University of</span>
                  <span className="text-[13px] font-bold tracking-[0.05em] text-black uppercase">Oxford</span>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* --- SPLIT CTA SECTION --- */}
      <div className="relative z-20 bg-white">
        <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-10 border-t border-black/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* LEFT — High intent: Start with Testing */}
            <Link
              href="/collections"
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#0A0A0A] p-10 sm:p-14 min-h-[480px] transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Subtle radial glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(180,160,130,0.18)_0%,_transparent_65%)]" />

              <div className="relative z-10 flex flex-col gap-8">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-3">High intent</p>
                  <h2 className="text-[38px] sm:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-white">
                    Start with<br />Testing
                  </h2>
                  <p className="mt-4 text-[14px] text-white/50 leading-[1.7] max-w-[340px]">
                    Understand exactly what your body needs. Your biology, decoded.
                  </p>
                </div>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-2">
                  {["Labs", "Biomarkers", "App", "Protocol", "Personalization"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 px-3.5 py-1 text-[12px] font-medium text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-10 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black transition-colors group-hover:bg-white/90">
                  Get your test kit
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>

            {/* RIGHT — Lower friction: Shop Revivex */}
            <Link
              href="/search"
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-[#F4F1EC] p-10 sm:p-14 min-h-[480px] transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Subtle radial glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(180,155,120,0.22)_0%,_transparent_65%)]" />

              <div className="relative z-10 flex flex-col gap-8">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/35 mb-3">Lower friction</p>
                  <h2 className="text-[38px] sm:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] text-[#0A0A0A]">
                    Shop<br />Revivex
                  </h2>
                  <p className="mt-4 text-[14px] text-black/50 leading-[1.7] max-w-[340px]">
                    Targeted supplements and wellness products built for real results.
                  </p>
                </div>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-2">
                  {["Supplements", "Bracelets", "Wellness", "Recovery", "Products"].map((tag) => (
                    <span key={tag} className="rounded-full border border-black/15 px-3.5 py-1 text-[12px] font-medium text-black/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-10 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-[13px] font-bold text-white transition-colors group-hover:bg-black/80">
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

      {/* --- STORE CONTENT SECTIONS (WHITE BACKGROUND) --- */}
      <div className="relative z-20 bg-white">
        {collections.length > 0 && (
          <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-24 border-t border-black/10">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-medium tracking-tight text-[#0A0A0A]">Shop by Category</h2>
              <Link
                href="/collections"
                className="text-sm font-semibold text-black/50 hover:text-black"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group relative flex h-80 items-end overflow-hidden rounded-[20px] bg-black/5 p-8 border border-black/10 transition-colors hover:border-black/20"
                >
                  {collection.image && (
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText ?? collection.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-white">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="mt-2 text-[14px] text-white/70 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {products.length > 0 && (
          <section className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-24 pt-0">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl font-medium tracking-tight text-[#0A0A0A]">Featured Products</h2>
            </div>
            <ProductGrid products={products} />
          </section>
        )}
      </div>
    </div>
  );
}
