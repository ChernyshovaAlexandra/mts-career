import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @typedef {Object} ButtonProps
 * @property {string} [className] - Дополнительные CSS классы
 * @property {() => void} [onClick] - Обработчик клика
 * @property {string} [type] - Тип кнопки (button, submit, reset)
 * @property {boolean} [disabled] - Отключена ли кнопка
 */
interface ButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const StyledButton = styled.button`
  width: 218px;
  height: 44px;
  border-radius: 16px;
  padding: 10px;
  background-color: var(--text-controls-tertiary-active);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: "MTS Wide", sans-serif;
  font-weight: var(--font-weight-bold);
  font-style: normal;
  font-size: var(--font-size-xs);
  line-height: 16px;
  letter-spacing: var(--letter-spacing-wide);
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: var(--text-primary);

  &:hover {
    background-color: #e8e8e8;
  }

  &:active {
    background-color: #d8d8d8;
  }
`;

/**
 * Универсальный компонент кнопки
 *
 * Используется для всех кнопок в карточках с единообразным стилем.
 * Соответствует дизайн-системе MTS с указанными параметрами.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент кнопки
 */
const Button: FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
