export function TimeInRangeBar({
  lowPct,
  inRangePct,
  highPct,
}: {
  lowPct: number;
  inRangePct: number;
  highPct: number;
}) {
  const segments = [
    { pct: lowPct, color: "bg-blue-500", label: "Baixa" },
    { pct: inRangePct, color: "bg-teal-600", label: "No alvo" },
    { pct: highPct, color: "bg-red-500", label: "Alta" },
  ].filter((s) => s.pct > 0);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        Tempo no alvo
      </span>
      <div className="flex h-8 w-full overflow-hidden rounded-full">
        {segments.map((segment) => (
          <div
            key={segment.label}
            style={{ width: `${segment.pct}%` }}
            className={`flex items-center justify-center text-xs font-semibold text-white ${segment.color}`}
            title={`${segment.label}: ${segment.pct}%`}
          >
            {segment.pct >= 10 && `${segment.pct}%`}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-500">
        <span>🔵 Baixa {lowPct}%</span>
        <span>🟢 No alvo {inRangePct}%</span>
        <span>🔴 Alta {highPct}%</span>
      </div>
    </div>
  );
}
