import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @typedef {Object} FieldLabelProps
 * @property {string} [className] - Дополнительные CSS классы
 * @property {string} [htmlFor] - ID элемента, с которым связан label
 * @property {string} [id] - Уникальный ID для label
 */
interface FieldLabelProps extends PropsWithChildren {
  className?: string;
  htmlFor?: string;
  id?: string;
}

const Label = styled.label`
  font-family: "MTS Text", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0px;
  color: var(--text-light-secondary);
  display: block;
  margin-bottom: 4px;
  cursor: default;
`;

/**
 * Универсальный компонент названия поля
 *
 * Используется для всех названий полей в карточках с единообразным стилем.
 * Соответствует дизайн-системе MTS с указанными параметрами шрифта MTS Text.
 * Поддерживает связь с соответствующими элементами для улучшения доступности.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент названия поля
 */
const FieldLabel: FC<FieldLabelProps> = ({
  children,
  className,
  htmlFor,
  id,
}) => {
  return (
    <Label className={className} htmlFor={htmlFor} id={id}>
      {children}
    </Label>
  );
};

export default FieldLabel;
