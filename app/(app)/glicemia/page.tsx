import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { getAlertStatus } from "@/lib/utils/thresholds";

const STATUS_STYLES: Record<string, string> = {
  low: "border-blue-300 bg-blue-50 dark:border-blue-900 dark:bg-blue-950",
  high: "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950",
};

const STATUS_BADGE: Record<string, string> = {
  low: "bg-blue-600",
  high: "bg-red-600",
};

const STATUS_LABEL: Record<string, string> = {
  low: "Baixa",
  high: "Alta",
};

export default async function GlicemiaPage() {
  const supabase = await createClient();
  const [{ data: readings, error }, thresholds] = await Promise.all([
    supabase
      .from("glucose_readings")
      .select("id, value_mgdl, method, measured_at, notes")
      .order("measured_at", { ascending: false })
      .limit(50),
    getMyThresholds(),
  ]);

  if (error) throw new Error(error.message);

  const hasThresholds = thresholds?.min_mgdl != null && thresholds?.max_mgdl != null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Glicemia
        </h1>
        <Link
          href="/glicemia/nova"
          className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          + Nova
        </Link>
      </div>

      {!hasThresholds && (
        <Link
          href="/configuracoes/limites"
          className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 transition-colors hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300"
        >
          Configure seus limites para receber alertas de glicemia alta ou
          baixa →
        </Link>
      )}

      {readings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Nenhuma medição registrada ainda.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {readings.map((reading) => {
            const status = getAlertStatus(
              reading.value_mgdl,
              thresholds?.min_mgdl,
              thresholds?.max_mgdl,
            );
            const highlight = status === "low" || status === "high";

            return (
              <li key={reading.id}>
                <Link
                  href={`/glicemia/${reading.id}`}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-colors hover:border-teal-600 ${
                    highlight
                      ? STATUS_STYLES[status]
                      : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  }`}
                >
                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                        {reading.value_mgdl} mg/dL
                      </span>
                      {highlight && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium text-white ${STATUS_BADGE[status]}`}
                        >
                          {STATUS_LABEL[status]}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-500">
                      {format(new Date(reading.measured_at), "dd/MM 'às' HH:mm", {
                        locale: ptBR,
                      })}
                      {" · "}
                      {reading.method === "manual" ? "Manual" : "Sensor"}
                    </span>
                    {reading.notes && (
                      <span className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {reading.notes}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
