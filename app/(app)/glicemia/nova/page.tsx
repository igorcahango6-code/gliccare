"use client";

import { useActionState } from "react";
import { createGlucoseReading } from "@/lib/actions/entries";
import {
  FormError,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  nowForDatetimeLocal,
} from "@/components/forms/fields";

export default function NovaGlicemiaPage() {
  const [state, action, pending] = useActionState(
    createGlucoseReading,
    undefined,
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nova medição de glicemia
      </h1>
      <form action={action} className="flex flex-col gap-4">
        <TextField
          label="Valor (mg/dL)"
          name="value_mgdl"
          type="number"
          min="1"
          required
        />
        <SelectField
          label="Método"
          name="method"
          defaultValue="manual"
          options={[
            { value: "manual", label: "Manual (furar o dedo)" },
            { value: "sensor", label: "Sensor (CGM)" },
          ]}
        />
        <TextField
          label="Data e hora"
          name="measured_at"
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
