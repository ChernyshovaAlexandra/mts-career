import { Container, Link, Text } from "@chernyshovaalexandra/mtsui";
import type { FC } from "react";
import styled from "styled-components";

/** единственный contentinfo-landmark в приложении */
const FooterWrapper = styled.footer`
  background: #f5f6f8;
  padding: 24px 0;

  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  @media (min-width: 1280px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const Footer: FC = () => (
  <FooterWrapper aria-label="Основной футер сайта">
    <Container>
      {/* внутренний flex: теперь обычный div, landmarks здесь не нужны */}
      <FooterContent>
        <Link href="/faq">Задать вопрос</Link>
        <Link href="/rules">Правила проведения акции</Link>
        <Link href="#">Политика обработки персональных данных</Link>

        <Text variant="P3-Regular-Comp" style={{ color: "#626C77" }}>
          © 2025 ПАО «МТС». Все права защищены.
        </Text>
      </FooterContent>
    </Container>
  </FooterWrapper>
);
