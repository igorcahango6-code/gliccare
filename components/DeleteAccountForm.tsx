"use client";

import { useActionState } from "react";
import { deleteAccount } from "@/lib/actions/auth";
import { FormError, TextField } from "@/components/forms/fields";

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState(deleteAccount, undefined);

  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (
          !confirm(
            "Isso vai apagar sua conta e TODOS os seus registros para sempre. Não é possível desfazer. Continuar?",
          )
        ) {
          event.preventDefault();
        }
      }}
      className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900"
    >
      <TextField
        label="Sua senha"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <TextField
        label='Digite "EXCLUIR" para confirmar'
        name="confirmation"
        placeholder="EXCLUIR"
        required
      />
      <FormError message={state?.error} />
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Excluindo..." : "Excluir minha conta permanentemente"}
      </button>
    </form>
  );
}
