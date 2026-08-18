import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { BackButton } from "@/components/BackButton";

export default function TrocarSenhaPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <BackButton />
      <h1 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Trocar senha
      </h1>
      <ChangePasswordForm />
    </div>
  );
}
