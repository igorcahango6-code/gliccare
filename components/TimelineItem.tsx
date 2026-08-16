import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TimelineEntry } from "@/lib/queries/timeline";

const ENTRY_META: Record<
  TimelineEntry["entry_type"],
  { icon: string; label: string; editHref: string }
> = {
  glucose: { icon: "🩸", label: "Glicemia", editHref: "/glicemia" },
  insulin: { icon: "💉", label: "Insulina", editHref: "/insulina" },
  meal: { icon: "🍽️", label: "Refeição", editHref: "/refeicoes" },
  activity: { icon: "🚶", label: "Atividade física", editHref: "/atividades" },
  oral_medication: {
    icon: "💊",
    label: "Medicamento",
    editHref: "/medicamentos",
  },
  weight: { icon: "⚖️", label: "Peso", editHref: "/peso" },
  blood_pressure: {
    icon: "❤️",
    label: "Pressão arterial",
    editHref: "/pressao",
  },
  note: { icon: "📝", label: "Anotação", editHref: "/anotacoes" },
};

export function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const meta = ENTRY_META[entry.entry_type];

  return (
    <li>
      <Link
        href={`${meta.editHref}/${entry.id}`}
        className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition-colors hover:border-teal-600 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <span className="text-xl leading-none">{meta.icon}</span>
        <div className="flex min-w-0 flex-1 flex-col">
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
      </Link>
    </li>
  );
}
