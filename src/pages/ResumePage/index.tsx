import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";

const ResumePage: FC = () => (
  <MainLayout>
    <Section title="Подготовка резюме">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о том, как составить резюме.
      </Text>
    </Section>
  </MainLayout>
);

export default ResumePage;
