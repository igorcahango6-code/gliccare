"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ReminderRow = {
  id: string;
  label: string;
  time_of_day: string;
  days_of_week: number[];
  is_active: boolean;
};

type DebugRow = {
  label: string;
  time_of_day: string;
  days_of_week: string;
  dayMatches: boolean;
  diffSeconds: number;
  inWindow: boolean;
};

export function ReminderDebugPanel() {
  const [now, setNow] = useState<string>("");
  const [rows, setRows] = useState<DebugRow[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [rawCount, setRawCount] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function check() {
      const nowDate = new Date();
      setNow(nowDate.toLocaleTimeString("pt-BR"));

      const { data: reminders, error } = await supabase
        .from("reminders")
        .select("id, label, time_of_day, days_of_week, is_active")
        .eq("is_active", true);

      if (error) {
        setQueryError(error.message);
        setRawCount(null);
        setRows(null);
        return;
      }

      setQueryError(null);
      setRawCount(reminders?.length ?? 0);

      const day = nowDate.getDay();
      const computed = (reminders as ReminderRow[] | null ?? []).map((r) => {
        const [hours, minutes] = r.time_of_day.split(":").map(Number);
        const target = new Date(nowDate);
        target.setHours(hours, minutes, 0, 0);
        const diffMs = nowDate.getTime() - target.getTime();
        return {
          label: r.label,
          time_of_day: r.time_of_day,
          days_of_week: JSON.stringify(r.days_of_week),
          dayMatches: r.days_of_week.includes(day),
          diffSeconds: Math.round(diffMs / 1000),
          inWindow: diffMs >= 0 && diffMs <= 90_000,
        };
      });
      setRows(computed);
    }

    check();
    const interval = setInterval(check, 5_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-dashed border-amber-400 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
      <p className="mb-1 font-semibold">Diagnóstico temporário</p>
      <p>Hora do navegador agora: {now}</p>
      <p>Lembretes ativos encontrados pela consulta: {rawCount ?? "…"}</p>
      {queryError && <p className="text-red-600 dark:text-red-400">Erro na consulta: {queryError}</p>}
      {rows && rows.length > 0 && (
        <table className="mt-2 w-full text-left">
          <thead>
            <tr>
              <th className="pr-2">Nome</th>
              <th className="pr-2">Horário</th>
              <th className="pr-2">Dias</th>
              <th className="pr-2">Dia bate?</th>
              <th className="pr-2">Diferença (s)</th>
              <th>Na janela?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="pr-2">{r.label}</td>
                <td className="pr-2">{r.time_of_day}</td>
                <td className="pr-2">{r.days_of_week}</td>
                <td className="pr-2">{r.dayMatches ? "sim" : "não"}</td>
                <td className="pr-2">{r.diffSeconds}</td>
                <td>{r.inWindow ? "sim" : "não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
