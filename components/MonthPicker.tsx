import Link from "next/link";

export function MonthPicker({
  basePath,
  currentMonth,
  isMonth,
}: {
  basePath: string;
  currentMonth?: string;
  isMonth: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <form className="flex items-center gap-2" action={basePath} method="get">
        <input
          type="month"
          name="mes"
          defaultValue={currentMonth}
          max={new Date().toISOString().slice(0, 7)}
          className="rounded-lg bg-white px-2.5 py-1 text-sm shadow-sm dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-3 py-1 text-sm font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Ver mês
        </button>
      </form>
      {isMonth && (
        <Link
          href={basePath}
          className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
        >
          Voltar para período recente
        </Link>
      )}
    </div>
  );
}
