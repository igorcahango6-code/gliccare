"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AuthState = {
  error?: string;
  info?: string;
  success?: boolean;
} | undefined;

export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const birthDate = String(formData.get("birth_date") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !birthDate || !email || !password) {
    return { error: "Preencha nome, data de nascimento, e-mail e senha." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name, birth_date: birthDate } },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      info: "Cadastro criado! Verifique seu e-mail para confirmar a conta antes de entrar.",
    };
  }

  return { success: true };
}

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Preencha e-mail e senha." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "E-mail ou senha incorretos." };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function updateProfile(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const birthDate = String(formData.get("birth_date") ?? "").trim();

  if (!name || !birthDate) {
    return { error: "Preencha nome e data de nascimento." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: { full_name: name, birth_date: birthDate },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard?salvo=1");
}

export async function updateAccountProfile(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const birthDate = String(formData.get("birth_date") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const avatarFile = formData.get("avatar");

  if (!name || !birthDate || !email) {
    return { error: "Preencha nome, data de nascimento e e-mail." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sessão expirada, entre novamente." };

  let avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  if (avatarFile instanceof File && avatarFile.size > 0) {
    const extension = avatarFile.name.split(".").pop() || "jpg";
    const path = `${user.id}/avatar.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile, { upsert: true });

    if (uploadError) return { error: uploadError.message };

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);
    avatarUrl = `${publicUrl}?v=${Date.now()}`;
  }

  const emailChanged = email !== user.email;

  const { error } = await supabase.auth.updateUser({
    ...(emailChanged ? { email } : {}),
    data: { full_name: name, birth_date: birthDate, avatar_url: avatarUrl },
  });

  if (error) return { error: error.message };

  if (emailChanged) {
    return {
      info: "Perfil atualizado! Enviamos um link de confirmação para o novo e-mail — o e-mail só muda depois que você confirmar.",
    };
  }

  redirect("/configuracoes/conta/perfil?salvo=1");
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Preencha todos os campos." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "A confirmação não é igual à nova senha." };
  }
  if (newPassword.length < 6) {
    return { error: "A nova senha precisa ter pelo menos 6 caracteres." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Sessão expirada, entre novamente." };

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (reauthError) return { error: "Senha atual incorreta." };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };

  redirect("/configuracoes/conta?senha=1");
}

export async function deleteAccount(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (confirmation !== "EXCLUIR") {
    return { error: 'Digite "EXCLUIR" para confirmar.' };
  }
  if (!password) {
    return { error: "Digite sua senha para confirmar." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Sessão expirada, entre novamente." };

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password,
  });
  if (reauthError) return { error: "Senha incorreta." };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) return { error: error.message };

  await supabase.auth.signOut();
  redirect("/");
}
