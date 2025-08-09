import type { AccountPageData } from "../types";
import type { CSSProperties } from "react";
export const ACCOUNTPAGE_BTN_THEME = {
  variant: "gray" as any,
  style: { color: "var(--text-primary)", width: "218px" } as CSSProperties,
};

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
    points: 15083,
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
      name: "Карточки с советами",
      progress: "0 из 90",
    },
    {
      name: "Собери резюме",
      progress: "0 из 120",
    },
    {
      name: "Основные правила",
      progress: "0 из 100",
    },
  ],
  activities: [
    {
      name: "МТС Финтех",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "МТС Медиа",
      progress: "Ещё не пройдено",
    },
    {
      name: "MTS AdTech",
      progress: "Ещё не пройдено",
    },
    {
      name: "MTS Web Services",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "МТС Юрент",
      progress: "XX из XX",
      completed: true,
    },
    {
      name: "МТС Телеком",
      progress: "XX из XX",
      completed: true,
    },
  ],
};


export const ACTIVITIES_DATA = {
  "МТС Финтех": "game1",
  "МТС Медиа": "game2",
  "МТС Телеком": "game3",
  "МТС Юрент": "game4",
  "MTS Web Services": "game5",
  "MTS AdTech": "game6",
  "Карточки с советами": "sovety_resume",
  "Основные правила": "sovety_sobes",
  "Собери резюме": "komiks",
}