import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @typedef {Object} CardTitleProps
 * @property {string} id - ID для связи с aria-labelledby
 * @property {string} [className] - Дополнительные CSS классы
 */
interface CardTitleProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

const Title = styled.h2`
  font-family: "MTS Wide", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0px;
  margin: 0 0 16px 0;
  color: #1a1a1a;
`;

/**
 * Универсальный компонент заголовка карточки
 *
 * Используется для всех заголовков карточек с единообразным стилем.
 * Соответствует дизайн-системе MTS с указанными параметрами шрифта.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент заголовка карточки
 */
const CardTitle: FC<CardTitleProps> = ({ children, id, className }) => {
  return (
    <Title id={id} className={className}>
      {children}
    </Title>
  );
};

export default CardTitle;
