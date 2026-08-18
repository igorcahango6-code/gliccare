"use client";

import { useActionState } from "react";
import { deleteInsulinEntry, updateInsulinEntry } from "@/lib/actions/entries";
import {
  FormError,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { BackButton } from "@/components/BackButton";

export function EditInsulinForm({
  entry,
}: {
  entry: {
    id: string;
    insulin_type: string;
    units: number;
    applied_at: string;
    notes: string | null;
  };
}) {
  const [state, action, pending] = useActionState(
    updateInsulinEntry,
    undefined,
  );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div>
        <BackButton />
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Editar aplicação de insulina
        </h1>
      </div>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <input type="hidden" name="id" value={entry.id} />
        <SelectField
          label="Tipo"
          name="insulin_type"
          defaultValue={entry.insulin_type}
          options={[
            { value: "basal", label: "Basal (lenta)" },
            { value: "bolus", label: "Bolus (rápida)" },
          ]}
        />
        <TextField
          label="Unidades (UI)"
          name="units"
          type="number"
          step="0.5"
          min="0.5"
          defaultValue={entry.units}
          required
        />
        <TextField
          label="Data e hora"
          name="applied_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(entry.applied_at)}
          required
        />
        <TextAreaField
          label="Observações (opcional)"
          name="notes"
          defaultValue={entry.notes ?? ""}
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteInsulinEntry} id={entry.id} />
    </div>
  );
}
