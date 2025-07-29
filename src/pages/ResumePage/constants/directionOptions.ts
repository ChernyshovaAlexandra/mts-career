export interface DirectionOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export const directionOptions: DirectionOption[] = [
  { label: "Выбери направление", value: "", disabled: true },
  { label: "IT и разработка", value: "it" },
  { label: "Маркетинг и реклама", value: "marketing" },
  { label: "Продажи и развитие", value: "sales" },
  { label: "Финансы и аналитика", value: "finance" },
  { label: "Дизайн и творчество", value: "design" }
]; 