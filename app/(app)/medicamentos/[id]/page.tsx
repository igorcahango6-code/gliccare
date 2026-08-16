import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditOralMedicationForm } from "@/components/entryForms/EditOralMedicationForm";

export default async function EditarMedicamentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: medication } = await supabase
    .from("oral_medications")
    .select("id, medication_name, dosage, taken_at, notes")
    .eq("id", id)
    .maybeSingle();

  if (!medication) notFound();

  return <EditOralMedicationForm medication={medication} />;
}
