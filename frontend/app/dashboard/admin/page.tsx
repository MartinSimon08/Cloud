"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type AdminUserSummary } from "@/lib/api";
import { formatARS } from "@/lib/billing";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUserSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .adminListUsers()
      .then(setUsers)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 403) {
          router.replace("/dashboard");
          return;
        }
        setError(err instanceof ApiError ? err.message : "No se pudo cargar la lista de usuarios.");
      });
  }, [router]);

  const totalMrr = users?.reduce((sum, u) => sum + u.mrr, 0) ?? 0;
  const totalActiveSubscriptions = users?.reduce((sum, u) => sum + u.activeSubscriptionsCount, 0) ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
          Todas las cuentas registradas, con sus restaurantes, páginas y menús.
        </p>
      </div>

      {users && users.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-[#F5F2EA]/40">
              Ingreso mensual recurrente
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-300">{formatARS(totalMrr)}</div>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-[#F5F2EA]/40">
              Suscripciones activas
            </div>
            <div className="mt-1 text-2xl font-black">{totalActiveSubscriptions}</div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          {error}
        </div>
      )}

      {users === null ? (
        <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">No hay usuarios registrados.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white dark:border-white/10 dark:bg-[#141824]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 dark:border-white/10 dark:text-[#F5F2EA]/50">
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Restaurantes</th>
                <th className="px-4 py-3">Páginas</th>
                <th className="px-4 py-3">Menús</th>
                <th className="px-4 py-3">MRR</th>
                <th className="px-4 py-3">Registrado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                  <td className="px-4 py-3 font-semibold">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        u.role === "admin"
                          ? "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                          : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-[#F5F2EA]/70"
                      }`}
                    >
                      {u.role === "admin" ? "Admin" : "Usuario"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-[#F5F2EA]/70">{u.restaurantsCount}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-[#F5F2EA]/70">{u.pagesCount}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-[#F5F2EA]/70">{u.menusCount}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-300">
                    {u.mrr > 0 ? formatARS(u.mrr) : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-[#F5F2EA]/50">
                    {new Date(u.createdAt).toLocaleDateString("es-AR")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/admin/users/${u._id}`}
                      className="font-bold text-sky-600 hover:underline dark:text-sky-300"
                    >
                      Ver detalle →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
