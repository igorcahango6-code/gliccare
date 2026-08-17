"use client";

import { useActionState, useState } from "react";
import { updateAccountProfile } from "@/lib/actions/auth";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";

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
  const [preview, setPreview] = useState<string | undefined>(avatarUrl);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Foto de perfil"
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-xl font-semibold text-zinc-500 dark:bg-zinc-800">
            {name.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="avatar" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Foto de perfil
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
            className="text-sm text-zinc-600 dark:text-zinc-400"
          />
        </div>
      </div>

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
