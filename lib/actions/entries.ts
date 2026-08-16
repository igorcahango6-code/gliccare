"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { ZodType } from "zod";
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

async function doCreate(
  table: string,
  schema: ZodType<Record<string, unknown>>,
  formData: FormData,
): Promise<EntryState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(parsed.data);
  if (error) return { error: error.message };
}

async function doUpdate(
  table: string,
  schema: ZodType<Record<string, unknown>>,
  formData: FormData,
): Promise<EntryState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Registro inválido." };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: firstIssueMessage(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.from(table).update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
}

async function doDelete(table: string, formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from(table).delete().eq("id", id);
}

export async function createGlucoseReading(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate("glucose_readings", glucoseSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function updateGlucoseReading(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate("glucose_readings", glucoseSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function deleteGlucoseReading(formData: FormData) {
  await doDelete("glucose_readings", formData);
  await afterSave();
}

export async function createInsulinEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate("insulin_entries", insulinSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function updateInsulinEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate("insulin_entries", insulinSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function deleteInsulinEntry(formData: FormData) {
  await doDelete("insulin_entries", formData);
  await afterSave();
}

export async function createMeal(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate("meals", mealSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function updateMeal(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate("meals", mealSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function deleteMeal(formData: FormData) {
  await doDelete("meals", formData);
  await afterSave();
}

export async function createActivity(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate("activities", activitySchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function updateActivity(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate("activities", activitySchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function deleteActivity(formData: FormData) {
  await doDelete("activities", formData);
  await afterSave();
}

export async function createOralMedication(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate(
    "oral_medications",
    oralMedicationSchema,
    formData,
  );
  if (result?.error) return result;
  await afterSave();
}

export async function updateOralMedication(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate(
    "oral_medications",
    oralMedicationSchema,
    formData,
  );
  if (result?.error) return result;
  await afterSave();
}

export async function deleteOralMedication(formData: FormData) {
  await doDelete("oral_medications", formData);
  await afterSave();
}

export async function createWeightEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate("weight_entries", weightSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function updateWeightEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate("weight_entries", weightSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function deleteWeightEntry(formData: FormData) {
  await doDelete("weight_entries", formData);
  await afterSave();
}

export async function createBloodPressureEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate(
    "blood_pressure_entries",
    bloodPressureSchema,
    formData,
  );
  if (result?.error) return result;
  await afterSave();
}

export async function updateBloodPressureEntry(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate(
    "blood_pressure_entries",
    bloodPressureSchema,
    formData,
  );
  if (result?.error) return result;
  await afterSave();
}

export async function deleteBloodPressureEntry(formData: FormData) {
  await doDelete("blood_pressure_entries", formData);
  await afterSave();
}

export async function createNote(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doCreate("notes", noteSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function updateNote(
  _prevState: EntryState,
  formData: FormData,
): Promise<EntryState> {
  const result = await doUpdate("notes", noteSchema, formData);
  if (result?.error) return result;
  await afterSave();
}

export async function deleteNote(formData: FormData) {
  await doDelete("notes", formData);
  await afterSave();
}
