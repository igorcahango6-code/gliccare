"use client";

import { useActionState } from "react";
import { createBloodPressureEntry } from "@/lib/actions/entries";
import { BackButton } from "@/components/BackButton";
import {
  FormError,
  SubmitButton,
  TextField,
  nowForDatetimeLocal,
} from "@/components/forms/fields";

export default function NovaPressaoPage() {
  const [state, action, pending] = useActionState(
    createBloodPressureEntry,
    undefined,
  );

  return (
    <div className="mx-auto w-full max-w-md">
      <BackButton />
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nova medição de pressão arterial
      </h1>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <TextField
          label="Sistólica (o número maior)"
          name="systolic"
          type="number"
          min="1"
          required
        />
        <TextField
          label="Diastólica (o número menor)"
          name="diastolic"
          type="number"
          min="1"
          required
        />
        <TextField
          label="Data e hora"
          name="measured_at"
          type="datetime-local"
          defaultValue={nowForDatetimeLocal()}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar"}
        </SubmitButton>
      </form>
    </div>
  );
}
