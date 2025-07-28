import { useState, type FC } from "react";
import { Button, Header, Text } from "@chernyshovaalexandra/mtsui";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export const Quiz: FC<QuizProps> = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (current >= questions.length) {
    return <Text variant="P4-Regular-Text">Тест завершен</Text>;
  }

  const question = questions[current];

  const handleCheck = () => {
    if (selected !== null) {
      setAnswered(true);
    }
  };

  const handleNext = () => {
    setAnswered(false);
    setSelected(null);
    setCurrent((prev) => prev + 1);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Header as="h3" variant="H3-Wide">
        {question.question}
      </Header>
      <fieldset style={{ marginTop: 16, border: 0, padding: 0 }}>
        <legend className="sr-only">{question.question}</legend>
        {question.options.map((opt, index) => (
          <label key={index} style={{ display: "block", marginBottom: 8 }}>
            <input
              type="radio"
              name={`question-${current}`}
              checked={selected === index}
              onChange={() => setSelected(index)}
            />
            {opt}
          </label>
        ))}
      </fieldset>
      {!answered ? (
        <Button
          variant="primary"
          onClick={handleCheck}
          disabled={selected === null}
          style={{ marginTop: 16 }}
        >
          Ответить
        </Button>
      ) : (
        <div style={{ marginTop: 16 }}>
          <Text variant="P4-Regular-Text" style={{ marginBottom: 16 }}>
            {selected === question.correct ? "Верно!" : "Неверно"}
          </Text>
          {current < questions.length - 1 && (
            <Button variant="primary" onClick={handleNext}>
              Следующий вопрос
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
