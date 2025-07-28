import React, { type FC } from "react";
import { memo, useState } from "react";
import { 
  Header, 
  Text, 
  Button,
  mts_brand_red 
} from "@chernyshovaalexandra/mtsui";
import { Steps } from 'antd';
import styled from "styled-components";

// SVG Icons
const CheckIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 16.17l-4.17-4.17-1.42 1.42L9 19 21 7l-1.42-1.42L9 16.17z" 
      fill="currentColor"
    />
  </svg>
);

const CrossIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" 
      fill="currentColor"
    />
  </svg>
);

interface ResumeOption {
  id: string;
  isCorrect: boolean;
  explanation?: string;
}

interface GameQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: [ResumeOption, ResumeOption];
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InstructionText = styled(Text)`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 8px;
  color: #495057;
`;

const StyledSteps = styled(Steps)`
`;

const StepContent = styled.div`
  padding-bottom: 24px;
  
  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;



const OptionsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
  }
`;

const ImageCard = styled.button<{ $isSelected: boolean; $isRevealed: boolean; $isCorrect?: boolean }>`
  width: 370px;
  height: 370px;
  background: ${({ $isSelected, $isCorrect, $isRevealed }) => {
    if (!$isRevealed) return $isSelected ? '#f8f9fa' : '#e9ecef';
    if ($isCorrect) return '#d4edda';
    return $isSelected ? '#f8d7da' : '#e9ecef';
  }};
  border: 3px solid ${({ $isSelected, $isCorrect, $isRevealed }) => {
    if (!$isRevealed) return $isSelected ? mts_brand_red : 'transparent';
    if ($isCorrect) return '#28a745';
    return $isSelected ? '#dc3545' : 'transparent';
  }};
  border-radius: 16px;
  cursor: ${({ $isRevealed }) => $isRevealed ? 'default' : 'pointer'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover:not(:disabled) {
    border-color: ${mts_brand_red};
    background: #f8f9fa;
  }

  &:focus {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const PlaceholderText = styled(Text)`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
`;

const ResultBadge = styled.div<{ $isCorrect: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${({ $isCorrect }) => $isCorrect ? '#28a745' : '#dc3545'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const ScoreDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const ScoreText = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: "question1",
    questionNumber: 1,
    questionText: "Сравни два фрагмента резюме и выбери лучший.",
    options: [
      {
        id: "q1_option1",
        isCorrect: false,
        explanation: "Неправильно. Слишком общее описание без конкретных результатов"
      },
      {
        id: "q1_option2", 
        isCorrect: true,
        explanation: "Правильно! Конкретные цифры и достижения всегда лучше общих фраз"
      }
    ]
  },
  {
    id: "question2",
    questionNumber: 2,
    questionText: "Вопрос для выбора нужной карточки справа",
    options: [
      {
        id: "q2_option1",
        isCorrect: true,
        explanation: "Отлично! Это правильный выбор"
      },
      {
        id: "q2_option2",
        isCorrect: false,
        explanation: "Неправильно. Лучше выбрать другой вариант"
      }
    ]
  },
  {
    id: "question3",
    questionNumber: 3,
    questionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    options: [
      {
        id: "q3_option1",
        isCorrect: false,
        explanation: "Неправильно. Стоило выбрать более профессиональный вариант"
      },
      {
        id: "q3_option2",
        isCorrect: true,
        explanation: "Отлично! Это правильный выбор для профессионального резюме"
      }
    ]
  }
];

export const ResumeGame: FC = memo(() => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isRevealed) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = () => {
    setIsRevealed(true);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsRevealed(false);
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const correctAnswers = GAME_QUESTIONS.filter(question => {
    const selectedOptionId = selectedAnswers[question.id];
    const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
    return selectedOption?.isCorrect;
  }).length;

  // Создаем элементы для Steps
  const stepItems = GAME_QUESTIONS.map((question, index) => {
    const selectedOptionId = selectedAnswers[question.id];
    const selectedOption = selectedOptionId 
      ? question.options.find(opt => opt.id === selectedOptionId)
      : null;

    let status: 'wait' | 'process' | 'finish' | 'error' = 'wait';
    let icon: React.ReactNode = question.questionNumber;

    if (selectedOptionId && !isRevealed) {
      status = 'process';
    } else if (isRevealed && selectedOption) {
      status = selectedOption.isCorrect ? 'finish' : 'error';
      icon = selectedOption.isCorrect ? <CheckIcon /> : <CrossIcon />;
    }

    return {
      title: question.questionText,
      status,
      icon,
      description: (
        <StepContent>
          <OptionsContainer>
            {question.options.map((option, optionIndex) => (
              <ImageCard
                key={option.id}
                $isSelected={selectedOptionId === option.id}
                $isRevealed={isRevealed}
                $isCorrect={option.isCorrect}
                onClick={() => handleOptionSelect(question.id, option.id)}
                disabled={isRevealed}
                aria-pressed={selectedOptionId === option.id}
                aria-label={`Вариант ${optionIndex + 1} для вопроса ${question.questionNumber}`}
              >
                <PlaceholderText>
                  Изображение
                </PlaceholderText>
                
                {isRevealed && selectedOptionId === option.id && (
                  <ResultBadge $isCorrect={option.isCorrect}>
                    {option.isCorrect ? "Да" : "Нет"}
                  </ResultBadge>
                )}
              </ImageCard>
            ))}
          </OptionsContainer>
        </StepContent>
      )
    };
  });

  return (
    <GameContainer>
      <InstructionText>
        Выбери один из вариантов:
      </InstructionText>

      <StyledSteps
        direction="vertical"
        current={-1} // Не показываем текущий шаг, управляем статусами вручную
        items={stepItems}
      />

      {!isRevealed ? (
        <ActionButtons>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={answeredQuestions === 0}
            aria-label="Проверить ответы"
          >
            Проверить
          </Button>
          <Text style={{ margin: 0 }}>
            Отвечено: {answeredQuestions} из {GAME_QUESTIONS.length}
          </Text>
        </ActionButtons>
      ) : (
        <div>
          <ScoreDisplay>
            <ScoreText>
              Правильных ответов: {correctAnswers} из {GAME_QUESTIONS.length}
            </ScoreText>
            <ScoreText>
              Всего отвечено: {answeredQuestions}
            </ScoreText>
          </ScoreDisplay>

          <ActionButtons>
            <Button
              variant="secondary"
              onClick={handleRestart}
              aria-label="Начать заново"
            >
              Попробовать еще раз
            </Button>
          </ActionButtons>
        </div>
      )}
    </GameContainer>
  );
}); 