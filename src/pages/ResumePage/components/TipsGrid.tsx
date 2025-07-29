import type { FC } from "react";
import { memo, useState } from "react";
import { 
  Header, 
  Text, 
  Button,
  mts_brand_red 
} from "@chernyshovaalexandra/mtsui";
import type { Tip } from "../constants";
import { tips } from "../constants";
import styled from "styled-components";

const TipsContainer = styled.section`
  margin: 24px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  
  @media (max-width: 500px) {
    padding: 0 10px;
  }
  
  @media (min-width: 769px) and (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 370px));
    justify-content: center;
  }
  
  @media (min-width: 1201px) {
    grid-template-columns: repeat(auto-fit, 370px);
    justify-content: center;
  }
`;

const TipCard = styled.article<{ $isFlipped: boolean }>`
  perspective: 1000px;
  height: 296px;
  width: 100%;
  max-width: 370px;
  cursor: pointer;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const CardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => $isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ffffff;
  border-radius: 32px;
  padding: 20px;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid #e9ecef;
    border-radius: 24px;
    pointer-events: none;
    z-index: 1;
  }
`;

const CardFront = styled(CardSide)`
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  padding: 16px;
`;

const TipTitle = styled(Header)`
  margin: 0 0 12px 0;
  font-family: "MTS Wide";
  font-weight: 500;
  font-size: 24px;
  text-transform: uppercase;
  color: #212529;
  text-align: center;
`;

const TipDescription = styled(Text)`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6c757d;
  text-align: center;
`;

const BackContent = styled(Text)`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #212529;
  text-align: left;
  overflow-y: auto;
`;





export const TipsGrid: FC = memo(() => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

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