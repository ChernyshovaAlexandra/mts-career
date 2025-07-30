import { mts_greyscale_300 } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

/* вся белая панель */
export const Bar = styled.header`
  background: #fff;
  padding: 12px 0;

  display: flex;
  align-items: center;
  column-gap: 24px;
`;

/* контейнер ссылок (десктоп) */
export const Nav = styled.nav`
  display: none;
  column-gap: 32px;

  @media (min-width: 960px) {
    display: flex;
  }
`;

/* ссылка-пункт меню */
export const NavItem = styled.span`
  font-size: 14px;
  white-space: nowrap;
`;

/* заполнитель, чтобы правая часть ушла в край */
export const Spacer = styled.div`
  flex: 1;
`;

/* счётчик звёздочек */
export const Score = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-weight: 600;
`;

/* «бургер» или аватар */
export const IconBtn = styled.button<{ $status: string }>`
  all: unset;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #fff;

  svg {
    color: ${mts_greyscale_300};
    > rect:first-child {
      stroke-width: 4px;
      stroke-opacity: 1;
      stroke: ${({ $status }) => ($status === "new" ? "#26CD58" : "#000")};
      & + rect {
        stroke: white;
        stroke-width: 1px;
      }
    }
  }
`;

export const Surface = styled.div<{ elevation?: number }>`
  position: absolute;
  z-index: 12;
  width: 280px;
  right: 10px;
  padding: 6px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.12),
    0px 12px 20px 0px rgba(0, 0, 0, 0.14);
`;
