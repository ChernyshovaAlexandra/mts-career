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
  background-color: #f2f3f7;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: "MTS Wide", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #1a1a1a;

  &:hover {
    background-color: #e8e8e8;
  }

  &:focus {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }

  &:active {
    background-color: #d8d8d8;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
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
