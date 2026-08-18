import { getMyThresholds } from "@/lib/queries/thresholds";
import { ThresholdsForm } from "@/components/ThresholdsForm";
import { BackButton } from "@/components/BackButton";

export default async function LimitesPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const thresholds = await getMyThresholds();
  const { salvo } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-md">
      <BackButton />
      <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Limites de alerta
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        Defina os limites de glicemia que fazem sentido para você. Converse
        com seu médico se tiver dúvida sobre quais valores usar — não temos
        um padrão pré-definido porque isso varia de pessoa para pessoa.
      </p>
      <ThresholdsForm
        minMgdl={thresholds?.min_mgdl ?? null}
        maxMgdl={thresholds?.max_mgdl ?? null}
        saved={salvo === "1"}
      />
    </div>
  );
}
