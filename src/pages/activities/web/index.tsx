import type { FC } from "react";
import { ActivityLayout } from "../../../layouts";
import { applyNbsp } from "../../../utils";

const WebServicesPage: FC = () => (
  <ActivityLayout
    title="IT-направление MTS Web Services"
    description={applyNbsp(
      `Здесь будет информация о направлении "IT-направление MTS Web Services"`
    )}
  >
    {/* Здесь тест или любой контент */}
  </ActivityLayout>
);

export default WebServicesPage;
