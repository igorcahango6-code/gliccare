import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";

export default async function GlicemiaPage() {
  const supabase = await createClient();
  const { data: readings, error } = await supabase
    .from("glucose_readings")
    .select("id, value_mgdl, method, measured_at, notes")
    .order("measured_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);

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

      {readings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
          Nenhuma medição registrada ainda.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {readings.map((reading) => (
            <li
              key={reading.id}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {reading.value_mgdl} mg/dL
                </span>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
