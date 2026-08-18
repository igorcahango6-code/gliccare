"use client";

import { useActionState } from "react";
import { createOralMedication } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  nowForDatetimeLocal,
} from "@/components/forms/fields";

export default function NovoMedicamentoPage() {
  const [state, action, pending] = useActionState(
    createOralMedication,
    undefined,
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Novo medicamento
      </h1>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <TextField
          label="Nome do medicamento"
          name="medication_name"
          placeholder="Ex: Metformina"
          required
        />
        <TextField
          label="Dosagem (opcional)"
          name="dosage"
          placeholder="Ex: 500mg"
        />
        <TextField
          label="Data e hora"
          name="taken_at"
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
