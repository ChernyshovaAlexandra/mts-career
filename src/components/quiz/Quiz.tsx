import { useState } from "react";
import { QuizQuestion } from "../quiz-question";
import type { Answer, Question, Step } from "./quiz.types";

export const Quiz = () => {
  // TODO: replace with API/DB data
  const questions: Question[] = [
    {
      number: 1,
      text: "Какой цвет есть у логотипа МТС?",
      answers: [
        { id: "red", text: "Красный" },
        { id: "blue", text: "Синий" },
        { id: "green", text: "Зелёный" },
        { id: "yellow", text: "Жёлтый" },
      ],
      correctAnswerId: "red",
    },
    {
      number: 2,
      text: "Сколько дней в неделе?",
      answers: [
        { id: "5", text: "Пять" },
        { id: "6", text: "Шесть" },
        { id: "7", text: "Семь" },
        { id: "8", text: "Восемь" },
      ],
      correctAnswerId: "7",
    },
    {
      number: 3,
      text: "Какой сейчас год?",
      answers: [
        { id: "2023", text: "2023" },
        { id: "2024", text: "2024" },
        { id: "2025", text: "2025" },
        { id: "2026", text: "2026" },
      ],
      correctAnswerId: "2024",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | undefined)[]>(
    Array(questions.length).fill(undefined)
  );

  const currentQuestion = questions[currentIndex];

  const selectAnswer = (id: string) => {
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = id;
      return next;
    });
  };

  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const steps: Step[] = questions.map((q, index) => {
    const selected = selectedAnswers[index];
    let status: Step["status"];
    if (index < currentIndex) {
      status = selected === q.correctAnswerId ? "answered_true" : "answered_false";
    } else if (index === currentIndex) {
      status = "active";
    } else {
      status = "not_available";
    }
    return { index, status };
  });

  return (
    <QuizQuestion
      question={{ number: currentQuestion.number, text: currentQuestion.text }}
      answers={currentQuestion.answers as Answer[]}
      steps={steps}
      selectedAnswerId={selectedAnswers[currentIndex]}
      isFirst={currentIndex === 0}
      isLast={currentIndex === questions.length - 1}
      onNext={next}
      onPrev={prev}
      onSelect={selectAnswer}
    />
  );
};
