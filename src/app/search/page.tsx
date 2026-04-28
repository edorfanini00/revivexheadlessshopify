export const dynamic = "force-dynamic";

import { shopifyFetch } from "@/lib/shopify";
import { SEARCH_PRODUCTS_QUERY } from "@/lib/queries";
import type { Product } from "@/lib/types";
import SearchForm from "@/components/SearchForm";
import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Search | Revivex",
  description: "Search for Revivex products.",
};

async function searchProducts(query: string) {
  if (!query) return [];
  const data = await shopifyFetch<{
    search: { edges: { node: Product }[] };
  }>({
    query: SEARCH_PRODUCTS_QUERY,
    variables: { query, first: 20 },
  });
  return data.search.edges.map((e) => e.node);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const products = await searchProducts(query);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-32">
      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-10">
        Search
      </h1>

      <div className="mb-16">
        <SearchForm initialQuery={query} />
      </div>

      {query && (
        <div className="mt-10">
          <p className="mb-8 text-[16px] text-white/50">
            {products.length} result{products.length !== 1 && "s"} for &ldquo;{query}&rdquo;
          </p>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p className="text-white/50">
              No products found. Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
