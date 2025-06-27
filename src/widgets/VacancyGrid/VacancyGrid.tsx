import React from "react";
import { Section } from "../../shared";
import {
  Button,
  IconArrowCircle,
  mts_text_secondary,
  Text,
} from "@chernyshovaalexandra/mtsui";
import { FilterTag, Grid, TagRow, VacancyCard } from "./style";

const tags = ["Все", "Продажи и развитие", "Дизайн", "Финансы", "Работа в IT"];
const vacancies = new Array(6).fill(null);

export const VacancyGrid: React.FC = () => {
  return (
    <Section title="Вакансии" aria-labelledby="vacancy-title">
      <TagRow role="tablist" aria-label="Фильтры вакансий">
        {tags.map((tag, i) => (
          <FilterTag
            key={tag}
            aria-selected={i === 1}
            tabIndex={0}
            role="tab"
            $active={i === 1}
          >
            {tag}
          </FilterTag>
        ))}
      </TagRow>

      <Grid>
        {vacancies.map((_, i) => (
          <VacancyCard key={i} aria-label={`Вакансия ${i + 1}`}>
            <div>
              <Text variant="P3-Bold-Comp">Продавец (Розничная сеть МТС)</Text>
              <Text style={{ margin: "4px 0" }}>от 60 000 до 90 000 ₽</Text>
              <Text
                variant="P4-Regular-Comp"
                style={{ color: mts_text_secondary }}
              >
                В офисе • Гибкий график • АО РТК
              </Text>
            </div>
            <IconArrowCircle
              direction="right"
              width={32}
              height={32}
              aria-hidden="true"
            />
          </VacancyCard>
        ))}
      </Grid>

      <Button
        variant="primary"
        aria-label="Показать больше вакансий"
        style={{ marginTop: 24, alignSelf: "center" }}
      >
        Больше вакансий
      </Button>
    </Section>
  );
};

export default VacancyGrid;
