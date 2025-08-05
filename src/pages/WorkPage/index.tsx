import React from 'react';
import { Container } from '@chernyshovaalexandra/mtsui';
import { MainLayout } from '../../layouts';
import { RandomCoffeeSection } from './components/RandomCoffeeSection';
import {
  PageContainer,
  ContentWrapper,
  MainTitle,
  Description,
  VacancySection,
  SectionTitle,
  VacancyGrid,
  VacancyCard,
  VacancyTitle,
  VacancyDepartment,
  VacancyLocation,
  VacancyType,
  VacancyLink,
} from './WorkPage.styles';

const WorkPage: React.FC = () => {
  // Моковые данные вакансий (в реальном проекте будут загружаться из API)
  const vacancies = [
    {
      id: '1',
      title: 'Frontend Developer',
      department: 'IT отдел',
      location: 'Москва',
      type: 'Полная занятость',
      url: 'https://career.mts.ru/vacancy/1'
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Продуктовый отдел',
      location: 'Санкт-Петербург',
      type: 'Полная занятость',
      url: 'https://career.mts.ru/vacancy/2'
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      department: 'Дизайн отдел',
      location: 'Москва',
      type: 'Полная занятость',
      url: 'https://career.mts.ru/vacancy/3'
    },
    {
      id: '4',
      title: 'Backend Developer',
      department: 'IT отдел',
      location: 'Москва',
      type: 'Полная занятость',
      url: 'https://career.mts.ru/vacancy/4'
    }
  ];

  return (
    <MainLayout bg='var(--background-light-lower)'>
      <PageContainer>
        <Container>
          <ContentWrapper>
            <MainTitle>Работа в МТС</MainTitle>
            <Description>
              Найди свою идеальную работу в МТС: актуальные вакансии, встреча с сотрудниками 
              компании и знакомство с корпоративной культурой. Получи баллы за активность и 
              узнай больше о работе в МТС из первых уст.
            </Description>
          </ContentWrapper>

          <VacancySection>
            <SectionTitle>Актуальные вакансии</SectionTitle>
            <VacancyGrid>
              {vacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id}>
                  <VacancyTitle>{vacancy.title}</VacancyTitle>
                  <VacancyDepartment>{vacancy.department}</VacancyDepartment>
                  <VacancyLocation>{vacancy.location}</VacancyLocation>
                  <VacancyType>{vacancy.type}</VacancyType>
                  <VacancyLink 
                    href={vacancy.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Перейти к вакансии ${vacancy.title}`}
                  >
                    Подробнее
                  </VacancyLink>
                </VacancyCard>
              ))}
            </VacancyGrid>
          </VacancySection>

          <RandomCoffeeSection />
        </Container>
      </PageContainer>
    </MainLayout>
  );
};

export default WorkPage;
