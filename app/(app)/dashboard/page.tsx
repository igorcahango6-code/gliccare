import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Bem-vindo!
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Você entrou como <strong>{user?.email}</strong>. O diário completo
        (glicemia, insulina, refeições e mais) chega na próxima etapa.
      </p>
    </div>
  );
}
