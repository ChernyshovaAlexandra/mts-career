import React, { type FC } from "react";
import { memo, useState } from "react";
import { apiService } from "../../../../services/apiService";
import { GAME_QUESTIONS } from "../../constants";
import { CheckIcon, MinusIcon, DownloadIcon } from "./icons";
import {
  GameContainer,
  StyledSteps,
  StepContent,
  QuestionText,
  Explanation,
  OptionsContainer,
  ImageCard,
  OptionTitleContent,
  OptionContent,
  OCTitle,
  OCSubtitle,
  OCParagraph,
  PlaceholderText,
  ActionButtons,
  CongratulationsCard,
  CongratulationsTitle,
  CongratulationsText,
  DownloadButton,
  ActionButton,
} from "./styles";

export const ResumeGame: FC = memo(() => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isRevealed, setIsRevealed] = useState(false);
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isRevealed) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    setIsRevealed(true);
    try {
      setSending(true);
      await apiService.startGame("komiks");
      const points = correctAnswers * 10;
      const resp = await apiService.sendGameResult({ game: "komiks", result: "1", points });
      const data: any = resp.data as any;
      const games: Array<{ name: string; status: string; points?: number }>|undefined = data?.user?.games ?? (data?.user?.game ? [data.user.game] : undefined);
      const game = games?.find((g) => g.name === "komiks");
      if (game?.status === "win") {
        setSuccessMessage(`Вы получили ${points} баллов!`);
      }
    } catch (e) {
      console.error("Не удалось отправить результат игры komiks", e);
    } finally {
      setSending(false);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsRevealed(false);
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const totalQuestions = GAME_QUESTIONS.length;
  const allAnswered = answeredQuestions === totalQuestions;
  const correctAnswers = GAME_QUESTIONS.filter((question) => {
    const selectedOptionId = selectedAnswers[question.id];
    const selectedOption = question.options.find(
      (opt) => opt.id === selectedOptionId
    );
    return selectedOption?.isCorrect;
  }).length;

  const stepItems = GAME_QUESTIONS.map((question) => {
    const selectedOptionId = selectedAnswers[question.id];
    const selectedOption = selectedOptionId
      ? question.options.find((opt) => opt.id === selectedOptionId)
      : null;

    let status: "wait" | "process" | "finish" | "error" = "wait";
    let icon: React.ReactNode = question.questionNumber;

    if (selectedOptionId && !isRevealed) {
      status = "process";
    } else if (isRevealed && selectedOption) {
      status = selectedOption.isCorrect ? "finish" : "error";

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
      title: "",
      status,
      icon,
      description: (
        <StepContent>
          <div>
            <QuestionText>{question.questionText}</QuestionText>
            {isRevealed && question.explanationDetails?.length ? (
              <Explanation aria-live="polite">
                {question.explanationDetails.map((it, idx) => (
                  <div key={idx} className={it.type === 'heading' ? 'ex-heading' : 'ex-p'}>
                    {it.text}
                  </div>
                ))}
              </Explanation>
            ) : null}
          </div>
          <OptionsContainer>
            {question.options.map((option, optionIndex) => (
              <ImageCard
                key={option.id}
                $isSelected={selectedOptionId === option.id}
                $isRevealed={isRevealed}
                $isCorrect={option.isCorrect}
                $customHeight={question.id === 'question2' ? 130 : undefined}
                onClick={() => handleOptionSelect(question.id, option.id)}
                disabled={isRevealed}
                aria-pressed={selectedOptionId === option.id}
                aria-label={`Вариант ${optionIndex + 1} для вопроса ${
                  question.questionNumber
                }`}
              >
                {question.id === "question1" ? (
                  <img
                    src={optionIndex === 0 ? "/images/activities/op1-q1-resume.jpg" : "/images/activities/op2-q1-resume.jpg"}
                    alt={`Изображение резюме вариант ${optionIndex + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
                  />
                ) : question.id === "question2" || question.id === "question5" ? (
                  <OptionTitleContent $fontSizePx={17} $paddingTB={question.id === 'question2' ? 16 : undefined}>
                    {/* Контент будет передаваться из данных вопроса как JSX */}
                    {((option as any).customContent) ?? (
                      <>Вариант должности {optionIndex + 1}</>
                    )}
                  </OptionTitleContent>
                ) : (
                  (option as any).customContent ? (
                    <OptionContent>
                      {question.id === "question6" ? (
                        // Для 6 вопроса убираем заголовки и показываем все строки одинаково
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
                    <PlaceholderText>Изображение</PlaceholderText>
                  )
                )}

                {/* Убрали текстовые бейджи Да/Нет; цвет границы показывает результат */}
              </ImageCard>
            ))}
          </OptionsContainer>
        </StepContent>
      ),
    };
  });

  return (
    <GameContainer>
      <StyledSteps direction="vertical" current={-1} items={stepItems} />

      <ActionButtons>
        {!isRevealed ? (
          <ActionButton
            variant="primary"
            onClick={handleSubmit}
            disabled={!allAnswered || sending}
            aria-disabled={!allAnswered || sending}
            title={!allAnswered ? "Ответьте на все вопросы, чтобы узнать результат" : undefined}
            aria-label="Узнать результат"
          >
            {sending ? "ОТПРАВЛЯЕМ…" : "УЗНАТЬ РЕЗУЛЬТАТ"}
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

      {successMessage && (
        <div role="status" aria-live="polite" style={{ textAlign: "center" }}>{successMessage}</div>
      )}

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
              console.log("Скачивание резюме...");
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
