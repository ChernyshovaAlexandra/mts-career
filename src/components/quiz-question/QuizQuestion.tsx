import { Button, Header, Stepper, Tag } from "@chernyshovaalexandra/mtsui";
import { AnswerItem, AnswersList, QuizQuestionWrapper } from "./style";
import type { Answer, QuizQuestionProps } from "./types";
import type { FC } from "react";
import { applyNbsp } from "../../utils";
import { Flex } from "antd";

export const QuizQuestion: FC<QuizQuestionProps> = ({ question, answers }) => {
  const groupId = `q-${question.number}`;

  return (
    <QuizQuestionWrapper>
      <Flex align="center" justify="center" vertical gap="32px">
        <Stepper
          steps={[
            { index: 0, status: "answered_true" },
            { index: 1, status: "answered_true" },
            { index: 3, status: "answered_false" },
            { index: 4, status: "answered_true" },
            { index: 5, status: "active" },
            { index: 6, status: "not_available" },
          ]}
        />
      </Flex>
      <Flex align="center" justify="center" vertical style={{ marginTop: 32 }}>
        <Tag variant="pill" title={`Вопрос №${question.number}`} />
      </Flex>
      <Header as="h2" variant="H4-Wide">
        {applyNbsp(question.text)}
      </Header>

      <AnswersList role="radiogroup" aria-labelledby={groupId}>
        {answers.map((answer: Answer) => (
          <AnswerItem key={answer.id} role="radio" aria-checked="false">
            {answer.text}
          </AnswerItem>
        ))}
      </AnswersList>

      <Button variant="primary" disabled={true} style={{ margin: "auto" }}>
        Далее
      </Button>
    </QuizQuestionWrapper>
  );
};
