import type { FC } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";
import FieldLabel from "../../shared/ui/FieldLabel";
import FieldValue from "../../shared/ui/FieldValue";
import { Button } from "@chernyshovaalexandra/mtsui";
import { ACCOUNTPAGE_BTN_THEME } from "../../pages/AccountPage/constants";

/**
 * @typedef {Object} TablePositionCardProps
 * @property {number} position - Позиция в таблице рейтинга
 * @property {number} points - Количество баллов
 * @property {() => void} onViewRating - Обработчик клика по кнопке просмотра рейтинга
 */
interface TablePositionCardProps {
  position: number;
  points: number;
  onViewRating: () => void;
}

const DataRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Position = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-family: "MTS Wide", sans-serif;
`;

/**
 * Карточка места в таблице рейтинга
 *
 * Отображает текущую позицию пользователя в рейтинге,
 * количество баллов и кнопку для просмотра полного рейтинга.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки места в таблице
 */
const TablePositionCard: FC<TablePositionCardProps> = ({
  position,
  points,
  onViewRating,
}) => {
  return (
    <Card title="Место в таблице рейтинга" titleId="table-position-title">
      <DataRow>
        <FieldLabel>Место в таблице</FieldLabel>
        <Position aria-label={`Позиция в рейтинге: ${position}`}>
          {position}
        </Position>
      </DataRow>

      <DataRow>
        <FieldLabel>Баллы</FieldLabel>
        <FieldValue aria-label={`Количество баллов: ${points}`}>
          {points}
        </FieldValue>
      </DataRow>

      <Button
        {...ACCOUNTPAGE_BTN_THEME}
        onClick={onViewRating}
        aria-label="Открыть рейтинг участников"
      >
        РЕЙТИНГ УЧАСТНИКОВ
      </Button>
    </Card>
  );
};

export default TablePositionCard;
