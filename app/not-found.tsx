import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Página não encontrada
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        O endereço que você tentou acessar não existe.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
