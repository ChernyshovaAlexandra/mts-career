import type { FC } from "react";
import styled from "styled-components";
import { PageTitle } from "../../../shared";

const MobileTitle = styled.h1`
  display: none;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin: 16px 0 24px 0;
  font-family: "MTS Wide", sans-serif;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopTitle = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const AccountPageTitle: FC = () => {
  return (
    <>
      <DesktopTitle>
        <PageTitle>Личный кабинет</PageTitle>
      </DesktopTitle>

      <MobileTitle>Личный кабинет</MobileTitle>
    </>
  );
};
