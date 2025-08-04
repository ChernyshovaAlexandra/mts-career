import { useEffect, useState } from "react";
import { Quiz } from "../../../components";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";
import { financeQuestions } from "./mocks";
import { apiService, ApiService } from "../../../services/apiService";

const FintechPage = () => {
  const [total_questions, setTotal] = useState<number>(0);
  
  useEffect(() => {
    const token = ApiService.getAccessToken();
    if (token) {
      //&& !useUserStore.getState().user

      apiService.startGame("game1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ActivityLayout
      title="ФИНТЕХ"
      bg="/images/main/1.webp"
      description={applyNbsp(
        `МТС Финтех — это часть экосистемы МТС, которая развивает финансовые цифровые сервисы: МТС Банк — банк с сильной цифровой платформой, МТС Деньги — кошелек в смартфоне: переводы, платежи, кешбэк — все под рукой, МТС Оплата — простой способ оплачивать любимые сервисы, МТС Инвестиции — инвестиции за пару кликов. Узнай, как МТС Финтех делает жизнь проще — пройди тест и получи баллы!`
      )}
    >
      <Quiz questions={financeQuestions} />
    </ActivityLayout>
  );
};

export default FintechPage;
