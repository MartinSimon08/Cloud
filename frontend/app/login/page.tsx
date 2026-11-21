"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, confirmSignUp, resendConfirmationCode, signIn, syncIdTokenCookie } from "@/lib/auth";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

type Mode = "login" | "register" | "confirm";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-sky-400 dark:focus:bg-transparent";

const labelClass = "flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75";

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Ocurrió un error inesperado.";
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const passwordsMismatch = confirmPassword.length > 0 && registerPassword !== confirmPassword;

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
    setRegisterPassword("");
    setConfirmPassword("");
  }

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    setLoading(true);
    try {
      const session = await signIn(email, password);
      syncIdTokenCookie(session.getIdToken().getJwtToken());
      router.push("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleRegisterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");

    if (passwordsMismatch || registerPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, registerPassword);
      setPendingEmail(email);
      switchMode("confirm");
      setNotice("Te mandamos un código de verificación por email.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const code = String(form.get("code") ?? "");

    setLoading(true);
    try {
      await confirmSignUp(pendingEmail, code);
      switchMode("login");
      setNotice("Cuenta confirmada — ya podés iniciar sesión.");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    try {
      await resendConfirmationCode(pendingEmail);
      setNotice("Te reenviamos el código.");
    } catch (err) {
      setError(errorMessage(err));
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-sky-100/40 via-[#F8FAFC] to-slate-100/70 px-5 py-10 dark:from-[#0c1220] dark:via-[#090D16] dark:to-[#090D16]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Link href="/webinicio" className="flex items-center gap-2 text-xl font-black tracking-tight">
            <span className="text-[#4A90E2] dark:text-[#7CB3E9]">TuMenu</span>
            <span className="text-[#FF6B8B] dark:text-[#FF8EA8]">Ahora</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="rounded-3xl border-2 border-slate-200/90 bg-white p-6 shadow-xl shadow-sky-500/5 sm:p-8 dark:border-white/10 dark:bg-[#141824] dark:shadow-none">
          {mode !== "confirm" && (
            <div className="mb-6 flex rounded-xl border border-slate-200 bg-slate-100 p-1 text-sm font-bold dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-lg py-2 transition-colors ${
                  mode === "login"
                    ? "bg-white text-sky-600 shadow-xs dark:bg-[#1c2333] dark:text-sky-300"
                    : "text-slate-500 dark:text-[#F5F2EA]/50"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex-1 rounded-lg py-2 transition-colors ${
                  mode === "register"
                    ? "bg-white text-sky-600 shadow-xs dark:bg-[#1c2333] dark:text-sky-300"
                    : "text-slate-500 dark:text-[#F5F2EA]/50"
                }`}
              >
                Registrarse
              </button>
            </div>
          )}

          {notice && (
            <div className="mb-5 rounded-xl border border-sky-300 bg-sky-50 px-4 py-3 text-xs font-medium text-sky-800 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300">
              {notice}
            </div>
          )}
          {error && (
            <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
              {error}
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <label className={labelClass}>
                Email
                <input name="email" type="email" required placeholder="tu@negocio.com" className={inputClass} />
              </label>
              <label className={labelClass}>
                Contraseña
                <input name="password" type="password" required placeholder="••••••••" className={inputClass} />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? "Ingresando…" : "Ingresar"}
              </button>
              <p className="text-center text-xs text-slate-500 dark:text-[#F5F2EA]/50">
                ¿No tenés cuenta todavía?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-bold text-sky-600 hover:underline dark:text-sky-300"
                >
                  Registrate acá
                </button>
              </p>
            </form>
          )}

          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
              <label className={labelClass}>
                Email
                <input name="email" type="email" required placeholder="tu@negocio.com" className={inputClass} />
              </label>
              <label className={labelClass}>
                Contraseña
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className={inputClass}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <span className="text-[11px] font-normal text-slate-400 dark:text-[#F5F2EA]/40">
                  Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
                </span>
              </label>
              <label className={labelClass}>
                Confirmar contraseña
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className={inputClass}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordsMismatch && (
                  <span className="text-[11px] font-semibold text-red-500 dark:text-red-400">
                    Las contraseñas no coinciden.
                  </span>
                )}
              </label>
              <button
                type="submit"
                disabled={loading || passwordsMismatch}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? "Creando cuenta…" : "Crear cuenta"}
              </button>
              <p className="text-center text-xs text-slate-500 dark:text-[#F5F2EA]/50">
                ¿Ya tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-bold text-sky-600 hover:underline dark:text-sky-300"
                >
                  Iniciá sesión
                </button>
              </p>
            </form>
          )}

          {mode === "confirm" && (
            <form onSubmit={handleConfirmSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-slate-600 dark:text-[#F5F2EA]/70">
                Ingresá el código que te mandamos a <strong>{pendingEmail}</strong>.
              </p>
              <label className={labelClass}>
                Código de verificación
                <input name="code" type="text" required inputMode="numeric" placeholder="123456" className={inputClass} />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? "Confirmando…" : "Confirmar cuenta"}
              </button>
              <p className="text-center text-xs text-slate-500 dark:text-[#F5F2EA]/50">
                ¿No te llegó?{" "}
                <button type="button" onClick={handleResend} className="font-bold text-sky-600 hover:underline dark:text-sky-300">
                  Reenviar código
                </button>
              </p>
            </form>
          )}
        </div>

        <Link
          href="/webinicio"
          className="mt-6 text-center text-xs font-semibold text-slate-500 hover:text-sky-600 dark:text-[#F5F2EA]/50 dark:hover:text-sky-300"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
