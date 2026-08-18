import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { GlucoseTrendChart } from "@/components/charts/GlucoseTrendChart";
import { TimeInRangeBar } from "@/components/charts/TimeInRangeBar";
import { MonthPicker } from "@/components/MonthPicker";
import { resolvePeriod } from "@/lib/utils/period";
import { getAlertStatus } from "@/lib/utils/thresholds";

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

  const hasThresholds = thresholds?.min_mgdl != null && thresholds?.max_mgdl != null;
  const latest = readings.length > 0 ? readings[readings.length - 1] : null;

  let timeInRange: { lowPct: number; inRangePct: number; highPct: number } | null = null;
  if (hasThresholds && readings.length > 0) {
    const counts = { low: 0, normal: 0, high: 0 };
    readings.forEach((r) => {
      const status = getAlertStatus(r.value_mgdl, thresholds!.min_mgdl, thresholds!.max_mgdl);
      if (status) counts[status] += 1;
    });
    const total = readings.length;
    timeInRange = {
      lowPct: Math.round((counts.low / total) * 100),
      inRangePct: Math.round((counts.normal / total) * 100),
      highPct: Math.round((counts.high / total) * 100),
    };
  }

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
                className={`rounded-full px-3 py-1 text-sm font-medium shadow-sm transition-colors ${
                  period.label === p.label
                    ? "bg-teal-600 text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
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
        <p className="rounded-2xl bg-white p-6 text-center text-sm text-zinc-500 shadow-sm dark:bg-zinc-900 dark:text-zinc-500">
          Nenhuma medição de glicemia nesse período.
        </p>
      ) : (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Última glicemia: {latest?.value_mgdl} mg/dL
            </span>
            <Link
              href="/glicemia/nova"
              aria-label="Nova medição de glicemia"
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-600 text-lg font-bold leading-none text-teal-600 transition-colors hover:bg-teal-50 dark:hover:bg-teal-950"
            >
              +
            </Link>
          </div>

          <GlucoseTrendChart
            data={readings}
            minMgdl={thresholds?.min_mgdl ?? null}
            maxMgdl={thresholds?.max_mgdl ?? null}
          />

          {timeInRange ? (
            <TimeInRangeBar {...timeInRange} />
          ) : (
            <Link
              href="/configuracoes/limites"
              className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
            >
              Configure seus limites para ver o tempo no alvo →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
