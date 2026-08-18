import type { TimelineEntry } from "@/lib/queries/timeline";

export const ENTRY_STYLES: Record<
  TimelineEntry["entry_type"],
  { icon: string; label: string; badge: string }
> = {
  glucose: {
    icon: "🩸",
    label: "Glicemia",
    badge: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  },
  insulin: {
    icon: "💉",
    label: "Insulina",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  meal: {
    icon: "🍽️",
    label: "Refeição",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  activity: {
    icon: "🚶",
    label: "Atividade física",
    badge: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  oral_medication: {
    icon: "💊",
    label: "Medicamento",
    badge: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  },
  weight: {
    icon: "⚖️",
    label: "Peso",
    badge: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  },
  blood_pressure: {
    icon: "❤️",
    label: "Pressão arterial",
    badge: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  },
  note: {
    icon: "📝",
    label: "Anotação",
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
};
