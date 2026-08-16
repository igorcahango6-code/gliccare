import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { GlucoseTrendChart } from "@/components/charts/GlucoseTrendChart";

const PERIODS = [
  { dias: 7, label: "7 dias" },
  { dias: 30, label: "30 dias" },
  { dias: 90, label: "90 dias" },
];

export default async function GraficosPage({
  searchParams,
}: {
  searchParams: Promise<{ dias?: string }>;
}) {
  const { dias: diasParam } = await searchParams;
  const dias = PERIODS.some((p) => String(p.dias) === diasParam)
    ? Number(diasParam)
    : 30;

  const since = new Date();
  since.setDate(since.getDate() - dias);

  const supabase = await createClient();
  const [{ data: readings, error }, thresholds] = await Promise.all([
    supabase
      .from("glucose_readings")
      .select("measured_at, value_mgdl")
      .gte("measured_at", since.toISOString())
      .order("measured_at", { ascending: true }),
    getMyThresholds(),
  ]);

  if (error) throw new Error(error.message);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Gráfico de glicemia
        </h1>
        <div className="flex gap-2">
          {PERIODS.map((period) => (
            <Link
              key={period.dias}
              href={`/graficos?dias=${period.dias}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                dias === period.dias
                  ? "bg-teal-600 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {period.label}
            </Link>
          ))}
        </div>
      </div>

      {readings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Nenhuma medição de glicemia nesse período ainda.
        </p>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <GlucoseTrendChart
            data={readings}
            minMgdl={thresholds?.min_mgdl ?? null}
            maxMgdl={thresholds?.max_mgdl ?? null}
          />
        </div>
      )}
    </div>
  );
}
