import { MockFrame } from "../shared/MockFrame";
import { CheckIcon, WarnIcon } from "../shared/icons";

const CONTENT_ROWS = [
  { label: "Hero / portada", done: true },
  { label: "Platos destacados", done: true },
  { label: "Por qué elegirnos", done: true },
  { label: "Testimonios", done: false },
];

export function CompletarContenido() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/paginas/1">
      <div className="flex flex-col gap-1.5">
        {CONTENT_ROWS.map((row) => (
          <div key={row.label} className="flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-white/5">
            {row.done ? (
              <CheckIcon className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
            ) : (
              <WarnIcon className="h-2.5 w-2.5 shrink-0 text-amber-500" />
            )}
            <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300">{row.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-[8px] font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
        Para publicar todavía falta: Testimonios
      </div>
    </MockFrame>
  );
}
