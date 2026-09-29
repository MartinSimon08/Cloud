import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "TuMenuAhora — Menú Digital para Restaurantes",
  description:
    "Tu restaurante, sin papel, sin comisiones, sin vueltas. Escaneá, creá y publicá tu menú digital con TuMenuAhora.",
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
