import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const TelecomPage: FC = () => (
  <ActivityLayout
    title="Телеком"
    description={applyNbsp(`Здесь будет информация о направлении "Телеком"`)}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default TelecomPage;
