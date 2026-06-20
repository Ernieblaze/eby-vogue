"use client";

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

// Receives the full product list as a prop (rather than fetching itself)
// so search/category filtering can be layered on top of this later
// without touching the server-side data fetch in app/shop/page.tsx.
export function ShopProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-surface p-8 text-center shadow-sm">
        <p className="text-sm text-muted">No products available right now.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
