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

const CheckIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 16.17l-4.17-4.17-1.42 1.42L9 19 21 7l-1.42-1.42L9 16.17z" 
      fill="currentColor"
    />
  </svg>
);

const MinusIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M19 13H5v-2h14v2z" 
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon: FC = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.99979 0.5C8.37847 0.5 7.87479 1.00368 7.87479 1.625V11.9667C7.75497 11.8159 7.62388 11.6498 7.47934 11.4665C7.02921 10.8957 6.65644 10.4219 6.34873 10.0187C6.1054 9.69983 5.72922 9.50753 5.32813 9.50753C4.39699 9.50753 3.85651 10.4507 4.41663 11.1945C4.77998 11.677 5.2125 12.2255 5.71242 12.8595C6.92588 14.3985 7.53273 15.168 8.28972 15.3946C8.75738 15.5346 9.25578 15.5346 9.72344 15.3946C10.4804 15.168 11.0872 14.3986 12.3006 12.8597C12.8006 12.2256 13.2332 11.6771 13.5965 11.1945C14.1567 10.4507 13.6162 9.50753 12.685 9.50753C12.2839 9.50753 11.9078 9.69983 11.6644 10.0187C11.3567 10.4219 10.984 10.8957 10.5338 11.4665C10.3838 11.6568 10.2483 11.8284 10.1248 11.9837V1.625C10.1248 1.00368 9.62111 0.5 8.99979 0.5Z" fill="currentColor"/>
    <path d="M1.125 17.7502C0.50368 17.7502 0 18.2539 0 18.8752C0 19.4965 0.50368 20.0002 1.125 20.0002H16.875C17.4963 20.0002 18 19.4965 18 18.8752C18 18.2539 17.4963 17.7502 16.875 17.7502H1.125Z" fill="currentColor"/>
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

  @media (max-width: 768px) {
    gap: 20px;
    padding: 0 16px;
  }
`;

const InstructionText = styled(Text)`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
  color: #495057;
`;

const StyledSteps = styled(Steps)`
  --accent-dark-positive-inverted: #26CD58;
  --accent-dark-negative-inverted: #F95721;
  --background-light-stroke: #BCC3D080;

  .ant-steps-item {
    padding-bottom: 32px;
    
    &:last-child {
      padding-bottom: 0;
    }
  }

  .ant-steps-item-icon {
    background: #ffffff !important;
    border: 1px solid #e0e6ed;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    width: 34px;
    height: 48px;
    border-radius: 32px;
    margin-inline-end: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    @media (max-width: 768px) {
      width: 32px;
      height: 44px;
      font-size: 18px;
      margin-inline-end: 12px;
    }
    
    .ant-steps-icon {
      font-size: 24px;
      font-weight: 500;
      line-height: 120%;
    }

    // Композитная иконка с номером и индикатором
    .step-icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      
      .step-number {
        font-size: 24px;
        font-weight: 500;
        line-height: 120%;
        color: var(--text-primary);
      }

      .success-indicator,
      .error-indicator {
        position: absolute;
        bottom: -6px;
        right: -12px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 2;

        svg {
          width: 12px;
          height: 12px;
        }

        @media (max-width: 768px) {
          width: 18px;
          height: 18px;
          bottom: -5px;
          right: -10px;

          svg {
            width: 10px;
            height: 10px;
          }
        }
      }

      .success-indicator {
        background: var(--accent-dark-positive-inverted);
        color: #ffffff;
      }

      .error-indicator {
        background: var(--accent-dark-negative-inverted);
        color: #ffffff;
      }
    }
  }

  // Основной кружок остается белым для всех состояний
  // так как статус показывается через маленький индикатор
  .ant-steps-item-process .ant-steps-item-icon,
  .ant-steps-item-finish .ant-steps-item-icon,
  .ant-steps-item-error .ant-steps-item-icon {
    background: #ffffff !important;
    border: 1px solid #e0e6ed !important;
  }

  .ant-steps-item-content {
    min-height: auto;
  }

  .ant-steps-item-icon >.ant-steps-icon {
    color: var(--text-primary) !important;
    transform: scale(0.8);
  }

  .ant-steps-item-title {
    font-size: 16px;
    line-height: 140%;
    color: #212529;
    font-weight: 400;
    padding-right: 0;
    
    &::after {
      display: none;
    }
  }

  .ant-steps-item-description {
    color: #6c757d;
    font-size: 14px;
    margin-top: 4px;
  }

  .ant-steps-item-tail {
    padding: 8px 0 8px 24px;
    
    &::after {
      background-color: var(--background-light-stroke) !important;
      width: 2px;
      left: 24px;
    }
  }

  // Переопределяем цвет линий для всех состояний
  .ant-steps-item-wait .ant-steps-item-tail::after,
  .ant-steps-item-process .ant-steps-item-tail::after,
  .ant-steps-item-finish .ant-steps-item-tail::after,
  .ant-steps-item-error .ant-steps-item-tail::after {
    background-color: var(--background-light-stroke) !important;
  }
`;

const StepContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    align-items: start;
  }
`;

const QuestionText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 140%;
  color: #212529;
  font-weight: 400;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
    flex-direction: column;
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
  margin-top: 24px;
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
  justify-content: center;
`;

const CongratulationsCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 24px;
    margin-left: 16px;
    margin-right: 16px;
    max-width: none;
  }
`;

const CongratulationsTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CongratulationsText = styled.p`
  font-size: 16px;
  line-height: 140%;
  color: #6c757d;
  margin: 0 0 24px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 20px 0;
  }
`;

const DownloadButton = styled(Button)`
  margin: 0 auto;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

const ActionButton = styled(Button)`
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
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

      icon = (
        <div className="step-icon-wrapper">
          <span className="step-number">{question.questionNumber}</span>
          {selectedOption.isCorrect && (
            <div className="success-indicator">
              <CheckIcon />
            </div>
          )}
          {!selectedOption.isCorrect && (
            <div className="error-indicator">
              <MinusIcon />
            </div>
          )}
        </div>
      );
    }

    return {
      title: '',
      status,
      icon,
      description: (
        <StepContent>
          <QuestionText>
            {question.questionText}
          </QuestionText>
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
        current={-1}
        items={stepItems}
            />

      <ActionButtons>
        {!isRevealed ? (
          <ActionButton
            variant="primary"
            onClick={handleSubmit}
            disabled={answeredQuestions === 0}
            aria-label="Узнать результат"
          >
            УЗНАТЬ РЕЗУЛЬТАТ
          </ActionButton>
        ) : (
          <ActionButton
            variant="primary"
            onClick={handleRestart}
            aria-label="Играть ещё"
          >
            ИГРАТЬ ЕЩЁ
          </ActionButton>
        )}
      </ActionButtons>

      {isRevealed && (
        <CongratulationsCard>
          <CongratulationsTitle>Молодец!</CongratulationsTitle>
          <CongratulationsText>
            Ты заработал {correctAnswers * 10} баллов.
            <br />
            Забирай пример идеального, по нашему мнению, резюме.
          </CongratulationsText>
          <DownloadButton
            variant="primary"
            onClick={() => {
              console.log('Скачивание резюме...');
            }}
            aria-label="Скачать резюме"
          >
            <DownloadIcon />
            СКАЧАТЬ РЕЗЮМЕ
          </DownloadButton>
        </CongratulationsCard>
      )}
    </GameContainer>
  );
}); 