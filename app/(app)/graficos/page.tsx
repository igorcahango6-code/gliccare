import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { GlucoseTrendChart } from "@/components/charts/GlucoseTrendChart";
import { MonthPicker } from "@/components/MonthPicker";
import { resolvePeriod } from "@/lib/utils/period";

const PERIODS = [
  { dias: 7, label: "7 dias" },
  { dias: 30, label: "30 dias" },
  { dias: 90, label: "90 dias" },
];

export default async function GraficosPage({
  searchParams,
}: {
  searchParams: Promise<{ dias?: string; mes?: string }>;
}) {
  const { dias: diasParam, mes } = await searchParams;
  const period = resolvePeriod({ dias: diasParam, mes });

  const supabase = await createClient();
  const [{ data: readings, error }, thresholds] = await Promise.all([
    supabase
      .from("glucose_readings")
      .select("measured_at, value_mgdl")
      .gte("measured_at", period.since.toISOString())
      .lt("measured_at", period.until.toISOString())
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
        <div className="flex flex-wrap items-center gap-2">
          {!period.isMonth &&
            PERIODS.map((p) => (
              <Link
                key={p.dias}
                href={`/graficos?dias=${p.dias}`}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  period.label === p.label
                    ? "bg-teal-600 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {p.label}
              </Link>
            ))}
          <Link
            href="/relatorio"
            className="rounded-full border border-teal-600 px-3 py-1 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950"
          >
            Relatório p/ médico
          </Link>
        </div>
      </div>

      <MonthPicker basePath="/graficos" currentMonth={mes} isMonth={period.isMonth} />

      {period.isMonth && (
        <p className="text-sm capitalize text-zinc-600 dark:text-zinc-400">
          Mostrando {period.label}
        </p>
      )}

      {readings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Nenhuma medição de glicemia nesse período.
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
