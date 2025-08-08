import type { FC } from "react";
import { memo, useState, useEffect } from "react";
import { 
  Button,
  mts_brand_red 
} from "@chernyshovaalexandra/mtsui";
import { tips } from "../../constants";
import { MobileTipsCarousel } from "../MobileTipsCarousel";
import {
  TipsContainer,
  Grid,
  TipCard,
  CardInner,
  CardFront,
  CardBack,
  TipTitle,
  TipDescription,
  BackContent
} from "./styles";
import { apiService } from "../../../../services/apiService";
import { useUserStore } from "../../../../store";

export const TipsGrid: FC = memo(() => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [viewedOnce, setViewedOnce] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const allViewedOnce = viewedOnce.size === tips.length;
  const [mobileAllViewed, setMobileAllViewed] = useState(false);
  const user = useUserStore((s) => s.user);
  const hasWon = Boolean(
    user?.games?.some((g) => g.name === "sovety_resume" && g.status === "win")
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleCardClick = (tipId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
    setViewedOnce(prev => {
      const next = new Set(prev);
      next.add(tipId);
      return next;
    });
  };

  const handleGetPoints = async () => {
    try {
      await apiService.startGame("sovety_resume");
      const resp = await apiService.sendGameResult({ game: "sovety_resume", result:"1", points: 90 });
      const data: any = resp.data as any;
      const games: Array<{ name: string; status: string; points?: number }>|undefined = data?.user?.games ?? (data?.user?.game ? [data.user.game] : undefined);
      const resumeGame = games?.find((g) => g.name === "sovety_resume");
      if (resumeGame?.status === "win") {
        setSuccessMessage("Вы получили 90 баллов!");
      }
    } catch (e) {
      console.error("Не удалось отправить результат игры sovety_resume", e);
    }
  };

  if (isMobile) {
    return (
      <TipsContainer>
        <MobileTipsCarousel onAllViewedChange={setMobileAllViewed} />
        
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          {successMessage ? (
            <div role="status" aria-live="polite">{successMessage}</div>
          ) : hasWon ? (
            <div role="status" aria-live="polite">Баллы за карточки получены</div>
          ) : (
            <Button 
              variant="primary"
              style={{ 
                backgroundColor: mts_brand_red,
                border: `1px solid ${mts_brand_red}`,
                textTransform: "uppercase",
                borderRadius: "16px",
                padding: "14px"
              }}
              aria-label="Получить баллы за просмотр советов"
              disabled={!mobileAllViewed}
              aria-disabled={!mobileAllViewed}
              title={!mobileAllViewed ? "Просмотрите все карточки, чтобы получить баллы" : undefined}
              onClick={handleGetPoints}
            >
              Получить баллы
            </Button>
          )}
        </div>
      </TipsContainer>
    );
  }

  return (
    <TipsContainer>
      <Grid>
        {tips.map((tip) => (
          <TipCard
            key={tip.id}
            $isFlipped={flippedCards.has(tip.id)}
            tabIndex={0}
            role="button"
            aria-label={`Карточка совета: ${tip.title}`}
            onClick={() => handleCardClick(tip.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(tip.id);
              }
            }}
          >
            <CardInner $isFlipped={flippedCards.has(tip.id)}>
              <CardFront>
                <TipTitle as="h3">
                  {tip.title}
                </TipTitle>
                <TipDescription variant="P4-Regular-Text">
                  {tip.shortDescription}
                </TipDescription>
              </CardFront>
              <CardBack>
                <BackContent variant="P4-Regular-Text">
                  {tip.fullDescription}
                </BackContent>
              </CardBack>
            </CardInner>
          </TipCard>
        ))}
      </Grid>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        {successMessage ? (
          <div role="status" aria-live="polite">{successMessage}</div>
        ) : hasWon ? (
          <div role="status" aria-live="polite">Баллы за карточки получены</div>
        ) : (
          <Button 
            variant="primary"
            style={{ 
              backgroundColor: mts_brand_red,
              border: `1px solid ${mts_brand_red}`,
              textTransform: "uppercase",
              borderRadius: "16px",
              padding: "14px"
            }}
            aria-label="Получить баллы за просмотр советов"
            disabled={!allViewedOnce}
            aria-disabled={!allViewedOnce}
            title={!allViewedOnce ? "Переверните каждую карточку хотя бы один раз, чтобы получить баллы" : undefined}
            onClick={handleGetPoints}
          >
            Получить баллы
          </Button>
        )}
      </div>
    </TipsContainer>
  );
}); 