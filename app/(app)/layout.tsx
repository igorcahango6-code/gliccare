import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import { ReminderNotifier } from "@/components/ReminderNotifier";
import { MobileMenu } from "@/components/MobileMenu";

const NAV_ITEMS = [
  { href: "/glicemia", label: "Glicemia", icon: "🩸" },
  { href: "/insulina/nova", label: "Insulina", icon: "💉" },
  { href: "/refeicoes/nova", label: "Refeições", icon: "🍽️" },
  { href: "/atividades/nova", label: "Atividades físicas", icon: "🚶" },
  { href: "/medicamentos/nova", label: "Medicamentos", icon: "💊" },
  { href: "/peso/nova", label: "Peso", icon: "⚖️" },
  { href: "/pressao/nova", label: "Pressão arterial", icon: "❤️" },
  { href: "/anotacoes/nova", label: "Anotações", icon: "📝" },
  { href: "/graficos", label: "Gráficos", icon: "📈" },
  { href: "/relatorio", label: "Relatório", icon: "📄" },
  { href: "/configuracoes/lembretes", label: "Lembretes", icon: "⏰" },
  { href: "/configuracoes", label: "Configurações", icon: "⚙️" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <ReminderNotifier />
      <aside className="hidden md:flex md:w-56 md:flex-col md:bg-white md:shadow-md print:hidden dark:md:bg-zinc-950">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
            GC
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            GlicCare
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="p-2">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            Sair
          </button>
        </form>
      </aside>

      <div className="flex flex-1 flex-col bg-zinc-100 dark:bg-black">
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm print:hidden md:hidden dark:bg-zinc-950">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
              GC
            </div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              GlicCare
            </span>
          </Link>
          <MobileMenu items={NAV_ITEMS} />
        </header>

        <main className="flex flex-1 flex-col px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
