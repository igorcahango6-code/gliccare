"use client";

import { useActionState } from "react";
import { deleteWeightEntry, updateWeightEntry } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";

export function EditWeightForm({
  entry,
}: {
  entry: { id: string; weight_kg: number; measured_at: string };
}) {
  const [state, action, pending] = useActionState(
    updateWeightEntry,
    undefined,
  );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Editar registro de peso
      </h1>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <input type="hidden" name="id" value={entry.id} />
        <TextField
          label="Peso (kg)"
          name="weight_kg"
          type="number"
          step="0.1"
          min="1"
          defaultValue={entry.weight_kg}
          required
        />
        <TextField
          label="Data e hora"
          name="measured_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(entry.measured_at)}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteWeightEntry} id={entry.id} />
    </div>
  );
}
