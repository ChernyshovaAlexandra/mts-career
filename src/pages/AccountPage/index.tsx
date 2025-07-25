import type { FC } from "react";
import styled from "styled-components";
import { MainLayout } from "../../layouts";
import {
  PersonalDataCard,
  TablePositionCard,
  InterviewSimulationCard,
  RandomCoffeeCard,
  ActivityScaleCard,
  FeedbackCard,
  GlobalStyles,
} from "../../shared/ui";

const PageContainer = styled.main`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 32px 0;
  color: #1a1a1a;
  text-transform: uppercase;
  font-family: "MTS Wide", sans-serif;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/**
 * Страница личного кабинета
 *
 * Отображает полную информацию о пользователе включая персональные данные,
 * рейтинг, запланированные встречи, активности и обратную связь.
 * Страница полностью адаптирована для SEO и доступности (a11y).
 *
 * @returns JSX элемент страницы личного кабинета
 */
const AccountPage: FC = () => {
  // Обработчики событий
  const handleViewRating = () => {
    console.log("Открыть рейтинг участников");
  };

  const handleChangeInterviewTime = () => {
    console.log("Изменить время собеседования");
  };

  const handleChangeCoffeeTime = () => {
    console.log("Изменить время рандом-кофе");
  };

  const handleActivityClick = (activityName: string) => {
    console.log(`Перейти к активности: ${activityName}`);
  };

  const handleTakeSurvey = () => {
    console.log("Пройти опрос");
  };

  // Данные для компонентов
  const personalData = {
    firstName: "Кова",
    lastName: "Константин",
    personalCode: "1234567890",
    city: "Москва",
    status: "Новичок",
  };

  const tablePosition = {
    position: 1367,
    points: "XXXX",
  };

  const interviewSimulation = {
    direction: "Работа в IT",
    interviewDate: "29 июля в 12:00",
  };

  const randomCoffee = {
    employeeName: "Григорий Усов",
    position: "Должность",
    meetingDate: "29 июля в 12:00",
  };

  const generalSkills = [
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
  ];

  const activities = [
    {
      name: "Финтех",
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
  ];

  return (
    <>
      <GlobalStyles />
      <MainLayout>
        <PageContainer>
          <ContentWrapper>
            <PageTitle>Личный кабинет</PageTitle>

            <GridLayout>
              <LeftColumn>
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

              <RightColumn>
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
          </ContentWrapper>
        </PageContainer>
      </MainLayout>
    </>
  );
};

export default AccountPage;
