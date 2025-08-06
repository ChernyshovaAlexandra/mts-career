// src/hooks/useQuiz.ts
import { useEffect, useMemo, useState } from "react";
import {
  apiService,
  type GameStartResponse,
  type GameResultPayload,
} from "../../services/apiService";
import type { Question, Stage, Step } from "./quiz.types";

export function useQuiz(gameId: string) {
  const [stage, setStage] = useState<Stage>("loading");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    (string | undefined)[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [finalData, setFinalData] = useState<GameStartResponse | null>(null);

  useEffect(() => {
    apiService
      .startGame(gameId)
      .then((resp) => {
        const data = resp.data as GameStartResponse;
        setTotalQuestions(data.total_questions);
        setAnsweredCount(data.answered_questions);

        const q: Question = {
          id: String(data.question.id),
          number: data.question.day,
          text: data.question.text,
          points: data.question.points,
          answers: data.question.answers.map((a) => ({
            id: String(a.id),
            text: a.text,
          })),
        };

        setQuestions([q]);
        setSelectedAnswers(Array(data.total_questions).fill(undefined));
      })
      .catch(() => {
        setError("Не удалось загрузить викторину");
      });
  }, [gameId]);

  const selectAnswer = (answerId: string) => {
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answerId;
      return next;
    });
  };

  const next = async () => {
    const answerId = selectedAnswers[currentIndex];
    if (!answerId) return;

    try {
      const curQ = questions[currentIndex]!;
      const payload: GameResultPayload = {
        game: gameId,
        question: curQ.id,
        answer: answerId,
        result: "1",
      };

      const resp = await apiService.sendGameResult(payload);
      const data = resp.data as GameStartResponse;

      setAnsweredCount(data.answered_questions);
      setStage(
        data.answered_questions >= data.total_questions
          ? "finished"
          : "feedback"
      );

      if (data.answered_questions >= data.total_questions) {
        setFinalData(data);

        return;
      }

      const nextQ: Question = {
        id: String(data.question.id),
        number: data.question.day,
        text: data.question.text,
        points: data.question.points,
        answers: data.question.answers.map((a) => ({
          id: String(a.id),
          text: a.text,
        })),
      };
      setQuestions((prev) => [...prev, nextQ]);
      setCurrentIndex((i) => i + 1);
    } catch {
      setError("Ошибка при отправке ответа");
    }
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const steps: Step[] = useMemo(() => {
    return Array.from({ length: totalQuestions }, (_, idx) => {
      const stepNumber = idx + 1;
      let status: Step["status"];
      if (idx < answeredCount) status = "not_available";
      else if (idx === answeredCount )
        status = stage === "in_progress" ? "active" : "not_available";
      else status = "not_available";
      return { index: stepNumber, status };
    });
  }, [totalQuestions, answeredCount, stage]);

  return {
    stage,
    error,
    steps,
    setStage,
    currentQuestion: questions[currentIndex],
    selectedAnswerId: selectedAnswers[currentIndex],
    isFirst: currentIndex === 0,
    isLast: answeredCount === totalQuestions - 1,
    finalData,
    actions: { selectAnswer, next, prev },
  };
}
