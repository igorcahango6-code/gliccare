import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditNoteForm } from "@/components/entryForms/EditNoteForm";

export default async function EditarAnotacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: note } = await supabase
    .from("notes")
    .select("id, content, occurred_at")
    .eq("id", id)
    .maybeSingle();

  if (!note) notFound();

  return <EditNoteForm note={note} />;
}
