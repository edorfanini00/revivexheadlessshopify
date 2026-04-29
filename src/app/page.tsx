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
      <div className="relative min-h-[calc(100vh-12px)] flex flex-col rounded-[10px] overflow-hidden">
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

        <div className="relative z-10 flex-1 flex flex-col px-6 lg:px-20 w-full max-w-[1600px] mx-auto">
          
          <div className="h-[88px]" />

          <div className="flex-1 flex flex-col justify-center max-w-[650px] pb-44 pt-6">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-white mb-4 tracking-wide">
              <Check className="h-[12px] w-[12px]" strokeWidth={3} />
              <span>HSA/ FSA eligible</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.05] tracking-[-0.03em] mb-4 text-white">
              Get better at being <br /> healthy, every year
            </h1>

            <p className="text-[14px] sm:text-[15px] text-white/90 leading-[1.6] font-medium mb-8 max-w-[460px]">
              100+ biomarkers. A plan built around you.<br/>
              Everything you need to act on it.
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
                See what we test
              </Link>
            </div>
          </div>

          <div className="absolute bottom-14 left-10 lg:left-20 hidden sm:flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-white">
            <div className="flex flex-col gap-0.5 pr-6 sm:pr-8 sm:border-r border-white/10">
              <h3 className="text-[15px] font-semibold tracking-tight">Whole body check</h3>
              <p className="text-[13px] font-medium text-white/70 tracking-tight">Detect 1,000+ conditions</p>
            </div>
            <div className="flex flex-col gap-0.5 pr-6 sm:pr-8 sm:border-r border-white/10">
              <h3 className="text-[15px] font-semibold tracking-tight">Accessible</h3>
              <p className="text-[13px] font-medium text-white/70 tracking-tight">Starts at $199/year</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[15px] font-semibold tracking-tight">Trusted</h3>
              <p className="text-[13px] font-medium text-white/70 tracking-tight">1M biomarkers tested</p>
            </div>
          </div>
        </div>
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
