import type { FC } from "react";
import { Button, Header } from "@chernyshovaalexandra/mtsui";
import { Flex } from "antd";

export interface QuizStartScreenProps {
  onStart: () => void;
}

export const QuizStartScreen: FC<QuizStartScreenProps> = ({ onStart }) => (
  <Flex align="center" justify="center" style={{ flex: 1 }} vertical gap="30px">
    <Header as="h4" variant="H4-Wide">
      Чтобы начать проходить тест нажми на кнопку ниже
    </Header>
    <Button variant="primary" aria-label="Начать игру" onClick={onStart}>
      Начать
    </Button>
  </Flex>
);
