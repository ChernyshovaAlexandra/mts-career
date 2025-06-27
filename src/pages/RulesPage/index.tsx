import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";

const RulesPage: FC = () => (
  <MainLayout>
    <Section title="Правила участия">
      <Text variant="P4-Regular-Text">
        Здесь размещаются правила участия в проекте. Пожалуйста, внимательно
        ознакомьтесь с ними перед началом работы.
      </Text>
    </Section>
  </MainLayout>
);

export default RulesPage;
