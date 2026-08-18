"use client";

import { useActionState } from "react";
import { deleteNote, updateNote } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { BackButton } from "@/components/BackButton";

export function EditNoteForm({
  note,
}: {
  note: { id: string; content: string; occurred_at: string };
}) {
  const [state, action, pending] = useActionState(updateNote, undefined);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div>
        <BackButton />
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Editar anotação
        </h1>
      </div>
      <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
        <input type="hidden" name="id" value={note.id} />
        <TextAreaField
          label="O que você quer anotar?"
          name="content"
          defaultValue={note.content}
          required
        />
        <TextField
          label="Data e hora"
          name="occurred_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(note.occurred_at)}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteNote} id={note.id} />
    </div>
  );
}
