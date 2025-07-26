import type { FC } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #ffffff;
  position: relative;

  @media (max-width: 768px) {
    background-color: #f2f3f7;
    min-height: 100vh;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 16px;
  }
`;

const CardsBackground = styled.div`
  background-color: #f2f3f7;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 24px;
  position: relative;
  z-index: 3;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 640px;
    height: 400px;
    background-image: url("/images/account-bg.webp");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom right;
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    background-color: #f2f3f7;
    border-radius: 0;
    padding: 16px 0;
    margin-bottom: 24px;

    &::after {
      display: none;
    }
  }
`;

interface AccountPageLayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
}

export const AccountPageLayout: FC<AccountPageLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <PageContainer>
      <ContentWrapper>
        {title}
        <CardsBackground role="region" aria-label="Карточки личного кабинета">
          {children}
        </CardsBackground>
      </ContentWrapper>
    </PageContainer>
  );
};
