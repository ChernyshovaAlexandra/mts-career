import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { Footer, Header } from "../../widgets";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  );
};
