const DAYS = [
  { value: 0, label: "Dom" },
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
];

export function DayOfWeekPicker({
  defaultValues = [0, 1, 2, 3, 4, 5, 6],
}: {
  defaultValues?: number[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Dias da semana
      </span>
      <div className="flex flex-wrap gap-2">
        {DAYS.map((day) => (
          <label
            key={day.value}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-sm text-zinc-700 has-checked:border-teal-600 has-checked:bg-teal-50 dark:border-zinc-700 dark:text-zinc-300 dark:has-checked:bg-teal-950"
          >
            <input
              type="checkbox"
              name="days_of_week"
              value={day.value}
              defaultChecked={defaultValues.includes(day.value)}
              className="accent-teal-600"
            />
            {day.label}
          </label>
        ))}
      </div>
    </div>
  );
}
