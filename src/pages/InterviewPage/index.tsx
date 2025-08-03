import type { FC } from "react";
import { Button } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { InterviewCarousel } from "./components/InterviewCarousel";
import { InterviewSimulation } from "../../components";
import {
  PageContainer,
  ContentContainer,
  ContentWrapper,
  MainTitle,
  BulletList,
  ContentSection,
  SectionTitle,
  CarouselContainer,
  CarouselWrapper,
  CarouselHeader,
  CarouselSubtitle,
  CarouselImage
} from "./InterviewPage.styles";
import { ARIA_LABELS } from "./accessibility";

const InterviewPage: FC = () => {
  const handleGetPoints = () => {
    // TODO: Implement points earning logic
    console.log('Получение баллов за изучение материалов');
  };

  return (
    <MainLayout>
      <PageContainer>
        <ContentContainer>
          <ContentWrapper>
            <MainTitle id="main-heading">
              Подготовка к собеседованию
            </MainTitle>

            <BulletList 
              role="list" 
              aria-label={ARIA_LABELS.PAGE.STEPS_LIST}
            >
              <li role="listitem">Читай советы от экспертов по найму</li>
              <li role="listitem">Пройди тренировку интервью онлайн</li>
              <li role="listitem">Получи обратную связь и двигайся дальше</li>
            </BulletList>
            
            <CarouselImage 
              role="img" 
              aria-label={ARIA_LABELS.PAGE.DECORATIVE_IMAGE}
              className="mobile-header-image"
            />
          </ContentWrapper>

          <ContentSection 
            aria-labelledby="basic-rules-heading"
            role="main"
          >
            <CarouselContainer>
              <CarouselImage 
                role="img" 
                aria-label={ARIA_LABELS.PAGE.DECORATIVE_IMAGE}
              />
              <CarouselWrapper>
                <CarouselHeader>
                  <SectionTitle id="basic-rules-heading">
                    {ARIA_LABELS.PAGE.BASIC_RULES}
                  </SectionTitle>
                  <CarouselSubtitle>
                    Узнай секреты успешного интервью: листай слайдер, запоминай ключевые моменты и получай заслуженные баллы
                  </CarouselSubtitle>
                </CarouselHeader>
                
                <InterviewCarousel />

                <Button
                  variant="primary"
                  type="button"
                  onClick={handleGetPoints}
                  aria-label={ARIA_LABELS.PAGE.GET_POINTS}
                >
                  Получить баллы
                </Button>
              </CarouselWrapper>
            </CarouselContainer>
          </ContentSection>

          <InterviewSimulation />
        </ContentContainer>
      </PageContainer>
    </MainLayout>
  );
};

export default InterviewPage;
