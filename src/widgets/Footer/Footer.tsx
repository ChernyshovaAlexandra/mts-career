import { Container, Link, Text } from "@chernyshovaalexandra/mtsui";
import type { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  padding: 24px 0;
  display: flex;

  flex-direction: column;
  gap: 12px;
  justify-content: start;

  @media screen and (min-width: 1280px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Footer: FC = () => {
  return (
    <footer style={{ backgroundColor: "#f5f6f8" }}>
      <Container>
        <Wrapper>
          <Link href="/faq">Задать вопрос</Link>
          <Link href="/rules">Правила проведения акции</Link>
          <Link href="#">Политика обработки персональных данных</Link>
          <Text style={{ color: "#626C77" }} variant="P3-Regular-Comp">
            © 2025 ПАО «МТС». Все права защищены.
          </Text>
        </Wrapper>
      </Container>
    </footer>
  );
};
