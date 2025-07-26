import type { FC } from "react";
import styled from "styled-components";

interface IconUserProps {
  size?: number;
  color?: string;
  className?: string;
}

const StyledIconUser = styled.svg<{ $size: number; $color: string }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  fill: ${(props) => props.$color};
  flex-shrink: 0;
`;

/**
 * Компонент иконки пользователя
 *
 * SVG иконка пользователя для отображения профиля.
 * Поддерживает настройку размера и цвета.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент иконки пользователя
 */
const IconUser: FC<IconUserProps> = ({
  size = 24,
  color = "#666",
  className,
}) => {
  return (
    <StyledIconUser
      $size={size}
      $color={color}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
    </StyledIconUser>
  );
};

export default IconUser;
