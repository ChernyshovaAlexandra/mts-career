import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { GlobalStyles } from "../shared";

export const App = () => (
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
);
