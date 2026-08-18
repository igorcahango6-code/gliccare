"use client";

import { useActionState } from "react";
import { createInsulinEntry } from "@/lib/actions/entries";
import {
  FormError,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  nowForDatetimeLocal,
} from "@/components/forms/fields";

export default function NovaInsulinaPage() {
  const [state, action, pending] = useActionState(
    createInsulinEntry,
    undefined,
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nova aplicação de insulina
      </h1>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <SelectField
          label="Tipo"
          name="insulin_type"
          defaultValue="bolus"
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
          required
        />
        <TextField
          label="Data e hora"
          name="applied_at"
          type="datetime-local"
          defaultValue={nowForDatetimeLocal()}
          required
        />
        <TextAreaField label="Observações (opcional)" name="notes" />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar"}
        </SubmitButton>
      </form>
    </div>
  );
}
