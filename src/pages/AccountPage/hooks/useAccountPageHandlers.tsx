import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../services/apiService";
import { useUserStore, useModalStore } from "../../../store";
import { Button, Text } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
  max-width: 320px;
`;

const ModalTitle = styled.div`
  font-family: "MTS Wide", sans-serif;
  font-size: var(--font-size-xl);
  color: var(--text-primary);
`;

export const useAccountPageHandlers = () => {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const handleViewRating = useCallback(() => {
    navigate("/tournament-table");
  }, [navigate]);

  const handleChangeInterviewTime = useCallback(async () => {
    if (user?.sobes?.id) {
      try {
        await apiService.cancelInterview(user.sobes.id);
        if (user) setUser({ ...user, sobes: null });
        const { open, close } = useModalStore.getState();
        open(
          <ModalContent>
            <ModalTitle>Запись отменена</ModalTitle>
            <Text variant="P4-Regular-Text" style={{ textAlign: "center" }}>
              Чтобы назначить новую встречу, перейди в раздел Симуляция собеседования
            </Text>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="gray" onClick={close}>ЗАКРЫТЬ</Button>
              <Button
                variant="primary"
                onClick={() => {
                  close();
                  navigate("/interview");
                }}
              >
                ПЕРЕЙТИ
              </Button>
            </div>
          </ModalContent>
        );
      } catch (e) {
        console.error("Не удалось отменить собеседование", e);
      }
    } else {
      navigate("/interview");
    }
  }, [navigate, user, setUser]);

  const handleChangeCoffeeTime = useCallback(async () => {
    if (user?.kofe?.id) {
      try {
        await apiService.cancelCoffee(user.kofe.id);
        if (user) setUser({ ...user, kofe: null });
        const { open, close } = useModalStore.getState();
        open(
          <ModalContent>
            <ModalTitle>Запись отменена</ModalTitle>
            <Text variant="P4-Regular-Text" style={{ textAlign: "center" }}>
              Чтобы назначить новую встречу, перейди в раздел Рандом-кофе с сотрудником
            </Text>
            <div style={{ display: "flex", gap: 12 }}>
              <Button variant="gray" onClick={close}>ЗАКРЫТЬ</Button>
              <Button
                variant="primary"
                onClick={() => {
                  close();
                  navigate("/work");
                }}
              >
                ПЕРЕЙТИ
              </Button>
            </div>
          </ModalContent>
        );
      } catch (e) {
        console.error("Не удалось отменить встречу кофе", e);
      }
    } else {
      navigate("/work");
    }
  }, [navigate, user, setUser]);

  const handleActivityClick = useCallback(
    (activityName: string) => {
      const routeMap: Record<string, string> = {
        "Карточки с советами": "/resume#tips",
        "Собери резюме": "/resume#dos-donts",
        "Основные правила": "/interview#basic-rules",
        "Подготовка резюме": "/resume#tips",
        "Подготовка к собеседованию": "/interview#basic-rules",
        "Работа в МТС": "/work",
        "Финтек": "/activities/fintech",
        "МТС Медиа": "/activities/media",
        "Рекламные технологии AdTech": "/activities/adtech",
        "IT-направление MTS WEB SERVICES": "/activities/web",
        "Кикшеринг МТС Юрент": "/activities/urent",
        "Телеком": "/activities/telecom",
      };

      const path = routeMap[activityName];
      if (path) {
        navigate(path);
      }
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

