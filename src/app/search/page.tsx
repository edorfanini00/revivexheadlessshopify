export const dynamic = "force-dynamic";

import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Shop | Revivex",
  description: "Shop all Revivex products.",
};

async function getAllProducts() {
  const data = await shopifyFetch<{
    products: { edges: { node: Product }[] };
  }>({ query: PRODUCTS_QUERY, variables: { first: 50 } });
  return data.products.edges.map((e) => e.node);
}

export default async function SearchPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-32">
      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
        Shop Revivex
      </h1>
      <p className="text-[15px] text-white/40 mb-16">
        {products.length} product{products.length !== 1 && "s"}
      </p>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-white/50">No products found.</p>
      )}
    </div>
  );
}
