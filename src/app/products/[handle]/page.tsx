import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/queries";
import type { Product } from "@/lib/types";
import ProductDetail from "@/components/ProductDetail";

async function getProduct(handle: string) {
  const data = await shopifyFetch<{ productByHandle: Product | null }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });
  return data.productByHandle;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} | Revivex`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 py-32">
      <ProductDetail product={product} />
    </div>
  );
}
