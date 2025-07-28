import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const WebServicesPage: FC = () => (
  <ActivityLayout
    title="IT-направление MTS Web Services"
    description={applyNbsp(
      `MTS WEB Services создаёт умные IT-решения: защищает сайты от кибератак, хранит данные в облаке, помогает запускать приложения и использовать искусственный интеллект.\nИсследуй сервисы и проверь свои знания в тесте. За правильные ответы получай баллы.`
    )}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default WebServicesPage;
