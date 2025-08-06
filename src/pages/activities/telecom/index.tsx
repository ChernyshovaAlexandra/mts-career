import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";
import { Quiz } from "../../../components";

const TelecomPage: FC = () => (
  <ActivityLayout
    title="Телеком"
    description={applyNbsp(`Телеком МТС создаёт сеть из невидимых нитей и мостов. Они связывают миллионы людей и устройств по всей стране. Мобильные звонки, интернет и технологии для умных гаджетов делают жизнь проще и быстрее.\nПогрузись в мир телеком-решений и проверь знания в тесте!`)}
  >
    <Quiz gameId={"game3"} />
  </ActivityLayout>
);

export default TelecomPage;
