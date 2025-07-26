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

interface DesktopGridProps {
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

export const DesktopGrid: FC<DesktopGridProps> = ({
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
    <GridLayout role="grid" aria-label="Сетка карточек">
      <LeftColumn role="rowgroup" aria-label="Левая колонка">
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
          <RandomCoffeeCard
            {...randomCoffee}
            onChangeTime={onChangeCoffeeTime}
          />
        </LazyCard>
      </LeftColumn>

      <RightColumn role="rowgroup" aria-label="Правая колонка">
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
      </RightColumn>
    </GridLayout>
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
