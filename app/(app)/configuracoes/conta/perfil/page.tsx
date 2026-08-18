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
  const meta = user?.user_metadata ?? {};

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Meu perfil
      </h1>
      {salvo === "1" && (
        <p className="mb-4 rounded-2xl bg-teal-50 p-3 text-sm text-teal-800 shadow-sm dark:bg-teal-950 dark:text-teal-300">
          Perfil salvo com sucesso.
        </p>
      )}
      <AccountProfileForm
        name={(meta.full_name as string) ?? ""}
        birthDate={(meta.birth_date as string) ?? ""}
        email={user?.email ?? ""}
        avatarUrl={meta.avatar_url as string | undefined}
        gender={meta.gender as string | undefined}
        weightKg={meta.weight_kg as string | undefined}
        heightCm={meta.height_cm as string | undefined}
        diabetesType={meta.diabetes_type as string | undefined}
        diagnosisYear={meta.diagnosis_year as string | undefined}
        state={meta.state as string | undefined}
        city={meta.city as string | undefined}
      />
    </div>
  );
}
