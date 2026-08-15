import { createClient } from "@/lib/supabase/server";

export type TimelineEntry = {
  id: string;
  user_id: string;
  entry_type:
    | "glucose"
    | "insulin"
    | "meal"
    | "activity"
    | "oral_medication"
    | "weight"
    | "blood_pressure"
    | "note";
  occurred_at: string;
  summary: string;
  value: number | null;
};

export async function getRecentEntries(limit = 20) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("diary_timeline")
    .select("*")
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as TimelineEntry[];
}
