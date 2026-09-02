"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  ArrowRight,
  MessageCircle,
  Database,
  Calculator,
  ChevronDown,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
} from "lucide-react";

// ========================================================
// CONFIGURAÇÃO DA VIRAWEB
// ========================================================
const WHATSAPP_NUMERO = "5562996841378";
const LOGO_URL = "https://viraweb.online/viraweb3.png";

interface PlanItem {
  id: string;
  name: string;
  badge?: string;
  skuRange: string;
  description: string;
  priceWithoutErp: number;
  priceWithErp: number;
  deadline: string;
  featured?: boolean;
  deliverables: string[];
}

const PLANS: PlanItem[] = [
  {
    id: "start",
    name: "Plano Start",
    skuRange: "Até 50 SKUs",
    description: "Para operações em fase inicial ou coleções restritas de perfumaria.",
    priceWithoutErp: 950,
    priceWithErp: 750,
    deadline: "3 a 4 dias úteis",
    deliverables: [
      "Auditoria preliminar da planilha-base de produtos",
      "Mapeamento de volumetria (ml), gênero e notas olfativas",
      "Publicação nos 3 canais (Mercado Livre, Shopee, TikTok Shop)",
      "Conferência de imagens e estoque inicial no ar",
      "Relatório pós-publicação com status de cada anúncio",
    ],
  },
  {
    id: "pro",
    name: "Plano Pro",
    badge: "Mais Recomendado",
    skuRange: "51 a 200 SKUs",
    description: "Volume padrão para distribuidores, multimarcas e lojas em expansão multicanal.",
    priceWithoutErp: 1800,
    priceWithErp: 1450,
    deadline: "5 a 7 dias úteis",
    featured: true,
    deliverables: [
      "Higienização técnica completa da base cadastral",
      "Validação de conformidade regulatória (EAN/GTIN e Anvisa)",
      "Otimização algorítmica de títulos (SEO para busca)",
      "Configuração de variações de volume e concentração (EDP/EDT)",
      "Publicação em lote com resolução imediata de inconsistências",
      "Garantia pós-entrega de 7 dias úteis para revisões de catálogo",
    ],
  },
  {
    id: "scale",
    name: "Plano Scale",
    skuRange: "201 a 500 SKUs",
    description: "Para importadores e catálogos densos com alta variedade de fragrâncias.",
    priceWithoutErp: 3200,
    priceWithErp: 2550,
    deadline: "7 a 10 dias úteis",
    deliverables: [
      "Processamento via pipeline automatizado de validação cruzada",
      "Tratamento massivo de links de imagens e metadados",
      "Estruturação de marcas e famílias olfativas completas",
      "Homologação e resolução técnica de chamados de rejeição de lote",
      "Acompanhamento analítico da ativação do catálogo",
      "Suporte técnico prioritário pós-publicação",
    ],
  },
];

const TECHNICAL_SPECS = [
  {
    param: "Identificador Comercial (EAN / GTIN)",
    norm: "Obrigatório para indexação",
    desc: "Validação do código de barras oficial de cada perfume para evitar penalizações de relevância nas buscas do Mercado Livre e Shopee.",
  },
  {
    param: "Conformidade Regulatória (ANVISA)",
    norm: "Cosméticos & Higiene",
    desc: "Preenchimento do número de processo/registro ou notificação quando aplicável, assegurando estabilidade jurídica e conformidade da conta.",
  },
  {
    param: "Atributos de Fragrância",
    norm: "Filtros de Busca",
    desc: "Mapeamento rigoroso de Volumetria (ml), Concentração (Eau de Parfum, Eau de Toilette, etc.), Gênero e Linha de Produto.",
  },
  {
    param: "Padronização de Imagens",
    norm: "Políticas de Catálogo",
    desc: "Conferência de links públicos em alta resolução com fundo branco puro para imagem principal, conforme diretrizes vigentes.",
  },
];

const FAQS = [
  {
    question: "Como o uso de um ERP (Bling, Tiny, etc.) afeta o valor da proposta?",
    answer:
      "Se sua empresa já possui um ERP homologado e conectado às contas dos marketplaces, nós utilizamos as pontes de API nativas para a carga. Isso reduz o tempo de parametrização manual em cada canal, permitindo a concessão imediata de 20% de desconto no valor do projeto. Caso não possua ERP, executamos o processo por carga massiva direta com planilhas mestres oficiais.",
  },
  {
    question: "Como proceder caso a lista tenha mais de 500 produtos?",
    answer:
      "Para volumes superiores a 500 SKUs, aplica-se o valor-base do Plano Scale acrescido de uma taxa decrescente por produto adicional (R$ 4,50/SKU sem ERP ou R$ 3,50/SKU com ERP). Você pode simular o valor exato no calculador interativo desta página.",
  },
  {
    question: "É necessário compartilhar a senha principal das contas?",
    answer:
      "Não. Em hipótese alguma solicitamos senhas mestras. O acesso é viabilizado por meio de usuário colaborador (com permissões restritas à gestão de catálogo e estoque) ou via token de autorização de aplicativo/ERP.",
  },
  {
    question: "Como funciona a garantia e o suporte pós-publicação?",
    answer:
      "Após a publicação dos produtos, realizamos uma rodada completa de conferência em ambiente de produção. Caso algum anúncio apresente pendência de validação ou erro de catálogo dentro do prazo de garantia, o ajuste é efetuado sem custos adicionais.",
  },
];

export default function ProposalPage() {
  const [hasErp, setHasErp] = useState(false);
  const [skuSlider, setSkuSlider] = useState(150);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Cálculo dinâmico para simulação
  const calculateEstimate = (skus: number, withErp: boolean) => {
    if (skus <= 50) {
      return {
        price: withErp ? 750 : 950,
        deadline: "3 a 4 dias úteis",
        tier: "Plano Start",
      };
    } else if (skus <= 200) {
      return {
        price: withErp ? 1450 : 1800,
        deadline: "5 a 7 dias úteis",
        tier: "Plano Pro",
      };
    } else if (skus <= 500) {
      return {
        price: withErp ? 2550 : 3200,
        deadline: "7 a 10 dias úteis",
        tier: "Plano Scale",
      };
    } else {
      const extraSkus = skus - 500;
      const base = withErp ? 2550 : 3200;
      const rate = withErp ? 3.5 : 4.5;
      const total = Math.round(base + extraSkus * rate);
      return {
        price: total,
        deadline: "10 a 14 dias úteis",
        tier: "Catálogo Customizado",
      };
    }
  };

  const simulation = calculateEstimate(skuSlider, hasErp);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const openWhatsApp = (contextTitle: string) => {
    const erpText = hasErp
      ? "OPERAÇÃO COM ERP CONFIGURADO (Bling/Tiny)"
      : "OPERAÇÃO DIRETA (Sem ERP)";

    let text = "";
    if (contextTitle === "simulador") {
      text = `Olá! Analisei a proposta técnica da Viraweb e gostaria de avançar na contratação para cerca de *${skuSlider} produtos* (${formatBRL(
        simulation.price
      )} - ${simulation.tier}). Condição: [${erpText}]. Podemos alinhar o início?`;
    } else if (contextTitle === "duvida") {
      text = `Olá! Li a proposta da Viraweb para cadastramento de perfumaria nos marketplaces e gostaria de tirar uma dúvida técnica sobre o processo. (${erpText})`;
    } else {
      text = `Olá! Gostei da proposta e desejo confirmar o *${contextTitle}* para cadastro do nosso catálogo de perfumes no Mercado Livre, Shopee e TikTok Shop. Condição: [${erpText}].`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Top Document Metadata Bar */}
      <div className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-600">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-900 uppercase tracking-wider">
              DOCUMENTO TÉCNICO • VIRAWEB
            </span>
            <span className="text-slate-300">|</span>
            <span>Ref: PROP-2026-CAT03</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Proposta Válida por 10 dias
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Emissão: Setembro / 2026</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" /> Suporte Comercial
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Viraweb */}
            <img
              src={LOGO_URL}
              alt="Viraweb"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <div className="hidden md:block pl-4 border-l border-slate-200">
              <div className="text-xs font-bold text-slate-900 leading-none">
                Divisão de Engenharia & E-commerce
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Soluções para Operações em Marketplace
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openWhatsApp("duvida")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-300 transition-colors"
            >
              Fazer Pergunta
            </button>
            <button
              onClick={() => openWhatsApp("Plano Pro")}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm active:translate-y-px"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Aprovar Proposta</span>
            </button>
          </div>
        </div>
      </header>

      {/* Executive Briefing Section */}
      <section className="border-b border-slate-200 bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Statement */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold uppercase tracking-wider mb-4">
                Escopo de Implementação Multicanal
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
                Estruturação e Integração Massiva de Catálogo de Perfumaria
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Planejamento, higienização cadastral, validação de regras regulatórias da ANVISA e publicação estruturada de portfólio de perfumes com sincronização simultânea no <strong>Mercado Livre</strong>, <strong>Shopee</strong> e <strong>TikTok Shop</strong>.
              </p>

              {/* Scope Checklist Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                    Canais Homologados
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    Mercado Livre • Shopee • TikTok
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                    Conformidade Setorial
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    Validação de EAN & ANVISA
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                    Metodologia de Carga
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    Carga Massiva Estruturada / API
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary Card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Resumo Técnico do Projeto
                </div>
                <span className="text-[11px] font-mono text-slate-500">v2.4</span>
              </div>

              <dl className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Segmento:</dt>
                  <dd className="font-semibold text-slate-800">Perfumaria & Fragrâncias</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Canais de Venda:</dt>
                  <dd className="font-semibold text-slate-800">3 marketplaces oficiais</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Segurança:</dt>
                  <dd className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Homologado
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Condição Comercial:</dt>
                  <dd className="font-semibold text-slate-800">50% Entrada / 50% Conclusão</dd>
                </div>
              </dl>

              <div className="mt-5 pt-4 border-t border-slate-200">
                <a
                  href="#tabela-precos"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold transition-colors"
                >
                  Ver Tabela de Investimento <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure State / ERP Toggle Control */}
      <section className="bg-slate-100 border-b border-slate-200 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-300 rounded-lg p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-700" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Configuração da Infraestrutura de Origem
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Selecione a estrutura tecnológica atual do cliente para calibrar a taxa de setup e o esforço de integração:
                </p>
              </div>

              {/* Segmented Controller Button Group */}
              <div className="inline-flex p-1 bg-slate-100 border border-slate-300 rounded-md shrink-0">
                <button
                  type="button"
                  onClick={() => setHasErp(false)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded transition-all ${
                    !hasErp
                      ? "bg-white text-blue-900 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Operação Direta (Sem ERP)
                </button>
                <button
                  type="button"
                  onClick={() => setHasErp(true)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded transition-all flex items-center gap-1.5 ${
                    hasErp
                      ? "bg-blue-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>Possui ERP Ativo</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                    -20% OFF
                  </span>
                </button>
              </div>
            </div>

            {/* Diagnostic Message */}
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              {hasErp ? (
                <span>
                  <strong>Estrutura Integrada Selecionada:</strong> Com o ERP (Bling, Tiny, Ideris ou Magis5) já vinculado, o processo ocorre por via de API unificada, reduzindo o tempo de preparação técnica e garantindo <strong>20% de economia direta</strong> em qualquer plano.
                </span>
              ) : (
                <span>
                  <strong>Operação Direta Selecionada:</strong> Caso o lojista ainda não opere com ERP, nossa equipe realiza a carga massiva direta utilizando as matrizes proprietárias de planilha de cada plataforma, sem necessidade de contratação de ferramentas extras.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans (SaaS Style Table/Cards) */}
      <section id="tabela-precos" className="py-14 px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" /> Modelo de Investimento por Volume
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Dimensionamento por Faixa de Catálogo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparência e previsibilidade orçamentária de acordo com o número exato de perfumes a serem publicados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => {
            const price = hasErp ? plan.priceWithErp : plan.priceWithoutErp;
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-lg border flex flex-col justify-between transition-all relative ${
                  isFeatured
                    ? "border-blue-700 shadow-md ring-1 ring-blue-700"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                {isFeatured && (
                  <div className="bg-blue-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-t-md text-center flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {plan.badge}
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {plan.skuRange}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 min-h-[32px] mb-4 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="py-4 border-y border-slate-100 mb-4">
                    <div className="text-[11px] text-slate-500 uppercase tracking-wide">
                      Investimento Único
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-3xl font-extrabold text-slate-950 tracking-tight">
                        {formatBRL(price)}
                      </span>
                      {hasErp && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatBRL(plan.priceWithoutErp)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-2">
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      <span>Prazo de execução: <strong>{plan.deadline}</strong></span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider mb-2">
                      Itens Inclusos no Escopo:
                    </div>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 pt-0 mt-4">
                  <button
                    type="button"
                    onClick={() => openWhatsApp(plan.name)}
                    className={`w-full py-2.5 px-4 rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isFeatured
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm"
                        : "bg-blue-900 hover:bg-blue-800 text-white"
                    }`}
                  >
                    <span>Selecionar {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Volume Calculator Tool */}
        <div className="mt-10 bg-slate-50 border border-slate-300 rounded-lg p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Simulador de Volume Customizado
                </h3>
                <p className="text-xs text-slate-500">
                  Arraste para calcular estimativas para qualquer quantidade de perfumes.
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-500">Volume Simulado:</span>
              <div className="text-xl font-extrabold text-blue-900">
                {skuSlider} SKUs de Perfumes
              </div>
            </div>
          </div>

          <div className="py-6">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={skuSlider}
              onChange={(e) => setSkuSlider(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
              <span>10 SKUs</span>
              <span>250 SKUs</span>
              <span>500 SKUs</span>
              <span>750 SKUs</span>
              <span>1.000+ SKUs</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">
                Investimento Estimado ({hasErp ? "Com Desconto de ERP" : "Sem ERP"}):
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-0.5">
                {formatBRL(simulation.price)}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Classificação: <strong>{simulation.tier}</strong> • Prazo técnico: <strong>{simulation.deadline}</strong> • ~{formatBRL(Math.round(simulation.price / skuSlider))}/produto
              </div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp("simulador")}
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Contratar para {skuSlider} Produtos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Technical Perfumery Requirements Matrix */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
              Especificações Técnicas
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Critérios Obrigatórios para a Categoria de Perfumaria
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Diferente de produtos gerais, cosméticos e fragrâncias exigem campos estruturados para não sofrerem bloqueios algorítmicos.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-4">Parâmetro de Catálogo</th>
                  <th className="py-3 px-4">Classificação Normativa</th>
                  <th className="py-3 px-4">Procedimento Operacional Viraweb</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {TECHNICAL_SPECS.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {spec.param}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-medium text-[11px]">
                        {spec.norm}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 leading-relaxed">
                      {spec.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
            Metodologia & SLA
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Fases do Cronograma de Implantação
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Fase 01 • D+1
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1 mb-2">
              Auditoria da Base
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recepção do catálogo do cliente, contagem formal de SKUs e diagnóstico de pendências de código de barras ou links de fotos.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Fase 02 • D+2 a D+3
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1 mb-2">
              Mapeamento de Atributos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Padronização das planilhas ou ERP de acordo com as taxonomias de perfumaria do Mercado Livre, Shopee e TikTok Shop.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Fase 03 • D+4 a D+6
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1 mb-2">
              Execução de Carga
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Disparo automatizado dos lotes de produtos e monitoramento dos relatórios de retorno de cada marketplace para saneamento de rejeições.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Fase 04 • D+7
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1 mb-2">
              Homologação & Go-Live
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conferência dos anúncios ativos em produção com preços, estoques e fotos corretas. Emissão de relatório de conclusão.
            </p>
          </div>
        </div>
      </section>

      {/* Commercial Terms Banner */}
      <section className="py-6 px-4 max-w-6xl mx-auto">
        <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider mb-2">
              Condições Comerciais Transparentes
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Modelo 50% de Entrada e 50% na Conclusão
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              O pagamento inicial (50%) é efetuado na aprovação da proposta para início do mapeamento. O saldo remanescente (50%) somente é faturado após a homologação de todos os anúncios ativos nas 3 plataformas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp("Aprovação da Proposta")}
            className="shrink-0 px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors shadow-sm"
          >
            Aprovar Proposta Agora
          </button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
            Tire suas Dúvidas
          </div>
          <h2 className="text-xl font-bold text-slate-900">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-900 hover:bg-slate-50"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-blue-800" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={LOGO_URL}
              alt="ViraWeb Logo"
              className="h-7 w-auto object-contain"
            />
            <span className="hidden sm:inline text-slate-300">|</span>
            <div>
              <p className="font-semibold text-slate-700">
                ViraWeb Soluções Digitais & Automação E-commerce
              </p>
              <p className="text-[11px] text-slate-400">
                © 2026 ViraWeb. Todos os direitos reservados.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openWhatsApp("duvida")}
              className="px-3.5 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold transition-colors"
            >
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Action Button on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t border-slate-200 z-50 md:hidden flex items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">
            Proposta ViraWeb
          </div>
          <div className="text-xs font-bold text-slate-900">
            Dúvidas ou Início do Projeto
          </div>
        </div>
        <button
          type="button"
          onClick={() => openWhatsApp("Contato Mobile")}
          className="px-4 py-2 rounded bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Falar no WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
