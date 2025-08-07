import React, { useMemo, useState } from "react";
import {
  Button,
  IconLeft,
  Text,
} from "@chernyshovaalexandra/mtsui";
import {
  FilterTag, 
  Grid, 
  TagRow, 
  VacancyCard,
  CardContent,
  CardTop,
  CardBottom,
  TagsContainer,
  TagItem,
  ActionButton
} from "./style";

export interface VacancyRaw {
  id: string;
  category: string;
  experience: string;
  location: string;
  title: string;
  tag: string; // e.g. "Удалённая работа"
  company: string;
  link: string;
}

type NormalizedVacancy = {
  id: string;
  title: string;
  experience: string; // "<experience> • <location>"
  tags: string[];
  link: string;
};

type CategoryMap = Record<string, NormalizedVacancy[]>;

export interface VacancyGridProps {
  vacancies: VacancyRaw[];
}

export const VacancyGrid: React.FC<VacancyGridProps> = ({ vacancies }) => {
  const dataByCategory: CategoryMap = useMemo(() => {
    const grouped: CategoryMap = {};
    vacancies.forEach((v) => {
      const key = v.category;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({
        id: v.id,
        title: v.title,
        experience: `${v.experience} • ${v.location}`,
        tags: [v.tag, v.company],
        link: v.link,
      });
    });
    return grouped;
  }, [vacancies]);

  const categoryTabs = useMemo(() => Object.keys(dataByCategory), [dataByCategory]);
  const [activeTab, setActiveTab] = useState<string>(categoryTabs[0] ?? "");
  const currentVacancies = (activeTab ? dataByCategory[activeTab] : []) || [];

  const handleOpenVacancy = (vacancy: NormalizedVacancy) => {
    if (vacancy?.link) {
      window.open(vacancy.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <TagRow role="tablist" aria-label="Фильтры вакансий">
        {categoryTabs.map((tag) => (
          <FilterTag
            key={tag}
            aria-selected={tag === activeTab}
            tabIndex={0}
            role="tab"
            $active={tag === activeTab}
            onClick={() => setActiveTab(tag)}
          >
            {tag}
          </FilterTag>
        ))}
      </TagRow>

      <Grid>
        {currentVacancies.map((vacancy, i) => (
          <VacancyCard 
            key={i} 
            aria-label={`Вакансия: ${vacancy.title}`}
            onClick={() => handleOpenVacancy(vacancy)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenVacancy(vacancy);
              }
            }}
          >
            <CardContent>
              <CardTop>
                <Text 
                  variant="P4-Regular-Comp" 
                  style={{ 
                    color: "#666666",
                    fontFamily: "'MTS Text', sans-serif",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "17px",
                    lineHeight: "140%",
                    letterSpacing: "0px"
                  }}
                >
                  {vacancy.experience}
                </Text>
                <Text 
                  variant="P3-Bold-Comp" 
                  style={{ fontFamily: "'MTS Wide', sans-serif" }}
                >
                  {vacancy.title}
                </Text>
              </CardTop>
              
              <CardBottom>
                <TagsContainer>
                  {vacancy.tags.map((tag, tagIndex) => (
                    <TagItem key={tagIndex}>{tag}</TagItem>
                  ))}
                </TagsContainer>
                
                <ActionButton
                  aria-label="Перейти к вакансии"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenVacancy(vacancy);
                  }}
                >
                  <div style={{ 
                    display: 'flex',
                    transform: 'rotate(180deg) scale(1.5)'
                  }}>
                    <IconLeft
                      width={20}
                      height={20}
                      aria-hidden="true"
                      style={{ color: 'white' }}
                    />
                  </div>
                </ActionButton>
              </CardBottom>
            </CardContent>
          </VacancyCard>
        ))}
      </Grid>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '32px',
        width: '100%'
      }}>
        <Button
          variant="primary"
          aria-label="Показать больше вакансий"
          onClick={() => {
            const first = currentVacancies[0];
            if (first) handleOpenVacancy(first);
          }}
        >
          БОЛЬШЕ ВАКАНСИЙ
        </Button>
      </div>
    </>
  );
};

export default VacancyGrid;
