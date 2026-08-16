import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditWeightForm } from "@/components/entryForms/EditWeightForm";

export default async function EditarPesoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("weight_entries")
    .select("id, weight_kg, measured_at")
    .eq("id", id)
    .maybeSingle();

  if (!entry) notFound();

  return <EditWeightForm entry={entry} />;
}
