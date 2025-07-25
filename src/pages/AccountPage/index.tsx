import type { FC } from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { MainLayout } from "../../layouts";
import { GlobalStyles, PageTitle } from "../../shared";
import {
  PersonalDataCard,
  TablePositionCard,
  InterviewSimulationCard,
  RandomCoffeeCard,
  ActivityScaleCard,
  FeedbackCard,
} from "../../entities";

const PageContainer = styled.main`
  background-color: #ffffff;
  position: relative;

  @media (max-width: 768px) {
    background-color: #f2f3f7;
    min-height: 100vh;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 16px;
  }
`;

const CardsBackground = styled.div`
  background-color: #f2f3f7;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 24px;
  position: relative;
  z-index: 3;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 640px;
    height: 400px;
    background-image: url("/images/account-bg.webp");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom right;
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    background-color: #f2f3f7;
    border-radius: 0;
    padding: 16px 0;
    margin-bottom: 24px;

    &::after {
      display: none;
    }
  }
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  position: relative;
  z-index: 3;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 3;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 3;
`;

const MobileLayout = styled.div`
  display: none;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 3;
  max-width: 375px;
  margin: 0 auto;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileTitle = styled.h1`
  display: none;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  margin: 16px 0 24px 0;
  font-family: "MTS Wide", sans-serif;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopTitle = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

/**
 * Страница личного кабинета
 *
 * Адаптивная страница с двумя режимами отображения:
 * - Десктоп: двухколоночная сетка с фоновым изображением
 * - Мобильный: одноколоночная компоновка для iPhone 13 mini
 * Полностью адаптирована для SEO и доступности (a11y).
 * Оптимизирована для производительности с использованием React.memo и useCallback.
 *
 * @returns JSX элемент страницы личного кабинета
 */
const AccountPage: FC = () => {
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

  const personalData = useMemo(
    () => ({
      firstName: "Ковальский",
      lastName: "Константин",
      personalCode: "1234567890",
      city: "Москва",
      status: "Активен",
    }),
    []
  );

  const tablePosition = useMemo(
    () => ({
      position: 1367,
      points: "XXXX",
    }),
    []
  );

  const interviewSimulation = useMemo(
    () => ({
      direction: "Работа в IT",
      interviewDate: "29 июля в 12:00",
    }),
    []
  );

  const randomCoffee = useMemo(
    () => ({
      employeeName: "Григорий Усов",
      position: "Должность",
      meetingDate: "29 июля в 12:00",
    }),
    []
  );

  const generalSkills = useMemo(
    () => [
      {
        name: "Подготовка резюме",
        progress: "XX из XX",
        completed: true,
      },
      {
        name: "Подготовка к собеседованию",
        progress: "Не начато",
      },
      {
        name: "Работа в МТС",
        progress: "XX из XX",
        completed: true,
      },
    ],
    []
  );

  const activities = useMemo(
    () => [
      {
        name: "Финтек",
        progress: "XX из XX",
        completed: true,
      },
      {
        name: "МТС Медиа",
        progress: "Не начато",
      },
      {
        name: "Рекламные технологии AdTech",
        progress: "Не начато",
      },
      {
        name: "IT-направление MTS WEB SERVICES",
        progress: "XX из XX",
        completed: true,
      },
      {
        name: "Кикшеринг МТС Юрент",
        progress: "XX из XX",
        completed: true,
      },
      {
        name: "Телеком",
        progress: "XX из XX",
        completed: true,
      },
    ],
    []
  );

  return (
    <>
      <GlobalStyles />
      <MainLayout>
        <PageContainer>
          <ContentWrapper>
            <DesktopTitle>
              <PageTitle>Личный кабинет</PageTitle>
            </DesktopTitle>

            <MobileTitle>Личный кабинет</MobileTitle>

            <CardsBackground
              role="region"
              aria-label="Карточки личного кабинета"
            >
              <GridLayout role="grid" aria-label="Сетка карточек">
                <LeftColumn role="rowgroup" aria-label="Левая колонка">
                  <PersonalDataCard {...personalData} />
                  <TablePositionCard
                    position={tablePosition.position}
                    points={tablePosition.points}
                    onViewRating={handleViewRating}
                  />
                  <InterviewSimulationCard
                    {...interviewSimulation}
                    onChangeTime={handleChangeInterviewTime}
                  />
                  <RandomCoffeeCard
                    {...randomCoffee}
                    onChangeTime={handleChangeCoffeeTime}
                  />
                </LeftColumn>

                <RightColumn role="rowgroup" aria-label="Правая колонка">
                  <ActivityScaleCard
                    generalSkills={generalSkills}
                    activities={activities}
                    onActivityClick={handleActivityClick}
                  />
                  <FeedbackCard
                    description="Пройди опрос и получи баллы."
                    onTakeSurvey={handleTakeSurvey}
                  />
                </RightColumn>
              </GridLayout>

              <MobileLayout role="list" aria-label="Мобильная версия карточек">
                <PersonalDataCard {...personalData} />
                <TablePositionCard
                  position={tablePosition.position}
                  points={tablePosition.points}
                  onViewRating={handleViewRating}
                />
                <InterviewSimulationCard
                  {...interviewSimulation}
                  onChangeTime={handleChangeInterviewTime}
                />
                <RandomCoffeeCard
                  {...randomCoffee}
                  onChangeTime={handleChangeCoffeeTime}
                />
                <ActivityScaleCard
                  generalSkills={generalSkills}
                  activities={activities}
                  onActivityClick={handleActivityClick}
                />
                <FeedbackCard
                  description="Пройди опрос и получи баллы."
                  onTakeSurvey={handleTakeSurvey}
                />
              </MobileLayout>
            </CardsBackground>
          </ContentWrapper>
        </PageContainer>
      </MainLayout>
    </>
  );
};

export default AccountPage;
