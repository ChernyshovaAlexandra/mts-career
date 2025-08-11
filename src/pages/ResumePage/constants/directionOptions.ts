export interface DirectionOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export const directionOptions: DirectionOption[] = [
  { label: "Выбери направление", value: "", disabled: true },
  { label: "Работа в IT", value: "Работа в IT" },
  { label: "Технический блок", value: "Технический блок" },
  { label: "Аналитика", value: "Аналитика" },
  { label: "HR", value: "HR" },
  { label: " Продажи и развитие", value: " Продажи и развитие" }
]; 