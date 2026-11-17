import { MockFrame } from "../shared/MockFrame";

function MiniToggle({ on }: { on: boolean }) {
  return (
    <span className={`relative h-4 w-8 rounded-full ${on ? "bg-emerald-400" : "bg-slate-300 dark:bg-white/15"}`}>
      <span
        className="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-all"
        style={{ left: on ? "18px" : "2px" }}
      />
    </span>
  );
}

export function ActivarMenu() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/menus">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
        <span className="text-[9px] font-bold text-slate-700 dark:text-slate-200">Carta principal</span>
        <MiniToggle on />
      </div>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
        <span className="text-[9px] font-bold text-slate-700 dark:text-slate-200">Menú de verano</span>
        <MiniToggle on />
      </div>
      <div className="rounded-lg border border-sky-300 bg-sky-50 px-2.5 py-1.5 text-[8px] font-semibold text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
        A diferencia de tu página, podés tener varios menús activos a la vez.
      </div>
    </MockFrame>
  );
}
