export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white">
            GC
          </div>
          <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            GlicCare
          </span>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          {children}
        </div>
      </div>
    </div>
  );
}
