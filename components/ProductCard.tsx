"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNaira, discountPercent } from "@/lib/format";
import { buildProductEnquiryLink } from "@/lib/whatsapp";

const CATEGORY_LABELS: Record<Product["category"], string> = {
  footwear: "Footwear",
  bags: "Bags",
  accessories: "Accessories",
};

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-accent-soft">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="rounded-full bg-surface/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink shadow-sm">
            {CATEGORY_LABELS[product.category]}
          </span>
          {product.original_price && (
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-surface shadow-sm">
              -{discountPercent(product.price, product.original_price)}%
            </span>
          )}
          {product.is_new && (
            <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-surface shadow-sm">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((prev) => !prev)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/95 text-ink shadow-sm transition-colors hover:text-accent"
        >
          <Heart size={16} className={isWishlisted ? "fill-accent text-accent" : ""} />
        </button>

        {!product.in_stock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-surface">
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

        {product.in_stock ? (
          <a
            href={buildProductEnquiryLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex min-h-11 items-center justify-center rounded-2xl border border-accent text-xs font-semibold uppercase tracking-wide text-accent transition-all hover:bg-accent hover:text-surface hover:shadow-md"
          >
            Order on WhatsApp
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-auto flex min-h-11 items-center justify-center rounded-2xl border border-line text-xs font-semibold uppercase tracking-wide text-muted opacity-60"
          >
            Out of Stock
          </button>
        )}
      </div>
    </motion.div>
  );
}
