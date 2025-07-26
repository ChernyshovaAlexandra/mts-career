import type { FC } from "react";
import styled from "styled-components";
import { LazyCard } from "./LazyCard";
import type {
  PersonalData,
  TablePosition,
  InterviewSimulation,
  RandomCoffee,
  Skill,
  Activity,
} from "../types";

const MobileLayoutContainer = styled.div`
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

interface MobileLayoutProps {
  personalData: PersonalData;
  tablePosition: TablePosition;
  interviewSimulation: InterviewSimulation;
  randomCoffee: RandomCoffee;
  generalSkills: Skill[];
  activities: Activity[];
  onViewRating: () => void;
  onChangeInterviewTime: () => void;
  onChangeCoffeeTime: () => void;
  onActivityClick: (activityName: string) => void;
  onTakeSurvey: () => void;
}

export const MobileLayout: FC<MobileLayoutProps> = ({
  personalData,
  tablePosition,
  interviewSimulation,
  randomCoffee,
  generalSkills,
  activities,
  onViewRating,
  onChangeInterviewTime,
  onChangeCoffeeTime,
  onActivityClick,
  onTakeSurvey,
}) => {
  return (
    <MobileLayoutContainer role="list" aria-label="Мобильная версия карточек">
      <LazyCard>
        <PersonalDataCard {...personalData} />
      </LazyCard>
      <LazyCard>
        <TablePositionCard
          position={tablePosition.position}
          points={tablePosition.points}
          onViewRating={onViewRating}
        />
      </LazyCard>
      <LazyCard>
        <InterviewSimulationCard
          {...interviewSimulation}
          onChangeTime={onChangeInterviewTime}
        />
      </LazyCard>
      <LazyCard>
        <RandomCoffeeCard {...randomCoffee} onChangeTime={onChangeCoffeeTime} />
      </LazyCard>
      <LazyCard>
        <ActivityScaleCard
          generalSkills={generalSkills}
          activities={activities}
          onActivityClick={onActivityClick}
        />
      </LazyCard>
      <LazyCard>
        <FeedbackCard
          description="Пройди опрос и получи баллы."
          onTakeSurvey={onTakeSurvey}
        />
      </LazyCard>
    </MobileLayoutContainer>
  );
};

import { lazy } from "react";

const PersonalDataCard = lazy(
  () => import("../../../entities/PersonalDataCard")
);
const TablePositionCard = lazy(
  () => import("../../../entities/TablePositionCard")
);
const InterviewSimulationCard = lazy(
  () => import("../../../entities/InterviewSimulationCard")
);
const RandomCoffeeCard = lazy(
  () => import("../../../entities/RandomCoffeeCard")
);
const ActivityScaleCard = lazy(
  () => import("../../../entities/ActivityScaleCard")
);
const FeedbackCard = lazy(() => import("../../../entities/FeedbackCard"));
