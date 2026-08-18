import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import { ReminderNotifier } from "@/components/ReminderNotifier";
import { MobileMenu } from "@/components/MobileMenu";

const NAV_ITEMS = [
  {
    href: "/glicemia",
    label: "Glicemia",
    icon: "🩸",
    badge: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  },
  {
    href: "/insulina/nova",
    label: "Insulina",
    icon: "💉",
    badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  {
    href: "/refeicoes/nova",
    label: "Refeições",
    icon: "🍽️",
    badge: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    href: "/atividades/nova",
    label: "Atividades físicas",
    icon: "🚶",
    badge: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    href: "/medicamentos/nova",
    label: "Medicamentos",
    icon: "💊",
    badge: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  },
  {
    href: "/peso/nova",
    label: "Peso",
    icon: "⚖️",
    badge: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  },
  {
    href: "/pressao/nova",
    label: "Pressão arterial",
    icon: "❤️",
    badge: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  },
  {
    href: "/anotacoes/nova",
    label: "Anotações",
    icon: "📝",
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  {
    href: "/graficos",
    label: "Gráficos",
    icon: "📈",
    badge: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
  },
  {
    href: "/relatorio",
    label: "Relatório",
    icon: "📄",
    badge: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
  },
  {
    href: "/configuracoes/lembretes",
    label: "Lembretes",
    icon: "⏰",
    badge: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    href: "/configuracoes",
    label: "Configurações",
    icon: "⚙️",
    badge: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <ReminderNotifier />
      <aside className="hidden md:flex md:w-64 md:flex-col md:bg-zinc-100 print:hidden dark:md:bg-black">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
            GC
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            GlicCare
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl bg-white p-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-300"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base leading-none ${item.badge}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="p-3">
          <button
            type="submit"
            className="w-full rounded-2xl bg-white p-2.5 text-left text-sm font-medium text-zinc-600 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-400"
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
