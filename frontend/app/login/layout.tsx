import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión | TuMenuAhora",
  description: "Ingresá o creá tu cuenta para administrar el menú digital de tu negocio.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
