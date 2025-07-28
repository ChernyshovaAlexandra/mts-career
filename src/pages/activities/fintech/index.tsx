import { QuizQuestion } from "../../../components";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const FintechPage = () => (
  <ActivityLayout
    title="ФИНТЕХ"
    description={applyNbsp(
      "Знаешь, что чаевые в кафе можно оставить прямо с баланса телефона? А банковскую карту — оформить в пару кликов в Telegram? Изучи, как МТС делает финансы проще и удобнее и пройди короткий тест с выбором ответов. За каждый правильный — получай баллы!"
    )}
  >
    <QuizQuestion
      question={{
        number: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      }}
      answers={[
        {
          id: "1",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\nincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: "2",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          id: "3",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        },
        {
          id: "4",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
      ]}
    />
  </ActivityLayout>
);

export default FintechPage;
