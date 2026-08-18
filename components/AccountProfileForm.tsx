"use client";

import { useActionState } from "react";
import { updateAccountProfile } from "@/lib/actions/auth";
import {
  FormError,
  SelectField,
  SubmitButton,
  TextField,
} from "@/components/forms/fields";
import { AvatarPicker } from "@/components/forms/AvatarPicker";
import { FormSection } from "@/components/forms/FormSection";
import { DIABETES_TYPE_OPTIONS } from "@/lib/diabetesTypes";

export function AccountProfileForm({
  name,
  birthDate,
  email,
  avatarUrl,
  gender,
  weightKg,
  heightCm,
  diabetesType,
  diagnosisYear,
  state,
  city,
}: {
  name: string;
  birthDate: string;
  email: string;
  avatarUrl?: string;
  gender?: string;
  weightKg?: string;
  heightCm?: string;
  diabetesType?: string;
  diagnosisYear?: string;
  state?: string;
  city?: string;
}) {
  const [formState, action, pending] = useActionState(
    updateAccountProfile,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <FormSection icon="👤" title="Informações pessoais">
        <AvatarPicker
          label="Foto de perfil"
          initialLetter={name}
          initialImageUrl={avatarUrl}
        />
        <TextField label="Nome" name="name" defaultValue={name} required />
        <TextField label="E-mail" name="email" type="email" defaultValue={email} required />
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Data de nascimento"
            name="birth_date"
            type="date"
            defaultValue={birthDate}
            max={new Date().toISOString().slice(0, 10)}
            required
          />
          <SelectField
            label="Sexo"
            name="gender"
            defaultValue={gender || ""}
            options={[
              { value: "", label: "Prefiro não informar" },
              { value: "feminino", label: "Feminino" },
              { value: "masculino", label: "Masculino" },
              { value: "outro", label: "Outro" },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Peso (kg)"
            name="weight_kg"
            type="number"
            step="0.1"
            min="1"
            defaultValue={weightKg}
          />
          <TextField
            label="Altura (cm)"
            name="height_cm"
            type="number"
            min="1"
            defaultValue={heightCm}
          />
        </div>
      </FormSection>

      <FormSection icon="🩺" title="Diabetes">
        <div className="grid grid-cols-2 gap-3">
          <SelectField
            label="Tipo de diabetes"
            name="diabetes_type"
            defaultValue={diabetesType || ""}
            options={DIABETES_TYPE_OPTIONS}
          />
          <TextField
            label="Ano de diagnóstico"
            name="diagnosis_year"
            type="number"
            min="1950"
            max={String(new Date().getFullYear())}
            defaultValue={diagnosisYear}
          />
        </div>
      </FormSection>

      <FormSection icon="📍" title="Localização">
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Estado" name="state" defaultValue={state} placeholder="Ex: DF" />
          <TextField label="Cidade" name="city" defaultValue={city} placeholder="Ex: Brasília" />
        </div>
      </FormSection>

      <FormError message={formState?.error} />
      {formState?.info && (
        <p className="text-sm text-teal-700 dark:text-teal-400">{formState.info}</p>
      )}

      <SubmitButton pending={pending}>
        {pending ? "Salvando..." : "Salvar"}
      </SubmitButton>
    </form>
  );
}
