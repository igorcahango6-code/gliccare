export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-black">
      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-bold text-white">
          GC
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          GlicCare
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Seu diário digital de glicemia, insulina, alimentação e mais —
          simples, no computador ou no celular.
        </p>
        <p className="mt-4 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
          Em construção
        </p>
      </div>
    </div>
  );
}
