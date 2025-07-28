import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const AdTechPage: FC = () => (
  <ActivityLayout
    title="Рекламные технологии AdTech"
    description={applyNbsp(
      `MTS Adtech — это команда, которая создаёт умные технологии для точной рекламы. Они анализируют поведение пользователей, собирают данные и помогают бизнесу находить своих клиентов среди миллионов людей.\nИзучи направление и проверь себя в тесте.`
    )}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default AdTechPage;
