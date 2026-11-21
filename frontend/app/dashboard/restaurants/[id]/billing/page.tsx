"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type BillingInfo, type Restaurant, type BillingCycle, type PriceQuote } from "@/lib/api";
import { FEATURE_LABELS, formatARS } from "@/lib/billing";

const cardClass = "rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]";

export default function BillingPage() {
  const params = useParams<{ id: string }>();
  const restaurantId = params.id;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [pending, setPending] = useState<PriceQuote | null>(null);
  const [paying, setPaying] = useState(false);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  async function load() {
    setError(null);
    try {
      const [r, b] = await Promise.all([api.getRestaurant(restaurantId), api.getBilling(restaurantId)]);
      setRestaurant(r);
      setBilling(b);
      if (b.subscription) setCycle(b.subscription.billingCycle);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo cargar la información de facturación.");
    }
  }

  async function handleConfirmPay() {
    if (!pending) return;
    setPaying(true);
    setError(null);
    try {
      await api.subscribe(restaurantId, { feature: pending.feature, billingCycle: pending.billingCycle });
      setPending(null);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo procesar el pago.");
    } finally {
      setPaying(false);
    }
  }

  async function handleCancel() {
    setCanceling(true);
    setError(null);
    try {
      await api.cancelSubscription(restaurantId);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo cancelar el plan.");
    } finally {
      setCanceling(false);
    }
  }

  if (!restaurant || !billing) {
    return error ? (
      <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
        {error}
      </div>
    ) : (
      <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
    );
  }

  const { subscription, isActive, payments, quotes, isAdmin } = billing;
  const quotesForCycle = quotes.filter((q) => q.billingCycle === cycle);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href={`/dashboard/restaurants/${restaurantId}`}
          className="text-xs font-semibold text-sky-600 hover:underline dark:text-sky-300"
        >
          ← Volver al restaurante
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Plan y facturación</h1>
        <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
          {restaurant.name} — esto es una simulación de pago, no se cobra nada real.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          {error}
        </div>
      )}

      {/* CURRENT PLAN */}
      {isAdmin ? (
        <div className={cardClass}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Tu plan actual</h2>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
              Admin
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#F5F2EA]/50">
            Las cuentas de administrador tienen acceso completo sin costo — no necesitás contratar ni pagar ningún plan para publicar
            tu página o activar tu menú.
          </p>
        </div>
      ) : (
        <>
          <div className={cardClass}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Tu plan actual</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                }`}
              >
                {isActive ? "Activo" : subscription?.status === "canceled" ? "Cancelado" : subscription ? "Vencido" : "Sin plan"}
              </span>
            </div>
            {subscription ? (
              <div className="mt-3 flex flex-col gap-1 text-sm">
                <p>
                  <span className="font-bold">{FEATURE_LABELS[subscription.feature]}</span> ·{" "}
                  {subscription.billingCycle === "annual" ? "Plan anual" : "Plan mensual"} · {formatARS(subscription.amount)}
                  {subscription.billingCycle === "annual" ? " / año" : " / mes"}
                </p>
                <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
                  {isActive ? "Vence" : "Venció"} el {new Date(subscription.currentPeriodEnd).toLocaleDateString("es-AR")}
                </p>
                {isActive && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={canceling}
                    className="mt-2 w-fit rounded-full border border-red-200 px-4 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-400/30 dark:text-red-300 dark:hover:bg-red-400/10"
                  >
                    {canceling ? "Cancelando…" : "Cancelar plan"}
                  </button>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500 dark:text-[#F5F2EA]/50">
                Sin un plan activo no podés publicar tu página ni activar tu menú. Elegí uno abajo.
              </p>
            )}
          </div>

          {/* PICK A PLAN */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">Elegir plan</h2>
              <div className="flex rounded-full border border-slate-300 p-1 dark:border-white/15">
                {(["monthly", "annual"] as BillingCycle[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCycle(c)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                      cycle === c ? "bg-sky-500 text-white" : "text-slate-600 dark:text-[#F5F2EA]/70"
                    }`}
                  >
                    {c === "monthly" ? "Mensual" : "Anual (2 meses gratis)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {quotesForCycle.map((quote) => {
                const isCurrent =
                  subscription && isActive && subscription.feature === quote.feature && subscription.billingCycle === cycle;
                return (
                  <div
                    key={quote.feature}
                    className={`flex flex-col gap-3 rounded-2xl border-2 p-5 ${
                      isCurrent ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10" : "border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <h3 className="text-base font-bold">{FEATURE_LABELS[quote.feature]}</h3>
                    <div>
                      <div className="text-2xl font-black">{formatARS(quote.amount)}</div>
                      <div className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">{cycle === "annual" ? "por año" : "por mes"}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPending(quote)}
                      disabled={Boolean(isCurrent)}
                      className="mt-1 rounded-full bg-sky-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isCurrent ? "Tu plan actual" : "Elegir este plan"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* PAYMENT HISTORY */}
      {!isAdmin && payments.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Historial de pagos</h2>
          <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 bg-white dark:border-white/10 dark:bg-[#141824]">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 dark:border-white/10 dark:text-[#F5F2EA]/50">
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Ciclo</th>
                  <th className="px-4 py-3">Monto</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                    <td className="px-4 py-3 text-slate-500 dark:text-[#F5F2EA]/50">
                      {new Date(p.paidAt).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3 font-semibold">{FEATURE_LABELS[p.feature]}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-[#F5F2EA]/70">
                      {p.billingCycle === "annual" ? "Anual" : "Mensual"}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-300">{formatARS(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONFIRM MODAL */}
      {pending && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !paying) setPending(null);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border-2 border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#141824]">
            <h3 className="text-lg font-bold">Confirmar pago simulado</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#F5F2EA]/70">
              {FEATURE_LABELS[pending.feature]} · {pending.billingCycle === "annual" ? "Plan anual" : "Plan mensual"}
            </p>
            <div className="mt-3 text-2xl font-black">{formatARS(pending.amount)}</div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setPending(null)}
                disabled={paying}
                className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-white/15 dark:text-[#F5F2EA] dark:hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmPay}
                disabled={paying}
                className="flex-1 rounded-full bg-sky-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-600 disabled:opacity-60"
              >
                {paying ? "Pagando…" : "Pagar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
