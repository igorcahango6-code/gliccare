"use client";

export function DeleteButton({
  action,
  id,
  confirmText = "Tem certeza que quer excluir este registro?",
}: {
  action: (formData: FormData) => void;
  id: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!confirm(confirmText)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
      >
        Excluir
      </button>
    </form>
  );
}
