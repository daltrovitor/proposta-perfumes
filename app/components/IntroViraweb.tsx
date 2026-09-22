// Hello World
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { VIRAWEB_PARTS } from "./virawebLogoData";

interface IntroVirawebProps {
  onComplete?: () => void;
}

export default function IntroViraweb({ onComplete }: IntroVirawebProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const handleFinish = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    // Reveal parts every 0.6s (600ms)
    // 0: emblem (0s)
    // 1: V (0.6s)
    // 2: i (1.2s)
    // 3: r (1.8s)
    // 4: a (2.4s)
    // 5: W (3.0s)
    // 6: e (3.6s)
    // 7: b (4.2s)
    // 8: complete (4.8s) -> auto finish at 5.5s
    const timers: NodeJS.Timeout[] = [];

    for (let i = 1; i <= 8; i++) {
      const timer = setTimeout(() => {
        setActiveStep(i);
        if (i === 8) {
          // Finished all letters, wait a brief moment to appreciate the full logo then open proposal
          const finishTimer = setTimeout(() => {
            handleFinish();
          }, 1100);
          timers.push(finishTimer);
        }
      }, i * 600);
      timers.push(timer);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFinish]);

  if (isDone) return null;

  return (
    <aside
      aria-label="Apresentação inicial ViraWeb"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-700 select-none ${
        isClosing ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Botão de pular no canto superior direito para máxima usabilidade */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={handleFinish}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-sm cursor-pointer transition-colors duration-200"
          aria-label="Pular introdução animada e abrir proposta"
        >
          <span>Pular introdução</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Container Central da Logo em SVG */}
      <div className="w-full max-w-xl sm:max-w-2xl px-8 flex flex-col items-center">
        <div className="relative w-full aspect-[2100/635]">
          <svg
            viewBox="0 0 2100 635"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
            role="img"
            aria-label="ViraWeb Soluções Digitais"
          >
            {VIRAWEB_PARTS.map((part, index) => {
              // Emblem is index 0 (appears at step >= 0)
              // Letter V is index 1 (appears at step >= 1)
              // etc.
              const isVisible = activeStep >= index;

              return (
                <g
                  key={part.id}
                  id={`viraweb-part-${part.id}`}
                  style={{
                    transform: isVisible ? "translateY(0px)" : "translateY(-140px)",
                    opacity: isVisible ? 1 : 0,
                    transition:
                      "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <image
                    href={part.href}
                    x={part.x}
                    y={part.y}
                    width={part.w}
                    height={part.h}
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Subtítulo elegante com revelação suave após a última letra */}
        <div
          className="mt-6 text-center transition-all duration-700"
          style={{
            opacity: activeStep >= 8 ? 1 : 0,
            transform: activeStep >= 8 ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="h-0.5 w-12 bg-[#8e1529] mx-auto mb-3" />
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-zinc-500">
            Soluções Digitais para Construção Civil
          </p>
          <p className="text-[11px] sm:text-xs text-zinc-400 mt-1">
            Proposta Comercial • Construtora Queiroz Silveira
          </p>
        </div>
      </div>

      {/* Indicador de progresso sutil na base */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
          <span
            key={idx}
            className={`h-1 transition-all duration-300 rounded-sm ${
              activeStep >= idx ? "w-5 bg-[#8e1529]" : "w-1.5 bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
