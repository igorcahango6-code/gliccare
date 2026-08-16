import { z } from "zod";

export const reminderSchema = z.object({
  label: z.string().min(1, "Dê um nome para o lembrete."),
  time_of_day: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Informe um horário válido."),
  days_of_week: z
    .array(z.coerce.number().int().min(0).max(6))
    .min(1, "Escolha pelo menos um dia da semana."),
});
