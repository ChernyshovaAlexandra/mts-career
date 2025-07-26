import type { FC } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";
import StarIcon from "../../shared/icons/StarIcon";
import ChevronRight from "../../shared/icons/ChevronRight";
import { Header, Link } from "@chernyshovaalexandra/mtsui";

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

const SectionTitleStyle = {
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-medium)",
  lineHeight: "var(--line-height-tight)",
  color: "var(--text-primary)",
  marginBottom: "12px",
};

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

const ActivityProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  min-width: 80px;
`;

const ProgressText = styled.span`
  font-family: "MTS Wide", sans-serif;
  font-weight: var(--font-weight-medium);
  font-style: normal;
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-none);
  text-align: right;
  color: var(--text-primary);
`;

const StatusText = styled.span`
  font-family: "MTS Compact", sans-serif;
  font-weight: var(--font-weight-normal);
  font-style: normal;
  font-size: var(--font-size-sm);
  line-height: 20px;
  letter-spacing: var(--letter-spacing-none);
  text-align: right;
  color: var(--text-light-secondary);
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
  const renderActivityItem = (item: ActivityItem, index: number) => {
    const isProgress = item.progress.includes("из");
    const TextComponent = isProgress ? ProgressText : StatusText;

    return (
      <ActivityItem key={`${item.name}-${index}`}>
        <Link
          style={{
            display: "flex",
            alignItems: "end",
            fontSize: "var(--font-size-lg)",
          }}
          onClick={() => onActivityClick(item.name)}
          aria-label={`Перейти к активности: ${item.name}. Прогресс: ${item.progress}`}
        >
          {item.name}
          <ChevronRight size={16} />
        </Link>
        <ActivityProgress aria-live="polite" aria-atomic="true">
          <TextComponent>{item.progress}</TextComponent>
          {item.completed && <StarIcon size={20} aria-label="Завершено" />}
        </ActivityProgress>
      </ActivityItem>
    );
  };

  return (
    <Card title="Шкала активностей" titleId="activity-scale-title">
      <Section>
        <Header
          variant="H3-Wide"
          id="general-skills-title"
          style={SectionTitleStyle}
        >
          ОБЩИЕ НАВЫКИ
        </Header>
        <ActivityList role="list">
          {generalSkills.map((skill, index) =>
            renderActivityItem(skill, index)
          )}
        </ActivityList>
      </Section>

      <SectionSeparator />

      <Section>
        <Header
          variant="H3-Wide"
          id="activities-title"
          style={SectionTitleStyle}
        >
          АКТИВНОСТИ
        </Header>
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
