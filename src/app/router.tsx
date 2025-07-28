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
  StreamPage,
  AccountPage,
  TournamentTablePage,
  AdTechPage,
  FintechPage,
  MediaPage,
  TelecomPage,
  UrentPage,
  WebServicesPage,
} from "../pages";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/account", element: <AccountPage /> },
  { path: "/resume", element: <ResumePage /> },
  { path: "/faq", element: <FAQPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/rules", element: <RulesPage /> },
  { path: "/interview", element: <InterviewPage /> },
  { path: "/work", element: <WorkAtMtsPage /> },
  { path: "/gallery", element: <PromptGalleryPage /> },
  { path: "/stream", element: <StreamPage /> },
  { path: "/tournament-table", element: <TournamentTablePage /> },

  // --- activities ---
  { path: "/activities/adtech", element: <AdTechPage /> },
  { path: "/activities/fintech", element: <FintechPage /> },
  { path: "/activities/media", element: <MediaPage /> },
  { path: "/activities/telecom", element: <TelecomPage /> },
  { path: "/activities/urent", element: <UrentPage /> },
  { path: "/activities/web", element: <WebServicesPage /> },
]);
