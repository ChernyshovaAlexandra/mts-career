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
  PromptGalleryPage,
  MarketingPage,
  ServicePage,
  ITPage,
  FinancePage,
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
  { path: "/gallery", element: <PromptGalleryPage /> },
  { path: "/marketing", element: <MarketingPage /> },
  { path: "/service", element: <ServicePage /> },
  { path: "/it", element: <ITPage /> },
  { path: "/finance", element: <FinancePage /> },
]);
