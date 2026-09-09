"use client";

import { useState } from "react";

// ========================================================
// CONFIGURAÇÕES INSTITUCIONAIS
// ========================================================
const WHATSAPP_NUMERO = "5562996841378";

interface Phase {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  percent: string;
  downPayment: number;
  finalPayment: number;
  deliverablesSummary: string;
  categories: {
    title: string;
    items: string[];
  }[];
}

const PHASES: Phase[] = [
  {
    id: 1,
    name: "NXT PASS",
    subtitle: "Clube de Benefícios & Fundação",
    price: 4000,
    percent: "12,3%",
    downPayment: 2000,
    finalPayment: 2000,
    deliverablesSummary:
      "Core App, Auth, Marketplace de Benefícios, QR Code dinâmico anti-screenshot, Payment Orchestrator multi-PSP, Split automático e Painel do Parceiro.",
    categories: [
      {
        title: "Fundação do Aplicativo & Autenticação",
        items: [
          "Criação da arquitetura base do app mobile e painel web administrativo.",
          "Fluxo de cadastro e autenticação segura (e-mail, senha, login social e verificação OTP).",
          "Perfil inicial do usuário com régua básica de pontuação e gamificação (NXT SCORE).",
        ],
      },
      {
        title: "Marketplace NXT PASS",
        items: [
          "Catálogo de parceiros segmentado nas categorias de estilo de vida (Gastronomia, Moda, Viagens, Tecnologia, etc.).",
          "Página individual de cada parceiro com logotipo, detalhes da oferta e percentual de benefício.",
        ],
      },
      {
        title: "Emissão e Validação de Vouchers",
        items: [
          "Geração de voucher com QR Code dinâmico anti-fraude (código temporizado de utilização única).",
          "Histórico de cupons resgatados e utilizados pelo usuário.",
        ],
      },
      {
        title: "Camada de Orquestração de Pagamentos & Split (Base)",
        items: [
          "Módulo central desacoplado de gateway (PaymentProvider).",
          "Integração com PSP de partida (ex: Pagar.me ou Mercado Pago) para processar Pix, Cartão e Boleto.",
          "Motor de divisão automática (split payment) entre plataforma e lojista parceiro.",
        ],
      },
      {
        title: "Portal do Parceiro & Validador",
        items: [
          "Painel web responsivo onde o lojista parceiro acompanha ofertas e utiliza a câmera para ler e validar o QR Code do cliente no balcão.",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "NXT BANK",
    subtitle: "Banco Digital & Experiência BaaS",
    price: 5500,
    percent: "16,9%",
    downPayment: 2750,
    finalPayment: 2750,
    deliverablesSummary:
      "Integração BaaS, Conta Digital, Saldo em tempo real, Extrato, Pix (Chaves/QR/Copia-e-Cola), Cartão Virtual/Físico e Carteira Unificada.",
    categories: [
      {
        title: "Conexão BaaS (Banking-as-a-Service)",
        items: [
          "Integração segura do front-end com APIs de instituição financeira parceira homologada (Doca, Celcoin, Zoop ou similar).",
        ],
      },
      {
        title: "Dashboard e Gestão de Conta Digital",
        items: [
          "Exibição de saldo em tempo real e extrato financeiro detalhado com filtros por período e tipo de movimentação.",
        ],
      },
      {
        title: "Operações Pix Completas",
        items: [
          "Envio e recebimento de Pix por chave (CPF/CNPJ, e-mail, telefone, chave aleatória).",
          "Pix Copia e Cola e geração de QR Code Pix para cobrança.",
          "Leitor de QR Code para pagamentos instantâneos.",
        ],
      },
      {
        title: "Gestão de Cartões",
        items: [
          "Emissão e visualização de dados de cartão virtual para compras seguras na internet.",
          "Controles de segurança: bloqueio e desbloqueio instantâneo do cartão pelo app.",
          "Solicitação e acompanhamento de entrega de cartão físico.",
        ],
      },
      {
        title: "Carteira Central NXT",
        items: [
          "Consolidação na mesma tela: saldo bancário, cupons do NXT PASS e pontos acumulados.",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "NXT LIVE",
    subtitle: "Eventos, Ingressos & Corridas",
    price: 6500,
    percent: "20,0%",
    downPayment: 3250,
    finalPayment: 3250,
    deliverablesSummary:
      "Catálogo de Eventos, Compra de Ingressos NXT UP, App de Validação de Portaria, Inscrições e Kits NXT RUN e Funil de Startups NXT FOUNDERS.",
    categories: [
      {
        title: "Vitrine de Eventos Presenciais",
        items: [
          "Catálogo de eventos do ecossistema (NXT Founders, NXT Session, Ctrl + NXT, NXT Talks, etc.) com detalhes de data, local e lotes de ingressos.",
        ],
      },
      {
        title: "NXT UP (Compra de Ingressos)",
        items: [
          "Fluxo de compra direto no app: seleção de lotes → checkout transparente no orquestrador → confirmação instantânea.",
          "Emissão de ingresso digital na carteira do usuário com QR Code individual de acesso.",
        ],
      },
      {
        title: "Controle de Portaria & Acesso",
        items: [
          "Módulo do organizador para validação rápida de ingressos por leitura de QR Code, prevenção de duplicidade e check-in em tempo real.",
        ],
      },
      {
        title: "NXT RUN (Módulo de Corridas de Rua)",
        items: [
          "Inscrição em etapas de corrida, escolha de modalidade/categoria e seleção de tamanho de kit/camiseta.",
          "Termo de responsabilidade digital e voucher QR para retirada física de kits.",
          "Consulta pós-evento de tempos, posições e classificação geral.",
        ],
      },
      {
        title: "NXT FOUNDERS",
        items: [
          "Formulário de submissão de startups e projetos para Rafael Molina, com upload de apresentação/pitch deck e links de vídeo.",
          "Esteira de análise com funil de aprovação (Enviada → Em Análise → Selecionada).",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "NXT INVEST",
    subtitle: "Plataforma de Investimentos",
    price: 7500,
    percent: "23,1%",
    downPayment: 3750,
    finalPayment: 3750,
    deliverablesSummary:
      "Conexão com Corretora CVM, Esteira KYC/AML, Questionário de Suitability, Vitrine de Fundos/Renda Fixa/Ações e Posição Patrimonial.",
    categories: [
      {
        title: "Integração com Corretora Parceira",
        items: [
          "Conexão do aplicativo com APIs de corretora regulada pela CVM/BACEN (a custódia permanece com a instituição credenciada).",
        ],
      },
      {
        title: "Esteira de Onboarding de Investidor",
        items: [
          "Formulário com esteira de KYC avançada e prevenção à lavagem de dinheiro (AML).",
          "Questionário de Perfil de Investidor (Suitability) para recomendação adequada de produtos.",
        ],
      },
      {
        title: "Catálogo de Investimentos Descomplicado",
        items: [
          "Vitrine simplificada para jovens: Renda Fixa, Fundos de Investimento proprietários (Fundo Futuro, Riqueza NXT) e Ações/ETFs.",
        ],
      },
      {
        title: "Área do Investidor",
        items: [
          "Visualização de patrimônio investido, histórico de aportes, rentabilidade consolidada e extratos de posição.",
          "Integração com as metas financeiras do jovem no aplicativo.",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "NXT ME",
    subtitle: "Saúde Emocional, Mentoria & Conexões",
    price: 9000,
    percent: "27,7%",
    downPayment: 4500,
    finalPayment: 4500,
    deliverablesSummary:
      "Agendamento de Psicólogos com blindagem LGPD, Mentoria Rafael Molina com Pitch 60s (NXT LEVEL) e Rede Social sem fotos por propósito (NXT CIRCLE).",
    categories: [
      {
        title: "NXT ME (Saúde Emocional & Psicologia)",
        items: [
          "Catálogo de psicólogos e terapeutas credenciados voltados para a Geração Z (\"Cuidar da cabeça também é subir de nível\").",
          "Fluxo de agendamento de consultas com aplicação de benefício exclusivo NXTGEN.",
          "Blindagem LGPD & Dados Sensíveis: Criptografia ponta a ponta e separação de registros clínicos e histórico de atendimento de saúde.",
          "Liquidação financeira da consulta via saldo da conta NXT BANK.",
        ],
      },
      {
        title: "NXT LEVEL (Mentoria de Rafael Molina)",
        items: [
          "Envio de pitch em vídeo vertical de 60 segundos direto pelo app (\"Zero to One\").",
          "Área exclusiva do mentorado: agenda de encontros, biblioteca de materiais, metas de crescimento e acompanhamento de evolução da startup.",
        ],
      },
      {
        title: "NXT CIRCLE (Conexões Humanas \"Unplug\")",
        items: [
          "Algoritmo de conexão baseado em intenções, afinidades intelectuais e frases de propósito (\"sem foto inicial\").",
          "Cards de descoberta com ações \"Interessado\" e \"Passo\".",
          "Chat em tempo real após match mútuo com desbloqueio gradual de dados e ferramentas ativas de moderação e denúncia.",
        ],
      },
    ],
  },
];

export default function ProposalPage() {
  const [activeTab, setActiveTab] = useState<number>(1);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  const openWhatsApp = (contextTitle: string) => {
    let text = "";
    if (contextTitle === "completo") {
      text =
        "Olá! Analisei a proposta técnica e financeira do Ecossistema NXTGEN (5 Fases - R$ 32.500,00) e gostaria de avançar na contratação do projeto completo com a ViraWeb.";
    } else if (contextTitle === "duvida") {
      text =
        "Olá! Gostaria de tirar uma dúvida técnica sobre a proposta do Ecossistema NXTGEN (v2.1).";
    } else {
      text = `Olá! Gostaria de aprovar e dar início à ${contextTitle} do Ecossistema NXTGEN.`;
    }
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const currentPhase = PHASES.find((p) => p.id === activeTab) || PHASES[0];

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-slate-200">
      {/* Linha de acento com o degradê oficial NXTGEN */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8562f3] via-[#6391f4] to-[#42b4f8]" />

      {/* Header Institucional com Logos ViraWeb & NXTGEN */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Parceria ViraWeb + NXTGEN */}
          <div className="flex items-center gap-4">
            <a
              href="https://viraweb.online"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-85"
            >
              <img
                src="/viraweb.png"
                alt="Logo ViraWeb"
                className="h-8 w-auto object-contain"
              />
            </a>

            <span className="text-slate-300 font-light text-lg">/</span>

            <div className="bg-black px-3 py-1.5 rounded flex items-center justify-center transition-transform hover:scale-102">
              <img
                src="/nxtgen-logo.png"
                alt="Logo NXTGEN"
                className="h-7 w-auto object-contain"
              />
            </div>

            <div className="hidden md:block border-l border-slate-200 pl-3">
              <div className="text-[11px] font-bold text-slate-900 tracking-wide">
                Engenharia de Software
              </div>
              <div className="text-[10px] text-slate-500">
                Soluções & Automações Digitais
              </div>
            </div>
          </div>

          {/* Ações Rápidas (Cores ViraWeb) */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => openWhatsApp("duvida")}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:bg-slate-50 rounded transition-all active:scale-95"
            >
              Dúvida Técnica
            </button>
            <button
              onClick={() => openWhatsApp("completo")}
              className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-all shadow-sm active:scale-95"
            >
              Aprovar Proposta
            </button>
          </div>
        </div>
      </header>

      {/* Faixa de Metadados Limpa */}
      <div className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-600">
        <div className="max-w-5xl mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">PROPOSTA TÉCNICA E COMERCIAL</span>
            <span className="text-slate-300">•</span>
            <span>Versão 2.1</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold">Orçamento Oficial</span>
          </div>
          <div className="text-slate-500">
            Ref: Escopo Funcional do App, Especificação de Pagamentos e Apresentação
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Bloco de Título Principal */}
        <section className="pb-10 border-b border-slate-200">
          <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
            Documento de Escopo e Investimento por Fases
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            PROJETO DE ORÇAMENTO TÉCNICO E FINANCEIRO —{" "}
            <span className="bg-gradient-to-r from-[#8562f3] via-[#6391f4] to-[#42b4f8] bg-clip-text text-transparent">
              ECOSSISTEMA NXTGEN
            </span>
          </h1>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 max-w-3xl">
            O <strong>NXTGEN</strong> é concebido como um ecossistema digital jovem para as Gerações Alpha e Z (
            <em className="font-semibold not-italic text-slate-900">&ldquo;The Future Pays More / Build. Don&apos;t Bet&rdquo;</em>),
            integrando benefícios, banking, eventos presenciais, investimentos e bem-estar em um ambiente único e modular.
          </p>

          {/* Card Resumo do Projeto (Cores ViraWeb & Degradê NXTGEN) */}
          <div className="mt-8 p-6 border border-slate-200 rounded-lg bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Investimento Global do Ecossistema (5 Fases)
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">
                R$ 32.500,00
              </div>
              <div className="text-xs text-slate-600 mt-1">
                50% no início da fase / 50% na homologação de cada marco
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
              <button
                onClick={() => openWhatsApp("completo")}
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded text-xs transition-all shadow-sm active:scale-95 text-center"
              >
                Aprovar Projeto Completo
              </button>
              <span className="text-[11px] text-slate-500 text-center sm:text-right">
                Contrato direto com marcos de entrega garantidos
              </span>
            </div>
          </div>
        </section>

        {/* 1. Diretrizes Estratégicas do Projeto */}
        <section className="py-12 border-b border-slate-200">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6880f2] mb-1">
            Seção 01
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
            1. Diretrizes Estratégicas do Projeto
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-6">
            O <strong>NXTGEN</strong> é concebido como um ecossistema digital jovem para as Gerações Alpha e Z (
            <em>&ldquo;The Future Pays More / Build. Don&apos;t Bet&rdquo;</em>), integrando benefícios, banking, eventos presenciais, investimentos e bem-estar em um ambiente único e modular.
          </p>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
            Premissas Técnicas Centrais:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-slate-200 rounded-lg bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-slate-300">
              <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8562f3]" />
                Modularidade Total
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cada fase entrega um módulo funcional independente e escalável, permitindo evolução contínua sem retrabalho.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-lg bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-slate-300">
              <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6391f4]" />
                Orquestração de Pagamentos & Split
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Estrutura multi-gateway desacoplada (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">PaymentProvider</code> com suporte a Pagar.me, Mercado Pago e Asaas) com divisão automática de recebíveis entre a plataforma e os parceiros.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-lg bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-slate-300">
              <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#42b4f8]" />
                Integrações Especializadas (BaaS e Corretora)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Front-end proprietário conectado a provedores regulados (BaaS para banco digital e corretora para investimentos), garantindo conformidade com BACEN e CVM.
              </p>
            </div>

            <div className="p-5 border border-slate-200 rounded-lg bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-slate-300">
              <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                Segurança e Anti-Fraude
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Emissão de vouchers e ingressos via <strong>QR Code dinâmico com rotação de token temporizado</strong> para coibir capturas de tela e reaproveitamento indevido.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Quadro Resumo de Investimento (5 Fases) */}
        <section className="py-12 border-b border-slate-200">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6880f2] mb-1">
            Seção 02
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
            2. Quadro Resumo de Investimento (5 Fases)
          </h2>

          {/* Tabela de Investimento */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-4 text-center">Fase</th>
                  <th className="py-3 px-4">Módulo / Escopo Principal</th>
                  <th className="py-3 px-4 text-right">Investimento da Fase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {PHASES.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-slate-900">
                      Fase {p.id}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-slate-950">{p.name}</strong> ({p.subtitle})
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-950">
                      {formatBRL(p.price)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                  <td className="py-3.5 px-4 text-center text-slate-950">
                    TOTAL
                  </td>
                  <td className="py-3.5 px-4 text-slate-950">
                    Ecossistema Completo NXTGEN (5 Fases)
                  </td>
                  <td className="py-3.5 px-4 text-right text-base text-slate-950">
                    {formatBRL(32500)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Distribuição Gráfica com Degradê NXTGEN */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-700">
              <span>Distribuição Financeira por Fase</span>
              <span className="font-mono text-slate-500">Total: R$ 32.500,00 (100%)</span>
            </div>

            {/* Barra Contínua no degradê */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: "12.3%" }} className="h-full bg-[#8562f3]" title="Fase 1: 12,3%" />
              <div style={{ width: "16.9%" }} className="h-full bg-[#7375f5]" title="Fase 2: 16,9%" />
              <div style={{ width: "20.0%" }} className="h-full bg-[#6485f2]" title="Fase 3: 20,0%" />
              <div style={{ width: "23.1%" }} className="h-full bg-[#539ef5]" title="Fase 4: 23,1%" />
              <div style={{ width: "27.7%" }} className="h-full bg-[#42b4f8]" title="Fase 5: 27,7%" />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <div>Fase 1 (NXT PASS):&nbsp;&nbsp;&nbsp;&nbsp;[====]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R$ 4.000,00 (12,3%)</div>
              <div>Fase 2 (NXT BANK):&nbsp;&nbsp;&nbsp;&nbsp;[=====]&nbsp;&nbsp;&nbsp;&nbsp;R$ 5.500,00 (16,9%)</div>
              <div>Fase 3 (NXT LIVE):&nbsp;&nbsp;&nbsp;&nbsp;[======]&nbsp;&nbsp;&nbsp;R$ 6.500,00 (20,0%)</div>
              <div>Fase 4 (NXT INVEST):&nbsp;&nbsp;[=======]&nbsp;&nbsp;R$ 7.500,00 (23,1%)</div>
              <div>Fase 5 (NXT ME):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[=========] R$ 9.000,00 (27,7%)</div>
              <div className="text-slate-400">----------------------------------------------------</div>
              <div className="font-bold text-slate-950">
                TOTAL DO PROJETO:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R$ 32.500,00 (100%)
              </div>
            </div>
          </div>
        </section>

        {/* 3. Detalhamento do Escopo por Fase */}
        <section className="py-12 border-b border-slate-200">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6880f2] mb-1">
            Seção 03
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
            3. Detalhamento do Escopo por Fase
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Evolução arquitetural modular e independente:
          </p>

          {/* Pipeline Visual Sequencial */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 mb-8 overflow-x-auto whitespace-nowrap">
            F1: NXT PASS (R$ 4.000) → F2: NXT BANK (R$ 5.500) → F3: NXT LIVE (R$ 6.500) → F4: NXT INVEST (R$ 7.500) → F5: NXT ME (R$ 9.000)
          </div>

          {/* Seletor de Abas com Efeito Suave */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-6">
            {PHASES.map((p) => {
              const isSelected = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`px-4 py-2 text-xs font-bold rounded transition-all duration-150 relative ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Fase {p.id}: {p.name}
                  {isSelected && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#8562f3] to-[#42b4f8] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Card Ativo com Animação Fade-In */}
          <div
            key={currentPhase.id}
            className="animate-fade-in border border-slate-200 rounded-lg p-6 sm:p-8 bg-white shadow-sm mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-slate-200 mb-6 gap-2">
              <div>
                <span className="text-xs font-bold text-[#6880f2] uppercase tracking-wider">
                  Módulo 0{currentPhase.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mt-0.5">
                  Fase {currentPhase.id}: {currentPhase.name} — {currentPhase.subtitle}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 block">Investimento:</span>
                <span className="text-2xl font-extrabold text-slate-950">
                  {formatBRL(currentPhase.price)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPhase.categories.map((cat, idx) => (
                <div key={idx} className="p-4 bg-slate-50/70 border border-slate-200 rounded">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-950 mb-2">
                    {cat.title}:
                  </h4>
                  <ul className="space-y-1.5 pl-4 text-xs sm:text-sm text-slate-700 list-disc">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <strong>Condições:</strong> 50% de entrada ({formatBRL(currentPhase.downPayment)}) e 50% na homologação ({formatBRL(currentPhase.finalPayment)}).
              </div>
              <button
                onClick={() => openWhatsApp(`Fase ${currentPhase.id}: ${currentPhase.name}`)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold transition-all active:scale-95"
              >
                Aprovar Fase {currentPhase.id} ({formatBRL(currentPhase.price)})
              </button>
            </div>
          </div>

          {/* Todas as Fases Documentadas na Íntegra */}
          <div className="space-y-6 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Escopo Completo das 5 Fases:
            </div>

            {PHASES.map((p) => (
              <div
                key={p.id}
                className="border border-slate-200 rounded-lg p-6 bg-slate-50/60 transition-all duration-200 hover:bg-slate-50"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-slate-200 mb-4 gap-2">
                  <h3 className="text-base font-bold text-slate-950">
                    Fase {p.id}: {p.name} — <span className="font-normal text-slate-600">{p.subtitle}</span>
                  </h3>
                  <span className="text-sm font-bold text-slate-900">
                    {formatBRL(p.price)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {p.categories.map((cat, catIdx) => (
                    <div key={catIdx}>
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        • {cat.title}
                      </div>
                      <ul className="space-y-1 pl-4 text-xs text-slate-600 list-disc">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Forma de Pagamento por Marcos de Homologação */}
        <section className="py-12 border-b border-slate-200">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6880f2] mb-1">
            Seção 04
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3">
            4. Forma de Pagamento por Marcos de Homologação
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-6">
            A contratação e pagamento ocorrem por fase entregue e homologada:
          </p>

          <div className="border border-slate-200 rounded-lg bg-white divide-y divide-slate-200 text-xs sm:text-sm">
            {PHASES.map((p) => (
              <div
                key={p.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <strong className="text-slate-950">
                    {p.id}. Fase {p.id} — {p.name}:
                  </strong>{" "}
                  <span className="text-slate-900 font-bold">{formatBRL(p.price)}</span>
                </div>
                <div className="text-slate-600 text-xs font-mono">
                  (50% no início da fase: <strong>{formatBRL(p.downPayment)}</strong> e 50% na homologação: <strong>{formatBRL(p.finalPayment)}</strong>)
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Resumo das Entregas Técnicas por Fase */}
        <section className="py-12">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6880f2] mb-1">
            Seção 05
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-4">
            5. Resumo das Entregas Técnicas por Fase
          </h2>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-4 text-center">Fase</th>
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4 text-center">Valor</th>
                  <th className="py-3 px-4">Principais Entregas Técnicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {PHASES.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-slate-900">
                      {p.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-950 whitespace-nowrap">
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-950 whitespace-nowrap">
                      {formatBRL(p.price)}
                    </td>
                    <td className="py-3 px-4 text-slate-600 leading-relaxed">
                      {p.deliverablesSummary}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                  <td className="py-3.5 px-4 text-center text-slate-950">
                    TOTAL
                  </td>
                  <td className="py-3.5 px-4 text-slate-950">
                    5 FASES
                  </td>
                  <td className="py-3.5 px-4 text-center text-base text-slate-950 whitespace-nowrap">
                    {formatBRL(32500)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-950 font-bold">
                    Ecossistema Completo NXTGEN Entregue e Homologado
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bloco de Fechamento com Cores ViraWeb */}
          <div className="mt-12 p-8 border border-slate-200 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                Avançar com a Engenharia
              </div>
              <h3 className="text-lg sm:text-xl font-bold">
                Pronto para iniciar o Ecossistema NXTGEN?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Confirmando a proposta comercial, realizamos o alinhamento técnico e o kickoff imediato da Fase 1 (NXT PASS).
              </p>
            </div>

            <button
              onClick={() => openWhatsApp("completo")}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              Aprovar Proposta Agora
            </button>
          </div>
        </section>
      </main>

      {/* Rodapé Institucional com Ambas as Marcas */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 px-6 text-xs text-slate-600">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <a
              href="https://viraweb.online"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/viraweb.png"
                alt="ViraWeb"
                className="h-6 w-auto object-contain"
              />
            </a>

            <span className="text-slate-300">|</span>

            <div className="bg-black px-2 py-1 rounded">
              <img
                src="/nxtgen-logo.png"
                alt="NXTGEN"
                className="h-5 w-auto object-contain"
              />
            </div>

            <span className="hidden sm:inline text-slate-500">
              Ecossistema Digital NXTGEN • Versão 2.1
            </span>
          </div>

          <div className="text-slate-500">
            © 2026 ViraWeb Soluções Digitais • Todos os direitos reservados
          </div>
        </div>
      </footer>
    </div>
  );
}
