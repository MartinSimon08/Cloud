import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { tutorialSteps } from "./steps";

const STEP_MS = 4800;
const TICK_MS = 50;
const STORAGE_KEY = "tma_tutorial_progress_v1";

interface StoredProgress {
  index: number;
  finished: boolean;
}

function loadStoredProgress(): StoredProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    if (typeof parsed.index !== "number" || parsed.index < 0 || parsed.index >= tutorialSteps.length) return null;
    return { index: parsed.index, finished: Boolean(parsed.finished) };
  } catch {
    return null;
  }
}

function saveStoredProgress(state: StoredProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (private mode, quota); losing the saved step is harmless.
  }
}

export function useTutorialPlayer() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hydratedRef = useRef(false);

  // Resume where the visitor left off, and respect reduced-motion preferences.
  useEffect(() => {
    const stored = loadStoredProgress();
    if (stored && !stored.finished) {
      setIndex(stored.index);
    }
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || stored?.finished) {
      setPlaying(false);
      setFinished(Boolean(stored?.finished));
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    saveStoredProgress({ index, finished });
  }, [index, finished]);

  useEffect(() => {
    if (!playing || finished) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_MS / STEP_MS) * 100;
        if (next < 100) return next;

        setIndex((current) => {
          const isLast = current === tutorialSteps.length - 1;
          if (isLast) {
            setFinished(true);
            setPlaying(false);
            return current;
          }
          return current + 1;
        });
        return 0;
      });
    }, TICK_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, finished, index]);

  const goTo = useCallback((i: number) => {
    setFinished(false);
    setIndex((i + tutorialSteps.length) % tutorialSteps.length);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  const restart = useCallback(() => {
    setFinished(false);
    setIndex(0);
    setProgress(0);
    setPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (finished) {
      restart();
      return;
    }
    setPlaying((p) => !p);
  }, [finished, restart]);

  const toggleExpanded = useCallback(() => setExpanded((e) => !e), []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goPrev();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          togglePlay();
          break;
        case "f":
        case "F":
          event.preventDefault();
          toggleExpanded();
          break;
        case "Escape":
          if (expanded) {
            event.preventDefault();
            setExpanded(false);
          }
          break;
        default:
          break;
      }
    },
    [goNext, goPrev, togglePlay, toggleExpanded, expanded]
  );

  return {
    steps: tutorialSteps,
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
  };
}
