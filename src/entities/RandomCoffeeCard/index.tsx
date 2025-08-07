import type { FC } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";
import FieldLabel from "../../shared/ui/FieldLabel";
import FieldValue from "../../shared/ui/FieldValue";
import { Button, IconUser } from "@chernyshovaalexandra/mtsui";
import { ACCOUNTPAGE_BTN_THEME } from "../../pages/AccountPage/constants";

/**
 * @typedef {Object} RandomCoffeeCardProps
 * @property {string} employeeName - Имя сотрудника
 * @property {string} position - Должность сотрудника
 * @property {string} meetingDate - Дата и время встречи
 * @property {() => void} onChangeTime - Обработчик изменения времени встречи
 * @property {string} [employeeImage] - URL изображения сотрудника (опционально)
 * @property {string} [link] - Ссылка на встречу
 * @property {string} [status] - Статус встречи
 */
interface RandomCoffeeCardProps {
  employeeName: string;
  position: string;
  meetingDate: string;
  onChangeTime: () => void;
  employeeImage?: string;
  link?: string;
  status?: string;
}

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const EmployeeAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6f8;

  svg {
    color: #666;
  }
`;

const EmployeeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const EmployeeName = styled.span`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-family: "MTS Wide", sans-serif;
`;

const Position = styled.span`
  font-size: var(--font-size-sm);
  color: var(--text-light-secondary);
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

const StatusBadge = styled.span<{ status?: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'reserved':
        return '#10b981';
      case 'completed':
        return '#6b7280';
      default:
        return '#f59e0b';
    }
  }};
  color: white;
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
  employeeImage,
  status,
}) => {
  return (
    <Card title="Рандом-кофе с сотрудником" titleId="random-coffee-title">
      <EmployeeInfo>
        <EmployeeAvatar>
          {employeeImage ? (
            <EmployeeImage src={employeeImage} alt={`Фото ${employeeName}`} />
          ) : (
            <IconUser width={48} height={48} />
          )}
        </EmployeeAvatar>
        <EmployeeDetails>
          <EmployeeName>{employeeName}</EmployeeName>
          <Position>
            {position}
            {status && <StatusBadge status={status}>{status}</StatusBadge>}
          </Position>
        </EmployeeDetails>
      </EmployeeInfo>

      <DataRow>
        <FieldLabel>Дата встречи</FieldLabel>
        <FieldValue>{meetingDate}</FieldValue>
      </DataRow>

      <Button
        {...ACCOUNTPAGE_BTN_THEME}
        onClick={onChangeTime}
        aria-label={`Изменить время встречи с ${employeeName}`}
      >
        ИЗМЕНИТЬ ВРЕМЯ
      </Button>
    </Card>
  );
};

export default RandomCoffeeCard;
