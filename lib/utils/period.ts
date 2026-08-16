import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type ResolvedPeriod = {
  since: Date;
  until: Date;
  label: string;
  isMonth: boolean;
};

export function resolvePeriod(params: {
  dias?: string;
  mes?: string;
}): ResolvedPeriod {
  if (params.mes && /^\d{4}-\d{2}$/.test(params.mes)) {
    const [year, month] = params.mes.split("-").map(Number);
    const since = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const until = new Date(year, month, 1, 0, 0, 0, 0);
    return {
      since,
      until,
      label: format(since, "MMMM 'de' yyyy", { locale: ptBR }),
      isMonth: true,
    };
  }

  const dias = [7, 30, 90].includes(Number(params.dias))
    ? Number(params.dias)
    : 30;
  const until = new Date();
  const since = new Date();
  since.setDate(since.getDate() - dias);

  return { since, until, label: `${dias} dias`, isMonth: false };
}
