"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-[16px] text-white placeholder-white/40 outline-none transition-colors focus:border-white/50 focus:bg-white/10"
      />
      <button
        type="submit"
        className="rounded-full bg-white px-8 py-4 text-[16px] font-bold text-black transition-colors hover:bg-white/90"
      >
        Search
      </button>
    </form>
  );
}
