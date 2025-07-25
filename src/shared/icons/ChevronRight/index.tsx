import type { FC } from "react";
import styled from "styled-components";

interface ChevronRightProps {
  size?: number;
  color?: string;
  className?: string;
}

const StyledChevronRight = styled.svg<{ $size: number; $color: string }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  fill: ${(props) => props.$color};
  flex-shrink: 0;
`;

/**
 * Компонент иконки стрелки вправо
 *
 * SVG иконка стрелки для индикации кликабельности ссылок.
 * Поддерживает настройку размера и цвета.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент иконки стрелки вправо
 */
const ChevronRight: FC<ChevronRightProps> = ({
  size = 16,
  color = "#0070E5",
  className,
}) => {
  return (
    <StyledChevronRight
      $size={size}
      $color={color}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9.707 18.707L16.414 12L9.707 5.293L8.293 6.707L13.586 12L8.293 17.293L9.707 18.707Z" />
    </StyledChevronRight>
  );
};

export default ChevronRight;
