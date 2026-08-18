export const DIABETES_TYPE_LABELS: Record<string, string> = {
  tipo1: "Diabetes tipo 1",
  tipo2: "Diabetes tipo 2",
  gestacional: "Diabetes gestacional",
  pre_diabetes: "Pré-diabetes",
  nao_sei: "Tipo não informado",
};

export const DIABETES_TYPE_OPTIONS = [
  { value: "", label: "Prefiro não informar" },
  { value: "tipo1", label: "Tipo 1" },
  { value: "tipo2", label: "Tipo 2" },
  { value: "gestacional", label: "Gestacional" },
  { value: "pre_diabetes", label: "Pré-diabetes" },
  { value: "nao_sei", label: "Não sei" },
];
