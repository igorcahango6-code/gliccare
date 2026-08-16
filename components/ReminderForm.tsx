"use client";

import { useActionState } from "react";
import { createReminder } from "@/lib/actions/reminders";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";

const DAYS = [
  { value: 0, label: "Dom" },
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
];

export function ReminderForm() {
  const [state, action, pending] = useActionState(createReminder, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <TextField
        label="Nome do lembrete"
        name="label"
        placeholder="Ex: Medir glicemia"
        required
      />
      <TextField label="Horário" name="time_of_day" type="time" required />
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
                defaultChecked
                className="accent-teal-600"
              />
              {day.label}
            </label>
          ))}
        </div>
      </div>
      <FormError message={state?.error} />
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Adicionar lembrete"}
      </SubmitButton>
    </form>
  );
}
