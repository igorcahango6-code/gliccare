"use client";

import { useActionState } from "react";
import { deleteGlucoseReading, updateGlucoseReading } from "@/lib/actions/entries";
import {
  FormError,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";

export function EditGlucoseForm({
  reading,
}: {
  reading: {
    id: string;
    value_mgdl: number;
    method: string;
    measured_at: string;
    notes: string | null;
  };
}) {
  const [state, action, pending] = useActionState(
    updateGlucoseReading,
    undefined,
  );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Editar medição de glicemia
      </h1>
      <form action={action} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={reading.id} />
        <TextField
          label="Valor (mg/dL)"
          name="value_mgdl"
          type="number"
          min="1"
          defaultValue={reading.value_mgdl}
          required
        />
        <SelectField
          label="Método"
          name="method"
          defaultValue={reading.method}
          options={[
            { value: "manual", label: "Manual (furar o dedo)" },
            { value: "sensor", label: "Sensor (CGM)" },
          ]}
        />
        <TextField
          label="Data e hora"
          name="measured_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(reading.measured_at)}
          required
        />
        <TextAreaField
          label="Observações (opcional)"
          name="notes"
          defaultValue={reading.notes ?? ""}
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteGlucoseReading} id={reading.id} />
    </div>
  );
}
