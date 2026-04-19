"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, loading } = useCart();
  const image = product.images.edges[0]?.node;
  const variantId = product.variants.edges[0]?.node.id;

  return (
    <div className="group flex flex-col">
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-black/5 border border-black/10 transition-colors hover:border-black/20"
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-black/40">
            No image
          </div>
        )}
      </Link>

      <div className="mt-5 flex flex-col gap-1.5 px-1">
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-[16px] font-semibold text-[#0A0A0A] group-hover:text-black/70 transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-[15px] font-medium text-black/50">
          {formatPrice(product.priceRange.minVariantPrice)}
        </p>
      </div>

      {variantId && (
        <button
          onClick={() => addToCart(variantId)}
          disabled={loading}
          className="mt-4 rounded-full bg-[#0A0A0A] px-4 py-3 text-[14px] font-semibold text-white transition-all hover:bg-black/80 active:scale-[0.98] disabled:opacity-50"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
