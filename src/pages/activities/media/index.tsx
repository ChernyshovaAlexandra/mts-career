import type { FC } from "react";

import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const MediaPage: FC = () => (
  <ActivityLayout
    title="MTC Медиа"
    description={applyNbsp(`Здесь будет информация о направлении "MTC Медиа"`)}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default MediaPage;
