import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";
import { financeQuestions } from "../fintech/mocks";
import { Quiz } from "../../../components";

const UrentPage: FC = () => (
  <ActivityLayout
    title="Кикшеринг МТС Юрент"
    description={applyNbsp(
      `Самокаты и велосипеды Юрент легко брать напрокат прямо с телефона — для поездок по делам или просто ради удовольствия. Это часть МТС, которая делает передвижение по городу быстрее и легче.\nРазберись, как всё устроено, и заработай баллы в тесте!`
    )}
  >
    <Quiz questions={financeQuestions} />
  </ActivityLayout>
);

export default UrentPage;
