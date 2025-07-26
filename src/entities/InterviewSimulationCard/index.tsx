import type { FC } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";
import FieldLabel from "../../shared/ui/FieldLabel";
import FieldValue from "../../shared/ui/FieldValue";
import { Button } from "@chernyshovaalexandra/mtsui";
import { ACCOUNTPAGE_BTN_THEME } from "../../pages/AccountPage/constants";

/**
 * @typedef {Object} InterviewSimulationCardProps
 * @property {string} direction - Направление собеседования
 * @property {string} interviewDate - Дата и время собеседования
 * @property {() => void} onChangeTime - Обработчик изменения времени собеседования
 */
interface InterviewSimulationCardProps {
  direction: string;
  interviewDate: string;
  onChangeTime: () => void;
}

const DataRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Карточка симуляции собеседования
 *
 * Отображает информацию о запланированной симуляции собеседования
 * включая направление, дату и время, а также возможность
 * изменения времени собеседования.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки симуляции собеседования
 */
const InterviewSimulationCard: FC<InterviewSimulationCardProps> = ({
  direction,
  interviewDate,
  onChangeTime,
}) => {
  return (
    <Card title="Симуляция собеседования" titleId="interview-simulation-title">
      <DataRow>
        <FieldLabel>Направление</FieldLabel>
        <FieldValue>{direction}</FieldValue>
      </DataRow>

      <DataRow>
        <FieldLabel>Дата собеседования</FieldLabel>
        <FieldValue>{interviewDate}</FieldValue>
      </DataRow>

      <Button
        {...ACCOUNTPAGE_BTN_THEME}
        onClick={onChangeTime}
        aria-label="Изменить время симуляции собеседования"
      >
        ИЗМЕНИТЬ ВРЕМЯ
      </Button>
    </Card>
  );
};

export default InterviewSimulationCard;
