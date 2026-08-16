"use client";

import { useActionState } from "react";
import { updateName } from "@/lib/actions/auth";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";

export function NameSetupForm() {
  const [state, action, pending] = useActionState(updateName, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Como podemos te chamar?
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Sua conta foi criada antes de pedirmos seu nome. Digite abaixo para
        aparecer no seu painel.
      </p>
      <TextField label="Nome" name="name" required placeholder="Ex: Igor Cahango" />
      <FormError message={state?.error} />
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Salvar"}
      </SubmitButton>
    </form>
  );
}
