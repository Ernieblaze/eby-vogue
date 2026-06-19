"use client";

import { motion, type Variants } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProductGrid({
  title,
  eyebrow,
  products,
}: {
  title: string;
  eyebrow: string;
  products: Product[];
}) {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-semibold text-ink sm:text-4xl">
          {title}
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
