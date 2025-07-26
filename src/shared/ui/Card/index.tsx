import { Header } from "@chernyshovaalexandra/mtsui";
import type { CSSProperties, FC, ReactNode } from "react";
import styled from "styled-components";

interface CardProps {
  children: ReactNode;
  title?: string;
  titleId?: string;
  className?: string;
}

const CardContainer = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  /* Мобильные оптимизации */
  @media (max-width: 768px) {
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    outline: 2px solid var(--text-light-accent);
    outline-offset: 2px;
  }
`;

const CardTitleStyle: CSSProperties = {
  fontSize: "var(--font-size-2xl)",
  fontWeight: "var(--font-weight-semibold)",
  margin: "0 0 16px 0",
  color: "var(--text-primary)",
  lineHeight: "1.3",
};

/**
 * Общий компонент карточки
 *
 * Переиспользуемый компонент для создания карточек с единым стилем.
 * Поддерживает заголовок и произвольное содержимое.
 * Адаптивный дизайн: десктопная версия для больших экранов,
 * мобильная версия для iPhone 13 mini и подобных устройств.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки
 */
const Card: FC<CardProps> = ({ children, title, titleId, className }) => {
  return (
    <CardContainer aria-labelledby={titleId} className={className}>
      {title && (
        <Header variant="H2-Wide" style={CardTitleStyle}>
          {title}
        </Header>
      )}
      {children}
    </CardContainer>
  );
};

export default Card;
