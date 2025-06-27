import type { FC } from "react";

import {
  SuccessStoriesCarousel,
  RandomCoffeeBlock,
  VacancyGrid,
} from "../widgets";
import { Section } from "../shared";
import { Text } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../layouts";

const WorkAtMtsPage: FC = () => (
  <MainLayout>
    <Section title="Работа в МТС">
      <Text variant="P4-Regular-Comp">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </Section>

    <SuccessStoriesCarousel />

    <RandomCoffeeBlock />

    <VacancyGrid />
  </MainLayout>
);

export default WorkAtMtsPage;
