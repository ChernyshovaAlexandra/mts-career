import type { FC } from "react";
import styled from "styled-components";

interface StarIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const StyledStarIcon = styled.svg<{ $size: number; $color: string }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  fill: ${(props) => props.$color};
  flex-shrink: 0;
`;

/**
 * Компонент иконки звезды
 *
 * SVG иконка звезды для отображения статуса завершения активностей.
 * Поддерживает настройку размера и цвета.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент иконки звезды
 */
const StarIcon: FC<StarIconProps> = ({
  size = 16,
  color = "#1a1a1a",
  className,
}) => {
  return (
    <StyledStarIcon
      $size={size}
      $color={color}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </StyledStarIcon>
  );
};

export default StarIcon;
