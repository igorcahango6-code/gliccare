import Link from "next/link";

const entryTypes = [
  { href: "/glicemia/nova", label: "Glicemia", icon: "🩸" },
  { href: "/insulina/nova", label: "Insulina", icon: "💉" },
  { href: "/refeicoes/nova", label: "Refeição", icon: "🍽️" },
  { href: "/atividades/nova", label: "Atividade física", icon: "🚶" },
  { href: "/medicamentos/nova", label: "Medicamento", icon: "💊" },
  { href: "/peso/nova", label: "Peso", icon: "⚖️" },
  { href: "/pressao/nova", label: "Pressão arterial", icon: "❤️" },
  { href: "/anotacoes/nova", label: "Anotação", icon: "📝" },
];

export default function NovoRegistroPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        O que você quer registrar?
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {entryTypes.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-center text-sm font-medium text-zinc-700 transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:text-teal-400"
          >
            <span className="text-2xl">{entry.icon}</span>
            {entry.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
