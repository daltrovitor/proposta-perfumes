"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Layers,
  CreditCard,
  Ticket,
  TrendingUp,
  HeartPulse,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  Check,
  Clock,
  MessageCircle,
  Sparkles,
  Cpu,
  Smartphone,
  Zap,
  Building2,
  ChevronDown,
  PhoneCall,
  Activity,
  Users,
} from "lucide-react";

// ========================================================
// CONFIGURAÇÃO INSTITUCIONAL
// ========================================================
const WHATSAPP_NUMERO = "5562996841378";
const LOGO_URL = "https://viraweb.online/viraweb3.png";

interface PhaseData {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  price: number;
  percentage: number;
  downPayment: number;
  finalPayment: number;
  icon: typeof Shield;
  color: string;
  bgColor: string;
  borderColor: string;
  scopeCategories: {
    title: string;
    items: string[];
  }[];
  technicalDeliverables: string;
}

const PHASES: PhaseData[] = [
  {
    id: 1,
    slug: "nxt-pass",
    name: "NXT PASS",
    tagline: "Clube de Benefícios, Vouchers QR & Fundação",
    badge: "Fase 01 • Fundação",
    price: 4000,
    percentage: 12.3,
    downPayment: 2000,
    finalPayment: 2000,
    icon: Sparkles,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
    scopeCategories: [
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
    technicalDeliverables:
      "Core App, Auth, Marketplace de Benefícios, QR Code dinâmico anti-screenshot, Payment Orchestrator multi-PSP, Split automático e Painel do Parceiro.",
  },
  {
    id: 2,
    slug: "nxt-bank",
    name: "NXT BANK",
    tagline: "Banco Digital & Experiência BaaS",
    badge: "Fase 02 • BaaS",
    price: 5500,
    percentage: 16.9,
    downPayment: 2750,
    finalPayment: 2750,
    icon: CreditCard,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    scopeCategories: [
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
    technicalDeliverables:
      "Integração BaaS, Conta Digital, Saldo em tempo real, Extrato, Pix (Chaves/QR/Copia-e-Cola), Cartão Virtual/Físico e Carteira Unificada.",
  },
  {
    id: 3,
    slug: "nxt-live",
    name: "NXT LIVE",
    tagline: "Eventos, Ingressos & Corridas",
    badge: "Fase 03 • Experiências",
    price: 6500,
    percentage: 20.0,
    downPayment: 3250,
    finalPayment: 3250,
    icon: Ticket,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    scopeCategories: [
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
    technicalDeliverables:
      "Catálogo de Eventos, Compra de Ingressos NXT UP, App de Validação de Portaria, Inscrições e Kits NXT RUN e Funil de Startups NXT FOUNDERS.",
  },
  {
    id: 4,
    slug: "nxt-invest",
    name: "NXT INVEST",
    tagline: "Plataforma de Investimentos Corretora",
    badge: "Fase 04 • CVM / BACEN",
    price: 7500,
    percentage: 23.1,
    downPayment: 3750,
    finalPayment: 3750,
    icon: TrendingUp,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    scopeCategories: [
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
    technicalDeliverables:
      "Conexão com Corretora CVM, Esteira KYC/AML, Questionário de Suitability, Vitrine de Fundos/Renda Fixa/Ações e Posição Patrimonial.",
  },
  {
    id: 5,
    slug: "nxt-me",
    name: "NXT ME",
    tagline: "Saúde Mental, Mentoria & Conexões",
    badge: "Fase 05 • Propósito",
    price: 9000,
    percentage: 27.7,
    downPayment: 4500,
    finalPayment: 4500,
    icon: HeartPulse,
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
    borderColor: "border-rose-400/30",
    scopeCategories: [
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
    technicalDeliverables:
      "Agendamento de Psicólogos com blindagem LGPD, Mentoria Rafael Molina com Pitch 60s (NXT LEVEL) e Rede Social sem fotos por propósito (NXT CIRCLE).",
  },
];

const STRATEGIC_PILLARS = [
  {
    title: "Modularidade Total",
    desc: "Cada fase entrega um módulo funcional independente e escalável, permitindo evolução contínua sem retrabalho.",
    icon: Layers,
    accent: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
  },
  {
    title: "Orquestração de Pagamentos & Split",
    desc: "Estrutura multi-gateway desacoplada (PaymentProvider com suporte a Pagar.me, Mercado Pago e Asaas) com divisão automática de recebíveis entre a plataforma e os parceiros.",
    icon: Zap,
    accent: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
  },
  {
    title: "Integrações Especializadas (BaaS e Corretora)",
    desc: "Front-end proprietário conectado a provedores regulados (BaaS para banco digital e corretora para investimentos), garantindo conformidade com BACEN e CVM.",
    icon: Building2,
    accent: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    title: "Segurança e Anti-Fraude",
    desc: "Emissão de vouchers e ingressos via QR Code dinâmico com rotação de token temporizado para coibir capturas de tela e reaproveitamento indevido.",
    icon: Shield,
    accent: "from-rose-500/20 to-purple-500/20",
    border: "border-rose-500/30",
  },
];

export default function ProposalPage() {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic anti-fraud simulation timer for dynamic QR code concept demo
  const [countdown, setCountdown] = useState<number>(28);
  const [tokenHash, setTokenHash] = useState<string>("8F4A-9B21");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
          setTokenHash(randomHash);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    }).format(val);
  };

  const openWhatsApp = (contextTitle: string) => {
    let text = "";
    if (contextTitle === "completo") {
      text = `Olá! Analisei a proposta técnica e financeira do Ecossistema NXTGEN (5 Fases - R$ 32.500,00) e gostaria de avançar na contratação do projeto completo com a ViraWeb. Como iniciamos a Fase 1?`;
    } else if (contextTitle === "duvida") {
      text = `Olá! Gostaria de tirar uma dúvida técnica sobre a proposta de desenvolvimento do Ecossistema NXTGEN (v2.1).`;
    } else {
      text = `Olá! Gostaria de aprovar e dar início à ${contextTitle} do Ecossistema NXTGEN com a ViraWeb.`;
    }
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const activePhase = PHASES.find((p) => p.id === selectedPhase) || PHASES[0];
  const totalInvestment = 32500;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Top Document Metadata Bar */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md text-[11px] text-slate-400">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> ECOSSISTEMA NXTGEN
            </span>
            <span className="text-slate-700">|</span>
            <span>Versão: 2.1</span>
            <span className="text-slate-700">|</span>
            <span className="hidden sm:inline">Ref: Escopo Funcional, Gateway & Apresentação Institucional</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Proposta Técnica & Orçamento Ativo
            </span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-indigo-400" /> Atendimento Direto
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={LOGO_URL}
              alt="ViraWeb"
              className="h-8 sm:h-9 w-auto object-contain brightness-110"
            />
            <div className="hidden md:block pl-4 border-l border-slate-800">
              <div className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
                <span>NXTGEN</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  v2.1
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-sans">
                The Future Pays More • Build. Don&apos;t Bet
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openWhatsApp("duvida")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-700 transition-colors"
            >
              Tirar Dúvida
            </button>
            <button
              onClick={() => openWhatsApp("completo")}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all shadow-lg shadow-amber-500/10 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Aprovar Ecossistema</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 px-4 bg-radial-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Headline */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Documento de Escopo e Investimento por Fases
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                PROJETO DE ORÇAMENTO TÉCNICO E FINANCEIRO —{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300">
                  ECOSSISTEMA NXTGEN
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                O <strong>NXTGEN</strong> é concebido como um ecossistema digital jovem para as Gerações Alpha e Z (
                <em className="text-amber-300 not-italic font-semibold">&ldquo;The Future Pays More / Build. Don&apos;t Bet&rdquo;</em>),
                integrando benefícios, banking, eventos presenciais, investimentos e bem-estar em um ambiente único e modular.
              </p>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Estrutura
                  </div>
                  <div className="text-sm font-extrabold text-white mt-1">
                    5 Fases Modulares
                  </div>
                </div>
                <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Total do Projeto
                  </div>
                  <div className="text-sm font-extrabold text-amber-300 mt-1">
                    R$ 32.500,00
                  </div>
                </div>
                <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Homologação
                  </div>
                  <div className="text-sm font-extrabold text-emerald-400 mt-1">
                    50% Início / 50% Fim
                  </div>
                </div>
                <div className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl backdrop-blur-sm">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Conformidade
                  </div>
                  <div className="text-sm font-extrabold text-indigo-300 mt-1">
                    BACEN, CVM & LGPD
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary Card */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  Investimento Global
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  5 Módulos
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-slate-400 uppercase tracking-wider">
                  Investimento Total (5 Fases)
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                  {formatBRL(totalInvestment)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Pagamento faseado por marcos técnicos entregues e homologados.
                </p>
              </div>

              <div className="space-y-2.5 text-xs py-3 border-y border-slate-800 text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">1. NXT PASS:</span>
                  <span className="font-semibold text-white">R$ 4.000,00 (12,3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">2. NXT BANK:</span>
                  <span className="font-semibold text-white">R$ 5.500,00 (16,9%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">3. NXT LIVE:</span>
                  <span className="font-semibold text-white">R$ 6.500,00 (20,0%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">4. NXT INVEST:</span>
                  <span className="font-semibold text-white">R$ 7.500,00 (23,1%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">5. NXT ME:</span>
                  <span className="font-semibold text-white">R$ 9.000,00 (27,7%)</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={() => openWhatsApp("completo")}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  Aprovar Ecossistema Completo
                </button>
                <a
                  href="#resumo-investimento"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Explorar Detalhamento por Fase <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Diretrizes Estratégicas do Projeto */}
      <section className="py-16 px-4 max-w-6xl mx-auto border-b border-slate-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" /> Seção 1 • Fundamentos de Engenharia
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            1. Diretrizes Estratégicas do Projeto
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            O <strong>NXTGEN</strong> foi desenhado com foco em estabilidade, conformidade regulatória e experiência imersiva para o público jovem. Cada decisão de arquitetura visa eliminar atritos operacionais e garantir independência tecnológica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STRATEGIC_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-br ${pillar.accent} bg-slate-900/60 border ${pillar.border} transition-all hover:border-slate-600`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Security Mockup: Dynamic Rotating QR Code */}
        <div className="mt-8 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[11px] font-bold border border-rose-500/20">
                <Shield className="w-3.5 h-3.5" /> Demonstração Anti-Fraude em Tempo Real
              </div>
              <h4 className="text-base font-bold text-white">
                Mecanismo de QR Code Dinâmico com Token Temporizado
              </h4>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                Para coibir capturas de tela e reaproveitamento indevido de cupons do <strong>NXT PASS</strong> e ingressos do <strong>NXT LIVE</strong>, o código se auto-regenera a cada ciclo com chave criptografada de uso único.
              </p>
            </div>

            {/* Mini visual QR simulator */}
            <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl shrink-0">
              <div className="relative p-2 bg-white rounded-lg">
                <QrCode className="w-16 h-16 text-slate-950" />
                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[0.5px]">
                  <span className="text-[9px] font-mono font-black bg-indigo-600 text-white px-1 py-0.5 rounded shadow">
                    NXTGEN
                  </span>
                </div>
              </div>
              <div className="text-left space-y-1">
                <div className="text-[10px] uppercase font-mono text-slate-500">
                  Hash de Validação
                </div>
                <div className="text-xs font-mono font-bold text-amber-300">
                  {tokenHash}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  <span>Expira em: <strong className="text-white">{countdown}s</strong></span>
                </div>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-1000"
                    style={{ width: `${(countdown / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Quadro Resumo de Investimento (5 Fases) */}
      <section id="resumo-investimento" className="py-16 px-4 max-w-6xl mx-auto border-b border-slate-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Seção 2 • Modelo Financeiro
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            2. Quadro Resumo de Investimento (5 Fases)
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Investimento estruturado de acordo com o nível de complexidade e maturidade de cada módulo, garantindo previsibilidade total para os fundadores.
          </p>
        </div>

        {/* Financial Distribution Bar Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Distribuição Financeira por Fase (Total: R$ 32.500,00)
            </span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              100% Homologado por Entrega
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-slate-800">
            <div style={{ width: "12.3%" }} className="h-full bg-amber-400 rounded-l-full" title="Fase 1: 12.3%"></div>
            <div style={{ width: "16.9%" }} className="h-full bg-blue-500" title="Fase 2: 16.9%"></div>
            <div style={{ width: "20.0%" }} className="h-full bg-emerald-500" title="Fase 3: 20.0%"></div>
            <div style={{ width: "23.1%" }} className="h-full bg-purple-500" title="Fase 4: 23.1%"></div>
            <div style={{ width: "27.7%" }} className="h-full bg-rose-500 rounded-r-full" title="Fase 5: 27.7%"></div>
          </div>

          {/* Legend Items */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0"></span>
              <div>
                <span className="text-slate-400">F1 PASS:</span>{" "}
                <strong className="text-white">12,3%</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
              <div>
                <span className="text-slate-400">F2 BANK:</span>{" "}
                <strong className="text-white">16,9%</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
              <div>
                <span className="text-slate-400">F3 LIVE:</span>{" "}
                <strong className="text-white">20,0%</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0"></span>
              <div>
                <span className="text-slate-400">F4 INVEST:</span>{" "}
                <strong className="text-white">23,1%</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0"></span>
              <div>
                <span className="text-slate-400">F5 ME:</span>{" "}
                <strong className="text-white">27,7%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PHASES.map((phase) => {
            const Icon = phase.icon;
            const isSelected = selectedPhase === phase.id;

            return (
              <div
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/50 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Fase {phase.id}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${phase.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${phase.color}`} />
                    </div>
                  </div>

                  <h3 className="text-sm font-extrabold text-white">
                    {phase.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {phase.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800">
                  <div className="text-[10px] uppercase font-mono text-slate-500">
                    Investimento
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">
                    {formatBRL(phase.price)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    {phase.percentage}% do total
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsApp(`Fase ${phase.id}: ${phase.name}`);
                    }}
                    className="w-full mt-3 py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Iniciar Fase {phase.id}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Investment Summary Table */}
        <div className="mt-8 overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/60">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center">Fase</th>
                <th className="py-3.5 px-4">Módulo / Escopo Principal</th>
                <th className="py-3.5 px-4 text-right">Investimento da Fase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {PHASES.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-indigo-400">
                    Fase {p.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-white">{p.name}</strong>{" "}
                    <span className="text-slate-400">({p.tagline})</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-white">
                    {formatBRL(p.price)}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-900/90 font-bold border-t-2 border-slate-700">
                <td className="py-4 px-4 text-center font-mono text-amber-400 uppercase tracking-wider">
                  TOTAL
                </td>
                <td className="py-4 px-4 text-sm text-white font-extrabold">
                  Ecossistema Completo NXTGEN (5 Fases)
                </td>
                <td className="py-4 px-4 text-right font-mono text-base font-black text-amber-300">
                  {formatBRL(totalInvestment)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Visual Roadmap / Pipeline Diagram (Mermaid graph LR equivalent) */}
      <section className="py-12 px-4 max-w-6xl mx-auto border-b border-slate-800">
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Fluxo Contínuo de Entrega
          </div>
          <h3 className="text-xl font-bold text-white">
            Roadmap Linear de Evolução por Fases
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isSelected = selectedPhase === phase.id;

            return (
              <div
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`w-full md:w-1/5 p-4 rounded-xl border transition-all cursor-pointer text-center relative ${
                  isSelected
                    ? "bg-slate-900 border-indigo-400 shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className={`w-9 h-9 mx-auto rounded-full ${phase.bgColor} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${phase.color}`} />
                </div>
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Fase {phase.id}
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {phase.name}
                </div>
                <div className="text-xs font-mono font-bold text-amber-300 mt-1">
                  {formatBRL(phase.price)}
                </div>

                {/* Arrow connector on desktop */}
                {idx < PHASES.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Detalhamento do Escopo por Fase */}
      <section id="detalhamento-escopo" className="py-16 px-4 max-w-6xl mx-auto border-b border-slate-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" /> Seção 3 • Arquitetura & Entregas
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            3. Detalhamento do Escopo por Fase
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Selecione uma fase abaixo para visualizar os requisitos detalhados, integrações com terceiros e funcionalidades previstas:
          </p>
        </div>

        {/* Phase Tabs Selector */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {PHASES.map((p) => {
            const isSelected = selectedPhase === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPhase(p.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span>Fase {p.id}: {p.name}</span>
                <span className="text-[11px] opacity-80 font-mono">({formatBRL(p.price)})</span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${activePhase.bgColor} border ${activePhase.borderColor} flex items-center justify-center shrink-0`}>
                <activePhase.icon className={`w-7 h-7 ${activePhase.color}`} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono font-bold mb-1">
                  {activePhase.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Fase {activePhase.id}: {activePhase.name} — {activePhase.tagline}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Investimento Homologado
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                {formatBRL(activePhase.price)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                50% início ({formatBRL(activePhase.downPayment)}) • 50% homologação ({formatBRL(activePhase.finalPayment)})
              </div>
            </div>
          </div>

          {/* Scope Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {activePhase.scopeCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-950/60 border border-slate-800/80 rounded-xl"
              >
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  {cat.title}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Phase CTA */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Pronto para iniciar a <strong>Fase {activePhase.id}: {activePhase.name}</strong>?
            </div>
            <button
              type="button"
              onClick={() => openWhatsApp(`Fase ${activePhase.id}: ${activePhase.name}`)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contratar Fase {activePhase.id} ({formatBRL(activePhase.price)})</span>
            </button>
          </div>
        </div>

        {/* All Phases Detailed Reference (Accordion / Expandable) */}
        <div className="mt-12 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Visão Geral Completa das 5 Fases:
          </div>

          {PHASES.map((p) => {
            const isSelected = selectedPhase === p.id;
            return (
              <div
                key={p.id}
                className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden"
              >
                <div
                  onClick={() => setSelectedPhase(isSelected ? 0 : p.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${p.bgColor} flex items-center justify-center shrink-0`}>
                      <p.icon className={`w-4 h-4 ${p.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white">
                        Fase {p.id}: {p.name} — <span className="text-slate-400 font-normal">{p.tagline}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Investimento: {formatBRL(p.price)}
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isSelected ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </div>

                {isSelected && (
                  <div className="p-4 pt-0 border-t border-slate-800/60 bg-slate-950/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {p.scopeCategories.map((cat, catIdx) => (
                        <div key={catIdx} className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/60">
                          <div className="text-xs font-bold text-white mb-1.5">
                            {cat.title}
                          </div>
                          <ul className="space-y-1 text-[11px] text-slate-300">
                            {cat.items.map((it, itIdx) => (
                              <li key={itIdx} className="flex items-start gap-1.5">
                                <span className="text-indigo-400">•</span>
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Forma de Pagamento por Marcos de Homologação */}
      <section id="forma-pagamento" className="py-16 px-4 max-w-6xl mx-auto border-b border-slate-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" /> Seção 4 • Garantia & Homologação
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            4. Forma de Pagamento por Marcos de Homologação
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            A contratação e pagamento ocorrem por fase entregue e homologada. Isso protege o caixa e alinha o desembolso com o avanço palpável da tecnologia.
          </p>
        </div>

        {/* Milestone Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PHASES.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-indigo-400">
                  Fase {p.id}
                </span>
                <h4 className="text-sm font-bold text-white mt-2">
                  {p.name}
                </h4>
                <div className="text-lg font-extrabold text-amber-300 font-mono mt-1">
                  {formatBRL(p.price)}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">
                    50% No Início
                  </div>
                  <div className="font-bold text-white font-mono mt-0.5">
                    {formatBRL(p.downPayment)}
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">
                    50% Na Homologação
                  </div>
                  <div className="font-bold text-emerald-400 font-mono mt-0.5">
                    {formatBRL(p.finalPayment)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Terms Summary Box */}
        <div className="mt-8 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] uppercase font-bold mb-2 border border-indigo-500/30">
              Protocolo de Segurança Comercial
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Garantia de Entrega por Fase Independente
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              O cliente só autoriza o faturamento dos 50% finais de cada fase após testar e homologar os recursos em ambiente de staging/produção, garantindo 100% de conformidade com o escopo pactuado.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp("completo")}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-all shadow-lg active:scale-95"
          >
            Aprovar Proposta Agora
          </button>
        </div>
      </section>

      {/* SECTION 5: Resumo das Entregas Técnicas por Fase */}
      <section id="entregas-tecnicas" className="py-16 px-4 max-w-6xl mx-auto border-b border-slate-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
            <Check className="w-4 h-4" /> Seção 5 • Matriz de Entregáveis
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            5. Resumo das Entregas Técnicas por Fase
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Consolidação das principais entregas de engenharia e tecnologia contempladas em cada marco:
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-900/60">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center">Fase</th>
                <th className="py-3.5 px-4">Nome do Módulo</th>
                <th className="py-3.5 px-4 text-center">Valor</th>
                <th className="py-3.5 px-4">Principais Entregas Técnicas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {PHASES.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 text-center font-mono font-bold text-indigo-400">
                    {p.id}
                  </td>
                  <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="py-4 px-4 text-center font-mono font-extrabold text-amber-300 whitespace-nowrap">
                    {formatBRL(p.price)}
                  </td>
                  <td className="py-4 px-4 text-slate-300 leading-relaxed">
                    {p.technicalDeliverables}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-900/90 font-bold border-t-2 border-slate-700">
                <td className="py-4 px-4 text-center font-mono text-amber-400 font-extrabold">
                  TOTAL
                </td>
                <td className="py-4 px-4 text-white font-extrabold">
                  5 FASES
                </td>
                <td className="py-4 px-4 text-center font-mono text-base font-black text-amber-300">
                  {formatBRL(totalInvestment)}
                </td>
                <td className="py-4 px-4 font-extrabold text-white">
                  Ecossistema Completo NXTGEN Entregue e Homologado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 max-w-4xl mx-auto border-b border-slate-800">
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
            Perguntas Frequentes
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Tire Suas Dúvidas Sobre o Desenvolvimento
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              question: "As 5 fases precisam ser desenvolvidas de forma contínua ou podemos pausar?",
              answer:
                "A arquitetura foi projetada para ser 100% modular. Cada fase é auto-suficiente e entrega valor imediato para o negócio. É possível executar as fases em sequência ininterrupta ou realizar pausas estratégicas entre as entregas para validação de mercado.",
            },
            {
              question: "Como funciona a conexão BaaS do NXT BANK e a Corretora do NXT INVEST?",
              answer:
                "A plataforma ViraWeb desenvolve a camada de front-end, orquestração e experiência do usuário no app. A custódia financeira e de investimentos é gerida por parceiros devidamente regulados pelo Banco Central do Brasil (BACEN) e pela Comissão de Valores Mobiliários (CVM), assegurando plena segurança e conformidade jurídica.",
            },
            {
              question: "Como a LGPD é tratada no módulo NXT ME (Psicólogos e Saúde Mental)?",
              answer:
                "Dados de prontuários clínicos e atendimentos terapêuticos são classificados como dados sensíveis pela LGPD. Implementamos isolamento de banco de dados, criptografia ponta a ponta e controle estrito de permissões, garantindo que nenhum operador tenha acesso indevido ao sigilo profissional entre paciente e terapeuta.",
            },
            {
              question: "Qual é o prazo estimado para entrega de cada fase?",
              answer:
                "Cada fase possui cronograma estimado médio de 2 a 4 semanas de desenvolvimento e homologação conjunta, totalizando um ciclo de entrega acelerado e ágil.",
            },
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={LOGO_URL}
              alt="ViraWeb"
              className="h-7 w-auto object-contain brightness-110"
            />
            <span className="hidden sm:inline text-slate-800">|</span>
            <div>
              <p className="font-semibold text-slate-300">
                ViraWeb Soluções Digitais & Engenharia de Software
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                © 2026 ViraWeb. Documento de Escopo & Orçamento Técnico — Ecossistema NXTGEN v2.1.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openWhatsApp("duvida")}
              className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold transition-colors"
            >
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Action Button on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-50 md:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-mono">
            Ecossistema NXTGEN
          </div>
          <div className="text-xs font-black text-amber-300 font-mono">
            R$ 32.500,00 (5 Fases)
          </div>
        </div>
        <button
          type="button"
          onClick={() => openWhatsApp("completo")}
          className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Aprovar Projeto</span>
        </button>
      </div>
    </div>
  );
}
