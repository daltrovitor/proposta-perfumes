// Hello World
"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  UserCheck,
  FolderPlus,
  DownloadCloud,
  FileSignature,
  Server,
  Database,
  Send,
  ArrowDown,
  CheckCircle2,
} from "lucide-react";

interface FlowStep {
  id: number;
  label: string;
  tag: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 1,
    label: "Contrato finalizado",
    tag: "Webhook Clicksign",
    detail: "Disparo automático assim que todas as partes signatárias concluem a assinatura digital.",
    icon: FileCheck2,
  },
  {
    id: 2,
    label: "Identifica cliente & empreendimento",
    tag: "Parser Inteligente",
    detail: "Leitura dos metadados contratuais: CNPJ, SPE correspondente, nome do comprador e lote/unidade.",
    icon: UserCheck,
  },
  {
    id: 3,
    label: "Cria pasta do cliente",
    tag: "Organização Automática",
    detail: "Criação padronizada da árvore de diretórios no servidor por Empreendimento/Cliente.",
    icon: FolderPlus,
  },
  {
    id: 4,
    label: "Baixa PDF assinado",
    tag: "Download Seguro",
    detail: "Obtenção do arquivo criptografado oficial do Clicksign contendo os carimbos de validação legal.",
    icon: DownloadCloud,
  },
  {
    id: 5,
    label: "Renomeia arquivo no padrão QS",
    tag: "Padronização Institucional",
    detail: "Aplicação da nomenclatura técnica estrita da Queiroz Silveira (Data_Empreendimento_Cliente_ID.pdf).",
    icon: FileSignature,
  },
  {
    id: 6,
    label: "Salva no servidor de arquivos",
    tag: "Armazenamento Central",
    detail: "Gravação na pasta definitiva de contratos finalizados para acesso da equipe financeira e jurídica.",
    icon: Server,
  },
  {
    id: 7,
    label: "Registra no banco de dados",
    tag: "Auditoria & Logs",
    detail: "Armazenamento do histórico de movimentação para alimentar o fechamento e relatórios do 1º dia útil.",
    icon: Database,
  },
  {
    id: 8,
    label: "Envia confirmação e alerta",
    tag: "Notificação Ativa",
    detail: "Aviso de sucesso para os gestores responsáveis via canal oficial definido pela construtora.",
    icon: Send,
  },
];

export default function RobotFlowChart() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-100">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#8e1529] uppercase font-bold">
            ARQUITETURA DE AUTOMAÇÃO
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mt-0.5">
            Fluxo Contínuo de Processamento do Robô
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
          <span>Execução em Segundo Plano (24/7)</span>
        </div>
      </div>

      {/* Grid Sequencial em Padrão F */}
      <div className="mt-8 space-y-3">
        {FLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;
          const isLast = index === FLOW_STEPS.length - 1;

          return (
            <div key={step.id} className="relative">
              <div
                onClick={() => setSelectedStep(isSelected ? null : step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedStep(isSelected ? null : step.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isSelected}
                aria-label={`Passo ${step.id}: ${step.label}`}
                className={`group flex items-start gap-4 p-4 rounded-sm border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "border-[#8e1529] bg-[#8e1529]/5"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/60"
                }`}
              >
                {/* Número do passo */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-[#8e1529] text-white"
                      : "bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200"
                  }`}
                >
                  0{step.id}
                </div>

                {/* Conteúdo do passo */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-zinc-900">
                      {step.label}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                {/* Ícone */}
                <div
                  className={`flex-shrink-0 p-2 rounded-sm transition-colors ${
                    isSelected ? "text-[#8e1529]" : "text-zinc-400 group-hover:text-zinc-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Conector de seta descendente */}
              {!isLast && (
                <div className="flex items-center justify-center py-1 text-zinc-300">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Destaque do Relatório Mensal no 1º Dia Útil */}
      <div className="mt-8 p-5 bg-zinc-50 border border-zinc-200 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#8e1529] text-white rounded-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">
              Fechamento Automático Mensal de Contratos
            </h4>
            <p className="text-xs text-zinc-600 mt-0.5">
              Todo início de mês, o robô compila o relatório consolidado de todos os contratos assinados no período anterior e armazena na pasta de auditoria.
            </p>
          </div>
        </div>
        <span className="flex-shrink-0 text-xs font-mono font-medium px-3 py-1.5 bg-white border border-zinc-200 rounded-sm text-zinc-700">
          Pasta: /Relatorios/AAAA-MM
        </span>
      </div>
    </div>
  );
}
