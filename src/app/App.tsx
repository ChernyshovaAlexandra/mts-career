import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
`;

export const App = () => (
  <>
    <GlobalStyle />

    <RouterProvider router={router} />
  </>
);
