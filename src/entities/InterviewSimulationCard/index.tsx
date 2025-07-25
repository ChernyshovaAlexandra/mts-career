import type { FC } from "react";
import styled from "styled-components";
import CardTitle from "../../shared/ui/CardTitle";
import FieldLabel from "../../shared/ui/FieldLabel";
import FieldValue from "../../shared/ui/FieldValue";
import Button from "../../shared/ui/Button";

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

const Card = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 12px;
`;

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
    <Card role="region" aria-labelledby="interview-simulation-title">
      <CardTitle id="interview-simulation-title">
        Симуляция собеседования
      </CardTitle>

      <DataRow>
        <FieldLabel>Направление</FieldLabel>
        <FieldValue>{direction}</FieldValue>
      </DataRow>

      <DataRow>
        <FieldLabel>Дата собеседования</FieldLabel>
        <FieldValue>{interviewDate}</FieldValue>
      </DataRow>

      <Button
        onClick={onChangeTime}
        aria-label="Изменить время симуляции собеседования"
      >
        ИЗМЕНИТЬ ВРЕМЯ
      </Button>
    </Card>
  );
};

export default InterviewSimulationCard;
