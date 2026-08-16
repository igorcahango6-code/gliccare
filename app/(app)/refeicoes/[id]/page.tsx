import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditMealForm } from "@/components/entryForms/EditMealForm";

export default async function EditarRefeicaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: meal } = await supabase
    .from("meals")
    .select("id, description, eaten_at")
    .eq("id", id)
    .maybeSingle();

  if (!meal) notFound();

  return <EditMealForm meal={meal} />;
}
