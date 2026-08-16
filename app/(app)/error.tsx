"use client";

export default function AppError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 py-16 text-center">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Algo deu errado
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Não conseguimos carregar essa página agora. Tente de novo em alguns
        instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        Tentar de novo
      </button>
    </div>
  );
}
