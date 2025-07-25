import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @typedef {Object} FieldLabelProps
 * @property {string} [className] - Дополнительные CSS классы
 */
interface FieldLabelProps extends PropsWithChildren {
  className?: string;
}

const Label = styled.span`
  font-family: "MTS Text", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0px;
  color: var(--text-light-secondary);
  display: block;
  margin-bottom: 4px;
`;

/**
 * Универсальный компонент названия поля
 *
 * Используется для всех названий полей в карточках с единообразным стилем.
 * Соответствует дизайн-системе MTS с указанными параметрами шрифта MTS Text.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент названия поля
 */
const FieldLabel: FC<FieldLabelProps> = ({ children, className }) => {
  return <Label className={className}>{children}</Label>;
};

export default FieldLabel;
