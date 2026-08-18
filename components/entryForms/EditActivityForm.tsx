"use client";

import { useActionState } from "react";
import { deleteActivity, updateActivity } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { BackButton } from "@/components/BackButton";

export function EditActivityForm({
  activity,
}: {
  activity: { id: string; description: string; performed_at: string };
}) {
  const [state, action, pending] = useActionState(updateActivity, undefined);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div>
        <BackButton />
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Editar atividade física
        </h1>
      </div>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <input type="hidden" name="id" value={activity.id} />
        <TextAreaField
          label="O que você fez?"
          name="description"
          defaultValue={activity.description}
          required
        />
        <TextField
          label="Data e hora"
          name="performed_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(activity.performed_at)}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteActivity} id={activity.id} />
    </div>
  );
}
