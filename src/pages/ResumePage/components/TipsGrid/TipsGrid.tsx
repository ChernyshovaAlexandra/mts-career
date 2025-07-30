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

export const TipsGrid: FC = memo(() => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

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
  };

  if (isMobile) {
    return (
      <TipsContainer>
        <MobileTipsCarousel />
        
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
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
          >
            Получить баллы
          </Button>
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
        >
          Получить баллы
        </Button>
      </div>
    </TipsContainer>
  );
}); 