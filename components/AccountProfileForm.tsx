"use client";

import { useActionState } from "react";
import { updateAccountProfile } from "@/lib/actions/auth";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";
import { AvatarPicker } from "@/components/forms/AvatarPicker";

export function AccountProfileForm({
  name,
  birthDate,
  email,
  avatarUrl,
}: {
  name: string;
  birthDate: string;
  email: string;
  avatarUrl?: string;
}) {
  const [state, action, pending] = useActionState(
    updateAccountProfile,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
      <AvatarPicker
        label="Foto de perfil"
        initialLetter={name}
        initialImageUrl={avatarUrl}
      />

      <TextField label="Nome" name="name" defaultValue={name} required />
      <TextField
        label="Data de nascimento"
        name="birth_date"
        type="date"
        defaultValue={birthDate}
        max={new Date().toISOString().slice(0, 10)}
        required
      />
      <TextField label="E-mail" name="email" type="email" defaultValue={email} required />

      <FormError message={state?.error} />
      {state?.info && (
        <p className="text-sm text-teal-700 dark:text-teal-400">{state.info}</p>
      )}

      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Salvar"}
      </SubmitButton>
    </form>
  );
}
