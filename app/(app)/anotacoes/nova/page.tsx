"use client";

import { useActionState } from "react";
import { createNote } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  nowForDatetimeLocal,
} from "@/components/forms/fields";

export default function NovaAnotacaoPage() {
  const [state, action, pending] = useActionState(createNote, undefined);

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nova anotação
      </h1>
      <form action={action} className="flex flex-col gap-4">
        <TextAreaField
          label="O que você quer anotar?"
          name="content"
          placeholder="Ex: me senti tonto depois do almoço"
          required
        />
        <TextField
          label="Data e hora"
          name="occurred_at"
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
