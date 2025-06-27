import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";

const MarketingPage: FC = () => (
  <MainLayout>
    <Section title="Маркетинг и коммуникации">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о направлении "Маркетинг и коммуникации".
      </Text>
    </Section>
  </MainLayout>
);

export default MarketingPage;
