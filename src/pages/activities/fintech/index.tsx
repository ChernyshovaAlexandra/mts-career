import { Quiz } from "../../../components";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const FintechPage = () => (
  <ActivityLayout
    title="ФИНТЕХ"
    description={applyNbsp(
      "Знаешь, что чаевые в кафе можно оставить прямо с баланса телефона? А банковскую карту — оформить в пару кликов в Telegram? Изучи, как МТС делает финансы проще и удобнее и пройди короткий тест с выбором ответов. За каждый правильный — получай баллы!"
    )}
  >
    <Quiz />
  </ActivityLayout>
);

export default FintechPage;
