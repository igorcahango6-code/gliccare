"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dismissOnboarding } from "@/lib/actions/auth";

const SLIDES = [
  {
    icon: "👋",
    title: "Bem-vindo ao GlicCare",
    text: "Seu diário digital de glicemia, insulina, alimentação e mais — simples, no computador ou no celular.",
  },
  {
    icon: "➕",
    title: "Registre tudo em um só lugar",
    text: 'Toque em "+ Novo registro" para adicionar glicemia, insulina, refeições, atividades, medicamentos, peso, pressão ou anotações.',
  },
  {
    icon: "☰",
    title: "Tudo pelo menu",
    text: "Toque no ícone de três tracinhos (ou veja a barra lateral no computador) para acessar gráficos, relatório, lembretes e configurações.",
  },
  {
    icon: "🎯",
    title: "Configure seus limites",
    text: "Em Configurações, defina os valores de glicemia que fazem sentido para você e receba um aviso quando algo sair da faixa.",
  },
  {
    icon: "🔒",
    title: "Seus dados são só seus",
    text: "Tudo o que você registra é privado — só você tem acesso à sua conta.",
  },
];

export function OnboardingTour() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const isLast = index === SLIDES.length - 1;

  async function finish() {
    setVisible(false);
    await dismissOnboarding();
    router.refresh();
  }

  if (!visible) return null;

  const slide = SLIDES[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 [animation:fade-in_0.2s_ease-out]">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-zinc-900">
        <button
          type="button"
          onClick={finish}
          className="self-end text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          Pular
        </button>

        <span className="text-5xl">{slide.icon}</span>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {slide.title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{slide.text}</p>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-teal-600" : "w-1.5 bg-zinc-200 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>

        <div className="mt-2 flex w-full gap-2">
          {index > 0 && (
            <button
              type="button"
              onClick={() => setIndex((i) => i - 1)}
              className="flex-1 rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={() => (isLast ? finish() : setIndex((i) => i + 1))}
            className="flex-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-teal-700 active:scale-[0.97]"
          >
            {isLast ? "Começar" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
}
