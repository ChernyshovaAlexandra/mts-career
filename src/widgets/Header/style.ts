import styled from "styled-components";

/* вся белая панель */
export const Bar = styled.header`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0 0 0 / 6%);
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
export const IconBtn = styled.button`
  all: unset;
  cursor: pointer;
  display: grid;
  place-items: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ff0028; /* красный круг как в макете */
  color: #fff;
`;

export const Surface = styled.div<{ elevation?: number }>`
  background: #fff;
  border-radius: 12px;
  box-shadow: ${({ elevation = 2 }) =>
    `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,.1)`};
`;