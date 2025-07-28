import type { FC } from "react";
import {
  Container,
  Faq,
  Header,
  Button,
  Text,
} from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";
import { MainLayout } from "../../layouts";
import { useModalStore } from "../../store";
import { applyNbsp } from "../../utils";

const faqItems = [
  {
    question: "Вопрос",
    answer: applyNbsp(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    ),
  },
  {
    question: "Вопрос",
    answer: applyNbsp(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    ),
  },
  {
    question: "Вопрос",
    answer: applyNbsp(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    ),
  },
  {
    question: "Вопрос",
    answer: applyNbsp(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    ),
  },
];

const StyledPage = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FAQPage: FC = () => {
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const handleAskClick = () => {
    open(
      <div style={{ textAlign: "center" }}>
        <Text variant="P4-Regular-Text" style={{ marginBottom: 24 }}>
          Задавай вопросы по адресу example@mail.com
        </Text>
        <Button variant="primary" onClick={close} aria-label="Закрыть модальное окно">
          Понятно
        </Button>
      </div>
    );
  };

  return (
    <MainLayout>
      <Container>
        <StyledPage>
          <Header variant="H1-Wide">Часто задаваемые вопросы</Header>
          <Faq items={faqItems} />
          <StyledButtonWrapper>
            <Button variant="primary" onClick={handleAskClick} aria-label="Открыть модальное окно">
              Задать вопрос
            </Button>
          </StyledButtonWrapper>
        </StyledPage>
      </Container>
    </MainLayout>
  );
};

export default FAQPage;
