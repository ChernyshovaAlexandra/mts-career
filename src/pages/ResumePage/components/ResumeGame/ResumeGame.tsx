import React, { type FC } from "react";
import { memo, useState } from "react";
import { GAME_QUESTIONS } from "../../constants";
import { CheckIcon, MinusIcon, DownloadIcon } from "./icons";
import {
  GameContainer,
  InstructionText,
  StyledSteps,
  StepContent,
  QuestionText,
  OptionsContainer,
  ImageCard,
  PlaceholderText,
  ResultBadge,
  ActionButtons,
  CongratulationsCard,
  CongratulationsTitle,
  CongratulationsText,
  DownloadButton,
  ActionButton
} from "./styles";

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