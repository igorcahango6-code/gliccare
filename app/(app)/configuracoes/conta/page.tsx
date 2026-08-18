import Link from "next/link";

const cardLinkClass =
  "rounded-2xl bg-white p-4 text-sm font-medium text-zinc-700 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-300";

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
        <p className="mb-2 rounded-2xl bg-teal-50 p-3 text-sm text-teal-800 shadow-sm dark:bg-teal-950 dark:text-teal-300">
          Senha alterada com sucesso.
        </p>
      )}

      <Link href="/configuracoes/conta/perfil" className={cardLinkClass}>
        Editar perfil
      </Link>
      <Link href="/configuracoes/conta/senha" className={cardLinkClass}>
        Trocar senha
      </Link>
      <Link
        href="/configuracoes/conta/excluir"
        className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700 shadow-sm transition-shadow hover:shadow-md dark:bg-red-950 dark:text-red-400"
      >
        Excluir conta
      </Link>
    </div>
  );
}
