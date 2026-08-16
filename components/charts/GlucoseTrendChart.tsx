"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { measured_at: string; value_mgdl: number };

export function GlucoseTrendChart({
  data,
  minMgdl,
  maxMgdl,
}: {
  data: Point[];
  minMgdl: number | null;
  maxMgdl: number | null;
}) {
  const chartData = data.map((point) => ({
    ...point,
    label: format(new Date(point.measured_at), "dd/MM HH:mm", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="h-72 w-full sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 16, left: -16, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis tick={{ fontSize: 11 }} domain={["dataMin - 20", "dataMax + 20"]} />
          <Tooltip
            formatter={(value) => [`${value} mg/dL`, "Glicemia"]}
            labelFormatter={(label) => label}
          />
          {minMgdl != null && (
            <ReferenceLine
              y={minMgdl}
              stroke="#2563eb"
              strokeDasharray="4 4"
              label={{ value: "Mín.", position: "insideTopLeft", fontSize: 11, fill: "#2563eb" }}
            />
          )}
          {maxMgdl != null && (
            <ReferenceLine
              y={maxMgdl}
              stroke="#dc2626"
              strokeDasharray="4 4"
              label={{ value: "Máx.", position: "insideTopLeft", fontSize: 11, fill: "#dc2626" }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value_mgdl"
            stroke="#0d9488"
            strokeWidth={2}
            dot={(props) => {
              const { cx, cy, payload, index } = props;
              const isLow = minMgdl != null && payload.value_mgdl < minMgdl;
              const isHigh = maxMgdl != null && payload.value_mgdl > maxMgdl;
              const color = isLow ? "#2563eb" : isHigh ? "#dc2626" : "#0d9488";
              return (
                <circle
                  key={`dot-${index}`}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={color}
                  stroke="white"
                  strokeWidth={1}
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
