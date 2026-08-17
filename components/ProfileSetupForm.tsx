"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/auth";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";
import { AvatarPicker } from "@/components/forms/AvatarPicker";

export function ProfileSetupForm() {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Complete seu perfil
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Sua conta foi criada antes de pedirmos esses dados. Preencha para
        continuar — a idade ajuda a personalizar seu acompanhamento.
      </p>
      <AvatarPicker />
      <TextField label="Nome" name="name" required placeholder="Ex: Igor Cahango" />
      <TextField
        label="Data de nascimento"
        name="birth_date"
        type="date"
        required
      />
      <FormError message={state?.error} />
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Salvar"}
      </SubmitButton>
    </form>
  );
}
