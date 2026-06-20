import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { ProductManager } from "@/components/admin/ProductManager";
import type { Product } from "@/lib/types";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/admin/login");
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-bg px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Eby Vogue Glamour
            </p>
            <h1 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted">Signed in as {data.user.email}</p>
          </div>

          <LogoutButton />
        </div>

        <ProductManager initialProducts={(products as Product[]) ?? []} />
      </div>
    </div>
  );
}
