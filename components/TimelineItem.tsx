import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TimelineEntry } from "@/lib/queries/timeline";

const ENTRY_META: Record<TimelineEntry["entry_type"], { icon: string; label: string }> = {
  glucose: { icon: "🩸", label: "Glicemia" },
  insulin: { icon: "💉", label: "Insulina" },
  meal: { icon: "🍽️", label: "Refeição" },
  activity: { icon: "🚶", label: "Atividade física" },
  oral_medication: { icon: "💊", label: "Medicamento" },
  weight: { icon: "⚖️", label: "Peso" },
  blood_pressure: { icon: "❤️", label: "Pressão arterial" },
  note: { icon: "📝", label: "Anotação" },
};

export function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const meta = ENTRY_META[entry.entry_type];

  return (
    <li className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="text-xl leading-none">{meta.icon}</span>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {meta.label}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            {format(new Date(entry.occurred_at), "dd/MM 'às' HH:mm", {
              locale: ptBR,
            })}
          </span>
        </div>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {entry.summary}
        </span>
      </div>
    </li>
  );
}
