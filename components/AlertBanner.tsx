import type { AlertStatus } from "@/lib/utils/thresholds";

const COPY: Record<"low" | "high", { title: string; className: string }> = {
  low: {
    title: "Sua última glicemia registrada está baixa (hipoglicemia).",
    className:
      "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  },
  high: {
    title: "Sua última glicemia registrada está alta (hiperglicemia).",
    className:
      "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  },
};

export function AlertBanner({ status }: { status: AlertStatus }) {
  if (status !== "low" && status !== "high") return null;
  const copy = COPY[status];

  return (
    <div className={`rounded-xl border p-3 text-sm font-medium ${copy.className}`}>
      {copy.title}
    </div>
  );
}
