import type { FC } from "react";
import styled from "styled-components";
import CardTitle from "../../shared/ui/CardTitle";
import FieldLabel from "../../shared/ui/FieldLabel";
import FieldValue from "../../shared/ui/FieldValue";
import Button from "../../shared/ui/Button";

/**
 * @typedef {Object} RandomCoffeeCardProps
 * @property {string} employeeName - Имя сотрудника
 * @property {string} position - Должность сотрудника
 * @property {string} meetingDate - Дата и время встречи
 * @property {() => void} onChangeTime - Обработчик изменения времени встречи
 */
interface RandomCoffeeCardProps {
  employeeName: string;
  position: string;
  meetingDate: string;
  onChangeTime: () => void;
}

const Card = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 12px;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const EmployeeName = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #1a1a1a;
  font-family: "MTS Wide", sans-serif;
`;

const Position = styled.span`
  font-size: 14px;
  color: #666;
  font-family: "MTS Wide", sans-serif;
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
 * Карточка рандом-кофе с сотрудником
 *
 * Отображает информацию о запланированной встрече с сотрудником
 * включая имя, должность, дату и время встречи, а также
 * возможность изменения времени встречи.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки рандом-кофе
 */
const RandomCoffeeCard: FC<RandomCoffeeCardProps> = ({
  employeeName,
  position,
  meetingDate,
  onChangeTime,
}) => {
  return (
    <Card role="region" aria-labelledby="random-coffee-title">
      <CardTitle id="random-coffee-title">Рандом-кофе с сотрудником</CardTitle>

      <EmployeeInfo>
        <EmployeeName>{employeeName}</EmployeeName>
        <Position>{position}</Position>
      </EmployeeInfo>

      <DataRow>
        <FieldLabel>Дата собеседования</FieldLabel>
        <FieldValue>{meetingDate}</FieldValue>
      </DataRow>

      <Button
        onClick={onChangeTime}
        aria-label="Изменить время встречи с сотрудником"
      >
        ИЗМЕНИТЬ ВРЕМЯ
      </Button>
    </Card>
  );
};

export default RandomCoffeeCard;
