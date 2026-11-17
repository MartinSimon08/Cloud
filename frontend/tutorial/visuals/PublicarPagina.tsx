import { MockFrame } from "../shared/MockFrame";
import { CheckIcon } from "../shared/icons";

export function PublicarPagina() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/paginas/1">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/5">
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">Publicar página</span>
        <span className="relative h-4 w-8 rounded-full bg-emerald-400">
          <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow" />
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-2 text-[9px] font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
        <CheckIcon className="h-3 w-3" /> Página publicada
      </div>
      <div className="truncate rounded-full bg-sky-50 px-3 py-1.5 text-center text-[8px] font-bold text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
        tumenuahora.com/pizzeria-napoli
      </div>
    </MockFrame>
  );
}
