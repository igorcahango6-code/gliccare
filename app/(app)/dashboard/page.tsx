import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getRecentEntries } from "@/lib/queries/timeline";
import { TimelineItem } from "@/components/TimelineItem";
import { ProfileSetupForm } from "@/components/ProfileSetupForm";
import { SuccessToast } from "@/components/SuccessToast";
import { Avatar } from "@/components/Avatar";
import { GlucoseGauge } from "@/components/charts/GlucoseGauge";
import { getMyThresholds } from "@/lib/queries/thresholds";
import { getAlertStatus } from "@/lib/utils/thresholds";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ salvo?: string; excluido?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const entries = await getRecentEntries(20);
  const fullName = user?.user_metadata?.full_name as string | undefined;
  const birthDate = user?.user_metadata?.birth_date as string | undefined;
  const { salvo, excluido } = await searchParams;

  if (!fullName || !birthDate) {
    return (
      <div className="mx-auto w-full max-w-md">
        <ProfileSetupForm />
      </div>
    );
  }

  const thresholds = await getMyThresholds();
  const latestGlucose = entries.find((entry) => entry.entry_type === "glucose");
  const latestGlucoseStatus =
    latestGlucose?.value != null
      ? getAlertStatus(latestGlucose.value, thresholds?.min_mgdl, thresholds?.max_mgdl)
      : null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar name={fullName} avatarUrl={user?.user_metadata?.avatar_url} />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Olá, {fullName}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Aqui está o seu diário mais recente.
          </p>
        </div>
      </div>

      {salvo === "1" && <SuccessToast message="Registro salvo com sucesso." />}
      {excluido === "1" && <SuccessToast message="Registro excluído." />}

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        <span className="self-start text-sm font-medium text-zinc-500 dark:text-zinc-500">
          Última glicemia
        </span>
        <GlucoseGauge
          value={latestGlucose?.value ?? null}
          status={latestGlucoseStatus}
        />
        {!thresholds?.min_mgdl && (
          <Link
            href="/configuracoes/limites"
            className="mt-1 text-xs font-medium text-teal-700 hover:underline dark:text-teal-400"
          >
            Configure seus limites para ver o status →
          </Link>
        )}
      </div>

      <Link
        href="/novo"
        className="rounded-2xl bg-teal-600 px-4 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-teal-700 hover:shadow-md active:scale-[0.98]"
      >
        + Novo registro
      </Link>

      {entries.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-center text-sm text-zinc-500 shadow-sm dark:bg-zinc-900 dark:text-zinc-500">
          Nenhum registro ainda. Toque em &quot;Novo registro&quot; para
          começar.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {entries.map((entry) => (
            <TimelineItem key={`${entry.entry_type}-${entry.id}`} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  );
}
