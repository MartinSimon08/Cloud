export function MockFrame({
  children,
  path = "tumenuahora.com",
}: {
  children: React.ReactNode;
  path?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xs dark:border-white/10 dark:bg-[#111726]">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate rounded-full bg-slate-200 px-2.5 py-0.5 text-[9px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400">
          {path}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2.5 p-4 sm:p-5">{children}</div>
    </div>
  );
}
