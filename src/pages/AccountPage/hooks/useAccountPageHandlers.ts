import { useCallback } from "react";

export const useAccountPageHandlers = () => {
  const handleViewRating = useCallback(() => {
    console.log("Открыть рейтинг участников");
  }, []);

  const handleChangeInterviewTime = useCallback(() => {
    console.log("Изменить время собеседования");
  }, []);

  const handleChangeCoffeeTime = useCallback(() => {
    console.log("Изменить время рандом-кофе");
  }, []);

  const handleActivityClick = useCallback((activityName: string) => {
    console.log(`Перейти к активности: ${activityName}`);
  }, []);

  const handleTakeSurvey = useCallback(() => {
    console.log("Пройти опрос");
  }, []);

  return {
    handleViewRating,
    handleChangeInterviewTime,
    handleChangeCoffeeTime,
    handleActivityClick,
    handleTakeSurvey,
  };
};
