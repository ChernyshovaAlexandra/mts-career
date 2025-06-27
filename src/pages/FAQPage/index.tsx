import type { FC } from "react";
import { Container, Faq, Header, Button } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";
import { MainLayout } from "../../layouts";

const faqItems = [
  {
    question: "Вопрос",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    question: "Вопрос",
    answer: "Ответ...",
  },
  {
    question: "Вопрос",
    answer: "Ответ...",
  },
  {
    question: "Вопрос",
    answer: "Ответ...",
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
  return (
    <MainLayout>
      <Container>
        <StyledPage>
          <Header variant="H1-Wide">Ответы на вопросы</Header>
          <Faq items={faqItems} />
          <StyledButtonWrapper>
            <Button variant="primary">Задать вопрос</Button>
          </StyledButtonWrapper>
        </StyledPage>
      </Container>
    </MainLayout>
  );
};

export default FAQPage;
