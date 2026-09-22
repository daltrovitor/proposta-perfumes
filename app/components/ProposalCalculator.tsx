// Hello World
"use client";

import React, { useState, useId } from "react";
import {
  Calculator,
  ShieldCheck,
  Zap,
  Building2,
  Check,
  TrendingDown,
} from "lucide-react";

interface ProposalCalculatorProps {
  onSelectPlan?: (totalDev: number, totalSetup: number, totalMonthly: number, cnpjs: number) => void;
}

export default function ProposalCalculator({}: ProposalCalculatorProps) {
  const [cnpjCount, setCnpjCount] = useState<number>(2);
  const sliderId = useId();

  // Valores fixos
  const DEV_ROBOT = 2000;
  const DEV_SYSTEM_REF = 7500;
  const DEV_SYSTEM_SPECIAL = 4250;
  const DEV_TOTAL = DEV_ROBOT + DEV_SYSTEM_SPECIAL; // 6.250

  const SETUP_PER_CNPJ = 500;
  const MAINT_SYSTEM_REF = 1500;
  const MAINT_SYSTEM_SPECIAL = 625;
  const MAINT_PER_CNPJ = 100;

  // Cálculos dinâmicos
  const setupRobotsTotal = cnpjCount * SETUP_PER_CNPJ;
  const initialTotal = DEV_TOTAL + setupRobotsTotal;

  const monthlyRobotTotal = cnpjCount * MAINT_PER_CNPJ;
  const monthlyTotal = MAINT_SYSTEM_SPECIAL + monthlyRobotTotal;

  const totalDevSavings = DEV_SYSTEM_REF - DEV_SYSTEM_SPECIAL; // 3.250
  const monthlySavings = MAINT_SYSTEM_REF - MAINT_SYSTEM_SPECIAL; // 875

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#8e1529] uppercase font-bold">
            CONSOLIDAÇÃO COMERCIAL & SIMULADOR
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mt-0.5">
            Valor Final Consolidado da Solução
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-sm text-xs font-semibold text-emerald-800">
          <TrendingDown className="w-4 h-4" />
          <span>Economia de {formatCurrency(totalDevSavings)} no desenvolvimento</span>
        </div>
      </div>

      {/* Seletor Interativo de CNPJs */}
      <div className="mt-8 p-5 bg-zinc-50 border border-zinc-200 rounded-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label
              htmlFor={sliderId}
              className="text-sm font-bold text-zinc-900 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#8e1529]" />
              <span>Quantidade de CNPJs / SPEs a ativar no Robô Clicksign:</span>
            </label>
            <p className="text-xs text-zinc-500 mt-1">
              Cada CNPJ ativo conta com pasta dedicada no servidor e monitoramento de contratos pelo robô.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 5, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCnpjCount(num)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-sm border cursor-pointer transition-colors ${
                  cnpjCount === num
                    ? "bg-[#8e1529] text-white border-[#8e1529]"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                }`}
                aria-label={`Selecionar ${num} CNPJ${num > 1 ? "s" : ""}`}
              >
                {num} {num === 1 ? "CNPJ" : "CNPJs"}
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <div className="mt-5">
          <div className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
            <span>1 CNPJ (Mínimo)</span>
            <span className="font-bold text-[#8e1529]">{cnpjCount} {cnpjCount === 1 ? "CNPJ Selecionado" : "CNPJs Selecionados"}</span>
            <span>20 CNPJs</span>
          </div>
          <input
            id={sliderId}
            type="range"
            min="1"
            max="20"
            value={cnpjCount}
            onChange={(e) => setCnpjCount(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#8e1529]"
            aria-label="Ajustar quantidade de CNPJs"
          />
        </div>
      </div>

      {/* Grid de Resumo dos 2 Planos / Frentes */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Investimento Inicial (Setup & Dev) */}
        <div className="border border-zinc-200 rounded-sm p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                PAGAMENTO ÚNICO
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded-sm">
                Entrega & Setup
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Item 1: Robô */}
              <div className="flex items-start justify-between text-sm">
                <div>
                  <div className="font-semibold text-zinc-900">01. Desenvolvimento do Robô</div>
                  <div className="text-xs text-zinc-500">Integração Clicksign + Script de Pastas</div>
                </div>
                <span className="font-mono font-bold text-zinc-900">{formatCurrency(DEV_ROBOT)}</span>
              </div>

              {/* Item 2: Sistema Obras */}
              <div className="flex items-start justify-between text-sm">
                <div>
                  <div className="font-semibold text-zinc-900">02. Sistema de Obras & Projetos</div>
                  <div className="text-xs text-zinc-500">
                    <span className="line-through text-zinc-400 mr-1.5">{formatCurrency(DEV_SYSTEM_REF)}</span>
                    <span className="text-emerald-700 font-medium">Condição Especial QS</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#8e1529]">{formatCurrency(DEV_SYSTEM_SPECIAL)}</span>
              </div>

              {/* Item 3: Implementação Robô por CNPJ */}
              <div className="flex items-start justify-between text-sm pt-2 border-t border-zinc-100">
                <div>
                  <div className="font-semibold text-zinc-900">
                    Implementação Robô ({cnpjCount} {cnpjCount === 1 ? "CNPJ" : "CNPJs"})
                  </div>
                  <div className="text-xs text-zinc-500">{formatCurrency(SETUP_PER_CNPJ)} por CNPJ ativo</div>
                </div>
                <span className="font-mono font-bold text-zinc-900">{formatCurrency(setupRobotsTotal)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
              Total do Investimento Inicial
            </div>
            <div className="text-3xl font-extrabold text-zinc-900 font-mono tracking-tight mt-1">
              {formatCurrency(initialTotal)}
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Sendo R$ 6.250,00 de desenvolvimento dos 2 produtos + {formatCurrency(setupRobotsTotal)} de setup dos CNPJs.
            </div>
          </div>
        </div>

        {/* Card 2: Manutenção Mensal e Suporte */}
        <div className="border border-zinc-200 rounded-sm p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                RECORRÊNCIA / SUPORTE
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded-sm">
                Operação Contínua
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Item 1: Manutenção Sistema */}
              <div className="flex items-start justify-between text-sm">
                <div>
                  <div className="font-semibold text-zinc-900">Manutenção do Sistema de Obras</div>
                  <div className="text-xs text-zinc-500">
                    <span className="line-through text-zinc-400 mr-1.5">{formatCurrency(MAINT_SYSTEM_REF)}/mês</span>
                    <span className="text-emerald-700 font-medium">Condição Especial QS</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#8e1529]">{formatCurrency(MAINT_SYSTEM_SPECIAL)}/mês</span>
              </div>

              {/* Item 2: Manutenção Robô */}
              <div className="flex items-start justify-between text-sm">
                <div>
                  <div className="font-semibold text-zinc-900">
                    Manutenção Robô ({cnpjCount} {cnpjCount === 1 ? "CNPJ" : "CNPJs"})
                  </div>
                  <div className="text-xs text-zinc-500">
                    {formatCurrency(MAINT_PER_CNPJ)} por CNPJ (periodicidade a confirmar)
                  </div>
                </div>
                <span className="font-mono font-bold text-zinc-900">{formatCurrency(monthlyRobotTotal)}/mês*</span>
              </div>

              {/* Destaque de Economia */}
              <div className="p-3 bg-zinc-50 rounded-sm border border-zinc-200 text-xs text-zinc-600 mt-2">
                <span className="font-bold text-zinc-900">Economia Recorrente: </span>
                Redução de 58% na mensalidade do sistema ({formatCurrency(monthlySavings)}/mês a menos que o valor de tabela).
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
              Estimativa de Suporte Mensal
            </div>
            <div className="text-3xl font-extrabold text-zinc-900 font-mono tracking-tight mt-1">
              {formatCurrency(monthlyTotal)}
              <span className="text-sm font-normal text-zinc-500">/mês</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              *A periodicidade da manutenção do robô será alinhada nas definições de fechamento.
            </div>
          </div>
        </div>
      </div>

      {/* Tabela Comparativa Consolidada */}
      <div className="mt-8 border border-zinc-200 rounded-sm overflow-hidden">
        <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-200 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
            Tabela Consolidada de Itens & Escopos
          </span>
          <span className="text-xs text-zinc-500 font-mono">2 Produtos Distintos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-white text-zinc-500 font-mono text-[11px] uppercase">
                <th className="py-3 px-4 font-semibold">Produto / Serviço</th>
                <th className="py-3 px-4 font-semibold">Escopo Central</th>
                <th className="py-3 px-4 font-semibold">Valor Referência</th>
                <th className="py-3 px-4 font-semibold">Condição Queiroz Silveira</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {/* Produto 01 */}
              <tr className="hover:bg-zinc-50/50">
                <td className="py-3.5 px-4 font-bold text-zinc-900">
                  01. Robô Clicksign
                </td>
                <td className="py-3.5 px-4 text-zinc-600">
                  Download, renomeação automática, salvamento em pastas e relatório mensal no 1º dia útil.
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-500">R$ 2.000,00</td>
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">
                  R$ 2.000,00 <span className="font-normal text-xs text-zinc-500">(+ R$ 500/CNPJ setup)</span>
                </td>
              </tr>
              {/* Produto 02 */}
              <tr className="hover:bg-zinc-50/50">
                <td className="py-3.5 px-4 font-bold text-zinc-900">
                  02. Gestão de Projetos & Obras
                </td>
                <td className="py-3.5 px-4 text-zinc-600">
                  Pastas por disciplina, notificações de retirada/devolução, diário de obra diário, FVs e painel de fotos.
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-400 line-through">R$ 7.500,00</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#8e1529]">
                  R$ 4.250,00 <span className="text-xs text-emerald-700 font-semibold">(Economia R$ 3.250)</span>
                </td>
              </tr>
              {/* Manutenção Mensal Sistema */}
              <tr className="hover:bg-zinc-50/50">
                <td className="py-3.5 px-4 font-bold text-zinc-900">
                  Suporte & Manutenção Sistema
                </td>
                <td className="py-3.5 px-4 text-zinc-600">
                  SLA contínuo, correções, hospedagem gerenciada e suporte técnico aos engenheiros.
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-400 line-through">R$ 1.500,00/mês</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#8e1529]">
                  R$ 625,00/mês <span className="text-xs text-emerald-700 font-semibold">(Economia R$ 875/mês)</span>
                </td>
              </tr>
              {/* Manutenção Robô */}
              <tr className="hover:bg-zinc-50/50">
                <td className="py-3.5 px-4 font-bold text-zinc-900">
                  Manutenção do Robô
                </td>
                <td className="py-3.5 px-4 text-zinc-600">
                  Monitoramento contínuo da API Clicksign e integridade das pastas no servidor.
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-500">R$ 100,00/CNPJ</td>
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">
                  R$ 100,00 por CNPJ <span className="font-normal text-xs text-zinc-500">(periodicidade a confirmar)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
