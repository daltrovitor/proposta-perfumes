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
  title: "ViraWeb | Proposta Técnica: Integração e Carga de Perfumaria",
  description: "Especificação técnica e proposta comercial para automação e cadastramento de perfumes no Mercado Livre, Shopee e TikTok Shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
