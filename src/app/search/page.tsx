export const dynamic = "force-dynamic";

import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_WITH_PRODUCTS_QUERY } from "@/lib/queries";
import type { Collection, Product } from "@/lib/types";
import ShopTabs from "@/components/ShopTabs";

export const metadata = {
  title: "Shop | Revivex",
  description: "Shop all Revivex products.",
};

const HIDDEN_HANDLES  = ["all", "frontpage", "automated-collection"];
const HIDDEN_PRODUCTS = ["corewave band"];

function getCollectionTheme(handle: string, title: string) {
  const isTech = handle.toLowerCase().includes("tech") || title.toLowerCase().includes("tech");
  return {
    tagline: isTech
      ? "Wearable technology that reads your body in real time."
      : "Precision-dosed formulas engineered for performance and longevity.",
    bannerGradient: "linear-gradient(160deg, #0A0A0A 0%, #111111 100%)",
    pillBg: "rgba(255,255,255,0.08)",
    pillText: "rgba(255,255,255,0.5)",
    pillBorder: "rgba(255,255,255,0.15)",
    badgeLabel: isTech ? "TECH" : "NUTRIX",
  };
}

async function getCollections() {
  const data = await shopifyFetch<{
    collections: { edges: { node: Collection }[] };
  }>({ query: COLLECTIONS_WITH_PRODUCTS_QUERY, variables: { first: 20 } });
  return data.collections.edges
    .map((e) => e.node)
    .filter((c) => !HIDDEN_HANDLES.includes(c.handle.toLowerCase()));
}

export default async function ShopPage() {
  const collections = await getCollections();

  const tabs = collections
    .map((c) => {
      const products: Product[] = (c.products?.edges.map((e) => e.node) ?? [])
        .filter((p) => !HIDDEN_PRODUCTS.includes(p.title.toLowerCase()));
      return {
        id: c.id,
        title: c.title,
        handle: c.handle,
        description: c.description,
        products,
        theme: getCollectionTheme(c.handle, c.title),
      };
    })
    .filter((t) => t.products.length > 0);

  return (
    <div className="min-h-screen">
      {tabs.length > 0 ? (
        <ShopTabs collections={tabs} />
      ) : (
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-24">
          <p className="text-white/40">No collections found.</p>
        </div>
      )}
    </div>
  );
}
