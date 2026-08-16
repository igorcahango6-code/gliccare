import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditActivityForm } from "@/components/entryForms/EditActivityForm";

export default async function EditarAtividadePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: activity } = await supabase
    .from("activities")
    .select("id, description, performed_at")
    .eq("id", id)
    .maybeSingle();

  if (!activity) notFound();

  return <EditActivityForm activity={activity} />;
}
