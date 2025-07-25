import type { FC } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";

/**
 * @typedef {Object} ActivityItem
 * @property {string} name - Название активности
 * @property {string} progress - Прогресс выполнения (например, "XX из XX" или "Не начато")
 * @property {boolean} [completed] - Завершена ли активность
 */
interface ActivityItem {
  name: string;
  progress: string;
  completed?: boolean;
}

/**
 * @typedef {Object} ActivityScaleCardProps
 * @property {ActivityItem[]} generalSkills - Список общих навыков
 * @property {ActivityItem[]} activities - Список активностей
 * @property {(activityName: string) => void} onActivityClick - Обработчик клика по активности
 */
interface ActivityScaleCardProps {
  generalSkills: ActivityItem[];
  activities: ActivityItem[];
  onActivityClick: (activityName: string) => void;
}

const Section = styled.section``;

const SectionSeparator = styled.div`
  height: 1px;
  background-color: rgba(188, 195, 208, 0.5);
  margin: 12px 0 24px 0;
`;

const SectionTitle = styled.h3`
  font-family: "MTS Text", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0px;
  text-transform: uppercase;
  margin: 0 0 12px 0;
  color: #1a1a1a;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(188, 195, 208, 0.5);
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #0070e5;
  font-family: "MTS Text", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 17px;
  line-height: 140%;
  letter-spacing: 0px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  flex: 1;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }
`;

const ArrowIcon = styled.span`
  font-size: 17px;
  color: #0070e5;
`;

const ActivityProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  font-family: "MTS Wide", sans-serif;
`;

const ProgressText = styled.span`
  font-size: 14px;
  color: #666;
  font-family: "MTS Wide", sans-serif;
`;

const StarIcon = styled.span`
  color: #1a1a1a;
  font-size: 16px;
`;

/**
 * Карточка шкалы активностей
 *
 * Отображает список общих навыков и активностей с прогрессом
 * выполнения. Каждая активность может быть кликнута для
 * перехода к детальной информации.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки шкалы активностей
 */
const ActivityScaleCard: FC<ActivityScaleCardProps> = ({
  generalSkills,
  activities,
  onActivityClick,
}) => {
  const renderActivityItem = (item: ActivityItem, index: number) => (
    <ActivityItem key={`${item.name}-${index}`}>
      <ActivityLink
        onClick={() => onActivityClick(item.name)}
        aria-label={`Перейти к активности: ${item.name}`}
      >
        {item.name}
        <ArrowIcon>→</ArrowIcon>
      </ActivityLink>
      <ActivityProgress>
        <ProgressText>{item.progress}</ProgressText>
        {item.completed && <StarIcon>★</StarIcon>}
      </ActivityProgress>
    </ActivityItem>
  );

  return (
    <Card title="Шкала активностей" titleId="activity-scale-title">
      <Section>
        <SectionTitle>ОБЩИЕ НАВЫКИ</SectionTitle>
        <ActivityList role="list">
          {generalSkills.map((skill, index) =>
            renderActivityItem(skill, index)
          )}
        </ActivityList>
      </Section>

      <SectionSeparator />

      <Section>
        <SectionTitle>АКТИВНОСТИ</SectionTitle>
        <ActivityList role="list">
          {activities.map((activity, index) =>
            renderActivityItem(activity, index)
          )}
        </ActivityList>
      </Section>
    </Card>
  );
};

export default ActivityScaleCard;
