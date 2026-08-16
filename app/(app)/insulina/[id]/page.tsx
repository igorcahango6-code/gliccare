import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditInsulinForm } from "@/components/entryForms/EditInsulinForm";

export default async function EditarInsulinaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entry } = await supabase
    .from("insulin_entries")
    .select("id, insulin_type, units, applied_at, notes")
    .eq("id", id)
    .maybeSingle();

  if (!entry) notFound();

  return <EditInsulinForm entry={entry} />;
}
