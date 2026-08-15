"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  activitySchema,
  bloodPressureSchema,
  glucoseSchema,
  insulinSchema,
  mealSchema,
  noteSchema,
  oralMedicationSchema,
  weightSchema,
} from "@/lib/validation/entries";

export type EntryState = { error?: string } | undefined;

function firstIssueMessage(error: { issues: { message: string }[] }) {
  return error.issues[0]?.message ?? "Dados inválidos.";
}

async function afterSave() {
  revalidatePath("/dashboard");
  revalidatePath("/glicemia");
  redirect("/dashboard");
}

export async function createGlucoseReading(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = glucoseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("glucose_readings").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createInsulinEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = insulinSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("insulin_entries").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createMeal(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = mealSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("meals").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createActivity(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = activitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("activities").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createOralMedication(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = oralMedicationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("oral_medications").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createWeightEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = weightSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("weight_entries").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createBloodPressureEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = bloodPressureSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase
    .from("blood_pressure_entries")
    .insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}

export async function createNote(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const parsed = noteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from("notes").insert(parsed.data);
  if (error) return { error: error.message };

  await afterSave();
}
