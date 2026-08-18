"use client";

import { useActionState } from "react";
import {
  deleteOralMedication,
  updateOralMedication,
} from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { BackButton } from "@/components/BackButton";

export function EditOralMedicationForm({
  medication,
}: {
  medication: {
    id: string;
    medication_name: string;
    dosage: string | null;
    taken_at: string;
    notes: string | null;
  };
}) {
  const [state, action, pending] = useActionState(
    updateOralMedication,
    undefined,
  );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div>
        <BackButton />
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Editar medicamento
        </h1>
      </div>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <input type="hidden" name="id" value={medication.id} />
        <TextField
          label="Nome do medicamento"
          name="medication_name"
          defaultValue={medication.medication_name}
          required
        />
        <TextField
          label="Dosagem (opcional)"
          name="dosage"
          defaultValue={medication.dosage ?? ""}
        />
        <TextField
          label="Data e hora"
          name="taken_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(medication.taken_at)}
          required
        />
        <TextAreaField
          label="Observações (opcional)"
          name="notes"
          defaultValue={medication.notes ?? ""}
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteOralMedication} id={medication.id} />
    </div>
  );
}
