import Link from "next/link";
import { BackButton } from "@/components/BackButton";

const cardLinkClass =
  "rounded-2xl bg-white p-4 text-sm font-medium text-zinc-700 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-300";

export default function ConfiguracoesPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <BackButton />
      <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Configurações
      </h1>
      <Link href="/configuracoes/conta" className={cardLinkClass}>
        Conta e perfil
      </Link>
      <Link href="/configuracoes/limites" className={cardLinkClass}>
        Limites de alerta de glicemia
      </Link>
      <Link href="/configuracoes/lembretes" className={cardLinkClass}>
        Lembretes
      </Link>
      <Link href="/relatorio" className={cardLinkClass}>
        Relatório para o médico
      </Link>
    </div>
  );
}
