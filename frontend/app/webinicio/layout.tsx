import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "TuMenuAhora — Menú digital para bares y restaurantes",
  description:
    "Armá tu carta digital, sumá pedidos por tu propio dominio y dejá de depender de apps de delivery con comisión.",
};

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function WebInicioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${fraunces.variable} ${jetbrainsMono.variable} flex flex-1 flex-col`}>
      {children}
    </div>
  );
}
