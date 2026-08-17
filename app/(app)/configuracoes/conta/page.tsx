import Link from "next/link";

export default async function ContaPage({
  searchParams,
}: {
  searchParams: Promise<{ senha?: string }>;
}) {
  const { senha } = await searchParams;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Conta e perfil
      </h1>

      {senha === "1" && (
        <p className="mb-2 rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm text-teal-800 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300">
          Senha alterada com sucesso.
        </p>
      )}

      <Link
        href="/configuracoes/conta/perfil"
        className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-teal-400"
      >
        Editar nome, foto e e-mail
      </Link>
      <Link
        href="/configuracoes/conta/senha"
        className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-teal-400"
      >
        Trocar senha
      </Link>
      <Link
        href="/configuracoes/conta/excluir"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 transition-colors hover:border-red-400 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
      >
        Excluir conta
      </Link>
    </div>
  );
}
