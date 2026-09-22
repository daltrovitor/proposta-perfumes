// Hello World
"use client";

import React, { useState } from "react";
import Image from "next/image";
import IntroViraweb from "./components/IntroViraweb";
import FLayoutSidebar from "./components/FLayoutSidebar";
import RobotFlowChart from "./components/RobotFlowChart";
import ProposalCalculator from "./components/ProposalCalculator";
import {
  Bot,
  Layers,
  FileCheck2,
  FolderSync,
  ClipboardList,
  Shield,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  HardHat,
  MessageCircle,
  FileSpreadsheet,
  Workflow,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileText,
  Clock,
  Printer,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ProposalPage() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#8e1529", "#0d233e", "#e69900", "#ffffff"],
    });
  };

  const openWhatsApp = (context: string) => {
    triggerConfetti();
    const phone = "5562996841378";
    const msg = `Olá! Gostaria de avançar na Proposta de Soluções Digitais da Construtora Queiroz Silveira (${context}) com a ViraWeb.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Animação de Entrada Mandatória ViraWeb (letra por letra a cada 0.6s) */}
      {showIntro && <IntroViraweb onComplete={() => setShowIntro(false)} />}

      <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
        {/* Cabeçalho Institucional Fixo */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Parceria de Marcas: ViraWeb & Construtora Queiroz Silveira */}
            <div className="flex items-center gap-3 sm:gap-5">
              <a
                href="https://viraweb.online"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-opacity hover:opacity-85 cursor-pointer"
                title="ViraWeb Soluções Digitais"
              >
                <Image
                  src="/viraweb.png"
                  alt="ViraWeb Soluções Digitais"
                  width={140}
                  height={42}
                  priority
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </a>

              <div className="h-5 w-px bg-zinc-300" aria-hidden="true" />

              <div className="flex items-center gap-2">
                <Image
                  src="/queiroz-silveira.png"
                  alt="Construtora Queiroz Silveira"
                  width={110}
                  height={36}
                  priority
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>
            </div>

            {/* Ações Rápidas no Cabeçalho */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-600 bg-zinc-100 rounded-sm border border-zinc-200">
                <Calendar className="w-3.5 h-3.5 text-[#8e1529]" />
                <span>Setembro de 2026</span>
              </span>

              <button
                type="button"
                onClick={() => openWhatsApp("Aprovação Geral")}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#8e1529] hover:bg-[#780f21] text-white text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors shadow-xs"
                aria-label="Aprovar proposta comercial via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Aprovar Proposta</span>
                <span className="sm:hidden">Aprovar</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium rounded-sm cursor-pointer transition-colors"
                aria-label="Exportar proposta em PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* Faixa de Destaque Superior (Varredura Topo do Padrão F) */}
        <section aria-label="Resumo Executivo" className="border-b border-zinc-200 bg-zinc-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-700">
              <span className="inline-block w-2 h-2 rounded-full bg-[#8e1529]" />
              <span className="font-semibold text-zinc-900">Documento Oficial:</span>
              <span>Proposta de Soluções Digitais • Ref. Reunião 16/09 (Marília V. & Rodrigo)</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500 font-mono text-[11px]">
              <span>2 Soluções Estruturadas</span>
              <span>•</span>
              <span className="text-[#8e1529] font-bold">Investimento Consolidado: R$ 6.250,00</span>
            </div>
          </div>
        </section>

        {/* Corpo Principal com Composição em Padrão F */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
            {/* Coluna Esquerda: Trilha Lateral F-Pattern (Sidebar) */}
            <FLayoutSidebar onReplayIntro={() => setShowIntro(true)} />

            {/* Coluna Direita: Área de Leitura Principal */}
            <main id="main-content" className="flex-1 w-full space-y-16">
              {/* ========================================================
                  SEÇÃO 00: APRESENTAÇÃO INSTITUCIONAL & CONTEXTO
              ======================================================== */}
              <section id="apresentacao" className="scroll-mt-24 space-y-6">
                <div className="border-b border-zinc-200 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#8e1529] font-bold px-2 py-0.5 bg-[#8e1529]/10 rounded-sm">
                      PROPOSTA COMERCIAL | SETEMBRO DE 2026
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                    Proposta de Soluções Digitais
                  </h1>

                  <p className="text-lg sm:text-xl font-medium text-[#8e1529] mt-2">
                    Construtora Queiroz Silveira
                  </p>

                  <p className="text-sm sm:text-base text-zinc-600 mt-3 max-w-3xl leading-relaxed">
                    Desenvolvimento e implantação de soluções digitais dedicadas para a modernização das rotinas operacionais da construtora, abrangendo a automação completa do fluxo de contratos com Clicksign e a plataforma centralizada de gestão de projetos, diário de obra e fichas de verificação.
                  </p>
                </div>

                {/* Contexto da Solicitação da Queiroz Silveira */}
                <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-sm">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm text-zinc-700">
                      <p className="font-bold text-zinc-900">
                        Alinhamento de Escopo (Conforme Reunião do dia 16/09 com Marília V. e Rodrigo):
                      </p>
                      <p className="text-zinc-600 leading-relaxed">
                        A proposta foi dimensionada especificamente para atender às três demandas prioritárias da construtora:
                        (1) centralização e armazenamento de projetos similar ao Autodoc e à Maleta do Engenheiro;
                        (2) robô automatizado para transferência de contratos concluídos no Clicksign para pastas de rede do servidor; e
                        (3) aplicação para registro de FVs (Fichas de Verificação) e Diário de Obra diário.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Os 2 Pilares Fundamentais em Destaque */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-6 border border-zinc-200 rounded-sm bg-white hover:border-zinc-300 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[#8e1529]/10 text-[#8e1529] flex items-center justify-center font-mono font-bold text-sm">
                      01
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mt-4">
                      Automação dos Contratos
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                      Arquivamento automático de cada contrato assinado por todos os signatários, organizado por empreendimento e cliente, com geração de relatório consolidado mensal no 1º dia útil.
                    </p>
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Desenvolvimento Robô:</span>
                      <span className="font-bold text-zinc-900">R$ 2.000,00</span>
                    </div>
                  </div>

                  <div className="p-6 border border-zinc-200 rounded-sm bg-white hover:border-zinc-300 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-[#0d233e]/10 text-[#0d233e] flex items-center justify-center font-mono font-bold text-sm">
                      02
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mt-4">
                      Projetos e Acompanhamento de Obras
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                      Compartilhamento de arquivos por disciplina técnica, notificações ativas de movimentação (retirada/devolução) e registro diário dos serviços executados (Diário de Obra e FVs).
                    </p>
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Condição Especial QS:</span>
                      <span className="font-bold text-[#8e1529]">R$ 4.250,00</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================
                  SEÇÃO 01: PRODUTO 01 — AUTOMAÇÃO DOS CONTRATOS (ROBÔ)
              ======================================================== */}
              <section id="produto-01-robo" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-sm bg-zinc-900 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      PRODUTO 01
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Automação Contratual</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Automação dos Contratos (Robô Clicksign)
                  </h2>
                  <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
                    Integração robótica em segundo plano para eliminação total do trabalho manual de conferência, download e renomeação de contratos finalizados.
                  </p>
                </div>

                {/* 3 Blocos de Funcionamento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-zinc-200 rounded-sm bg-white">
                    <div className="text-xs font-mono text-[#8e1529] font-bold">FLUXO EM TEMPO REAL</div>
                    <h3 className="font-bold text-sm text-zinc-900 mt-1">A cada contrato concluído</h3>
                    <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                      Assim que todos assinarem e o Clicksign disparar o contrato finalizado, o robô salva o documento na pasta exata do empreendimento e do cliente.
                    </p>
                  </div>

                  <div className="p-4 border border-zinc-200 rounded-sm bg-white">
                    <div className="text-xs font-mono text-[#8e1529] font-bold">FECHAMENTO MENSAL</div>
                    <h3 className="font-bold text-sm text-zinc-900 mt-1">Relatório no 1º dia útil</h3>
                    <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                      O robô faz o fechamento contábil e documental do mês anterior, gerando um relatório completo de todos os contratos assinados naquele período.
                    </p>
                  </div>

                  <div className="p-4 border border-zinc-200 rounded-sm bg-white">
                    <div className="text-xs font-mono text-[#8e1529] font-bold">AUDITORIA SEGURA</div>
                    <h3 className="font-bold text-sm text-zinc-900 mt-1">Histórico para consulta</h3>
                    <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                      Cada relatório gerado é salvo na pasta de relatórios institucionais da Queiroz Silveira, devidamente organizada pelo mês de referência.
                    </p>
                  </div>
                </div>

                {/* Diagrama Arquitetural do Robô */}
                <RobotFlowChart />

                {/* Tabela de Investimento da Automação */}
                <div className="border border-zinc-200 rounded-sm overflow-hidden bg-white">
                  <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-200 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                      Investimento na Automação (Produto 01)
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">Valores Fechados</span>
                  </div>
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500 font-mono text-[11px] uppercase bg-white">
                        <th className="py-3 px-4 font-semibold">Item</th>
                        <th className="py-3 px-4 font-semibold">Descrição Técnica</th>
                        <th className="py-3 px-4 font-semibold text-right">Valor Proposto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-zinc-900">Desenvolvimento do robô</td>
                        <td className="py-3.5 px-4 text-zinc-600">
                          Desenvolvimento completo do script robótico de integração com API Clicksign, regras de nomenclatura e salvamento em rede.
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-zinc-900 text-right">
                          R$ 2.000,00
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-zinc-900">Implementação por CNPJ</td>
                        <td className="py-3.5 px-4 text-zinc-600">
                          Setup da estrutura de pastas, chaves de webhook e parametrização do robô por empresa/SPE da construtora.
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-zinc-700 text-right">
                          R$ 500,00 <span className="text-xs text-zinc-500 font-normal">por CNPJ</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-zinc-900">Manutenção do robô</td>
                        <td className="py-3.5 px-4 text-zinc-600">
                          Monitoramento de integridade, logs de falhas e garantia de funcionamento contínuo do serviço.
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-zinc-700 text-right">
                          R$ 100,00 <span className="text-xs text-zinc-500 font-normal">por CNPJ*</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-3 bg-zinc-50/70 border-t border-zinc-200 text-[11px] text-zinc-500 font-mono">
                    *Periodicidade da manutenção do robô: a confirmar na etapa de fechamento comercial.
                  </div>
                </div>
              </section>

              {/* ========================================================
                  SEÇÃO 02: PRODUTO 02 — GESTÃO DE PROJETOS E OBRAS
              ======================================================== */}
              <section id="produto-02-sistema" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-sm bg-[#8e1529] text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      PRODUTO 02
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Plataforma Web & Mobile</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Gestão de Projetos e Obras
                  </h2>
                  <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
                    Ambiente unificado para controle de engenharia, armazenamento de projetos, notificações em tempo real, diário de obra e fichas de verificação (FVs).
                  </p>
                </div>

                {/* Grid dos Módulos do Sistema */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Módulo 1: Projetos em Pastas */}
                  <div className="p-5 border border-zinc-200 rounded-sm bg-white space-y-2">
                    <div className="flex items-center gap-2 text-[#8e1529]">
                      <Layers className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-zinc-900">Projetos Organizados em Pastas</h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Estruturação por disciplinas (Elétrico, Estrutural, Hidráulico, Arquitetura, etc.). Profissionais credenciados consultam e realizam upload e download com agilidade similar ao Autodoc e Maleta do Engenheiro.
                    </p>
                  </div>

                  {/* Módulo 2: Versionamento no Mesmo Local */}
                  <div className="p-5 border border-zinc-200 rounded-sm bg-white space-y-2">
                    <div className="flex items-center gap-2 text-[#8e1529]">
                      <FolderSync className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-zinc-900">Alterações no Mesmo Local</h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Ao atualizar uma prancha ou arquivo técnico, o profissional envia a nova versão para a mesma pasta. O sistema versiona e notifica automaticamente todos os usuários com acesso ativo.
                    </p>
                  </div>

                  {/* Módulo 3: Movimentação Acompanhada */}
                  <div className="p-5 border border-zinc-200 rounded-sm bg-white space-y-2">
                    <div className="flex items-center gap-2 text-[#8e1529]">
                      <Workflow className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-zinc-900">Movimentação Acompanhada</h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      O sistema registra e notifica a retirada do projeto para trabalho e a subsequente devolução da versão atualizada, garantindo que ninguém trabalhe com plantas defasadas na obra.
                    </p>
                  </div>

                  {/* Módulo 4: Diário de Obra & FVs */}
                  <div className="p-5 border border-zinc-200 rounded-sm bg-white space-y-2">
                    <div className="flex items-center gap-2 text-[#8e1529]">
                      <HardHat className="w-5 h-5" />
                      <h3 className="font-bold text-sm text-zinc-900">Diário de Obra & Fichas de Verificação (FVs)</h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Histórico diário do canteiro de obras: registro dos serviços executados no dia, observações climáticas/equipe, upload de FVs e fotos do andamento, com consulta permanente em qualquer dispositivo.
                    </p>
                  </div>
                </div>

                {/* Detalhamento dos Módulos Administrativos (Conforme Imagem enviada) */}
                <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-[#8e1529]" />
                    <span className="text-xs font-mono font-bold uppercase text-zinc-800">
                      Módulos de Gestão e Segurança Inclusos
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-zinc-600">
                    <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                      <span className="font-bold text-zinc-900 block mb-1">Painel Admin & Auth</span>
                      Controle de acessos, criação de classes de usuários e permissões granulares por cargo.
                    </div>
                    <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                      <span className="font-bold text-zinc-900 block mb-1">Gestão de Obras (CRUD)</span>
                      Cadastro de empreendimentos, status da obra em tempo real e galeria de fotos do projeto.
                    </div>
                    <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                      <span className="font-bold text-zinc-900 block mb-1">Armazém de Contratos</span>
                      Interface de consulta direta dos contratos arquivados pelo robô do Produto 01.
                    </div>
                    <div className="p-3 bg-white border border-zinc-200 rounded-sm">
                      <span className="font-bold text-zinc-900 block mb-1">Central de Notificações</span>
                      Alertas automáticos via e-mail e push a cada alteração ou liberação de nova prancha.
                    </div>
                  </div>
                </div>

                {/* Tabela de Investimento no Sistema (Referência vs Condição Especial) */}
                <div className="border border-zinc-200 rounded-sm overflow-hidden bg-white">
                  <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-200 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                      Investimento no Sistema de Projetos & Obras (Produto 02)
                    </span>
                    <span className="text-xs text-emerald-700 font-mono font-bold">
                      Condição Especial Construtora Queiroz Silveira
                    </span>
                  </div>
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500 font-mono text-[11px] uppercase bg-white">
                        <th className="py-3 px-4 font-semibold">Item</th>
                        <th className="py-3 px-4 font-semibold">Referência de Tabela</th>
                        <th className="py-3 px-4 font-semibold">Condição Especial QS</th>
                        <th className="py-3 px-4 font-semibold text-right">Economia Direta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-zinc-900">Desenvolvimento do Sistema</td>
                        <td className="py-3.5 px-4 font-mono text-zinc-400 line-through">R$ 7.500,00</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#8e1529]">
                          R$ 4.250,00
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold text-right">
                          - R$ 3.250,00 (43% OFF)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-zinc-900">Manutenção e Suporte Mensal</td>
                        <td className="py-3.5 px-4 font-mono text-zinc-400 line-through">R$ 1.500,00/mês</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#8e1529]">
                          R$ 625,00/mês
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-700 font-bold text-right">
                          - R$ 875,00/mês (58% OFF)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ========================================================
                  SEÇÃO 03: CONSOLIDAÇÃO DA PROPOSTA & SIMULADOR
              ======================================================== */}
              <section id="consolidacao" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-sm bg-zinc-800 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      CONSOLIDAÇÃO
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Visão Geral dos Custos</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Consolidação Comercial & Valor Final
                  </h2>
                  <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
                    Transparência absoluta entre os custos de engenharia inicial e a sustentação contínua da infraestrutura.
                  </p>
                </div>

                {/* Bloco de Consolidação Rápida */}
                <div className="p-6 bg-zinc-900 text-white rounded-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="text-[11px] font-mono tracking-wider uppercase text-amber-400 font-bold">
                        DESENVOLVIMENTO DOS DOIS PRODUTOS
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight mt-1">
                        R$ 6.250,00
                      </div>
                      <p className="text-xs text-zinc-400 mt-2 max-w-lg">
                        Compreende o desenvolvimento do Robô Clicksign (R$ 2.000,00) somado ao Sistema de Gestão de Projetos e Obras (R$ 4.250,00).
                      </p>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-zinc-700 pt-4 md:pt-0 md:pl-6 space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-zinc-400 block">Implementação no Robô:</span>
                        <span className="font-bold text-white text-sm">+ R$ 500,00 por CNPJ</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">Manutenção do Sistema:</span>
                        <span className="font-bold text-emerald-400 text-sm">R$ 625,00 / mês</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block">Manutenção do Robô:</span>
                        <span className="text-zinc-300 text-xs">R$ 100,00 por CNPJ (periodicidade a confirmar)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulador Interativo */}
                <ProposalCalculator />
              </section>

              {/* ========================================================
                  SEÇÃO 04: DEFINIÇÕES PARA O FECHAMENTO & PRÓXIMOS PASSOS
              ======================================================== */}
              <section id="fechamento" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-sm bg-[#8e1529] text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                      ETAPAS FINAIS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Alinhamento Técnico & Contratual</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Definições para o Fechamento
                  </h2>
                  <p className="text-sm text-zinc-600 mt-1 max-w-2xl">
                    Itens a serem alinhados na reunião de validação da proposta para início imediato do desenvolvimento.
                  </p>
                </div>

                {/* 3 Pilares de Fechamento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 border border-zinc-200 rounded-sm bg-white">
                    <div className="w-8 h-8 rounded-sm bg-zinc-100 flex items-center justify-center font-mono font-bold text-xs text-zinc-700 mb-3">
                      A
                    </div>
                    <h3 className="font-bold text-sm text-zinc-900">Condições Comerciais</h3>
                    <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Definição da quantidade inicial de CNPJs / SPEs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Periodicidade da manutenção do robô (mensal, trimestral ou anual).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Cronograma de entrega e condições de faturamento.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 border border-zinc-200 rounded-sm bg-white">
                    <div className="w-8 h-8 rounded-sm bg-zinc-100 flex items-center justify-center font-mono font-bold text-xs text-zinc-700 mb-3">
                      B
                    </div>
                    <h3 className="font-bold text-sm text-zinc-900">Fluxo dos Projetos</h3>
                    <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Definir se a "retirada" corresponde ao download ou à marcação formal de edição.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Escolher canais oficiais de notificação (E-mail, WhatsApp ou painel web).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Aprovar a estrutura padrão de pastas por disciplina técnica.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 border border-zinc-200 rounded-sm bg-white">
                    <div className="w-8 h-8 rounded-sm bg-zinc-100 flex items-center justify-center font-mono font-bold text-xs text-zinc-700 mb-3">
                      C
                    </div>
                    <h3 className="font-bold text-sm text-zinc-900">Operação e Manutenção</h3>
                    <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Concessão de credenciais de acesso de teste ao Clicksign e ao servidor.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Alinhamento de infraestrutura de rede e pastas compartilhadas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8e1529] flex-shrink-0 mt-0.5" />
                        <span>Validação dos níveis de SLA e suporte técnico aos engenheiros.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Box de Ação & Assinatura da Proposta */}
                <div className="p-8 border border-zinc-200 rounded-sm bg-zinc-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-zinc-900">
                      Pronto para iniciar o projeto com a ViraWeb?
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 max-w-lg">
                      Clique no botão ao lado para confirmar o interesse na proposta e agendar a reunião de fechamento e kick-off de desenvolvimento.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openWhatsApp("Aprovação Formal")}
                      className="px-6 py-3.5 bg-[#8e1529] hover:bg-[#780f21] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm cursor-pointer transition-colors shadow-xs flex items-center gap-2"
                      aria-label="Avançar com a proposta via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Aprovar Proposta Agora</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-3.5 bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-xs sm:text-sm font-medium rounded-sm cursor-pointer transition-colors flex items-center gap-2"
                      aria-label="Salvar proposta como documento PDF"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Salvar em PDF</span>
                    </button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* Rodapé Institucional */}
        <footer className="mt-16 border-t border-zinc-200 bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <a
                href="https://viraweb.online"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity cursor-pointer"
                title="ViraWeb Soluções Digitais"
              >
                <Image
                  src="/viraweb.png"
                  alt="ViraWeb"
                  width={110}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
              </a>
              <span className="text-zinc-300">|</span>
              <span className="text-xs font-semibold text-zinc-700">
                Soluções Digitais para Construção Civil
              </span>
            </div>

            <div className="text-xs text-zinc-500 font-mono">
              © 2026 ViraWeb Soluções Digitais • Proposta Comercial Queiroz Silveira • Todos os direitos reservados
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
