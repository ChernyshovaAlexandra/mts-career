import React, { type FC } from "react";
import { memo, useState } from "react";
import { GAME_QUESTIONS } from "../../constants";
import { CheckIcon, MinusIcon, DownloadIcon } from "../ResumeGame/icons";
import {
  MobileGameContainer,
  MobileStepsContainer,
  StepsWrapper,
  StepCircle,
  StepLine,
  QuestionTitle,
  OptionCard,
  PlaceholderText,
  OptionTitleContent,
  NavigationButtons,
  ActionButton,
  CongratulationsCard,
  CongratulationsTitle,
  CongratulationsText,
  DownloadButton,
  OptionContent,
  OCTitle,
  OCSubtitle,
  OCParagraph,
} from "./styles";

interface MobileStepsProps {
  totalSteps: number;
  currentStep: number;
  showResults?: boolean;
  selectedAnswers?: Record<string, string>;
}

const MobileSteps: FC<MobileStepsProps> = ({ totalSteps, currentStep, showResults = false, selectedAnswers = {} }) => {
  // На мобильных показываем только текущее и следующее значения (переход текущий→следующий)
  // В режиме результатов показываем весь путь с индикацией правильности
  const indicesToRender = (() => {
    if (showResults) {
      return Array.from({ length: totalSteps }, (_, i) => i);
    }
    const currentIndex = Math.max(0, Math.min(totalSteps - 1, currentStep - 1));
    if (currentIndex === totalSteps - 1 && totalSteps > 1) {
      // На последнем шаге показываем предпоследний → последний
      return [totalSteps - 2, totalSteps - 1];
    }
    // На остальных шагах показываем текущий → следующий
    return [currentIndex, Math.min(totalSteps - 1, currentIndex + 1)];
  })();

  return (
    <MobileStepsContainer>
      <StepsWrapper>
        {indicesToRender.map((index, localIdx) => {
          const stepNumber = index + 1;
          const isActive = !showResults && stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          let stepResult: boolean | null = null;
          if (showResults && selectedAnswers) {
            const question = GAME_QUESTIONS[index];
            const selectedOptionId = selectedAnswers[question.id];
            if (selectedOptionId) {
              const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
              stepResult = selectedOption?.isCorrect ?? null;
            }
          }

          return (
            <React.Fragment key={stepNumber}>
              <StepCircle
                $isActive={isActive}
                $isCompleted={isCompleted}
                $isResults={showResults}
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
              {localIdx < indicesToRender.length - 1 && (
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

  // Перемешиваем ответы для каждого вопроса, чтобы верная карточка могла быть слева или справа
  const shuffledOptionsByQuestion = React.useMemo(() => {
    const map: Record<string, typeof GAME_QUESTIONS[number]['options']> = {};
    GAME_QUESTIONS.forEach((q) => {
      const copy = [...q.options];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      map[q.id] = copy;
    });
    return map;
  }, []);

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

      {(shuffledOptionsByQuestion[currentQuestion.id] ?? currentQuestion.options).map((option, optionIndex) => {
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
            {currentQuestion.id === "question1" ? (
              <img
                src={option.id === 'q1_option1' ? "/images/activities/op1-q1-resume.jpg" : "/images/activities/op2-q1-resume.jpg"}
                alt={`Изображение резюме вариант ${optionIndex + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
              />
            ) : currentQuestion.id === "question2" || currentQuestion.id === "question5" ? (
              <OptionTitleContent>
                {(option as any).customContent ?? (
                  <>Вариант должности {optionIndex + 1}</>
                )}
              </OptionTitleContent>
            ) : (
              (option as any).customContent ? (
                <OptionContent>
                  {currentQuestion.id === "question6" ? (
                    ((option as any).customContent.split('\n')).map((line: string, idx: number) => (
                      <OCParagraph key={idx}>{line}</OCParagraph>
                    ))
                  ) : (
                    <>
                      <OCTitle>{(option as any).customContent.split('\n')[0]}</OCTitle>
                      <OCSubtitle>{(option as any).customContent.split('\n')[1]}</OCSubtitle>
                      {((option as any).customContent.split('\n').slice(2)).map((line: string, idx: number) => (
                        <OCParagraph key={idx}>{line}</OCParagraph>
                      ))}
                    </>
                  )}
                </OptionContent>
              ) : (
                <PlaceholderText>
                  Изображение резюме {optionIndex + 1}
                </PlaceholderText>
              )
            )}
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