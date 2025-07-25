import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @typedef {Object} FieldValueProps
 * @property {string} [className] - Дополнительные CSS классы
 * @property {string} [id] - Уникальный ID для value
 * @property {string} [aria-labelledby] - ID элемента, который описывает это значение
 */
interface FieldValueProps extends PropsWithChildren {
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

const Value = styled.span`
  font-family: "MTS Text", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 17px;
  line-height: 140%;
  letter-spacing: 0px;
  color: #1a1a1a;
  display: block;
`;

/**
 * Универсальный компонент значения поля
 *
 * Используется для всех значений полей в карточках с единообразным стилем.
 * Соответствует дизайн-системе MTS с указанными параметрами шрифта MTS Text.
 * Поддерживает связь с соответствующими label элементами для улучшения доступности.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент значения поля
 */
const FieldValue: FC<FieldValueProps> = ({
  children,
  className,
  id,
  "aria-labelledby": ariaLabelledby,
}) => {
  return (
    <Value className={className} id={id} aria-labelledby={ariaLabelledby}>
      {children}
    </Value>
  );
};

export default FieldValue;
