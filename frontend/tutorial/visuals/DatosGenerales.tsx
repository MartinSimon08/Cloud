import { MockFrame } from "../shared/MockFrame";
import { CheckIcon, PlusIcon } from "../shared/icons";

export function DatosGenerales() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/perfil">
      <div className="flex gap-2.5">
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 py-3 text-slate-400 dark:border-white/15 dark:text-slate-500">
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="text-[8px] font-bold">Logo</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border-2 border-sky-300 bg-sky-50 py-3 text-sky-500 dark:border-sky-500/40 dark:bg-sky-500/10">
          <CheckIcon className="h-3.5 w-3.5" />
          <span className="text-[8px] font-bold">Portada</span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-white/5">
        <span className="text-[8px] text-slate-500 dark:text-slate-400">📍 Av. Corrientes 1234</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-white/5">
        <CheckIcon className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
        <span className="truncate text-[8px] text-slate-500 dark:text-slate-400">maps.google.com/?q=...</span>
      </div>
    </MockFrame>
  );
}
