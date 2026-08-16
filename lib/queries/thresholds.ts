import { createClient } from "@/lib/supabase/server";

export type AlertThresholds = {
  min_mgdl: number | null;
  max_mgdl: number | null;
} | null;

export async function getMyThresholds(): Promise<AlertThresholds> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("alert_thresholds")
    .select("min_mgdl, max_mgdl")
    .eq("user_id", user.id)
    .maybeSingle();

  return data;
}
