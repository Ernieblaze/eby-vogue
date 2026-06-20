import { ShopProductGrid } from "@/components/ShopProductGrid";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

// Force per-request rendering so admin changes to products show up
// immediately instead of serving a build-time snapshot.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load products from Supabase:", error.message);
  }

  const products: Product[] = error ? [] : data ?? [];

  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          All Products
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Shop
        </h1>

        <div className="mt-10">
          <ShopProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
