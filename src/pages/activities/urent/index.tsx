import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const UrentPage: FC = () => (
  <ActivityLayout
    title="Кикшеринг МТС Юрент"
    description={applyNbsp(
      `Здесь будет информация о направлении "Кикшеринг МТС Юрент"`
    )}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default UrentPage;
