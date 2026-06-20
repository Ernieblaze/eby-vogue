"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ImageIcon, Upload } from "lucide-react";
import type { Product, ProductInput } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const PRODUCT_IMAGES_BUCKET = "product-images";

const CATEGORY_OPTIONS = [
  { value: "footwear", label: "Footwear" },
  { value: "bags", label: "Bags" },
  { value: "accessories", label: "Accessories" },
];

function toFormState(product?: Product | null) {
  return {
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price != null ? String(product.price) : "",
    original_price: product?.original_price != null ? String(product.original_price) : "",
    category: product?.category ?? CATEGORY_OPTIONS[0].value,
    sizes: product?.sizes?.join(", ") ?? "",
    image_url: product?.image_url ?? "",
    in_stock: product?.in_stock ?? true,
    featured: product?.featured ?? false,
  };
}

export function ProductForm({
  product,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancel,
}: {
  product?: Product | null;
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmit: (values: ProductInput) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(toFormState(product));
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    const supabase = createSupabaseBrowserClient();
    const fileExt = file.name.split(".").pop() || "jpg";
    const filePath = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadErr } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadErr) {
      setUploadError("Could not upload this photo. Please try again.");
      setIsUploading(false);
      event.target.value = "";
      return;
    }

    const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    setIsUploading(false);
    event.target.value = "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sizes = form.sizes
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size.length > 0);

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      category: form.category,
      sizes: sizes.length > 0 ? sizes : null,
      image_url: form.image_url.trim() || null,
      in_stock: form.in_stock,
      featured: form.featured,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-semibold text-ink">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
          className="min-h-11 rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(event) => setForm((f) => ({ ...f, description: event.target.value }))}
          className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm font-medium text-ink">
            Price (₦)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="1"
            required
            value={form.price}
            onChange={(event) => setForm((f) => ({ ...f, price: event.target.value }))}
            className="min-h-11 rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="original_price" className="text-sm font-medium text-ink">
            Original Price
          </label>
          <input
            id="original_price"
            type="number"
            min="0"
            step="1"
            placeholder="Optional"
            value={form.original_price}
            onChange={(event) => setForm((f) => ({ ...f, original_price: event.target.value }))}
            className="min-h-11 rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-ink">
          Category
        </label>
        <select
          id="category"
          value={form.category}
          onChange={(event) => setForm((f) => ({ ...f, category: event.target.value }))}
          className="min-h-11 rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors focus:border-accent"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="sizes" className="text-sm font-medium text-ink">
          Sizes
        </label>
        <input
          id="sizes"
          placeholder="e.g. 38, 39, 40"
          value={form.sizes}
          onChange={(event) => setForm((f) => ({ ...f, sizes: event.target.value }))}
          className="min-h-11 rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
        <p className="text-xs text-muted">Comma-separated. Leave blank if not applicable.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Product Photo</span>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-accent-soft">
            {form.image_url ? (
              // Storage public URLs / external URLs may be any host, so a
              // plain <img> avoids next/image's remotePatterns allowlist.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ImageIcon className="text-accent" size={24} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex min-h-11 items-center gap-2 rounded-2xl border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
            >
              <Upload size={16} />
              {isUploading ? "Uploading..." : "Upload Photo"}
            </button>
            <p className="text-xs text-muted">JPG or PNG, from your camera or gallery.</p>
          </div>
        </div>
        {uploadError && (
          <p role="alert" className="text-sm text-red-600">
            {uploadError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={form.in_stock}
            onChange={(event) => setForm((f) => ({ ...f, in_stock: event.target.checked }))}
            className="h-5 w-5 accent-accent"
          />
          In Stock
        </label>

        <label className="flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm((f) => ({ ...f, featured: event.target.checked }))}
            className="h-5 w-5 accent-accent"
          />
          Featured
        </label>
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-accent text-sm font-semibold text-surface shadow-md transition-opacity disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : isSubmitting ? "Saving..." : product ? "Save Changes" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || isUploading}
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-line text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
