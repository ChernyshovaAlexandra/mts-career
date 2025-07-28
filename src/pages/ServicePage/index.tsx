import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";
import { Quiz } from "../../widgets";
import { serviceQuestions } from "./questions";

const ServicePage: FC = () => (
  <MainLayout>
    <Section title="Сервис и услуги">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о направлении "Сервис и услуги".
      </Text>
      <Quiz questions={serviceQuestions} />
    </Section>
  </MainLayout>
);

export default ServicePage;
