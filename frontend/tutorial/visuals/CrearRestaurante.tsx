import { MockFrame } from "../shared/MockFrame";
import { PlusIcon } from "../shared/icons";

export function CrearRestaurante() {
  return (
    <MockFrame path="tumenuahora.com/panel">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-800 dark:text-white">Mis restaurantes</span>
        <span className="flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-[9px] font-bold text-white shadow-xs">
          <PlusIcon className="h-2.5 w-2.5" /> Nuevo
        </span>
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-white/10 dark:bg-white/5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-pink-400 text-xs">
          🍕
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[10px] font-bold text-slate-800 dark:text-white">Pizzería Napoli</div>
          <div className="truncate text-[9px] text-slate-500 dark:text-slate-400">/pizzeria-napoli</div>
        </div>
        <span className="shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-[8px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
          Borrador
        </span>
      </div>
    </MockFrame>
  );
}
