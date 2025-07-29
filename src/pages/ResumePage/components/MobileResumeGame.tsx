import React, { type FC } from "react";
import { memo, useState } from "react";
import { 
  Header, 
  Text, 
  Button,
  mts_brand_red 
} from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

const CheckIcon: FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 16.17l-4.17-4.17-1.42 1.42L9 19 21 7l-1.42-1.42L9 16.17z" 
      fill="currentColor"
    />
  </svg>
);

const MinusIcon: FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M19 13H5v-2h14v2z" 
      fill="currentColor"
    />
  </svg>
);

const DownloadIcon: FC = () => (
  <svg  width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const MobileGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  max-width: 100%;

  @media (min-width: 1251px) {
    display: none;
  }
`;

const MobileStepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding: 0 20px;
`;

const StepsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const StepCircle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  z-index: 2;
  position: relative;
  
  ${({ $isActive, $isCompleted }) => {
    if ($isActive) {
      return `
        background: ${mts_brand_red};
        color: white;
        border: 2px solid ${mts_brand_red};
      `;
    } else if ($isCompleted) {
      return `
        background: #212529;
        color: white;
        border: 2px solid #212529;
      `;
    } else {
      return `
        background: white;
        color: #6c757d;
        border: 2px solid #dee2e6;
      `;
    }
  }}

  .success-indicator,
  .error-indicator {
    position: absolute;
    bottom: -4px;
    right: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 3;

    svg {
      width: 8px;
      height: 8px;
    }
  }

  .success-indicator {
    background: #26CD58;
    color: #ffffff;
  }

  .error-indicator {
    background: #F95721;
    color: #ffffff;
  }
`;

const StepLine = styled.div<{ $isCompleted: boolean }>`
  width: 40px;
  height: 2px;
  background: ${({ $isCompleted }) => $isCompleted ? '#212529' : '#dee2e6'};
  transition: background-color 0.3s ease;
`;

const QuestionTitle = styled(Text)`
  font-size: 18px;
  line-height: 140%;
  color: #212529;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
`;

const OptionCard = styled.button<{ $isSelected: boolean; $isRevealed: boolean; $isCorrect?: boolean }>`
  width: 100%;
  height: 180px;
  background: ${({ $isSelected, $isCorrect, $isRevealed }) => {
    if (!$isRevealed) return $isSelected ? '#f8f9fa' : '#e9ecef';
    if ($isCorrect) return '#d4edda';
    return $isSelected ? '#f8d7da' : '#e9ecef';
  }};
  border: 2px solid ${({ $isSelected, $isCorrect, $isRevealed }) => {
    if (!$isRevealed) return $isSelected ? mts_brand_red : '#dee2e6';
    if ($isCorrect) return '#28a745';
    return $isSelected ? '#dc3545' : '#dee2e6';
  }};
  border-radius: 12px;
  cursor: ${({ $isRevealed }) => $isRevealed ? 'default' : 'pointer'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;

  &:hover:not(:disabled) {
    border-color: ${mts_brand_red};
    background: #f8f9fa;
  }

  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:disabled {
    opacity: 0.8;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const PlaceholderText = styled(Text)`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
`;

const ResultBadge = styled.div<{ $isCorrect: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ $isCorrect }) => $isCorrect ? '#28a745' : '#dc3545'};
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const ActionButton = styled(Button)`
  flex: 1;
  height: 48px;
  font-weight: 600;
`;

const CongratulationsCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const CongratulationsTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 12px 0;
`;

const CongratulationsText = styled.p`
  font-size: 14px;
  line-height: 140%;
  color: #6c757d;
  margin: 0 0 20px 0;
`;

const DownloadButton = styled(Button)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    flex-shrink: 0;
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

interface MobileStepsProps {
  totalSteps: number;
  currentStep: number;
  showResults?: boolean;
  selectedAnswers?: Record<string, string>;
}

const MobileSteps: FC<MobileStepsProps> = ({ totalSteps, currentStep, showResults = false, selectedAnswers = {} }) => {
  return (
    <MobileStepsContainer>
      <StepsWrapper>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = !showResults && stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          // Показываем результаты для всех шагов только когда showResults=true (в конце игры)
          let stepResult = null;
          if (showResults && selectedAnswers) {
            const question = GAME_QUESTIONS[index];
            const selectedOptionId = selectedAnswers[question.id];
            if (selectedOptionId) {
              const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
              stepResult = selectedOption?.isCorrect;
            }
          }
          
          return (
            <React.Fragment key={stepNumber}>
              <StepCircle 
                $isActive={isActive} 
                $isCompleted={isCompleted}
                aria-label={`Шаг ${stepNumber}`}
              >
                {stepNumber}
                
                {stepResult !== null && (
                  <>
                    {stepResult && (
                      <div className="success-indicator">
                        <CheckIcon />
                      </div>
                    )}
                    {!stepResult && (
                      <div className="error-indicator">
                        <MinusIcon />
                      </div>
                    )}
                  </>
                )}
              </StepCircle>
              
              {index < totalSteps - 1 && (
                <StepLine $isCompleted={isCompleted} />
              )}
            </React.Fragment>
          );
        })}
      </StepsWrapper>
    </MobileStepsContainer>
  );
};

export const MobileResumeGame: FC = memo(() => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const currentQuestion = GAME_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === GAME_QUESTIONS.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion.id];

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isGameCompleted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // На последнем вопросе - завершаем игру и показываем результаты
      setIsGameCompleted(true);
    } else {
      // На обычном вопросе - переходим к следующему
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsGameCompleted(false);
  };

  const correctAnswers = GAME_QUESTIONS.filter(question => {
    const selectedOptionId = selectedAnswers[question.id];
    const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
    return selectedOption?.isCorrect;
  }).length;

  if (isGameCompleted) {
    return (
      <MobileGameContainer>
        <MobileSteps 
          totalSteps={GAME_QUESTIONS.length} 
          currentStep={GAME_QUESTIONS.length + 1} 
          showResults={true}
          selectedAnswers={selectedAnswers}
        />
        
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
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionButton
            variant="primary"
            onClick={handleRestart}
            aria-label="Играть ещё"
          >
            ИГРАТЬ ЕЩЁ
          </ActionButton>
        </div>
      </MobileGameContainer>
    );
  }

  return (
    <MobileGameContainer>
      <MobileSteps 
        totalSteps={GAME_QUESTIONS.length} 
        currentStep={currentQuestionIndex + 1} 
        showResults={false}
        selectedAnswers={{}}
      />

      <QuestionTitle>
        {currentQuestion.questionText}
      </QuestionTitle>

      {currentQuestion.options.map((option, optionIndex) => {
        const selectedOptionId = selectedAnswers[currentQuestion.id];
        const isSelected = selectedOptionId === option.id;

        return (
          <OptionCard
            key={option.id}
            $isSelected={isSelected}
            $isRevealed={false}
            $isCorrect={option.isCorrect}
            onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
            aria-pressed={isSelected}
            aria-label={`Вариант ${optionIndex + 1} для вопроса ${currentQuestion.questionNumber}`}
          >
            <PlaceholderText>
              Изображение резюме {optionIndex + 1}
            </PlaceholderText>
          </OptionCard>
        );
      })}

      <NavigationButtons>
        <ActionButton
          variant={hasSelectedAnswer ? "primary" : "secondary"}
          onClick={handleNext}
          disabled={!hasSelectedAnswer}
          aria-label={isLastQuestion ? "Узнать результат" : "Далее"}
        >
          {isLastQuestion ? "УЗНАТЬ РЕЗУЛЬТАТ" : "ДАЛЕЕ"}
        </ActionButton>
      </NavigationButtons>
    </MobileGameContainer>
  );
}); 