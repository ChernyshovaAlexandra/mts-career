import type { FC } from "react";
import { Container } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { VacancyGrid } from "../../widgets";
import { RandomCoffeeSection } from "./components/RandomCoffeeSection";
import {
  PageContainer,
  MainTitle,
  BulletList,
  ContentSection,
  SectionTitle,
  VacancySection,
  VacancySubtitle,
  HeaderSection,
  HeaderContent,
  HeaderImage,
} from "./WorkAtMtsPage.styles";
import { ARIA_LABELS } from "./accessibility";

const WorkAtMtsPage: FC = () => {
  return (
    <MainLayout bg="">
      <PageContainer>
        <Container>
          <HeaderSection>
            <HeaderContent>
              <MainTitle id="main-heading">Работа в МТС</MainTitle>

              <BulletList role="list" aria-label={ARIA_LABELS.PAGE.STEPS_LIST}>
                <li role="listitem">
                  Ознакомься с актуальными вакансиями и выбери подходящую
                </li>
                <li role="listitem">
                  Присоединяйся ко встрече с сотрудником МТС, чтобы узнать больше из первых уст
                </li>
                <li role="listitem">
                  Получай опыт и двигайся к новым карьерным возможностям
                </li>
              </BulletList>
            </HeaderContent>

            <HeaderImage 
              role="img" 
              aria-label="Декоративное изображение работы в МТС"
            />
          </HeaderSection>

          <ContentSection aria-labelledby="vacancy-heading" role="main">
            <VacancySection>
              <SectionTitle id="vacancy-heading">
                Вакансии
              </SectionTitle>
              <VacancySubtitle>
                Используя фильтры, подбери интересующую должность и переходи на сайт МТС за деталями
              </VacancySubtitle>
              
              <VacancyGrid />
            </VacancySection>
          </ContentSection>

          <RandomCoffeeSection />
        </Container>
      </PageContainer>
    </MainLayout>
  );
};

export default WorkAtMtsPage;
