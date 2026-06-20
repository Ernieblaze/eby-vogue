"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function LogoutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    setIsSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSigningOut}
      className="flex min-h-11 items-center justify-center rounded-2xl border border-line px-5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
    >
      {isSigningOut ? "Signing out..." : "Log Out"}
    </button>
  );
}
