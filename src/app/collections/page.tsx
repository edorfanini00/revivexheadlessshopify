import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/lib/queries";
import type { Collection } from "@/lib/types";

export const metadata = {
  title: "Collections | Revivex",
  description: "Browse all Revivex product collections.",
};

async function getCollections() {
  const data = await shopifyFetch<{
    collections: { edges: { node: Collection }[] };
  }>({ query: COLLECTIONS_QUERY, variables: { first: 20 } });
  return data.collections.edges.map((e) => e.node);
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-32">
      <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-12">
        Collections
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group relative flex h-[400px] items-end overflow-hidden rounded-[20px] bg-white/5 p-8 border border-white/10 transition-colors hover:border-white/20"
          >
            {collection.image && (
              <img
                src={collection.image.url}
                alt={collection.image.altText ?? collection.title}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {collection.title}
              </h2>
              {collection.description && (
                <p className="text-[15px] text-white/70 line-clamp-2">
                  {collection.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {collections.length === 0 && (
        <p className="mt-12 text-white/50">
          No collections found. Add some products and collections in your Shopify admin.
        </p>
      )}
    </div>
  );
}
