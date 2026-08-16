import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/ProfileForm";
import { calculateAge } from "@/lib/utils/age";

export default async function PerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { salvo } = await searchParams;

  const name = (user?.user_metadata?.full_name as string | undefined) ?? "";
  const birthDate = (user?.user_metadata?.birth_date as string | undefined) ?? "";
  const age = birthDate ? calculateAge(birthDate) : null;

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Meu perfil
      </h1>
      {age != null && (
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Idade atual: <strong className="text-zinc-900 dark:text-zinc-50">{age} anos</strong>
        </p>
      )}
      <ProfileForm name={name} birthDate={birthDate} saved={salvo === "1"} />
    </div>
  );
}
