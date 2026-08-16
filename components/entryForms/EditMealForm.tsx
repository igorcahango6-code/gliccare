"use client";

import { useActionState } from "react";
import { deleteMeal, updateMeal } from "@/lib/actions/entries";
import {
  FormError,
  SubmitButton,
  TextAreaField,
  TextField,
  toDatetimeLocal,
} from "@/components/forms/fields";
import { DeleteButton } from "@/components/forms/DeleteButton";

export function EditMealForm({
  meal,
}: {
  meal: { id: string; description: string; eaten_at: string };
}) {
  const [state, action, pending] = useActionState(updateMeal, undefined);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Editar refeição
      </h1>
      <form action={action} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={meal.id} />
        <TextAreaField
          label="O que você comeu?"
          name="description"
          defaultValue={meal.description}
          required
        />
        <TextField
          label="Data e hora"
          name="eaten_at"
          type="datetime-local"
          defaultValue={toDatetimeLocal(meal.eaten_at)}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </SubmitButton>
      </form>
      <DeleteButton action={deleteMeal} id={meal.id} />
    </div>
  );
}
