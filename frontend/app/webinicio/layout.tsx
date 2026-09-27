import type { ReactNode } from "react";
import { Fraunces, JetBrains_Mono } from "next/font/google";

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
