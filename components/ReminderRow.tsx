"use client";

import { useActionState, useState } from "react";
import {
  deleteReminder,
  setReminderActive,
  updateReminder,
} from "@/lib/actions/reminders";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";
import { DayOfWeekPicker } from "@/components/forms/DayOfWeekPicker";

const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type Reminder = {
  id: string;
  label: string;
  time_of_day: string;
  days_of_week: number[];
  is_active: boolean;
};

export function ReminderRow({ reminder }: { reminder: Reminder }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState(updateReminder, undefined);

  if (editing) {
    return (
      <form
        action={action}
        className="flex flex-col gap-4 rounded-xl border border-teal-300 bg-white p-4 dark:border-teal-800 dark:bg-zinc-950"
      >
        <input type="hidden" name="id" value={reminder.id} />
        <TextField label="Nome do lembrete" name="label" defaultValue={reminder.label} required />
        <TextField
          label="Horário"
          name="time_of_day"
          type="time"
          defaultValue={reminder.time_of_day.slice(0, 5)}
          required
        />
        <DayOfWeekPicker defaultValues={reminder.days_of_week} />
        <FormError message={state?.error} />
        <div className="flex gap-2">
          <SubmitButton pending={pending}>
            {pending ? "Salvando..." : "Salvar"}
          </SubmitButton>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="mt-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {reminder.label} · {reminder.time_of_day.slice(0, 5)}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-500">
          {reminder.days_of_week
            .slice()
            .sort((a, b) => a - b)
            .map((d) => DAY_LABELS[d])
            .join(", ")}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-lg px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
        >
          Editar
        </button>
        <form action={setReminderActive}>
          <input type="hidden" name="id" value={reminder.id} />
          <input type="hidden" name="is_active" value={String(reminder.is_active)} />
          <button
            type="submit"
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              reminder.is_active
                ? "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
            }`}
          >
            {reminder.is_active ? "Ativo" : "Pausado"}
          </button>
        </form>
        <form action={deleteReminder}>
          <input type="hidden" name="id" value={reminder.id} />
          <button
            type="submit"
            className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}
