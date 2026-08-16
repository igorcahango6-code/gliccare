"use client";

import { useActionState } from "react";
import {
  deleteBloodPressureEntry,
  updateBloodPressureEntry,
} from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";

export function EditBloodPressureForm({
  entry,
}: {
  entry: {
    id: string;
    systolic: number;
    diastolic: number;
    measured_at: string;
  };
}) {
  const [state, action, pending] = useActionState(
    updateBloodPressureEntry,
    undefined,
  );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Editar medição de pressão arterial
      </h1>
      <form action={action} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={entry.id} />
        <TextField
          label="Sistólica (o número maior)"
          name="systolic"
          type="number"
          min="1"
          defaultValue={entry.systolic}
          required
        />
        <TextField
          label="Diastólica (o número menor)"
          name="diastolic"
          type="number"
          min="1"
          defaultValue={entry.diastolic}
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
      <DeleteButton action={deleteBloodPressureEntry} id={entry.id} />
    </div>
  );
}
