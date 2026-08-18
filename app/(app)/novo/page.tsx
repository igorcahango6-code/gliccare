import Link from "next/link";
import { ENTRY_STYLES } from "@/lib/entryStyles";

const entryTypes = [
  { href: "/glicemia/nova", type: "glucose" as const },
  { href: "/insulina/nova", type: "insulin" as const },
  { href: "/refeicoes/nova", type: "meal" as const },
  { href: "/atividades/nova", type: "activity" as const },
  { href: "/medicamentos/nova", type: "oral_medication" as const },
  { href: "/peso/nova", type: "weight" as const },
  { href: "/pressao/nova", type: "blood_pressure" as const },
  { href: "/anotacoes/nova", type: "note" as const },
];

export default function NovoRegistroPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        O que você quer registrar?
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {entryTypes.map((entry) => {
          const meta = ENTRY_STYLES[entry.type];
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className="flex min-w-0 flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center text-sm font-medium text-zinc-700 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-300"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl leading-none ${meta.badge}`}
              >
                {meta.icon}
              </span>
              {meta.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
