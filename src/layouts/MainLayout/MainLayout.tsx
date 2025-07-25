import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { Footer, Header, ModalRoot } from "../../widgets";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 20px);
`;

const Main = styled.main`
  flex: 1;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  position: relative;
`;

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <ModalRoot />
    </Wrapper>
  );
};
