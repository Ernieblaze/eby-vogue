import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/admin/login");
  }

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

        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-surface p-8 text-center shadow-sm">
          <p className="text-sm text-muted">Product management coming next.</p>
        </div>
      </div>
    </div>
  );
}
