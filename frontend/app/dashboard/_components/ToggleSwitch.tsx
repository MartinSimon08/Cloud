"use client";

export function ToggleSwitch({
  name,
  defaultChecked,
  label = "Mostrar",
}: {
  name: string;
  defaultChecked: boolean;
  label?: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-[#F5F2EA]/40">
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-slate-300 transition-colors peer-checked:bg-sky-500 dark:bg-white/15" />
        <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </span>
      {label}
    </label>
  );
}
