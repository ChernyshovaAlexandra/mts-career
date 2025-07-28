import { useState, type FC } from "react";
import { QuizQuestion } from "../quiz-question";
import type { Answer, Question, Step } from "./quiz.types";

type QuizProps = {
  questions: Question[];
};

export const Quiz: FC<QuizProps> = ({ questions }) => {
  // TODO: replace with API/DB data

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    (string | undefined)[]
  >(Array(questions.length).fill(undefined));

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
      status =
        selected === q.correctAnswerId ? "answered_true" : "answered_false";
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
