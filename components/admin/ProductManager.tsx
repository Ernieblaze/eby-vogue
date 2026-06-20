"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Product, ProductInput } from "@/lib/types";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Modal } from "@/components/admin/Modal";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductTable } from "@/components/admin/ProductTable";

type FormState = { mode: "closed" } | { mode: "add" } | { mode: "edit"; product: Product };

export function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [formState, setFormState] = useState<FormState>({ mode: "closed" });
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!banner) return;
    const timeout = setTimeout(() => setBanner(null), 3000);
    return () => clearTimeout(timeout);
  }, [banner]);

  const handleSubmit = async (values: ProductInput) => {
    setIsSubmitting(true);
    setFormError(null);
    const supabase = createSupabaseBrowserClient();

    if (formState.mode === "edit") {
      const { data, error } = await supabase
        .from("products")
        .update(values)
        .eq("id", formState.product.id)
        .select()
        .single();

      if (error || !data) {
        setFormError("Could not save changes. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setProducts((current) =>
        current.map((product) => (product.id === data.id ? (data as Product) : product))
      );
      setBanner({ type: "success", text: "Product updated." });
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert(values)
        .select()
        .single();

      if (error || !data) {
        setFormError("Could not add this product. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setProducts((current) => [data as Product, ...current]);
      setBanner({ type: "success", text: "Product added." });
    }

    setIsSubmitting(false);
    setFormState({ mode: "closed" });
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.from("products").delete().eq("id", deleteTarget.id);

    if (error) {
      setBanner({ type: "error", text: "Could not delete this product. Please try again." });
      setIsDeleting(false);
      return;
    }

    setProducts((current) => current.filter((product) => product.id !== deleteTarget.id));
    setBanner({ type: "success", text: "Product deleted." });
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const handleToggle = async (product: Product, field: "in_stock" | "featured") => {
    const nextValue = !product[field];

    setProducts((current) =>
      current.map((item) => (item.id === product.id ? { ...item, [field]: nextValue } : item))
    );

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ [field]: nextValue })
      .eq("id", product.id);

    if (error) {
      setProducts((current) =>
        current.map((item) =>
          item.id === product.id ? { ...item, [field]: product[field] } : item
        )
      );
      setBanner({ type: "error", text: "Could not update that. Please try again." });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold text-ink">Products</h2>
        <button
          type="button"
          onClick={() => {
            setFormError(null);
            setFormState({ mode: "add" });
          }}
          className="flex min-h-11 items-center gap-2 rounded-2xl bg-accent px-5 text-sm font-semibold text-surface shadow-md"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {banner && (
        <p
          role="status"
          className={`text-sm font-medium ${
            banner.type === "success" ? "text-accent" : "text-red-600"
          }`}
        >
          {banner.text}
        </p>
      )}

      <ProductTable
        products={products}
        onEdit={(product) => {
          setFormError(null);
          setFormState({ mode: "edit", product });
        }}
        onDelete={(product) => setDeleteTarget(product)}
        onToggle={handleToggle}
      />

      <Modal isOpen={formState.mode !== "closed"} onClose={() => setFormState({ mode: "closed" })}>
        <ProductForm
          product={formState.mode === "edit" ? formState.product : null}
          isSubmitting={isSubmitting}
          errorMessage={formError}
          onSubmit={handleSubmit}
          onCancel={() => setFormState({ mode: "closed" })}
        />
      </Modal>

      <Modal isOpen={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
        {deleteTarget && (
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-lg font-semibold text-ink">Delete Product</h2>
            <p className="text-sm text-muted">
              Are you sure you want to delete{" "}
              <span className="font-medium text-ink">{deleteTarget.name}</span>? This cannot be
              undone.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                disabled={isDeleting}
                className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-red-600 text-sm font-semibold text-surface shadow-md transition-opacity disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-line text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
