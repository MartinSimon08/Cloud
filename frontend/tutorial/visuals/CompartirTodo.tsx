import { MockFrame } from "../shared/MockFrame";

function QrGlyph() {
  const filled = [0, 1, 2, 4, 7, 8, 11, 13, 14, 15];
  return (
    <div className="grid h-14 w-14 shrink-0 grid-cols-4 grid-rows-4 gap-0.5 rounded-md bg-white p-1 ring-1 ring-slate-200 dark:ring-white/10">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className={`rounded-[1px] ${filled.includes(i) ? "bg-slate-800 dark:bg-slate-200" : "bg-transparent"}`} />
      ))}
    </div>
  );
}

export function CompartirTodo() {
  return (
    <MockFrame path="tumenuahora.com/pizzeria-napoli">
      <div className="flex items-center gap-3">
        <QrGlyph />
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold text-slate-700 dark:text-slate-200">Código QR listo</div>
          <div className="mt-1 truncate text-[8px] text-slate-500 dark:text-slate-400">Imprimilo en tus mesas</div>
        </div>
      </div>
      <div className="truncate rounded-full bg-sky-50 px-3 py-1.5 text-center text-[8px] font-bold text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
        tumenuahora.com/pizzeria-napoli
      </div>
      <div className="truncate rounded-full bg-slate-100 px-3 py-1.5 text-center text-[8px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">
        tumenuahora.com/pizzeria-napoli/menu
      </div>
    </MockFrame>
  );
}
