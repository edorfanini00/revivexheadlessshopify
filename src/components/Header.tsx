"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import { ShoppingBag } from "lucide-react";

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center ${
          scrolled ? "pt-3 px-4" : "pt-0 px-0"
        }`}
      >
        <div className="flex w-full justify-center relative items-center gap-2">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? "h-[64px] w-full max-w-[1000px] rounded-full bg-black/70 backdrop-blur-xl shadow-2xl shadow-black/20 border border-white/10 px-8"
                : "h-[100px] w-full max-w-[1600px] bg-transparent px-8 lg:px-12"
            }`}
          >
            {/* Left nav */}
            <nav
              className={`hidden items-center transition-all duration-500 md:flex ${
                scrolled ? "gap-5" : "w-1/3 gap-8"
              }`}
            >
              <Link
                href="/"
                className={`font-semibold text-white whitespace-nowrap transition-all duration-300 hover:text-white/80 ${
                  scrolled ? "text-[14px]" : "text-[16px]"
                }`}
              >
                What we test
              </Link>
              <Link
                href="/collections"
                className={`font-semibold text-white whitespace-nowrap transition-all duration-300 hover:text-white/80 ${
                  scrolled ? "text-[14px]" : "text-[16px]"
                }`}
              >
                How it works
              </Link>
              <Link
                href="/search"
                className={`font-semibold text-white whitespace-nowrap transition-all duration-300 hover:text-white/80 ${
                  scrolled ? "text-[14px]" : "text-[16px]"
                }`}
              >
                FAQs
              </Link>
            </nav>

            {/* Center logo */}
            <div
              className={`flex justify-center transition-all duration-500 ${
                scrolled ? "flex-1 mx-6" : "w-1/3"
              }`}
            >
              <Link
                href="/"
                className="flex items-center justify-center transition-all duration-500"
              >
                <Image
                  src="/logo.png"
                  alt="Revivex"
                  width={220}
                  height={70}
                  className={`object-contain transition-all duration-500 ${
                    scrolled ? "h-[32px] w-auto" : "h-[60px] w-auto"
                  }`}
                  priority
                />
              </Link>
            </div>

            {/* Right actions */}
            <div
              className={`flex items-center justify-end transition-all duration-500 ${
                scrolled ? "gap-4" : "w-1/3 gap-6"
              }`}
            >
              <Link
                href="/"
                className={`hidden md:block font-semibold text-white whitespace-nowrap transition-all duration-300 hover:text-white/80 ${
                  scrolled ? "text-[14px]" : "text-[16px]"
                }`}
              >
                Log in
              </Link>

              <Link
                href="/"
                className={`hidden md:block rounded-full font-bold bg-white text-black whitespace-nowrap transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] ${
                  scrolled ? "px-5 py-2 text-[13px]" : "px-6 py-2.5 text-[15px]"
                }`}
              >
                Become a member
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden text-white"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>

              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative hidden md:flex text-white hover:text-white/80 transition-all duration-300 ml-1"
                aria-label="Open cart"
              >
                <ShoppingBag className={scrolled ? "h-[18px] w-[18px]" : "h-5 w-5"} />
                {totalQuantity > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="fixed inset-x-0 top-[100px] z-40 bg-black/90 backdrop-blur-xl px-6 py-6 shadow-2xl md:hidden border-t border-white/10">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-semibold text-white"
            >
              What we test
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-semibold text-white"
            >
              How it works
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-semibold text-white"
            >
              FAQs
            </Link>
            <div className="my-1 h-px bg-white/10" />
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-semibold text-white"
            >
              Log in
            </Link>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-full bg-white py-3.5 text-center text-[16px] font-bold text-black"
            >
              Become a member
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="w-full rounded-full border border-white/20 py-3.5 text-center text-[16px] font-semibold text-white"
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
