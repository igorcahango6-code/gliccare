"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/auth";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";

export function ProfileForm({
  name,
  birthDate,
  saved,
}: {
  name: string;
  birthDate: string;
  saved?: boolean;
}) {
  const [state, action, pending] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <TextField label="Nome" name="name" defaultValue={name} required />
      <TextField
        label="Data de nascimento"
        name="birth_date"
        type="date"
        defaultValue={birthDate}
        max={new Date().toISOString().slice(0, 10)}
        required
      />
      <FormError message={state?.error} />
      {saved && !state?.error && (
        <p className="text-sm text-teal-700 dark:text-teal-400">
          Perfil salvo com sucesso.
        </p>
      )}
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Salvar"}
      </SubmitButton>
    </form>
  );
}
