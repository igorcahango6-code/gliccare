import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { TimelineEntry } from "@/lib/queries/timeline";
import { ENTRY_STYLES } from "@/lib/entryStyles";

const EDIT_HREF: Record<TimelineEntry["entry_type"], string> = {
  glucose: "/glicemia",
  insulin: "/insulina",
  meal: "/refeicoes",
  activity: "/atividades",
  oral_medication: "/medicamentos",
  weight: "/peso",
  blood_pressure: "/pressao",
  note: "/anotacoes",
};

export function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const meta = ENTRY_STYLES[entry.entry_type];

  return (
    <li>
      <Link
        href={`${EDIT_HREF[entry.entry_type]}/${entry.id}`}
        className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg leading-none ${meta.badge}`}
        >
          {meta.icon}
        </span>
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
