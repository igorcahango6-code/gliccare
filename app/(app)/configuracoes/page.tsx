import Link from "next/link";

export default function ConfiguracoesPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Configurações
      </h1>
      <Link
        href="/configuracoes/limites"
        className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-teal-400"
      >
        Limites de alerta de glicemia
      </Link>
      <Link
        href="/configuracoes/lembretes"
        className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-teal-400"
      >
        Lembretes
      </Link>
      <Link
        href="/relatorio"
        className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-teal-400"
      >
        Relatório para o médico
      </Link>
    </div>
  );
}
