"use client";

import { useEffect, useState } from "react";

type TestResult = "ok" | "error" | null;

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export function NotificationPermissionButton() {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );
  const [needsIosInstall, setNeedsIosInstall] = useState(false);
  const [testResult, setTestResult] = useState<TestResult>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isIosDevice() && !isStandalone()) {
      setNeedsIosInstall(true);
      return;
    }

    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  if (needsIosInstall) {
    return (
      <div className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-800 shadow-sm dark:bg-amber-950 dark:text-amber-300">
        <p className="font-medium">No iPhone, adicione o GlicCare à Tela de Início para receber notificações:</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4">
          <li>Toque no ícone de compartilhar (quadrado com seta) na barra do Safari.</li>
          <li>Escolha &quot;Adicionar à Tela de Início&quot;.</li>
          <li>Abra o GlicCare a partir do ícone que aparecer na Tela de Início (não pelo Safari).</li>
          <li>Volte aqui em Lembretes e toque em permitir notificações.</li>
        </ol>
      </div>
    );
  }

  if (permission === null) return null;

  if (permission === "granted") {
    return (
      <div className="flex flex-col gap-2">
        <p className="rounded-2xl bg-teal-50 p-3 text-sm text-teal-800 shadow-sm dark:bg-teal-950 dark:text-teal-300">
          Notificações permitidas neste navegador.
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              new Notification("GlicCare", {
                body: "Notificação de teste — se você está vendo isso, está tudo funcionando!",
              });
              setTestResult("ok");
            } catch {
              setTestResult("error");
            }
          }}
          className="self-start rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Testar notificação agora
        </button>
        {testResult === "ok" && (
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Comando enviado. Apareceu uma notificação na tela (ou no canto do
            sistema)? Se não apareceu nada, o problema é nas configurações de
            notificação do sistema operacional ou do navegador para este
            site, não no GlicCare.
          </p>
        )}
        {testResult === "error" && (
          <p className="text-xs text-red-600 dark:text-red-400">
            O navegador recusou enviar a notificação de teste.
          </p>
        )}
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <p className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-800 shadow-sm dark:bg-amber-950 dark:text-amber-300">
        As notificações foram bloqueadas nas configurações do navegador.
        Ative-as manualmente para receber os lembretes.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={() => Notification.requestPermission().then(setPermission)}
      className="rounded-lg border border-teal-600 px-4 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950"
    >
      Permitir notificações no navegador
    </button>
  );
}
