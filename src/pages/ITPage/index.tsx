import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";
import { Quiz } from "../../widgets";
import { itQuestions } from "./questions";

const ITPage: FC = () => (
  <MainLayout>
    <Section title="IT-направление">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о направлении "IT".
      </Text>
      <Quiz questions={itQuestions} />
    </Section>
  </MainLayout>
);

export default ITPage;
