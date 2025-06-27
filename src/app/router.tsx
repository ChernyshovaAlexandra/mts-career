import { createBrowserRouter } from "react-router-dom";
import {
  FAQPage,
  LoginPage,
  MainPage,
  RegisterPage,
  ResumePage,
  WorkAtMtsPage,
} from "../pages";


export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/resume", element: <ResumePage /> },
  { path: "/faq", element: <FAQPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/work", element: <WorkAtMtsPage /> },
]);
