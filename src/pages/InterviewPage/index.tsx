import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";

const InterviewPage: FC = () => (
  <MainLayout>
    <Section title="Подготовка к собеседованию">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о том, как подготовиться к собеседованию.
      </Text>
    </Section>
  </MainLayout>
);

export default InterviewPage;
