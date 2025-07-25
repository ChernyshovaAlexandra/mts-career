import type { FC, ReactNode } from "react";
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
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1a1a1a;
`;

/**
 * Общий компонент карточки
 *
 * Переиспользуемый компонент для создания карточек с единым стилем.
 * Поддерживает заголовок и произвольное содержимое.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки
 */
const Card: FC<CardProps> = ({ children, title, titleId, className }) => {
  return (
    <CardContainer
      role="region"
      aria-labelledby={titleId}
      className={className}
    >
      {title && <CardTitle id={titleId}>{title}</CardTitle>}
      {children}
    </CardContainer>
  );
};

export default Card;
