import type { FC } from "react";
import { Text } from "@chernyshovaalexandra/mtsui";
import { Section } from "../../shared";
import { MainLayout } from "../../layouts";

const TournamentTablePage: FC = () => (
  <MainLayout>
    <Section title="Рейтинг участников">
      <Text variant="P4-Regular-Text">
        Здесь будет информация о рейтинге участников.
      </Text>
    </Section>
  </MainLayout>
);

export default TournamentTablePage;
