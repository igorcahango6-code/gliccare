"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/lib/actions/auth";

type NavItem = { href: string; label: string; icon: string; badge: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menu"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl leading-none text-zinc-700 dark:text-zinc-300"
      >
        ☰
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="flex-1 bg-black/40"
          />
          <div className="flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-zinc-100 dark:bg-black">
            <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
                  GC
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  GlicCare
                </span>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-zinc-500 dark:text-zinc-400"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-medium text-zinc-900 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-50"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg leading-none ${item.badge}`}
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
                className="w-full rounded-2xl bg-white p-3 text-left text-sm font-medium text-zinc-600 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900 dark:text-zinc-400"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
