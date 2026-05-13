import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const font = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revivex | Health & Wellness",
  description:
    "Premium health and wellness products by Revivex. Shop supplements, wellness essentials, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${font.variable} antialiased`}
    >
      <body className="font-sans bg-white p-0 sm:p-[6px] min-h-screen">
        <div className="relative flex flex-col min-h-[calc(100vh-12px)] rounded-[10px] bg-white overflow-x-hidden">
          <CartProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
