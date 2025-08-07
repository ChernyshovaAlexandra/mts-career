import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAccountPageHandlers = () => {
  const navigate = useNavigate();

  const handleViewRating = useCallback(() => {
    navigate("/tournament-table");
  }, [navigate]);

  const handleChangeInterviewTime = useCallback(() => {
    navigate("/interview");
  }, [navigate]);

  const handleChangeCoffeeTime = useCallback(() => {
    navigate("/work");
  }, [navigate]);

  const handleActivityClick = useCallback(
    (activityName: string) => {
      const routeMap: Record<string, string> = {
        "Подготовка резюме": "/resume",
        "Подготовка к собеседованию": "/interview",
        "Работа в МТС": "/work",
        "Финтек": "/activities/fintech",
        "МТС Медиа": "/activities/media",
        "Рекламные технологии AdTech": "/activities/adtech",
        "IT-направление MTS WEB SERVICES": "/activities/web",
        "Кикшеринг МТС Юрент": "/activities/urent",
        "Телеком": "/activities/telecom",
      };

      const path = routeMap[activityName];
      if (path) navigate(path);
    },
    [navigate]
  );

  const handleTakeSurvey = useCallback(() => {
    window.open("https://mtsopros.mts.ru/s/vK0IZ", "_blank", "noopener,noreferrer");
  }, []);

  return {
    handleViewRating,
    handleChangeInterviewTime,
    handleChangeCoffeeTime,
    handleActivityClick,
    handleTakeSurvey,
  };
};
