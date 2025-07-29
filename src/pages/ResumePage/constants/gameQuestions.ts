export interface ResumeOption {
  id: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface GameQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: ResumeOption[];
}

export const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: "question1",
    questionNumber: 1,
    questionText: "Сравни два фрагмента резюме и выбери лучший.",
    options: [
      {
        id: "q1_option1",
        isCorrect: false,
        explanation: "Неправильно. Слишком общее описание без конкретных результатов"
      },
      {
        id: "q1_option2", 
        isCorrect: true,
        explanation: "Правильно! Конкретные цифры и достижения всегда лучше общих фраз"
      }
    ]
  },
  {
    id: "question2",
    questionNumber: 2,
    questionText: "Вопрос для выбора нужной карточки справа",
    options: [
      {
        id: "q2_option1",
        isCorrect: true,
        explanation: "Отлично! Это правильный выбор"
      },
      {
        id: "q2_option2",
        isCorrect: false,
        explanation: "Неправильно. Лучше выбрать другой вариант"
      }
    ]
  },
  {
    id: "question3",
    questionNumber: 3,
    questionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    options: [
      {
        id: "q3_option1",
        isCorrect: false,
        explanation: "Неправильно. Стоило выбрать более профессиональный вариант"
      },
      {
        id: "q3_option2",
        isCorrect: true,
        explanation: "Отлично! Это правильный выбор для профессионального резюме"
      }
    ]
  }
]; 