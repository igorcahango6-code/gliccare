import { z } from "zod";

const timestamp = z
  .string()
  .min(1, "Informe a data e hora.")
  .transform((value) => new Date(value).toISOString());

export const glucoseSchema = z.object({
  value_mgdl: z.coerce
    .number()
    .int()
    .gt(0, "Informe um valor de glicemia válido.")
    .lt(1000, "Informe um valor de glicemia válido."),
  method: z.enum(["manual", "sensor"]),
  measured_at: timestamp,
  notes: z.string().optional(),
});

export const insulinSchema = z.object({
  insulin_type: z.enum(["basal", "bolus"]),
  units: z.coerce.number().gt(0, "Informe a quantidade de unidades."),
  applied_at: timestamp,
  notes: z.string().optional(),
});

export const mealSchema = z.object({
  description: z.string().min(1, "Descreva o que você comeu."),
  eaten_at: timestamp,
});

export const activitySchema = z.object({
  description: z.string().min(1, "Descreva a atividade."),
  performed_at: timestamp,
});

export const oralMedicationSchema = z.object({
  medication_name: z.string().min(1, "Informe o nome do medicamento."),
  dosage: z.string().optional(),
  taken_at: timestamp,
  notes: z.string().optional(),
});

export const weightSchema = z.object({
  weight_kg: z.coerce.number().gt(0, "Informe um peso válido."),
  measured_at: timestamp,
});

export const bloodPressureSchema = z.object({
  systolic: z.coerce.number().int().gt(0, "Informe a pressão sistólica."),
  diastolic: z.coerce.number().int().gt(0, "Informe a pressão diastólica."),
  measured_at: timestamp,
});

export const noteSchema = z.object({
  content: z.string().min(1, "Escreva sua anotação."),
  occurred_at: timestamp,
});
