import Link from "next/link";
import { ProductDetail } from "@/components/ProductDetail";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

// Force per-request rendering so admin changes to this product show up
// immediately instead of serving a build-time snapshot.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("Failed to load product from Supabase:", error.message);
  }

  const product = error ? null : (data as Product | null);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-bg px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-semibold text-ink">Product Not Found</h1>
        <p className="max-w-sm text-sm text-muted">
          We couldn&apos;t find the product you were looking for. It may have been removed or is
          no longer available.
        </p>
        <Link
          href="/shop"
          className="mt-2 flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-md"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
