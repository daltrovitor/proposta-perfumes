// Hello World
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Proposta de Soluções Digitais | Construtora Queiroz Silveira • ViraWeb",
  description:
    "Automação de contratos Clicksign e gestão integrada de projetos, diário de obra e fichas de verificação (FVs) para a Construtora Queiroz Silveira por ViraWeb.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Proposta de Soluções Digitais — Queiroz Silveira & ViraWeb",
    description:
      "Automação de contratos e plataforma de projetos e obras com diário digital e controle de FVs.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className="bg-white text-zinc-900 antialiased min-h-screen selection:bg-[#8e1529] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
