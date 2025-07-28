export interface Answer {
  id: string;
  text: string;
}

export interface QuizQuestionProps {
  question: string;
  answers: Answer[];
  onAnswer?: (id: string) => void;
}
