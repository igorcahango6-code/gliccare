"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { reminderSchema } from "@/lib/validation/reminders";

export type ReminderState = { error?: string } | undefined;

export async function createReminder(
  _prevState: ReminderState,
  formData: FormData,
): Promise<ReminderState> {
  const parsed = reminderSchema.safeParse({
    label: formData.get("label"),
    time_of_day: formData.get("time_of_day"),
    days_of_week: formData.getAll("days_of_week"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reminders").insert(parsed.data);
  if (error) return { error: error.message };

  revalidatePath("/configuracoes/lembretes");
}

export async function updateReminder(
  _prevState: ReminderState,
  formData: FormData,
): Promise<ReminderState> {
  const id = String(formData.get("id") ?? "");
  const parsed = reminderSchema.safeParse({
    label: formData.get("label"),
    time_of_day: formData.get("time_of_day"),
    days_of_week: formData.getAll("days_of_week"),
  });

  if (!id) return { error: "Lembrete inválido." };
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("reminders")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/configuracoes/lembretes");
}

export async function deleteReminder(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("reminders").delete().eq("id", id);
  revalidatePath("/configuracoes/lembretes");
}

export async function setReminderActive(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const isActive = formData.get("is_active") === "true";
  if (!id) return;

  const supabase = await createClient();
  await supabase
    .from("reminders")
    .update({ is_active: !isActive })
    .eq("id", id);
  revalidatePath("/configuracoes/lembretes");
}
