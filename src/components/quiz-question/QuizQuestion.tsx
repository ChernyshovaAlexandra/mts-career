import { Button, Header, Stepper, Tag } from "@chernyshovaalexandra/mtsui";

import {
  AnswerItem,
  AnswersList,
  Dot,
  ProgressWrapper,
  QuizQuestionWrapper,
} from "./style";
import type { Answer, QuizQuestionProps } from "./types";
import { Card } from "../../shared";
import type { FC } from "react";
import { applyNbsp } from "../../utils";
import { Flex } from "antd";

export const QuizQuestion: FC<QuizQuestionProps> = ({ question, answers }) => (
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
      <Tag variant="pill" title={`Вопрос №${question.number}`} />
    </Flex>
    <Header as="h2" variant="H4-Wide">
      {applyNbsp(question.text)}
    </Header>

    <AnswersList role="radiogroup">
      {answers.map((answer: Answer) => (
        <AnswerItem key={answer.id} role="radio" aria-checked="false">
          <Card>{answer.text}</Card>
        </AnswerItem>
      ))}
    </AnswersList>

    <ProgressWrapper aria-hidden="true">
      {[1, 2, 3, 4].map((_, index) => (
        <Dot key={index} />
      ))}
    </ProgressWrapper>

    <Button variant="primary" disabled>
      Далее
    </Button>
  </QuizQuestionWrapper>
);
