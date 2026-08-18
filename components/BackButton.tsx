"use client";

import { useRouter } from "next/navigation";

export function BackButton({ label = "Voltar" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-3 flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400"
    >
      <span aria-hidden>←</span> {label}
    </button>
  );
}
