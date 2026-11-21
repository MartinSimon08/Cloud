"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, signOut } from "@/lib/auth";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "authenticated">("checking");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getCurrentUser()
      .then((user) => {
        if (cancelled) return;
        if (user) {
          setIsAdmin(user.role === "admin");
          setStatus("authenticated");
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        if (!cancelled) router.push("/login");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSignOut() {
    signOut();
    router.push("/login");
  }

  if (status === "checking") {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#F8FAFC] text-sm text-slate-500 dark:bg-[#090D16] dark:text-[#F5F2EA]/60">
        Cargando…
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-[#F8FAFC] text-slate-900 dark:bg-[#090D16] dark:text-[#F5F2EA]">
      <header className="sticky top-0 z-30 border-b border-slate-300 bg-white/95 backdrop-blur-md shadow-xs dark:border-white/10 dark:bg-[#090D16]/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-black tracking-tight">
            <span className="text-[#4A90E2] dark:text-[#7CB3E9]">TuMenu</span>
            <span className="text-[#FF6B8B] dark:text-[#FF8EA8]">Ahora</span>
          </Link>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/dashboard/admin"
                className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 dark:border-white/15 dark:bg-white/10 dark:text-[#F5F2EA] dark:hover:bg-white/20"
              >
                Admin
              </Link>
            )}
            <ThemeToggle />
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 dark:border-white/15 dark:bg-white/10 dark:text-[#F5F2EA] dark:hover:bg-white/20"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</main>
    </div>
  );
}
