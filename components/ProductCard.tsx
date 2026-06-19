"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNaira } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="relative aspect-square overflow-hidden bg-accent-soft">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex h-full w-full items-center justify-center"
        >
          <ImageIcon className="text-accent" size={40} />
        </motion.div>
        {!product.in_stock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-surface">
            Out of Stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-base text-ink">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-accent">
            {formatNaira(product.price)}
          </span>
          {product.original_price && (
            <span className="text-xs text-muted line-through">
              {formatNaira(product.original_price)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!product.in_stock}
          className="mt-auto rounded-2xl border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-accent"
        >
          {product.in_stock ? "Add to Enquiry" : "Out of Stock"}
        </button>
      </div>
    </motion.div>
  );
}
