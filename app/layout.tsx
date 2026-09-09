import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NXTGEN | Projeto de Orçamento Técnico e Financeiro",
  description:
    "Documento de Escopo e Investimento por Fases (v2.1) — Ecossistema Digital NXTGEN (NXT PASS, NXT BANK, NXT LIVE, NXT INVEST, NXT ME).",
  icons: {
    icon: "https://viraweb.online/favicon.png",
    shortcut: "https://viraweb.online/favicon.png",
    apple: "https://viraweb.online/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

