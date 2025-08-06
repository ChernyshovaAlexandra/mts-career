import { Button, Header, Stepper, Tag } from "@chernyshovaalexandra/mtsui";
import { Flex } from "antd";
import type { FC, KeyboardEvent } from "react";
import { AnswerItem, AnswersList, QuizQuestionWrapper } from "./style";
import { applyNbsp } from "../../utils";
import type { Answer, QuizQuestionProps } from "../quiz/quiz.types";
import { QuizStartScreen } from "./QuizStartScreen";

export const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  answers,
  steps,
  selectedAnswerId,
  // isFirst,
  stage,
  isLast,
  onNext,
  setStage,
  onSelect,
}) => {
  const groupId = `q-${question.number}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, id: string) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onSelect(id);
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      (event.currentTarget.nextElementSibling as HTMLElement | null)?.focus();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      (
        event.currentTarget.previousElementSibling as HTMLElement | null
      )?.focus();
    }
  };

  return (
    <QuizQuestionWrapper>
      <Flex align="center" justify="center" vertical gap="32px">
        <Stepper steps={steps} />
      </Flex>
      {stage === "loading" ? (
        <QuizStartScreen onStart={() => setStage("in_progress")} />
      ) : stage === "in_progress" ? (
        <>
          <Flex
            align="center"
            justify="center"
            vertical
            style={{ marginTop: 32 }}
          >
            <Tag variant="pill" title={`Вопрос №${question.number}`} />
          </Flex>
          <Header as="h2" variant="H4-Wide">
            {applyNbsp(question.text)}
          </Header>

          <AnswersList
            role="radiogroup"
            aria-labelledby={groupId}
            data-has-selection={!!selectedAnswerId}
          >
            {answers.map((answer: Answer, i: number) => (
              <>
                <AnswerItem
                  data-index={i + 1}
                  key={answer.id}
                  role="radio"
                  aria-checked={selectedAnswerId === answer.id}
                  tabIndex={0}
                  onClick={() => onSelect(answer.id)}
                  onKeyDown={(e) => handleKeyDown(e, answer.id)}
                >
                  {answer.text}
                </AnswerItem>
              </>
            ))}
          </AnswersList>

          <Flex justify="center" style={{ marginTop: 24 }}>
            <Button
              variant="primary"
              aria-label={"Ответить с выбранным вариантом ответа"}
              disabled={!selectedAnswerId}
              onClick={onNext}
            >
              {isLast ? "Завершить" : "Далее"}
            </Button>
          </Flex>
        </>
      ) : (
        <>Finish</>
      )}
    </QuizQuestionWrapper>
  );
};
