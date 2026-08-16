"use client";

import { useActionState } from "react";
import { createReminder } from "@/lib/actions/reminders";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";
import { DayOfWeekPicker } from "@/components/forms/DayOfWeekPicker";

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
      <DayOfWeekPicker />
      <FormError message={state?.error} />
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Adicionar lembrete"}
      </SubmitButton>
    </form>
  );
}
