export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTION_BY_HANDLE_QUERY } from "@/lib/queries";
import type { Collection } from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";

async function getCollection(handle: string) {
  const data = await shopifyFetch<{ collectionByHandle: Collection | null }>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle },
  });
  return data.collectionByHandle;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.title} | Revivex`,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();

  const products = collection.products?.edges.map((e) => e.node) ?? [];

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-32">
      <div className="mb-16 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-[17px] text-white/60 leading-relaxed">{collection.description}</p>
        )}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-white/50">
          No products in this collection yet.
        </p>
      )}
    </div>
  );
}
