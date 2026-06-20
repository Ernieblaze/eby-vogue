"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Heart, ImageIcon } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNaira, discountPercent } from "@/lib/format";
import { buildProductEnquiryLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";

const CATEGORY_LABELS: Record<string, string> = {
  footwear: "Footwear",
  bags: "Bags",
  accessories: "Accessories",
};

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase() + category.slice(1);
}

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isChoosingSize, setIsChoosingSize] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const needsSize = product.category === "footwear" && (product.sizes?.length ?? 0) > 0;
  const hasDiscount = !!product.original_price && product.original_price > product.price;

  useEffect(() => {
    if (!justAdded) return;
    const timeout = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(timeout);
  }, [justAdded]);

  const handleAddToEnquiry = (size: string | null = null) => {
    addItem(product, size);
    setIsChoosingSize(false);
    setJustAdded(true);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-xl ${
        product.in_stock ? "" : "opacity-60"
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-accent-soft">
        <Link href={`/product/${product.id}`} className="absolute inset-0 block">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="text-accent" size={40} />
            </div>
          )}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <span className="rounded-full bg-surface/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink shadow-sm">
            {getCategoryLabel(product.category)}
          </span>
          {hasDiscount && (
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-surface shadow-sm">
              -{discountPercent(product.price, product.original_price as number)}%
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
        <Link href={`/product/${product.id}`}>
          <h3 className="font-heading text-base text-ink transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="line-clamp-1 text-xs text-muted">{product.description}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-accent">
            {formatNaira(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted line-through">
              {formatNaira(product.original_price as number)}
            </span>
          )}
        </div>

        {product.in_stock ? (
          <div className="mt-auto flex flex-col gap-2">
            {isChoosingSize ? (
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  Select a size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleAddToEnquiry(size)}
                      className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-line px-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsChoosingSize(false)}
                  className="text-left text-xs text-muted underline-offset-2 hover:underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => (needsSize ? setIsChoosingSize(true) : handleAddToEnquiry())}
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-ink text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-surface"
              >
                {justAdded ? (
                  <>
                    <Check size={14} /> Added to Enquiry
                  </>
                ) : (
                  "Add to Enquiry"
                )}
              </button>
            )}

            <a
              href={buildProductEnquiryLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-2xl border border-accent text-xs font-semibold uppercase tracking-wide text-accent transition-all hover:bg-accent hover:text-surface hover:shadow-md"
            >
              Order on WhatsApp
            </a>
          </div>
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
