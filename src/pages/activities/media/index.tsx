import type { FC } from "react";

import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const MediaPage: FC = () => (
  <ActivityLayout
    title="MTC Медиа"
    description={applyNbsp(`Одна кнопка — и ты в кино, на концерте или внутри истории. МТС Медиа — твой личный портал во вселенную из миллионов треков, тысяч фильмов, сериалов и аудиокниг с KION, МТС Музыкой и Строками.\nИзучи направление и пройди тест — правильные ответы приносят баллы.`)}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default MediaPage;
