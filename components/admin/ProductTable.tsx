"use client";

import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatNaira } from "@/lib/format";

const CATEGORY_LABELS: Record<string, string> = {
  footwear: "Footwear",
  bags: "Bags",
  accessories: "Accessories",
};

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase() + category.slice(1);
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
  onToggle,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggle: (product: Product, field: "in_stock" | "featured") => void;
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-line bg-surface p-8 text-center shadow-sm">
        <p className="text-sm text-muted">No products yet. Add your first one above.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:flex-row sm:items-center"
        >
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-accent-soft">
            {product.image_url ? (
              // Admin-entered URLs can be any host, so a plain <img> avoids
              // next/image's remotePatterns allowlist for arbitrary sources.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="text-accent" size={22} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="font-heading text-base text-ink">{product.name}</p>
            <p className="text-xs uppercase tracking-wide text-muted">
              {getCategoryLabel(product.category)}
            </p>
            <p className="mt-1 text-sm font-semibold text-accent">
              {formatNaira(product.price)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onToggle(product, "in_stock")}
              className={`flex min-h-9 items-center rounded-full border px-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
                product.in_stock
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-line text-muted"
              }`}
            >
              {product.in_stock ? "In Stock" : "Out of Stock"}
            </button>

            <button
              type="button"
              onClick={() => onToggle(product, "featured")}
              className={`flex min-h-9 items-center rounded-full border px-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
                product.featured
                  ? "border-ink bg-ink text-surface"
                  : "border-line text-muted"
              }`}
            >
              Featured
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Edit ${product.name}`}
              onClick={() => onEdit(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:text-accent"
            >
              <Pencil size={18} />
            </button>
            <button
              type="button"
              aria-label={`Delete ${product.name}`}
              onClick={() => onDelete(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
