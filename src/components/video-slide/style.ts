import styled, { css } from "styled-components";

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 32px;
  background: #d9dcef;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const CustomArrow = styled.button<{
  disabled?: boolean;
  position?: "left" | "right";
}>`
  z-index: 10;
  ${({ position }) =>
    position === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: #fff;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (min-width: 1280px) {
    padding: 0px;
    width: 70px;
    height: 70px;
  }
`;

export const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

export const CustomDot = styled.button<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${({ active }) => (active ? "#FF0032" : "#BBC1C7")};
`;
