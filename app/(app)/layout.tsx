import Link from "next/link";
import { logout } from "@/lib/actions/auth";
import { ReminderNotifier } from "@/components/ReminderNotifier";
import { MobileMenu } from "@/components/MobileMenu";
import { ENTRY_STYLES } from "@/lib/entryStyles";

const NAV_ITEMS = [
  { href: "/glicemia", ...ENTRY_STYLES.glucose },
  { href: "/insulina/nova", ...ENTRY_STYLES.insulin },
  { href: "/refeicoes/nova", label: "Refeições", icon: ENTRY_STYLES.meal.icon, badge: ENTRY_STYLES.meal.badge },
  { href: "/atividades/nova", ...ENTRY_STYLES.activity },
  { href: "/medicamentos/nova", ...ENTRY_STYLES.oral_medication },
  { href: "/peso/nova", ...ENTRY_STYLES.weight },
  { href: "/pressao/nova", ...ENTRY_STYLES.blood_pressure },
  { href: "/anotacoes/nova", ...ENTRY_STYLES.note },
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
