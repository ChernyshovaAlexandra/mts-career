import { type FC } from "react";
import { QuizQuestion } from "../quiz-question";
import { useQuiz } from "./useQuiz";

type QuizProps = { gameId: string };

export const Quiz: FC<QuizProps> = ({ gameId }) => {
  const {
    stage,
    steps,
    currentQuestion,
    selectedAnswerId,
    isFirst,
    isLast,
    setStage,
    actions: { selectAnswer, next, prev },
  } = useQuiz(gameId);

  return (
    <QuizQuestion
      stage={stage}
      question={{
        number: currentQuestion?.number || 0,
        text: currentQuestion?.text || "",
      }}
      answers={currentQuestion?.answers ?? []}
      steps={steps}
      selectedAnswerId={selectedAnswerId}
      isFirst={isFirst}
      isLast={isLast}
      setStage={setStage}
      onNext={next}
      onPrev={prev}
      onSelect={selectAnswer}
    />
  );
};
