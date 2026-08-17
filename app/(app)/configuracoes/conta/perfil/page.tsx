import { createClient } from "@/lib/supabase/server";
import { AccountProfileForm } from "@/components/AccountProfileForm";

export default async function EditarPerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { salvo } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Editar nome, foto e e-mail
      </h1>
      {salvo === "1" && (
        <p className="mb-4 rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm text-teal-800 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300">
          Perfil salvo com sucesso.
        </p>
      )}
      <AccountProfileForm
        name={(user?.user_metadata?.full_name as string) ?? ""}
        birthDate={(user?.user_metadata?.birth_date as string) ?? ""}
        email={user?.email ?? ""}
        avatarUrl={user?.user_metadata?.avatar_url as string | undefined}
      />
    </div>
  );
}
