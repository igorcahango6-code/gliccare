"use client";

import { useEffect, useState } from "react";

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
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
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
      <p className="rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm text-teal-800 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300">
        Notificações permitidas neste navegador.
      </p>
    );
  }

  if (permission === "denied") {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
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
