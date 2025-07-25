import type { FC } from "react";
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
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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

  const personalData = {
    firstName: "Ковалёв",
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
            <CardsBackground>
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
            </CardsBackground>
          </ContentWrapper>
        </PageContainer>
      </MainLayout>
    </>
  );
};

export default AccountPage;
