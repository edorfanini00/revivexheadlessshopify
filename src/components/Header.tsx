"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import { Grip } from "lucide-react";

export default function Header() {
  const { cart, cartOpen, setCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalQuantity = cart?.totalQuantity ?? 0;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out flex justify-center ${
          scrolled ? "pt-4 px-4" : "pt-0 px-0"
        }`}
      >
        <div className="flex w-full justify-center relative items-center gap-2">
          {/* Logo — left on mobile, centered on desktop */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 z-10 pointer-events-auto">
            <Link
              href="/"
              className="flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Revivex"
                width={200}
                height={66}
                className="object-contain h-[38px] w-auto"
                priority
              />
            </Link>
          </div>

          <div
            className={`flex items-center justify-between ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? "h-[52px] w-full max-w-[860px] rounded-full bg-[#525252] shadow-xl pr-2 pl-8 transition-all duration-700" 
                : "h-[88px] w-full max-w-[1600px] bg-transparent px-8 lg:px-12 transition-all duration-[1500ms]"
            }`}
          >
            <nav
              className={`hidden items-center lg:flex ${
                scrolled ? "w-1/2 gap-7 justify-start pr-16 transition-all duration-700" : "w-1/2 gap-8 justify-end pr-64 transition-all duration-[1500ms]"
              }`}
            >
              <Link
                href="/"
                className={`whitespace-nowrap font-medium text-white transition-colors hover:text-white/80 ${
                  scrolled ? "text-[12px]" : "text-[15px]"
                }`}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className={`whitespace-nowrap font-medium text-white transition-colors hover:text-white/80 ${
                  scrolled ? "text-[12px]" : "text-[15px]"
                }`}
              >
                Science
              </Link>
              <Link
                href="/search"
                className={`whitespace-nowrap font-medium text-white transition-colors hover:text-white/80 ${
                  scrolled ? "text-[12px]" : "text-[15px]"
                }`}
              >
                Learn
              </Link>
            </nav>

            <div
              className={`flex items-center ml-auto lg:ml-0 ${
                scrolled ? "lg:w-1/2 gap-5 justify-end pl-16 transition-all duration-700" : "lg:w-1/2 gap-6 justify-end lg:justify-start pl-0 lg:pl-64 transition-all duration-[1500ms]"
              }`}
            >
              <Link
                href="/"
                className={`hidden lg:block whitespace-nowrap font-medium text-white transition-colors hover:text-white/80 ${
                  scrolled ? "text-[12px]" : "text-[15px]"
                }`}
              >
                Log in
              </Link>

              <Link
                href="/"
                className={`hidden md:block whitespace-nowrap rounded-full font-semibold bg-white text-black transition-colors hover:bg-white/90 ${
                  scrolled ? "px-4 py-2 text-[12px]" : "px-5 py-2.5 text-[14px]"
                }`}
              >
                Become a member
              </Link>



              {!scrolled && (
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative flex text-white hover:text-white/80 transition-colors ml-4"
                  aria-label="Open cart"
                >
                  <Grip className="h-8 w-8" />
                  {totalQuantity > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {scrolled && (
            <div className="flex flex-shrink-0 ml-1">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#525252] shadow-xl text-white transition-colors hover:bg-[#626262]"
                aria-label="Open cart"
              >
                <Grip className="h-7 w-7" />
                {totalQuantity > 0 && (
                  <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {mobileMenuOpen && (
        <nav className="fixed inset-x-0 top-[88px] z-40 border-t border-white/10 bg-[#0A0A0A] px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-white"
            >
              What we test
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-white"
            >
              How it works
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-white"
            >
              FAQs
            </Link>
            <div className="my-2 h-px bg-white/10" />
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-white"
            >
              Log in
            </Link>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-white py-3 text-center text-sm font-semibold text-black"
            >
              Become a member
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="w-full rounded-full border border-white py-3 text-center text-sm font-semibold text-white"
            >
              Cart ({totalQuantity})
            </button>
          </div>
        </nav>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
