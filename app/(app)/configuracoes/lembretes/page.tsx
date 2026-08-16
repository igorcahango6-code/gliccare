import { createClient } from "@/lib/supabase/server";
import { deleteReminder, setReminderActive } from "@/lib/actions/reminders";
import { ReminderForm } from "@/components/ReminderForm";
import { NotificationPermissionButton } from "@/components/NotificationPermissionButton";

const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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
            <div
              key={reminder.id}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {reminder.label} · {reminder.time_of_day.slice(0, 5)}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  {reminder.days_of_week
                    .slice()
                    .sort((a: number, b: number) => a - b)
                    .map((d: number) => DAY_LABELS[d])
                    .join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <form action={setReminderActive}>
                  <input type="hidden" name="id" value={reminder.id} />
                  <input
                    type="hidden"
                    name="is_active"
                    value={String(reminder.is_active)}
                  />
                  <button
                    type="submit"
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      reminder.is_active
                        ? "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500"
                    }`}
                  >
                    {reminder.is_active ? "Ativo" : "Pausado"}
                  </button>
                </form>
                <form action={deleteReminder}>
                  <input type="hidden" name="id" value={reminder.id} />
                  <button
                    type="submit"
                    className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
