import styled, { css } from "styled-components";

export const CardContainer = styled.div<{ $selected?: boolean }>`
  background-color: #fff;
  border-radius: 24px;
  margin: 0 1rem;
  padding: 16px;
  text-align: center;
  border: 2px solid transparent;
  ${({ $selected }) =>
    $selected &&
    css`
      border-color: #e30611;
    `}
`;

export const Avatar = styled.div`
  background-color: #e9eaed;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  margin-bottom: 16px;
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const Position = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
`;
