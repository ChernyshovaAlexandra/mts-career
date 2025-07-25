import type { FC } from "react";
import styled from "styled-components";
import CardTitle from "../../shared/ui/CardTitle";
import Button from "../../shared/ui/Button";

/**
 * @typedef {Object} FeedbackCardProps
 * @property {string} description - Описание опроса
 * @property {() => void} onTakeSurvey - Обработчик клика по кнопке прохождения опроса
 */
interface FeedbackCardProps {
  description: string;
  onTakeSurvey: () => void;
}

const Card = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.4;
  font-family: "MTS Wide", sans-serif;
`;

/**
 * Карточка обратной связи
 *
 * Отображает информацию об опросе и кнопку для его прохождения.
 * Позволяет пользователям оставлять обратную связь и получать баллы.
 *
 * @param props - Свойства компонента
 * @returns JSX элемент карточки обратной связи
 */
const FeedbackCard: FC<FeedbackCardProps> = ({ description, onTakeSurvey }) => {
  return (
    <Card role="region" aria-labelledby="feedback-title">
      <CardTitle id="feedback-title">Обратная связь</CardTitle>

      <Description>{description}</Description>

      <Button
        onClick={onTakeSurvey}
        aria-label="Пройти опрос для получения баллов"
      >
        ПРОЙТИ ОПРОС
      </Button>
    </Card>
  );
};

export default FeedbackCard;
