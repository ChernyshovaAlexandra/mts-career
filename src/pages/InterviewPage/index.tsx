import type { FC } from "react";
import { useState } from "react";
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
import { apiService } from "../../services/apiService";
import { useUserStore } from "../../store";

const InterviewPage: FC = () => {
  const [allViewed, setAllViewed] = useState(false);
  const user = useUserStore((s) => s.user);
  const hasWon = Boolean(
    user?.games?.some((g) => g.name === "sovety_sobes" && g.status === "win")
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGetPoints = async () => {
    try {
      await apiService.startGame("sovety_sobes");
      const resp = await apiService.sendGameResult({ game: "sovety_sobes", result:"1", points: 100 });
      const data: any = resp.data as any;
      const games: Array<{ name: string; status: string; points?: number }>|undefined = data?.user?.games ?? (data?.user?.game ? [data.user.game] : undefined);
      const interviewGame = games?.find((g) => g.name === "sovety_sobes");
      if (interviewGame?.status === "win") {
        setSuccessMessage("Вы получили 100 баллов!");
      }
    } catch (e) {
      console.error("Не удалось отправить результат игры sovety_sobes", e);
    }
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

                <InterviewCarousel onAllViewedChange={setAllViewed} />

                {successMessage ? (
                  <div role="status" aria-live="polite">{successMessage}</div>
                ) : hasWon ? (
                  <div role="status" aria-live="polite">Баллы за карточки получены</div>
                ) : (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleGetPoints}
                    aria-label={ARIA_LABELS.PAGE.GET_POINTS}
                    disabled={!allViewed}
                    aria-disabled={!allViewed}
                    title={!allViewed ? "Просмотрите все карточки, чтобы получить баллы" : undefined}
                  >
                    Получить баллы
                  </Button>
                )}
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
