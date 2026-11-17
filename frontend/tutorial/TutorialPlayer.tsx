"use client";

import { useEffect, useRef } from "react";
import { useTutorialPlayer } from "./useTutorialPlayer";
import { displayFont, monoFont } from "./shared/fonts";
import {
  CheckIcon,
  ChevronIcon,
  CollapseIcon,
  ExpandIcon,
  PauseIcon,
  PlayIcon,
  RestartIcon,
} from "./shared/icons";

export function TutorialPlayer() {
  const {
    steps,
    index,
    progress,
    playing,
    finished,
    expanded,
    goTo,
    goNext,
    goPrev,
    restart,
    togglePlay,
    toggleExpanded,
    onKeyDown,
  } = useTutorialPlayer();

  const focusRef = useRef<HTMLDivElement | null>(null);
  const step = steps[index];

  // Move keyboard focus into the modal as soon as it opens, so arrow keys work right away.
  useEffect(() => {
    if (expanded) focusRef.current?.focus();
  }, [expanded]);

  const PlaybackIcon = finished ? RestartIcon : playing ? PauseIcon : PlayIcon;
  const playbackLabel = finished ? "Volver a reproducir" : playing ? "Pausar" : "Reproducir";

  const card = (
    <div
      className={`grid gap-6 rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-xs sm:p-7 dark:border-white/10 dark:bg-[#141824] ${
        expanded ? "w-full max-w-5xl" : "mx-auto max-w-5xl"
      } lg:grid-cols-[11rem_1.1fr_0.9fr] lg:items-center`}
    >
      {/* Chapters sidebar (desktop only) */}
      <nav aria-label="Índice del tutorial" className="hidden max-h-[22rem] w-44 shrink-0 flex-col gap-1 overflow-y-auto pr-1 lg:flex">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`flex items-start gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] font-semibold transition-colors ${
              i === index
                ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                i === index
                  ? "bg-sky-500 text-white"
                  : i < index || finished
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-slate-200 text-slate-500 dark:bg-white/10"
              }`}
            >
              {i < index || finished ? <CheckIcon className="h-2 w-2" /> : i + 1}
            </span>
            <span>{s.title}</span>
          </button>
        ))}
      </nav>

      {/* Visual side */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir al paso ${i + 1}: ${s.title}`}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
            >
              <span
                className="block h-full rounded-full bg-sky-500"
                style={{
                  width: i < index || finished ? "100%" : i === index ? `${progress}%` : "0%",
                  transition: i === index && !finished ? "width 75ms linear" : undefined,
                }}
              />
            </button>
          ))}
        </div>

        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          {finished ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center dark:border-white/15 dark:bg-white/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div className="text-sm font-bold text-slate-800 dark:text-white">¡Listo! Así se usa TuMenuAhora.</div>
              <button
                type="button"
                onClick={restart}
                className="flex items-center gap-1.5 rounded-full bg-sky-500 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-sky-600"
              >
                <RestartIcon className="h-3 w-3" /> Volver a verlo
              </button>
            </div>
          ) : (
            <step.Visual />
          )}

          <button
            type="button"
            onClick={toggleExpanded}
            aria-label={expanded ? "Salir de pantalla completa" : "Ver en pantalla completa"}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-xs ring-1 ring-slate-200 transition-colors hover:bg-white dark:bg-[#111726]/90 dark:text-slate-300 dark:ring-white/10"
          >
            {expanded ? <CollapseIcon className="h-3.5 w-3.5" /> : <ExpandIcon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Copy + controls side */}
      <div className="flex flex-col gap-4">
        <div>
          <span
            className="text-xs font-bold tracking-wide text-sky-600 uppercase dark:text-sky-400"
            style={monoFont}
          >
            {finished ? "Tutorial completo" : `Paso ${index + 1} de ${steps.length}`}
          </span>
          <h3 className="mt-1.5 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white" style={displayFont}>
            {finished ? "Ya viste todo el recorrido" : step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {finished
              ? "Repasá cualquier paso desde el índice de la izquierda o volvé a reproducirlo entero desde el principio."
              : step.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Paso anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-300 text-slate-600 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-sky-500/50"
          >
            <ChevronIcon dir="left" className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playbackLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-xs transition-colors hover:bg-sky-600"
          >
            <PlaybackIcon className={`h-4 w-4 ${!finished && !playing ? "translate-x-[1px]" : ""}`} />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente paso"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-300 text-slate-600 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-sky-500/50"
          >
            <ChevronIcon dir="right" className="h-3.5 w-3.5" />
          </button>

          <span className="ml-1 text-xs font-medium text-slate-400 dark:text-slate-500">
            {finished ? "Terminado" : playing ? "Reproduciendo…" : "En pausa"}
          </span>
        </div>

        <p className="hidden text-[11px] text-slate-400 lg:block dark:text-slate-500">
          Atajos: ← → para cambiar de paso, espacio para pausar, F para pantalla completa.
        </p>
      </div>
    </div>
  );

  if (!expanded) {
    return (
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
      >
        {card}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) toggleExpanded();
      }}
    >
      <div
        ref={focusRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="max-h-full w-full max-w-5xl overflow-y-auto rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
      >
        {card}
      </div>
    </div>
  );
}
