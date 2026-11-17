import { MockFrame } from "../shared/MockFrame";
import { PlusIcon } from "../shared/icons";

const MENUS = [
  { name: "Carta principal", items: 24, active: true },
  { name: "Menú de verano", items: 9, active: true },
];

export function CrearMenu() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/menus">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-800 dark:text-white">Mis menús</span>
        <span className="flex items-center gap-1 rounded-full bg-pink-500 px-2.5 py-1 text-[9px] font-bold text-white shadow-xs">
          <PlusIcon className="h-2.5 w-2.5" /> Nuevo menú
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {MENUS.map((menu) => (
          <div
            key={menu.name}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 dark:border-white/10 dark:bg-white/5"
          >
            <div className="min-w-0">
              <div className="truncate text-[9px] font-bold text-slate-800 dark:text-white">{menu.name}</div>
              <div className="text-[8px] text-slate-500 dark:text-slate-400">{menu.items} platos</div>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              Activo
            </span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}
