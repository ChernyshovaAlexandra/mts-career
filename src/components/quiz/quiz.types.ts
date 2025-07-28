export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  number: number;
  text: string;
  answers: Answer[];
  correctAnswerId: string;
}

export type StepStatus =
  | 'answered_true'
  | 'answered_false'
  | 'active'
  | 'not_available';

export interface Step {
  index: number;
  status: StepStatus;
}

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
