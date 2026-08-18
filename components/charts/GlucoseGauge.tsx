import type { AlertStatus } from "@/lib/utils/thresholds";

const SIZE = 180;
const CENTER = SIZE / 2;
const RADIUS = 76;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MIN_MGDL = 40;
const MAX_MGDL = 300;

const STATUS_COLOR: Record<"low" | "high" | "normal", string> = {
  low: "#2563eb",
  high: "#dc2626",
  normal: "#0d9488",
};

const STATUS_LABEL: Record<"low" | "high" | "normal", string> = {
  low: "Baixa",
  high: "Alta",
  normal: "Normal",
};

export function GlucoseGauge({
  value,
  status,
}: {
  value: number | null;
  status: AlertStatus;
}) {
  const clamped =
    value != null ? Math.min(Math.max(value, MIN_MGDL), MAX_MGDL) : MIN_MGDL;
  const percent = (clamped - MIN_MGDL) / (MAX_MGDL - MIN_MGDL);
  const offset = CIRCUMFERENCE * (1 - percent);
  const color = status ? STATUS_COLOR[status] : "#0d9488";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-zinc-200 dark:stroke-zinc-800"
          />
          {value != null && (
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {value != null ? (
            <>
              <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                {value}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-500">mg/dL</span>
            </>
          ) : (
            <span className="px-6 text-center text-sm text-zinc-500 dark:text-zinc-500">
              Sem medições ainda
            </span>
          )}
        </div>
      </div>
      {value != null && status && (
        <span
          className="rounded-full px-4 py-1 text-sm font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {STATUS_LABEL[status]}
        </span>
      )}
    </div>
  );
}
