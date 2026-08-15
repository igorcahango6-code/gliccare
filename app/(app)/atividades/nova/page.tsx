"use client";

import { useActionState } from "react";
import { createActivity } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  nowForDatetimeLocal,
} from "@/components/forms/fields";

export default function NovaAtividadePage() {
  const [state, action, pending] = useActionState(createActivity, undefined);

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nova atividade física
      </h1>
      <form action={action} className="flex flex-col gap-4">
        <TextAreaField
          label="O que você fez?"
          name="description"
          placeholder="Ex: caminhada 30 min"
          required
        />
        <TextField
          label="Data e hora"
          name="performed_at"
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
