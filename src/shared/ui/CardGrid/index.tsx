import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";

interface CardGridProps extends PropsWithChildren {
  columns?: number;
}

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 32px 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CardGrid: FC<CardGridProps> = ({ children, columns = 3 }) => {
  return <Grid $columns={columns}>{children}</Grid>;
};
