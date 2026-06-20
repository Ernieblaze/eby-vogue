"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CATEGORY_FILTERS = [
  { value: "all", label: "All" },
  { value: "footwear", label: "Footwear" },
  { value: "bags", label: "Bags" },
  { value: "accessories", label: "Accessories" },
];

// Receives the full product list as a prop (rather than fetching itself)
// so search/category filtering can run instantly on the client without
// touching the server-side data fetch in app/shop/page.tsx.
export function ShopProductGrid({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = [product.name, product.description, product.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [products, activeCategory, searchQuery]);

  if (products.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-surface p-8 text-center shadow-sm">
        <p className="text-sm text-muted">No products available right now.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="min-h-11 w-full rounded-2xl border border-line bg-surface pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveCategory(filter.value)}
            className={`flex min-h-11 flex-shrink-0 items-center rounded-2xl border px-5 text-sm font-semibold transition-colors ${
              activeCategory === filter.value
                ? "border-accent bg-accent text-surface"
                : "border-line bg-surface text-ink hover:border-accent hover:text-accent"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-surface p-8 text-center shadow-sm">
          <p className="text-sm text-muted">No products found.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
