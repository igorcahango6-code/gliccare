"use client";

import { useEffect, useState } from "react";

export function NotificationPermissionButton() {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

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
