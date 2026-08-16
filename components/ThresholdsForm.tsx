"use client";

import { useActionState } from "react";
import { updateThresholds } from "@/lib/actions/thresholds";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";

export function ThresholdsForm({
  minMgdl,
  maxMgdl,
  saved,
}: {
  minMgdl: number | null;
  maxMgdl: number | null;
  saved?: boolean;
}) {
  const [state, action, pending] = useActionState(
    updateThresholds,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <TextField
        label="Limite mínimo (mg/dL) — abaixo disso é hipoglicemia"
        name="min_mgdl"
        type="number"
        min="1"
        defaultValue={minMgdl ?? undefined}
        required
      />
      <TextField
        label="Limite máximo (mg/dL) — acima disso é hiperglicemia"
        name="max_mgdl"
        type="number"
        min="1"
        defaultValue={maxMgdl ?? undefined}
        required
      />
      <FormError message={state?.error} />
      {saved && !state?.error && (
        <p className="text-sm text-teal-700 dark:text-teal-400">
          Limites salvos com sucesso.
        </p>
      )}
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Salvar limites"}
      </SubmitButton>
    </form>
  );
}
