"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type ThresholdsState = { error?: string } | undefined;

const thresholdsSchema = z
  .object({
    min_mgdl: z.coerce.number().int().gt(0, "Informe um valor mínimo válido."),
    max_mgdl: z.coerce.number().int().gt(0, "Informe um valor máximo válido."),
  })
  .refine((data) => data.min_mgdl < data.max_mgdl, {
    message: "O valor mínimo deve ser menor que o máximo.",
    path: ["max_mgdl"],
  });

export async function updateThresholds(
  _prevState: ThresholdsState,
  formData: FormData,
): Promise<ThresholdsState> {
  const parsed = thresholdsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada, entre novamente." };

  const { error } = await supabase
    .from("alert_thresholds")
    .upsert(
      { user_id: user.id, ...parsed.data, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );

  if (error) return { error: error.message };

  revalidatePath("/configuracoes/limites");
  revalidatePath("/glicemia");
  revalidatePath("/dashboard");
  redirect("/configuracoes/limites?salvo=1");
}
