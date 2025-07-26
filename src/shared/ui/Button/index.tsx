import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

/**
 * @typedef {Object} ButtonProps
 * @property {string} [className] - Дополнительные CSS классы
 * @property {() => void} [onClick] - Обработчик клика
 * @property {string} [type] - Тип кнопки (button, submit, reset)
 * @property {boolean} [disabled] - Отключена ли кнопка
 * @property {string} [aria-label] - ARIA метка для доступности
 */
interface ButtonProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const StyledButton = styled.button`
  width: 218px;
  height: 44px;
  border-radius: 16px;
  padding: 10px;
  background-color: var(--text-controls-tertiary-active);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "MTS Wide", sans-serif;
  font-weight: var(--font-weight-semibold);
  font-style: normal;
  font-size: var(--font-size-xs);
  line-height: 1.4;
  letter-spacing: var(--letter-spacing-wide);
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;

  &:hover {
    background-color: #e8e8e8;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #d8d8d8;
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid var(--text-light-accent);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 48px;
    font-size: var(--font-size-sm);
    border-radius: 12px;
    padding: 14px 16px;

    &:focus {
      outline: 2px solid var(--text-light-accent);
      outline-offset: 2px;
    }
  }

  /* Оптимизация для iPhone 13 mini */
  @media (max-width: 375px) {
    min-height: 44px;
    font-size: var(--font-size-xs);
    padding: 12px 16px;
  }
`;

/**
 * Универсальный компонент кнопки
 *
 * Используется для всех кнопок в карточках с единообразным стилем.
 * Соответствует дизайн-системе MTS с указанными параметрами.
 * Адаптивный дизайн: десктопная версия для больших экранов,
 * мобильная версия для iPhone 13 mini и подобных устройств.
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
  "aria-label": ariaLabel,
}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
