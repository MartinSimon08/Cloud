import { MockFrame } from "../shared/MockFrame";

const DISHES = [
  { emoji: "🍕", name: "Muzzarella grande", price: "$7.800" },
  { emoji: "🍝", name: "Fettuccine Alfredo", price: "$6.200" },
  { emoji: "🥤", name: "Gaseosa línea 500ml", price: "$2.200" },
];

function DragHandle() {
  return (
    <div className="grid shrink-0 grid-cols-2 gap-0.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="h-0.5 w-0.5 rounded-full bg-slate-400 dark:bg-slate-500" />
      ))}
    </div>
  );
}

export function CargarPlatos() {
  return (
    <MockFrame path="tumenuahora.com/panel/pizzeria-napoli/menus/1">
      <div className="flex flex-col gap-1.5">
        {DISHES.map((dish) => (
          <div
            key={dish.name}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-white/10 dark:bg-white/5"
          >
            <DragHandle />
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-[10px] ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10">
              {dish.emoji}
            </span>
            <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-slate-700 dark:text-slate-200">
              {dish.name}
            </span>
            <span className="shrink-0 text-[9px] font-bold text-sky-600 dark:text-sky-400">{dish.price}</span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}
