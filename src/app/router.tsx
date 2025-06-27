import { createBrowserRouter } from "react-router-dom";
import {
  FAQPage,
  LoginPage,
  MainPage,
  RegisterPage,
  ResumePage,
  InterviewPage,
  WorkAtMtsPage,
  RulesPage,
} from "../pages";


export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/resume", element: <ResumePage /> },
  { path: "/faq", element: <FAQPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/rules", element: <RulesPage /> },
  { path: "/interview", element: <InterviewPage /> },
  { path: "/work", element: <WorkAtMtsPage /> },
]);
