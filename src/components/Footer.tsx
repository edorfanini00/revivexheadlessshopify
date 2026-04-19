import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white relative z-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Revivex"
                width={120}
                height={24}
                className="object-contain invert"
              />
            </Link>
            <p className="mt-2 text-[15px] leading-relaxed text-black/50 max-w-sm">
              Get better at being healthy, every year. Premium health products crafted for your body and mind.
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold text-[#0A0A0A]">Shop</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/collections" className="text-[15px] text-black/50 hover:text-black transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-[15px] text-black/50 hover:text-black transition-colors">
                  Search Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-semibold text-[#0A0A0A]">Company</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://healthrevivex.com"
                  className="text-[15px] text-black/50 hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Main Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-black/40">
            &copy; {new Date().getFullYear()} Revivex. All rights reserved.
          </p>
          <div className="flex gap-6 text-[14px] text-black/40">
            <Link href="/" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
