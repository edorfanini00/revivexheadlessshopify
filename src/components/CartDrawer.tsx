"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, loading, updateCartLine, removeFromCart } = useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      )}

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#111111] text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
          <h2 className="text-xl font-medium tracking-tight text-white">Your Cart</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="mb-6 h-16 w-16 text-white/20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p className="text-[16px] text-white/60 mb-2">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-[15px] font-semibold text-white underline underline-offset-4 hover:text-white/80"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {lines.map((line) => {
                const image = line.merchandise.product.images.edges[0]?.node;
                return (
                  <li key={line.id} className="flex gap-5 py-6">
                    {image && (
                      <Link
                        href={`/products/${line.merchandise.product.handle}`}
                        onClick={onClose}
                        className="relative h-[100px] w-[80px] flex-shrink-0 overflow-hidden rounded-[12px] bg-white/5 border border-white/10"
                      >
                        <Image
                          src={image.url}
                          alt={image.altText ?? line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <Link
                          href={`/products/${line.merchandise.product.handle}`}
                          onClick={onClose}
                          className="text-[16px] font-semibold text-white hover:text-white/80 transition-colors line-clamp-2"
                        >
                          {line.merchandise.product.title}
                        </Link>
                        {line.merchandise.title !== "Default Title" && (
                          <p className="text-[14px] text-white/60 mt-1">{line.merchandise.title}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              line.quantity === 1
                                ? removeFromCart(line.id)
                                : updateCartLine(line.id, line.quantity - 1)
                            }
                            disabled={loading}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[14px] text-white transition-colors hover:bg-white/10 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="w-4 text-center text-[15px] font-medium">{line.quantity}</span>
                          <button
                            onClick={() => updateCartLine(line.id, line.quantity + 1)}
                            disabled={loading}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[14px] text-white transition-colors hover:bg-white/10 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[16px] font-semibold text-white">
                          {formatPrice(line.merchandise.priceV2)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && cart && (
          <div className="border-t border-white/10 px-8 py-8 bg-[#111111]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[16px] font-medium text-white/80">Subtotal</span>
              <span className="text-xl font-semibold text-white">
                {formatPrice(cart.cost.subtotalAmount)}
              </span>
            </div>
            <p className="mb-6 text-[14px] text-white/50">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="block w-full rounded-full bg-white py-4 text-center text-[16px] font-bold text-black transition-colors hover:bg-white/90"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}
