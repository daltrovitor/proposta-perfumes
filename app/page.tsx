"use client";

import { useState } from "react";
import {
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Database,
  Clock,
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Cpu,
  BadgePercent,
  Lock,
  ChevronDown,
  Calculator,
  ExternalLink,
} from "lucide-react";

// ========================================================
// INSIRA SEU WHATSAPP AQUI (Apenas números com DDI e DDD)
// ========================================================
const SEU_WHATSAPP = "5511999999999";

interface PricingPlan {
  name: string;
  badge: string;
  skus: string;
  desc: string;
  priceSemErp: string;
  priceComErp: string;
  days: string;
  features: string[];
  featured?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Pacote Start",
    badge: "Para pequenos estoques",
    skus: "Até 50 SKUs",
    desc: "Ideal para quem está iniciando com uma linha selecionada de perfumes.",
    priceSemErp: "R$ 950",
    priceComErp: "R$ 750",
    days: "3 a 4 dias úteis",
    features: [
      "Até 50 perfumes cadastrados nos 3 canais",
      "Higienização e revisão da planilha-base",
      "Mapeamento de Volumetria (ml), Gênero e Família Olfativa",
      "Validação e testes de estoque no ar",
    ],
  },
  {
    name: "Pacote Pro",
    badge: "Recomendado • Médio Porte",
    skus: "51 a 200 SKUs",
    desc: "Volume padrão para distribuidores, lojistas e perfumarias multimarcas.",
    priceSemErp: "R$ 1.800",
    priceComErp: "R$ 1.450",
    days: "5 a 7 dias úteis",
    featured: true,
    features: [
      "Até 200 perfumes cadastrados nos 3 canais",
      "Estruturação completa de atributos Anvisa e EAN",
      "Otimização de títulos com termos de busca (SEO)",
      "Tratamento de links e homologação de fotos",
      "Suporte prioritário pós-publicação para ajustes",
    ],
  },
  {
    name: "Pacote Scale",
    badge: "Grande Catálogo",
    skus: "201 a 500 SKUs",
    desc: "Para operações consolidadas com ampla variedade de fragrâncias.",
    priceSemErp: "R$ 3.200",
    priceComErp: "R$ 2.550",
    days: "7 a 10 dias úteis",
    features: [
      "Até 500 perfumes cadastrados nos 3 canais",
      "Automação em lote via scripts de validação cruzada",
      "Tratamento massivo de links de imagens e variações",
      "Homologação e correção de rejeições por lote",
      "Acompanhamento de relatórios de carga",
    ],
  },
];

const faqs = [
  {
    q: "E se eu não souber a quantidade exata de produtos agora?",
    a: "Não tem problema! Você pode me enviar a sua lista como ela está hoje. Eu faço a auditoria e a contagem exata, enquadrando no pacote mais vantajoso e econômico para você antes de iniciarmos.",
  },
  {
    q: "Como a presença de um ERP altera o valor?",
    a: "Quando você já tem um ERP como Bling ou Tiny configurado, aproveitamos as integrações e APIs nativas já existentes, o que torna o processo mais rápido e permite um desconto de ~20%. Caso não possua, nós cuidamos da carga massiva diretamente nas 3 plataformas sem nenhum custo de software adicional para você.",
  },
  {
    q: "E se alguns perfumes não tiverem código de barras (EAN)?",
    a: "Nós avaliamos caso a caso. O Mercado Livre e a Shopee possuem regras específicas para produtos sem GTIN comercial cadastrado e realizamos os ajustes necessários para que o anúncio não seja rejeitado.",
  },
  {
    q: "Preciso passar a senha das minhas contas nos marketplaces?",
    a: "Não é necessário. Você pode nos fornecer acesso via 'usuário operador/colaborador' com permissões restritas a catálogo, ou conectar diretamente através do ERP, garantindo total segurança.",
  },
];

export default function ProposalPage() {
  const [hasErp, setHasErp] = useState(false);
  const [skuCount, setSkuCount] = useState(120);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic calculation for calculator
  const calculateEstimate = (count: number, withErp: boolean) => {
    if (count <= 50) {
      return { price: withErp ? 750 : 950, days: "3 a 4 dias úteis" };
    } else if (count <= 200) {
      return { price: withErp ? 1450 : 1800, days: "5 a 7 dias úteis" };
    } else if (count <= 500) {
      return { price: withErp ? 2550 : 3200, days: "7 a 10 dias úteis" };
    } else {
      const extraSkus = count - 500;
      const basePrice = withErp ? 2550 : 3200;
      const extraRate = withErp ? 3.5 : 4.5;
      return {
        price: Math.round(basePrice + extraSkus * extraRate),
        days: "10 a 15 dias úteis",
      };
    }
  };

  const calculated = calculateEstimate(skuCount, hasErp);

  const handleWhatsAppRedirect = (context: string) => {
    const erpLabel = hasErp ? "JÁ POSSUO ERP configurado" : "NÃO possuo ERP";
    let msg = "";

    if (context === "contato") {
      msg = `Olá! Vi a proposta de cadastro de perfumes no Mercado Livre, Shopee e TikTok Shop e gostaria de tirar uma dúvida. (${erpLabel})`;
    } else if (context === "calculadora") {
      msg = `Olá! Simulei a proposta para aproximadamente ${skuCount} perfumes (estimado em R$ ${calculated.price.toLocaleString("pt-BR")}). [Condição: ${erpLabel}]. Como podemos iniciar?`;
    } else {
      msg = `Olá! Gostei da proposta e quero fechar o *${context}* para cadastrar meus perfumes no Mercado Livre, Shopee e TikTok Shop. [Condição: ${erpLabel}]. Podemos alinhar os próximos passos?`;
    }

    const url = `https://wa.me/${SEU_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16 selection:bg-emerald-500 selection:text-white">
      {/* Top Header Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-semibold tracking-wide">
              Proposta Comercial Exclusiva
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden sm:inline text-xs">
              Validade: 10 dias corridos
            </span>
            <button
              onClick={() => handleWhatsAppRedirect("contato")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Falar no WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-16 px-4 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto">
          {/* Marketplace Badges */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold mb-6 shadow-inner">
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Mercado Livre
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Shopee
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-100">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> TikTok Shop
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Cadastramento & Integração Massiva do seu Catálogo de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Perfumes
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Estruturação técnica, conformidade com regras da ANVISA/EAN e publicação automatizada nos 3 principais marketplaces simultaneamente.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-3">
              <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Publicação Rápida</div>
                <div className="text-[11px] text-slate-400">Sem digitação manual lenta</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Zero Risco de Bloqueio</div>
                <div className="text-[11px] text-slate-400">Métodos oficiais homologados</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Regras da Anvisa & SEO</div>
                <div className="text-[11px] text-slate-400">Atributos técnicos validados</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Pronto para Vender</div>
                <div className="text-[11px] text-slate-400">Estoque, fotos e variações</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic ERP Toggle */}
      <section className="px-4 max-w-6xl mx-auto" id="valores">
        <div className="max-w-xl mx-auto mb-10 p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-sm text-white">
                <Database className="w-4 h-4 text-emerald-400" />
                Você já possui ERP integrado?
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Bling, Tiny, Ideris ou Magis5 já configurado com as contas.
              </p>
            </div>

            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setHasErp(false)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !hasErp
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Não tenho ERP
              </button>
              <button
                type="button"
                onClick={() => setHasErp(true)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  hasErp
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Já tenho ERP{" "}
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                  -20%
                </span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
            {hasErp ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Condição Especial Ativada (-20%):</strong> Como você já possui ERP, aproveitamos a estrutura pronta para automatizar a carga de forma mais ágil e econômica!
                </span>
              </>
            ) : (
              <>
                <Database className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>Modo Automação Completa:</strong> Faremos o preparo e a carga massiva direta nas 3 plataformas sem que você precise contratar nenhum software adicional.
                </span>
              </>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const currentPrice = hasErp ? plan.priceComErp : plan.priceSemErp;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                  plan.featured
                    ? "bg-gradient-to-b from-slate-800/90 to-slate-900 border-2 border-emerald-500 shadow-2xl glow-effect"
                    : "bg-slate-900/70 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-black tracking-wide uppercase shadow">
                    Mais Escolhido
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          plan.featured ? "text-emerald-400" : "text-slate-400"
                        }`}
                      >
                        {plan.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {plan.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                      {plan.skus}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 mb-6 leading-relaxed">
                    {plan.desc}
                  </p>

                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-black text-white">
                      {currentPrice}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Prazo: {plan.days}
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4 space-y-2.5 text-xs text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWhatsAppRedirect(plan.name)}
                  className={`mt-8 w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    plan.featured
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  Selecionar {plan.name} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive SKU Calculator */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-4xl mx-auto shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  Simulador de Volume Personalizado
                </h3>
                <p className="text-xs text-slate-400">
                  Arraste para ajustar a quantidade aproximada de perfumes na sua lista.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Quantidade:</span>
              <div className="text-2xl font-black text-emerald-400">
                {skuCount} produtos
              </div>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={skuCount}
              onChange={(e) => setSkuCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
              <span>10 SKUs</span>
              <span>250 SKUs</span>
              <span>500 SKUs</span>
              <span>750 SKUs</span>
              <span>1.000+ SKUs</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Investimento Estimado ({hasErp ? "Com ERP" : "Sem ERP"}):</div>
              <div className="text-3xl font-black text-white">
                R$ {calculated.price.toLocaleString("pt-BR")}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Prazo estimado: <strong className="text-slate-200">{calculated.days}</strong> • ~R$ {(calculated.price / skuCount).toFixed(2)} por produto
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleWhatsAppRedirect("calculadora")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Iniciar com {skuCount} Produtos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Escopo Técnico & Garantias */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Escopo Completo
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Tudo o Que Cuidamos na Sua Operação
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              1. Higienização & Regras de Perfumes
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mapeamos marca, volume (ml), gênero (masculino/feminino/unissex), concentração (Parfum, EDT, EDP) e código EAN para evitar anúncios pausados ou com baixa relevância.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              2. Publicação Automatizada Oficial
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subida em lote estruturada via planilha mestre ou sincronização via ERP. Zero risco de instabilidade ou bloqueios por robôs de tela que violam termos de serviço.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <BadgePercent className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1.5">
              3. Homologação & Go-Live
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conferimos imagens, descrições, preços e estoques iniciais no ar. Qualquer rejeição apontada pelas plataformas é corrigida antes da entrega final.
            </p>
          </div>
        </div>
      </section>

      {/* Condição de Pagamento */}
      <section className="py-6 px-4 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-bold text-base">
              <Lock className="w-4 h-4 text-emerald-400" /> Condição Segura de Pagamento
            </div>
            <p className="text-xs text-slate-400 mt-1">
              <strong>50% de entrada</strong> no início dos trabalhos e <strong>50% somente na entrega</strong> com todos os produtos validados e no ar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleWhatsAppRedirect("contato")}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all active:scale-95"
          >
            Tirar Dúvida no WhatsApp
          </button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Perguntas Frequentes
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs font-bold text-white hover:text-emerald-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform text-slate-400 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 z-50 md:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-xs">
          <div className="text-slate-400">Dúvidas sobre o projeto?</div>
          <div className="font-bold text-white">Fale direto comigo</div>
        </div>
        <button
          type="button"
          onClick={() => handleWhatsAppRedirect("contato")}
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg active:scale-95"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
      </div>
    </div>
  );
}
