import type { FC } from "react";
import styled from "styled-components";
import Card from "../../shared/ui/Card";
import FieldLabel from "../../shared/ui/FieldLabel";
import FieldValue from "../../shared/ui/FieldValue";

/**
 * @typedef {Object} PersonalDataCardProps
 * @property {string} firstName - Имя пользователя
 * @property {string} lastName - Фамилия пользователя
 * @property {string} personalCode - Персональный код пользователя
 * @property {string} city - Город пользователя
 * @property {string} status - Статус пользователя (например, "Новичок")
 */
interface PersonalDataCardProps {
  firstName: string;
  lastName: string;
  personalCode: string;
  city: string;
  status: string;
}

const DataRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: #1a1a1a;
  font-family: "MTS Wide", sans-serif;
`;

const StatusBadge = styled.span`
  background-color: var(--accent-positive);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  display: inline-block;
  width: fit-content;
`;

/**
 * Карточка персональных данных пользователя
 *
 * Отображает основную информацию о пользователе включая имя, фамилию,
 * персональный код, город и статус.
 * Полностью адаптирована для доступности с правильными связями label-value.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки персональных данных
 */
const PersonalDataCard: FC<PersonalDataCardProps> = ({
  firstName,
  lastName,
  personalCode,
  city,
  status,
}) => {
  return (
    <Card title="Персональные данные" titleId="personal-data-title">
      <DataRow>
        <FieldLabel id="name-label">Имя и фамилия</FieldLabel>
        <NameContainer>
          <Name id="name-value" aria-labelledby="name-label">
            {firstName + " " + lastName}
          </Name>
          <StatusBadge aria-label={`Статус: ${status}`}>{status}</StatusBadge>
        </NameContainer>
      </DataRow>

      <DataRow>
        <FieldLabel id="code-label">Персональный код</FieldLabel>
        <FieldValue id="code-value" aria-labelledby="code-label">
          {personalCode}
        </FieldValue>
      </DataRow>

      <DataRow>
        <FieldLabel id="city-label">Город</FieldLabel>
        <FieldValue id="city-value" aria-labelledby="city-label">
          {city}
        </FieldValue>
      </DataRow>
    </Card>
  );
};

export default PersonalDataCard;
