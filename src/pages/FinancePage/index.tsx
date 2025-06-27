import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";

const FinancePage: FC = () => (
  <MainLayout>
    <Section title="Финансы">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о направлении "Финансы".
      </Text>
    </Section>
  </MainLayout>
);

export default FinancePage;
