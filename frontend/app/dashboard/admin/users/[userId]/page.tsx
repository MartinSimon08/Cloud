"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type AdminUserDetail } from "@/lib/api";
import { PAGE_TEMPLATES, MENU_TEMPLATES } from "@/lib/templates/registry";
import { FEATURE_LABELS, formatARS, isSubscriptionActive } from "@/lib/billing";

const cardClass = "rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]";

function StatusBadge({ published, activeLabel, draftLabel }: { published: boolean; activeLabel: string; draftLabel: string }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
        published
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
          : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
      }`}
    >
      {published ? activeLabel : draftLabel}
    </span>
  );
}

export default function AdminUserDetailPage() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .adminGetUser(params.userId)
      .then(setUser)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 403) {
          router.replace("/dashboard");
          return;
        }
        setError(err instanceof ApiError ? err.message : "No se pudo cargar el usuario.");
      });
  }, [params.userId, router]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/dashboard/admin" className="text-xs font-semibold text-sky-600 hover:underline dark:text-sky-300">
          ← Usuarios
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{user?.email ?? "Cargando…"}</h1>
        {user && (
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Registrado el {new Date(user.createdAt).toLocaleDateString("es-AR")} · {user.role === "admin" ? "Admin" : "Usuario"}
          </p>
        )}
      </div>

      {user && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-[#F5F2EA]/40">
              Ingreso mensual recurrente
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-300">{formatARS(user.mrr)}</div>
          </div>
          <div className={cardClass}>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-[#F5F2EA]/40">
              Total pagado histórico
            </div>
            <div className="mt-1 text-2xl font-black">{formatARS(user.totalPaid)}</div>
          </div>
        </div>
      )}

      {user === null ? (
        <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
      ) : user.restaurants.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Este usuario todavía no creó ningún restaurante.</p>
      ) : (
        user.restaurants.map((r) => (
          <div key={r._id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">{r.name}</h2>
              <Link
                href={`/${r.slug}`}
                target="_blank"
                className="text-xs font-bold text-sky-600 hover:underline dark:text-sky-300"
              >
                Ver página pública →
              </Link>
            </div>

            <div className={cardClass}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-[#F5F2EA]/40">
                  Plan y facturación
                </span>
                {user.role === "admin" ? (
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                    Admin
                  </span>
                ) : r.subscription ? (
                  <StatusBadge
                    published={isSubscriptionActive({ status: r.subscription.status, currentPeriodEnd: new Date(r.subscription.currentPeriodEnd) })}
                    activeLabel="Activo"
                    draftLabel={r.subscription.status === "canceled" ? "Cancelado" : "Vencido"}
                  />
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-[#F5F2EA]/50">
                    Sin plan
                  </span>
                )}
              </div>
              {user.role === "admin" ? (
                <p className="mt-1.5 text-sm text-slate-400 dark:text-[#F5F2EA]/40">
                  Cuenta de administrador — acceso completo sin costo, no necesita plan.
                </p>
              ) : r.subscription ? (
                <p className="mt-1.5 text-sm text-slate-600 dark:text-[#F5F2EA]/70">
                  {FEATURE_LABELS[r.subscription.feature]} · {r.subscription.billingCycle === "annual" ? "Anual" : "Mensual"} ·{" "}
                  {formatARS(r.subscription.amount)} {r.subscription.billingCycle === "annual" ? "/ año" : "/ mes"}
                  <br />
                  <span className="text-xs text-slate-400 dark:text-[#F5F2EA]/40">
                    Vence el {new Date(r.subscription.currentPeriodEnd).toLocaleDateString("es-AR")} · Pagado en total:{" "}
                    {formatARS(r.totalPaid)}
                  </span>
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-slate-400 dark:text-[#F5F2EA]/40">Nunca contrató un plan.</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#F5F2EA]/50">
                  Páginas ({r.pages.length})
                </h3>
                {r.pages.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-[#F5F2EA]/40">Sin páginas.</p>
                ) : (
                  r.pages.map((p) => {
                    const template = PAGE_TEMPLATES.find((t) => t.value === p.pageTemplate);
                    return (
                      <div key={p._id} className={cardClass}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{p.name}</span>
                          <StatusBadge published={p.published} activeLabel="Publicada" draftLabel="Borrador" />
                        </div>
                        <div className="mt-1 text-xs font-semibold text-slate-400 dark:text-[#F5F2EA]/40">
                          {template?.label ?? p.pageTemplate}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#F5F2EA]/50">
                  Menús ({r.menus.length})
                </h3>
                {r.menus.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-[#F5F2EA]/40">Sin menús.</p>
                ) : (
                  r.menus.map((m) => {
                    const template = MENU_TEMPLATES.find((t) => t.value === m.menuTemplate);
                    return (
                      <div key={m._id} className={cardClass}>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{m.name}</span>
                          <StatusBadge published={m.published !== false} activeLabel="Activo" draftLabel="Borrador" />
                        </div>
                        <div className="mt-1 text-xs font-semibold text-slate-400 dark:text-[#F5F2EA]/40">
                          {template?.label ?? m.menuTemplate} · {m.items.length} {m.items.length === 1 ? "producto" : "productos"}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
