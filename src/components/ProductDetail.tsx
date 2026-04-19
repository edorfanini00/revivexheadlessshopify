"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart, loading } = useCart();
  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    if (product.options) {
      product.options.forEach((opt) => {
        defaults[opt.name] = opt.values[0];
      });
    }
    return defaults;
  });

  const [mainImage, setMainImage] = useState(0);

  const selectedVariant =
    variants.find((v) =>
      v.selectedOptions?.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    ) ?? variants[0];

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(selectedVariant.id);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-white/5 border border-white/10">
          {images[mainImage] && (
            <Image
              src={images[mainImage].url}
              alt={images[mainImage].altText ?? product.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, i) => (
              <button
                key={img.url}
                onClick={() => setMainImage(i)}
                className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-[16px] border-2 transition-colors ${
                  i === mainImage ? "border-white" : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? `${product.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col pt-4 lg:pl-8">
        <h1 className="text-4xl font-medium tracking-tight text-white mb-4">
          {product.title}
        </h1>

        <p className="text-2xl font-semibold text-white/90 mb-8">
          {selectedVariant
            ? formatPrice(selectedVariant.priceV2)
            : formatPrice(product.priceRange.minVariantPrice)}
        </p>

        {product.options &&
          product.options.length > 0 &&
          !(product.options.length === 1 && product.options[0].values.length === 1) && (
            <div className="space-y-8 mb-10">
              {product.options.map((option) => (
                <div key={option.name}>
                  <label className="text-[15px] font-semibold text-white/80 mb-3 block">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option.name]: value,
                          }))
                        }
                        className={`rounded-full border px-6 py-3 text-[15px] font-medium transition-colors ${
                          selectedOptions[option.name] === value
                            ? "border-white bg-white text-black"
                            : "border-white/20 text-white/80 hover:border-white/50"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        <button
          onClick={handleAddToCart}
          disabled={loading || !selectedVariant?.availableForSale}
          className="w-full rounded-full bg-white py-4 text-[16px] font-bold text-black transition-all hover:bg-white/90 active:scale-[0.99] disabled:opacity-50 sm:max-w-sm mb-12"
        >
          {selectedVariant?.availableForSale === false
            ? "Sold Out"
            : loading
              ? "Adding..."
              : "Add to Cart"}
        </button>

        {product.descriptionHtml && (
          <div className="border-t border-white/10 pt-10">
            <h3 className="text-[16px] font-semibold text-white mb-4">Description</h3>
            <div
              className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-[15px] max-w-none"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
