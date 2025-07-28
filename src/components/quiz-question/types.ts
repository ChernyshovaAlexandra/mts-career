export interface Answer {
  id: string;
  text: string;
}

export interface QuizQuestionProps {
  question: { number: number; text: string };
  answers: Answer[];
  onAnswer?: (id: string) => void;
}
