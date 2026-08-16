import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditBloodPressureForm } from "@/components/entryForms/EditBloodPressureForm";

export default async function EditarPressaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("blood_pressure_entries")
    .select("id, systolic, diastolic, measured_at")
    .eq("id", id)
    .maybeSingle();

  if (!entry) notFound();

  return <EditBloodPressureForm entry={entry} />;
}
