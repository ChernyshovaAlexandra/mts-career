import type { AccountPageData } from "../types";

export const ACCOUNT_PAGE_DATA: AccountPageData = {
  personalData: {
    firstName: "Ковальский",
    lastName: "Константин",
    personalCode: "1234567890",
    city: "Москва",
    status: "Новичок",
  },
  tablePosition: {
    position: 1367,
    points: "XXXX",
  },
  interviewSimulation: {
    direction: "Работа в IT",
    interviewDate: "29 июля в 12:00",
  },
  randomCoffee: {
    employeeName: "Григорий Усов",
    position: "Должность",
    meetingDate: "29 июля в 12:00",
  },
  generalSkills: [
    {
      name: "Подготовка резюме",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "Подготовка к собеседованию",
      progress: "Не начато",
    },
    {
      name: "Работа в МТС",
      progress: "XX из XX",
      completed: true,
    },
  ],
  activities: [
    {
      name: "Финтек",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "МТС Медиа",
      progress: "Не начато",
    },
    {
      name: "Рекламные технологии AdTech",
      progress: "Не начато",
    },
    {
      name: "IT-направление MTS WEB SERVICES",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "Кикшеринг МТС Юрент",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "Телеком",
      progress: "XX из XX",
      completed: true,
    },
  ],
};
