export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  number: number;
  id: string;
  points: number;
  text: string;
  answers: Answer[];
}

export type StepStatus =
  | "answered_true"
  | "answered_false"
  | "active"
  | "not_available";

export interface Step {
  index: number;
  status: StepStatus;
}
export type Stage = "loading" | "in_progress" | "feedback" | "finished";
export interface QuizContext {
  questions: Question[];
  currentIndex: number;
  selectedAnswerId?: string;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  prev: () => void;
  selectAnswer: (id: string) => void;
}
export interface QuizQuestionProps {
  stage: Stage;
  question: { number: number; text: string };
  answers: Answer[];
  steps: Step[];
  selectedAnswerId?: string;
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (id: string) => void;
  setStage: (d: Stage) => void;
}
