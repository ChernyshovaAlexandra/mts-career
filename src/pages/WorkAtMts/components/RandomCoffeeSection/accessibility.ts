export const ARIA_LABELS = {
  SECTION: {
    TITLE: "Рандом-кофе с сотрудником",
    DESCRIPTION: "Выбери эксперта. Забронируй удобное время для 10-минутной беседы. Общайся онлайн и получай баллы за активность. После выбора слота на твою почту придёт письмо со ссылкой на встречу. Если не сможешь прийти, заранее отмени рандом-кофе в личном кабинете",
    EMPLOYEE_SECTION: "Выберите сотрудника",
    SCHEDULE_SECTION: "Выберите время",
    SCHEDULE_MEETING: "Назначить встречу"
  },
  NAVIGATION: {
    PREV_WEEK: "Предыдущая неделя",
    NEXT_WEEK: "Следующая неделя"
  },
  TIME_SLOTS: {
    BOOK_SLOT: (time: string, day: string, date: string) => 
      `Забронировать время ${time} на ${day} ${date}`,
    SLOT_UNAVAILABLE: (time: string) => `Время ${time} недоступно`
  }
} as const; 