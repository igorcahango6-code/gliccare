"use client";

import { useActionState } from "react";
import { updatePassword } from "@/lib/actions/auth";
import { FormError, SubmitButton, TextField } from "@/components/forms/fields";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <TextField
        label="Senha atual"
        name="current_password"
        type="password"
        autoComplete="current-password"
        required
      />
      <TextField
        label="Nova senha"
        name="new_password"
        type="password"
        autoComplete="new-password"
        required
      />
      <TextField
        label="Confirmar nova senha"
        name="confirm_password"
        type="password"
        autoComplete="new-password"
        required
      />
      <FormError message={state?.error} />
      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Trocar senha"}
      </SubmitButton>
    </form>
  );
}
