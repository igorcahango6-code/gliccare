import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getRecentEntries } from "@/lib/queries/timeline";
import { TimelineItem } from "@/components/TimelineItem";
import { NameSetupForm } from "@/components/NameSetupForm";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const entries = await getRecentEntries(20);
  const fullName = user?.user_metadata?.full_name as string | undefined;

  if (!fullName) {
    return (
      <div className="mx-auto w-full max-w-md">
        <NameSetupForm />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Olá, {fullName}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Aqui está o seu diário mais recente.
        </p>
      </div>

      <Link
        href="/novo"
        className="rounded-lg bg-teal-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-teal-700"
      >
        + Novo registro
      </Link>

      {entries.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
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
