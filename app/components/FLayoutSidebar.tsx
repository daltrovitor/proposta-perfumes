// Hello World
"use client";

import React, { useEffect, useState } from "react";
import {
  FileText,
  Bot,
  Layers,
  Calculator,
  CheckSquare,
  Printer,
  MessageCircle,
  Play,
  ArrowUpRight,
} from "lucide-react";
import confetti from "canvas-confetti";

interface FLayoutSidebarProps {
  onReplayIntro?: () => void;
}

const SECTIONS = [
  { id: "apresentacao", number: "00", label: "Apresentação Institucional", icon: FileText },
  { id: "produto-01-robo", number: "01", label: "Produto 01: Robô Clicksign", icon: Bot },
  { id: "produto-02-sistema", number: "02", label: "Produto 02: Gestão de Obras", icon: Layers },
  { id: "consolidacao", number: "03", label: "Consolidação & Investimento", icon: Calculator },
  { id: "fechamento", number: "04", label: "Definições para Fechamento", icon: CheckSquare },
];

export default function FLayoutSidebar({ onReplayIntro }: FLayoutSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("apresentacao");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8e1529", "#0d233e", "#e69900", "#ffffff"],
    });
  };

  const openWhatsApp = (context: "aprovar" | "duvida") => {
    triggerConfetti();
    const phone = "5562996841378"; // WhatsApp comercial ViraWeb
    let msg = "";
    if (context === "aprovar") {
      msg =
        "Olá! Analisei a Proposta de Soluções Digitais para a Construtora Queiroz Silveira (R$ 6.250,00 de desenvolvimento dos 2 produtos) e gostaria de avançar para as definições de fechamento e contrato com a ViraWeb.";
    } else {
      msg =
        "Olá! Gostaria de tirar uma dúvida sobre a proposta técnica de automação e gestão de obras da Queiroz Silveira.";
    }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Barra móvel para Mobile (horizontal scrollable pills) */}
      <div className="lg:hidden sticky top-16 z-20 bg-white/95 backdrop-blur-sm border-b border-zinc-200 px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
        {SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            aria-label={`Ir para a seção ${sec.label}`}
            className={`flex-shrink-0 px-3 py-1.5 text-xs font-mono rounded-sm transition-colors cursor-pointer border ${
              activeSection === sec.id
                ? "bg-[#8e1529] text-white border-[#8e1529] font-bold"
                : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            {sec.number}. {sec.label.split(":")[0]}
          </button>
        ))}
      </div>

      {/* Coluna Lateral Fixa para Desktop (Espinha do Padrão F) */}
      <aside aria-label="Navegação da proposta" className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
        <div className="sticky top-24 space-y-6">
          {/* Card Resumo da Proposta */}
          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="text-[10px] font-mono tracking-widest text-[#8e1529] uppercase font-bold">
              CLIENTE PROPONENTE
            </div>
            <h2 className="text-base font-bold text-zinc-900 mt-1 leading-snug">
              Construtora Queiroz Silveira
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Proposta Comercial • Setembro de 2026
            </p>

            {/* Metadados Chave */}
            <div className="mt-4 pt-3 border-t border-zinc-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Desenvolvimento Total:</span>
                <span className="font-mono font-bold text-zinc-900">R$ 6.250,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Produtos Inclusos:</span>
                <span className="font-mono font-semibold text-zinc-700">02 Soluções</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Status:</span>
                <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-sm">
                  Disponível p/ Fechamento
                </span>
              </div>
            </div>
          </div>

          {/* Navegação F-Pattern */}
          <nav aria-label="Seções da proposta" className="bg-white border border-zinc-200 rounded-sm p-3">
            <div className="px-3 py-2 text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-400">
              Sumário de Leitura (Padrão F)
            </div>
            <div className="space-y-1 mt-1">
              {SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollTo(sec.id)}
                    aria-label={`Navegar para a seção ${sec.label}`}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#8e1529] text-white font-semibold shadow-xs"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`font-mono text-[11px] ${isActive ? "text-white/80" : "text-zinc-400"}`}>
                        {sec.number}
                      </span>
                      <span className="truncate">{sec.label}</span>
                    </div>
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`} />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Ações Diretas */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => openWhatsApp("aprovar")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8e1529] hover:bg-[#780f21] text-white text-xs font-bold tracking-wide uppercase rounded-sm cursor-pointer transition-colors shadow-xs"
              aria-label="Aprovar proposta comercial via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Aprovar Proposta</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium rounded-sm cursor-pointer transition-colors"
              aria-label="Exportar proposta em PDF ou imprimir"
            >
              <Printer className="w-4 h-4" />
              <span>Exportar PDF / Imprimir</span>
            </button>

            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                aria-label="Rever animação de abertura ViraWeb"
              >
                <Play className="w-3 h-3" />
                <span>Rever animação da marca</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
