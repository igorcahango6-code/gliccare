import { DeleteAccountForm } from "@/components/DeleteAccountForm";

export default function ExcluirContaPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-400">
        Excluir conta
      </h1>
      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        Isso apaga sua conta e <strong>todos</strong> os seus registros
        (glicemia, insulina, refeições, atividades, medicamentos, peso,
        pressão, anotações e lembretes) para sempre. Não é possível
        desfazer.
      </p>
      <DeleteAccountForm />
    </div>
  );
}
