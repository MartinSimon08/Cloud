import { MockFrame } from "../shared/MockFrame";
import { CheckIcon } from "../shared/icons";

const PAGE_TEMPLATES = [
  { label: "Fast Food", color: "from-amber-300 to-orange-400", active: false },
  { label: "Elegante", color: "from-emerald-300 to-teal-400", active: true },
  { label: "Café", color: "from-rose-300 to-pink-400", active: false },
  { label: "Clásico", color: "from-indigo-300 to-sky-400", active: false },
];

export function ElegirPlantillaPagina() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/paginas/nueva">
      <div className="grid grid-cols-2 gap-2">
        {PAGE_TEMPLATES.map((tpl) => (
          <div
            key={tpl.label}
            className={`relative overflow-hidden rounded-xl border-2 p-2 ${
              tpl.active ? "border-sky-400 dark:border-sky-500/60" : "border-slate-200 dark:border-white/10"
            }`}
          >
            <div className={`h-6 w-full rounded-md bg-gradient-to-br ${tpl.color}`} />
            <div className="mt-1 text-[8px] font-bold text-slate-700 dark:text-slate-300">{tpl.label}</div>
            {tpl.active && (
              <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sky-500 text-white">
                <CheckIcon className="h-2 w-2" />
              </span>
            )}
          </div>
        ))}
      </div>
    </MockFrame>
  );
}
