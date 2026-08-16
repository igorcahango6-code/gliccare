import { createClient } from "@/lib/supabase/server";
import { ReminderForm } from "@/components/ReminderForm";
import { ReminderRow } from "@/components/ReminderRow";
import { NotificationPermissionButton } from "@/components/NotificationPermissionButton";

export default async function LembretesPage() {
  const supabase = await createClient();
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("id, label, time_of_day, days_of_week, is_active")
    .order("time_of_day", { ascending: true });

  if (error) throw new Error(error.message);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div>
        <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Lembretes
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Os lembretes funcionam melhor com o GlicCare aberto ou usado
          recentemente no navegador. Notificações mesmo com o app fechado
          estão previstas para uma próxima versão.
        </p>
      </div>

      <NotificationPermissionButton />

      <ReminderForm />

      <div className="flex flex-col gap-2">
        {reminders.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500">
            Nenhum lembrete cadastrado ainda.
          </p>
        ) : (
          reminders.map((reminder) => (
            <ReminderRow key={reminder.id} reminder={reminder} />
          ))
        )}
      </div>
    </div>
  );
}
