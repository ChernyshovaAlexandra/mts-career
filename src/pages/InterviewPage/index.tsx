import type { FC } from "react";
import { Button, Container } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { InterviewCarousel } from "./components/InterviewCarousel";
// import { InterviewSimulation } from "../../components";
import {
  PageContainer,
  HeroSection,
  ContentWrapper,
  MainTitle,
  BulletList,
  ContentSection,
  SectionTitle,
  CarouselContainer,
  CarouselWrapper,
  CarouselHeader,
  CarouselSubtitle,
  CarouselImage,
} from "./InterviewPage.styles";
import { ARIA_LABELS } from "./accessibility";
import { ClosedPlaceholder } from "../../shared";

const InterviewPage: FC = () => {
  const handleGetPoints = () => {
    console.log("Получение баллов за изучение материалов");
  };

  return (
    <MainLayout>
      <HeroSection aria-labelledby="interview-heading" role="banner">
        <Container>
          <ContentWrapper>
            <MainTitle id="interview-heading">Подготовка к собеседованию</MainTitle>

            <BulletList role="list" aria-label={ARIA_LABELS.PAGE.STEPS_LIST}>
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
        </Container>
      </HeroSection>

      <PageContainer>
        <Container>
          <ContentSection aria-labelledby="basic-rules-heading" role="main">
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
                    Узнай секреты успешного интервью: листай слайдер, запоминай
                    ключевые моменты и получай заслуженные баллы
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

          {/* <div data-section="interview-simulation">
            <InterviewSimulation />
          </div> */}
          <ClosedPlaceholder
            title="Симуляция собеседования"
            reason="Похоже, все слоты заняты. Иногда они освобождаются, попробуй позже"
            margin="24px 0"
          />
        </Container>
      </PageContainer>
    </MainLayout>
  );
};

export default InterviewPage;
