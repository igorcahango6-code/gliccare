import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditGlucoseForm } from "@/components/entryForms/EditGlucoseForm";

export default async function EditarGlicemiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: reading } = await supabase
    .from("glucose_readings")
    .select("id, value_mgdl, method, measured_at, notes")
    .eq("id", id)
    .maybeSingle();

  if (!reading) notFound();

  return <EditGlucoseForm reading={reading} />;
}
