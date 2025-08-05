import { Quiz } from "../../../components";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const FintechPage = () => {
  const gameId = "game1";

  return (
    <ActivityLayout
      title="ФИНТЕХ"
      bg="/images/main/1.webp"
      description={applyNbsp(
        `МТС Финтех — это часть экосистемы МТС, которая развивает финансовые цифровые сервисы: МТС Банк — банк с сильной цифровой платформой, МТС Деньги — кошелек в смартфоне: переводы, платежи, кешбэк — все под рукой, МТС Оплата — простой способ оплачивать любимые сервисы, МТС Инвестиции — инвестиции за пару кликов. Узнай, как МТС Финтех делает жизнь проще — пройди тест и получи баллы!`
      )}
    >
      <Quiz gameId={gameId} />
    </ActivityLayout>
  );
};

export default FintechPage;
