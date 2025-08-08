import type { FC, KeyboardEvent } from "react";
import { memo, useState, useEffect } from "react";
import { IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { tips } from "../../constants";
import {
  CarouselContainer,
  CarouselWrapper,
  CarouselTrack,
  CarouselCard,
  TipCard,
  CardInner,
  CardFront,
  CardBack,
  TipTitle,
  TipDescription,
  BackContent,
  NavigationButton,
  DotsContainer,
  Dot,
  CarouselStatus
} from "./styles.js";

interface MobileTipsCarouselProps {
  onAllViewedChange?: (allViewed: boolean) => void;
}

export const MobileTipsCarousel: FC<MobileTipsCarouselProps> = memo(({ onAllViewedChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [viewedOnce, setViewedOnce] = useState<Set<string>>(new Set());
  
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 500) return 1;
      if (window.innerWidth <= 800) return 2;
      return 3;
    }
    return 1;
  };
  
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const maxIndex = Math.max(0, tips.length - itemsPerView);
  
  const handlePrevClick = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextClick = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleCardClick = (tipId: string) => {
    const wasFlipped = flippedCards.has(tipId);
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
    if (!wasFlipped) {
      setViewedOnce(prev => {
        const next = new Set(prev);
        next.add(tipId);
        return next;
      });
    }
  };

  const totalSlides = maxIndex + 1;

  // Report "viewed at least once" upward for enabling the parent CTA
  useEffect(() => {
    const allViewed = viewedOnce.size === tips.length;
    onAllViewedChange?.(allViewed);
  }, [viewedOnce, onAllViewedChange]);

  return (
    <CarouselContainer 
      role="region" 
      aria-label="Карусель карточек с советами по составлению резюме"
      aria-describedby="tips-carousel-instructions"
    >
      <CarouselStatus
        id="tips-carousel-instructions"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Показывается совет {currentIndex + 1} из {tips.length}. 
        Используйте кнопки навигации или клавиши влево/вправо для перемещения.
      </CarouselStatus>

      <CarouselWrapper>
        <CarouselTrack 
          $currentIndex={currentIndex} 
          $itemsPerView={itemsPerView}
          role="group"
          aria-label={`Группа советов ${currentIndex + 1} из ${totalSlides}`}
        >
          {tips.map((tip) => (
            <CarouselCard 
              key={tip.id}
              role="group"
              aria-labelledby={`tip-${tip.id}-title`}
              aria-describedby={`tip-${tip.id}-description`}
            >
              <TipCard
                $isFlipped={flippedCards.has(tip.id)}
                tabIndex={0}
                role="button"
                aria-label={`Карточка совета: ${tip.title}. Нажмите чтобы ${flippedCards.has(tip.id) ? 'скрыть' : 'показать'} подробности`}
                onClick={() => handleCardClick(tip.id)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(tip.id);
                  }
                }}
              >
                <CardInner $isFlipped={flippedCards.has(tip.id)}>
                  <CardFront>
                    <TipTitle 
                      as="h4"
                      id={`tip-${tip.id}-title`}
                    >
                      {tip.title}
                    </TipTitle>
                    <TipDescription 
                      variant="P4-Regular-Text"
                      id={`tip-${tip.id}-description`}
                    >
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
            </CarouselCard>
          ))}
        </CarouselTrack>
        
        <NavigationButton
          $direction="prev"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          aria-label={`Предыдущие советы. ${currentIndex === 0 ? 'Недоступно - вы находитесь в начале' : `Показать советы ${Math.max(1, currentIndex)}-${currentIndex + itemsPerView - 1}`}`}
          title="Предыдущая группа советов"
        >
          <IconArrowCircle
            outlined={false}
            direction="left"
            color="#1D2023"
            aria-hidden="true"
          />
        </NavigationButton>
        
        <NavigationButton
          $direction="next" 
          onClick={handleNextClick}
          disabled={currentIndex >= maxIndex}
          aria-label={`Следующие советы. ${currentIndex >= maxIndex ? 'Недоступно - вы находитесь в конце' : `Показать советы ${currentIndex + itemsPerView + 1}-${Math.min(tips.length, currentIndex + itemsPerView * 2)}`}`}
          title="Следующая группа советов"
        >
          <IconArrowCircle
            outlined={false}
            direction="right"
            color="#1D2023"
            aria-hidden="true"
          />
        </NavigationButton>
      </CarouselWrapper>
      
      {totalSlides > 1 && (
        <DotsContainer 
          role="tablist" 
          aria-label="Навигация по группам советов"
        >
          {Array.from({ length: totalSlides }, (_, index) => (
            <Dot
              key={index}
              $isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Перейти к группе советов ${index + 1} из ${totalSlides}`}
              aria-controls={`tips-carousel-panel-${index}`}
              tabIndex={index === currentIndex ? 0 : -1}
              title={`Группа советов ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
}); 