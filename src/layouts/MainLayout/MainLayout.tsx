import type { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { Footer, Header, ModalRoot } from "../../widgets";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 20px);
  position: relative;
  transition: margin-left 0.3s ease;
  
  margin-left: 0 !important;
  width: 100% !important;
`;

const Main = styled.main`
  flex: 1;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper role="presentation">
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
        }}
        onFocus={(e) => (e.currentTarget.style.left = "0")}
        onBlur={(e) => (e.currentTarget.style.left = "-9999px")}
      >
        Перейти к содержимому
      </a>
      <Header />
      <Main role="main">{children}</Main>
      <Footer />
      <ModalRoot />
    </Wrapper>
  );
};
