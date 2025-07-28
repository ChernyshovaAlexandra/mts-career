import { Quiz } from "../../../components";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";
import { financeQuestions } from "./mocks";

const FintechPage = () => (
  <ActivityLayout
    title="ФИНТЕХ"
    description={applyNbsp(
      `Финтех МТС — это умный кошелёк в твоём телефоне. МТС Деньги помогают копить и брать взаймы, МТС Оплата — быстро рассчитаться за услуги, а МТС Банк — управлять твоими финансами.\nУзнай, как сервисы упрощают жизнь, и пройди тест, чтобы заработать баллы!`
    )}
  >
    <Quiz questions={financeQuestions} />
  </ActivityLayout>
);

export default FintechPage;
