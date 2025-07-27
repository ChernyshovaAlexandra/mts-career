import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const AdTechPage: FC = () => (
  <ActivityLayout
    title="Рекламные технологии AdTech"
    description={applyNbsp(
      "Здесь будет информация о направлении Рекламные технологии AdTech"
    )}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default AdTechPage;
