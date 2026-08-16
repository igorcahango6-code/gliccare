import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { GlucoseTrendChart } from "@/components/charts/GlucoseTrendChart";
import { PrintButton } from "@/components/PrintButton";
import type { TimelineEntry } from "@/lib/queries/timeline";

const PERIODS = [
  { dias: 7, label: "7 dias" },
  { dias: 30, label: "30 dias" },
  { dias: 90, label: "90 dias" },
];

const CATEGORY_LABELS: Record<TimelineEntry["entry_type"], string> = {
  glucose: "Medições de glicemia",
  insulin: "Aplicações de insulina",
  meal: "Refeições registradas",
  activity: "Atividades físicas",
  oral_medication: "Doses de medicamento",
  weight: "Registros de peso",
  blood_pressure: "Medições de pressão",
  note: "Anotações",
};

export default async function RelatorioPage({
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
  const [
    {
      data: { user },
    },
    { data: entries, error },
    thresholds,
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from("diary_timeline")
      .select("*")
      .gte("occurred_at", since.toISOString())
      .order("occurred_at", { ascending: true }),
    getMyThresholds(),
  ]);

  if (error) throw new Error(error.message);

  const timelineEntries = (entries ?? []) as TimelineEntry[];
  const glucoseEntries = timelineEntries.filter((e) => e.entry_type === "glucose");
  const glucoseValues = glucoseEntries
    .map((e) => e.value)
    .filter((v): v is number => v != null);

  const count = glucoseValues.length;
  const average = count > 0 ? glucoseValues.reduce((a, b) => a + b, 0) / count : null;
  const min = count > 0 ? Math.min(...glucoseValues) : null;
  const max = count > 0 ? Math.max(...glucoseValues) : null;

  const hasThresholds = thresholds?.min_mgdl != null && thresholds?.max_mgdl != null;
  const hypoCount =
    hasThresholds && thresholds
      ? glucoseValues.filter((v) => v < thresholds.min_mgdl!).length
      : null;
  const hyperCount =
    hasThresholds && thresholds
      ? glucoseValues.filter((v) => v > thresholds.max_mgdl!).length
      : null;
  const inRangePct =
    hasThresholds && count > 0 && hypoCount != null && hyperCount != null
      ? Math.round(((count - hypoCount - hyperCount) / count) * 100)
      : null;

  const categoryCounts = timelineEntries.reduce<Record<string, number>>(
    (acc, entry) => {
      acc[entry.entry_type] = (acc[entry.entry_type] ?? 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 print:max-w-none">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Relatório
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {PERIODS.map((period) => (
            <Link
              key={period.dias}
              href={`/relatorio?dias=${period.dias}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                dias === period.dias
                  ? "bg-teal-600 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {period.label}
            </Link>
          ))}
          <PrintButton />
        </div>
      </div>

      <div className="hidden flex-col gap-1 print:flex">
        <h1 className="text-xl font-semibold text-zinc-900">
          Relatório GlicCare — {user?.user_metadata?.full_name ?? user?.email}
        </h1>
        <p className="text-sm text-zinc-600">
          Período: últimos {dias} dias · Gerado em{" "}
          {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Média de glicemia" value={average != null ? `${Math.round(average)} mg/dL` : "—"} />
        <StatCard label="Mínima / máxima" value={min != null && max != null ? `${min} / ${max}` : "—"} />
        <StatCard
          label="Tempo em faixa"
          value={inRangePct != null ? `${inRangePct}%` : "Configure limites"}
        />
        <StatCard label="Total de medições" value={String(count)} />
        <StatCard label="Hipoglicemias" value={hypoCount != null ? String(hypoCount) : "—"} />
        <StatCard label="Hiperglicemias" value={hyperCount != null ? String(hyperCount) : "—"} />
      </div>

      {glucoseEntries.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 print:border-zinc-300">
          <GlucoseTrendChart
            data={glucoseEntries.map((e) => ({
              measured_at: e.occurred_at,
              value_mgdl: e.value ?? 0,
            }))}
            minMgdl={thresholds?.min_mgdl ?? null}
            maxMgdl={thresholds?.max_mgdl ?? null}
          />
        </div>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 print:border-zinc-300">
        <h2 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Resumo do período
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-3">
          {Object.entries(CATEGORY_LABELS).map(([type, label]) => (
            <li key={type}>
              {label}: <strong className="text-zinc-900 dark:text-zinc-50">{categoryCounts[type] ?? 0}</strong>
            </li>
          ))}
        </ul>
      </div>

      {glucoseEntries.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 print:border-zinc-300">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
                <th className="px-3 py-2 font-medium">Data</th>
                <th className="px-3 py-2 font-medium">Valor</th>
                <th className="px-3 py-2 font-medium">Método</th>
              </tr>
            </thead>
            <tbody>
              {glucoseEntries
                .slice()
                .reverse()
                .map((entry) => (
                  <tr key={entry.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">
                      {format(new Date(entry.occurred_at), "dd/MM 'às' HH:mm", { locale: ptBR })}
                    </td>
                    <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-50">
                      {entry.value} mg/dL
                    </td>
                    <td className="px-3 py-2 text-zinc-500 dark:text-zinc-500">
                      {entry.summary.includes("manual") ? "Manual" : "Sensor"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950 print:border-zinc-300">
      <p className="text-xs text-zinc-500 dark:text-zinc-500">{label}</p>
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}
