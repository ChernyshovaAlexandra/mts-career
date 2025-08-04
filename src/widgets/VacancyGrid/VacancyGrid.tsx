import React, { useState } from "react";
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

const tags = [
  "Работа в IT",
  "Технический блок", 
  "Аналитика",
  "HR",
  "Продажи и развитие",
  "Другое"
];

const mockData = {
  "Работа в IT": [
    {
      experience: "Без опыта • Москва",
      title: "FRONTEND РАЗРАБОТЧИК",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "1-3 года • Санкт-Петербург",
      title: "BACKEND РАЗРАБОТЧИК",
      tags: ["Удаленно", "Полная занятость", "АО РТК"]
    },
    {
      experience: "3-6 лет • Москва",
      title: "DEVOPS ИНЖЕНЕР",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "Без опыта • Казань",
      title: "QA ИНЖЕНЕР",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    }
  ],
  "Технический блок": [
    {
      experience: "1-3 года • Москва",
      title: "СИСТЕМНЫЙ АДМИНИСТРАТОР",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "3-6 лет • Санкт-Петербург",
      title: "СЕТЕВОЙ ИНЖЕНЕР",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "Без опыта • Екатеринбург",
      title: "ТЕХНИЧЕСКИЙ СПЕЦИАЛИСТ",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "1-3 года • Москва",
      title: "ИНЖЕНЕР ПОДДЕРЖКИ",
      tags: ["Удаленно", "Гибкий график", "АО РТК"]
    }
  ],
  "Аналитика": [
    {
      experience: "1-3 года • Москва",
      title: "БИЗНЕС-АНАЛИТИК",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "3-6 лет • Санкт-Петербург",
      title: "DATA АНАЛИТИК",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "Без опыта • Казань",
      title: "МАРКЕТИНГ-АНАЛИТИК",
      tags: ["Удаленно", "Полная занятость", "АО РТК"]
    },
    {
      experience: "1-3 года • Москва",
      title: "ПРОДУКТОВЫЙ АНАЛИТИК",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    }
  ],
  "HR": [
    {
      experience: "1-3 года • Москва",
      title: "HR МЕНЕДЖЕР",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "Без опыта • Санкт-Петербург",
      title: "РЕКРУТЕР",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "3-6 лет • Москва",
      title: "HR БИЗНЕС-ПАРТНЕР",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "1-3 года • Казань",
      title: "СПЕЦИАЛИСТ ПО ОБУЧЕНИЮ",
      tags: ["Удаленно", "Гибкий график", "АО РТК"]
    }
  ],
  "Продажи и развитие": [
    {
      experience: "Без опыта • Москва",
      title: "ПРОДАВЕЦ (РОЗНИЧНАЯ СЕТЬ МТС)",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "1-3 года • Санкт-Петербург",
      title: "МЕНЕДЖЕР ПО РАЗВИТИЮ",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "Без опыта • Екатеринбург",
      title: "КОНСУЛЬТАНТ",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "1-3 года • Москва",
      title: "СПЕЦИАЛИСТ ПО ПРОДАЖАМ",
      tags: ["Удаленно", "Полная занятость", "АО РТК"]
    }
  ],
  "Другое": [
    {
      experience: "Без опыта • Москва",
      title: "ЮРИСТ",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "1-3 года • Санкт-Петербург",
      title: "БУХГАЛТЕР",
      tags: ["В офисе", "Гибкий график", "АО РТК"]
    },
    {
      experience: "3-6 лет • Москва",
      title: "МЕНЕДЖЕР ПРОЕКТОВ",
      tags: ["В офисе", "Полная занятость", "АО РТК"]
    },
    {
      experience: "Без опыта • Казань",
      title: "СПЕЦИАЛИСТ ПО ЗАКУПКАМ",
      tags: ["Удаленно", "Гибкий график", "АО РТК"]
    }
  ]
};

export const VacancyGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Продажи и развитие");
  const currentVacancies = mockData[activeTab as keyof typeof mockData] || [];

  const handleCardClick = (vacancy: any) => {
    console.log("Переход к вакансии:", vacancy.title);
  };

  return (
    <>
      <TagRow role="tablist" aria-label="Фильтры вакансий">
        {tags.map((tag) => (
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
            aria-label={`Вакансия ${i + 1}`}
            onClick={() => handleCardClick(vacancy)}
            role="button"
            tabIndex={0}
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
                
                <ActionButton aria-label="Перейти к вакансии">
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
        >
          БОЛЬШЕ ВАКАНСИЙ
        </Button>
      </div>
    </>
  );
};

export default VacancyGrid;
