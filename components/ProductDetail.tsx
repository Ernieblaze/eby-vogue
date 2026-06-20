"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ImageIcon } from "lucide-react";
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

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const hasSizes = (product.sizes?.length ?? 0) > 0;
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes?.[0] ?? null);
  const [justAdded, setJustAdded] = useState(false);
  const hasDiscount = !!product.original_price && product.original_price > product.price;

  useEffect(() => {
    if (!justAdded) return;
    const timeout = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(timeout);
  }, [justAdded]);

  const handleAddToEnquiry = () => {
    addItem(product, selectedSize);
    setJustAdded(true);
  };

  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <Link
          href="/shop"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-accent-soft shadow-md">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="text-accent" size={56} />
              </div>
            )}

            {!product.in_stock && (
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-surface">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {getCategoryLabel(product.category)}
            </span>

            <h1 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-accent">
                {formatNaira(product.price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-base text-muted line-through">
                    {formatNaira(product.original_price as number)}
                  </span>
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-surface">
                    -{discountPercent(product.price, product.original_price as number)}%
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {product.description}
              </p>
            )}

            {hasSizes && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-ink">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-accent bg-accent-soft text-ink"
                          : "border-line text-ink hover:border-accent hover:text-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.in_stock ? (
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToEnquiry}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-ink text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-surface"
                >
                  {justAdded ? (
                    <>
                      <Check size={16} /> Added to Enquiry
                    </>
                  ) : (
                    "Add to Enquiry"
                  )}
                </button>

                <a
                  href={buildProductEnquiryLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-accent text-sm font-semibold uppercase tracking-wide text-accent transition-all hover:bg-accent hover:text-surface hover:shadow-md"
                >
                  Order on WhatsApp
                </a>
              </div>
            ) : (
              <button
                type="button"
                disabled
                className="mt-2 flex min-h-11 items-center justify-center rounded-2xl border border-line text-sm font-semibold uppercase tracking-wide text-muted opacity-60"
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
