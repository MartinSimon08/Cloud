import { MockFrame } from "../shared/MockFrame";
import { CheckIcon } from "../shared/icons";

export function CrearCuenta() {
  return (
    <MockFrame path="tumenuahora.com/login">
      <div className="mx-auto flex w-full max-w-[220px] flex-col gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-white/10 dark:bg-white/5">
        <div className="text-center text-[10px] font-bold text-slate-800 dark:text-white">Entrá a tu panel</div>
        <div className="rounded-md bg-white px-2.5 py-1.5 text-[8px] text-slate-400 ring-1 ring-slate-200 dark:bg-white/10 dark:text-slate-500 dark:ring-white/10">
          vos@turestaurante.com
        </div>
        <div className="rounded-md bg-white px-2.5 py-1.5 text-[8px] text-slate-400 ring-1 ring-slate-200 dark:bg-white/10 dark:text-slate-500 dark:ring-white/10">
          ••••••••
        </div>
        <div className="flex items-center justify-center gap-1 rounded-md bg-sky-500 py-1.5 text-[9px] font-bold text-white shadow-xs">
          <CheckIcon className="h-2.5 w-2.5" /> Ingresar
        </div>
      </div>
    </MockFrame>
  );
}
