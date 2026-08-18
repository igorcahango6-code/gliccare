import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { GlucoseTrendChart } from "@/components/charts/GlucoseTrendChart";
import { PrintButton } from "@/components/PrintButton";
import { MonthPicker } from "@/components/MonthPicker";
import { resolvePeriod } from "@/lib/utils/period";
import { calculateAge } from "@/lib/utils/age";
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
  searchParams: Promise<{ dias?: string; mes?: string }>;
}) {
  const { dias: diasParam, mes } = await searchParams;
  const period = resolvePeriod({ dias: diasParam, mes });

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
      .gte("occurred_at", period.since.toISOString())
      .lt("occurred_at", period.until.toISOString())
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
          {!period.isMonth &&
            PERIODS.map((p) => (
              <Link
                key={p.dias}
                href={`/relatorio?dias=${p.dias}`}
                className={`rounded-full px-3 py-1 text-sm font-medium shadow-sm transition-colors ${
                  period.label === p.label
                    ? "bg-teal-600 text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {p.label}
              </Link>
            ))}
          <PrintButton />
        </div>
      </div>

      <div className="print:hidden">
        <MonthPicker basePath="/relatorio" currentMonth={mes} isMonth={period.isMonth} />
      </div>

      <div className="hidden flex-col gap-1 print:flex">
        <h1 className="text-xl font-semibold text-zinc-900">
          Relatório GlicCare — {user?.user_metadata?.full_name ?? user?.email}
          {user?.user_metadata?.birth_date &&
            ` · ${calculateAge(user.user_metadata.birth_date)} anos`}
        </h1>
        <p className="text-sm capitalize text-zinc-600">
          Período: {period.label} · Gerado em{" "}
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
        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900 print:rounded-xl print:border print:border-zinc-300 print:shadow-none">
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

      <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900 print:rounded-xl print:border print:border-zinc-300 print:shadow-none">
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
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm dark:bg-zinc-900 print:rounded-xl print:border print:border-zinc-300 print:shadow-none">
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
    <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-zinc-900 print:rounded-xl print:border print:border-zinc-300 print:shadow-none">
      <p className="text-xs text-zinc-500 dark:text-zinc-500">{label}</p>
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}
