import type { FC } from "react";
import { memo, useState, useEffect } from "react";
import { IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import type { InterviewCard } from "../../constants";
import { interviewCards } from "../../constants";
import * as S from "./styles";

export const InterviewCarousel: FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  
  const getItemsPerView = () => {
    // Всегда показываем только одну карточку на слайд
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
  
  const maxIndex = Math.max(0, interviewCards.length - itemsPerView);
  
  const handlePrevClick = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextClick = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const getCurrentCards = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + itemsPerView, interviewCards.length);
    return interviewCards.slice(startIndex, endIndex);
  };

  const currentCards = getCurrentCards();
  const totalSlides = maxIndex + 1;

  return (
    <S.CarouselContainer 
      role="region" 
      aria-label="Карусель карточек с советами для интервью"
      aria-describedby="carousel-instructions"
    >
      <S.CarouselStatus
        id="carousel-instructions"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Показаны карточки {currentIndex + 1}-{currentIndex + currentCards.length} из {interviewCards.length}. 
        Используйте кнопки навигации или клавиши влево/вправо для перемещения.
      </S.CarouselStatus>

      <S.CarouselWrapper>
        <S.CarouselTrack 
          $currentIndex={currentIndex} 
          $itemsPerView={itemsPerView}
          role="group"
          aria-label={`Группа карточек ${currentIndex + 1} из ${totalSlides}`}
        >
          {interviewCards.map((card) => (
            <S.CarouselCard 
              key={card.id}
              role="article"
              aria-labelledby={`card-${card.id}-title`}
              aria-describedby={`card-${card.id}-description`}
            >
              <S.InterviewCardElement>
                <S.CardImagePlaceholder 
                  role="img" 
                  aria-label={`Заглушка изображения для совета: ${card.title}`}
                />
                
                <S.CardContent>
                  <S.CardTitle 
                    variant="H4-Wide"
                    id={`card-${card.id}-title`}
                    role="heading"
                    aria-level={4}
                  >
                    {card.title}
                  </S.CardTitle>
                  
                  <S.CardDescription 
                    variant="P4-Regular-Text"
                    id={`card-${card.id}-description`}
                  >
                    {card.description}
                  </S.CardDescription>
                </S.CardContent>
              </S.InterviewCardElement>
            </S.CarouselCard>
          ))}
        </S.CarouselTrack>
        
        <S.NavigationButton
          $direction="prev"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          aria-label={`Предыдущие карточки. ${currentIndex === 0 ? 'Недоступно - вы находитесь в начале' : `Показать карточки ${Math.max(1, currentIndex)}-${currentIndex + itemsPerView - 1}`}`}
          title="Предыдущая группа карточек"
        >
          <IconArrowCircle
            outlined={false}
            direction="left"
            color="#1D2023"
            aria-hidden="true"
          />
        </S.NavigationButton>
        
        <S.NavigationButton
          $direction="next" 
          onClick={handleNextClick}
          disabled={currentIndex >= maxIndex}
          aria-label={`Следующие карточки. ${currentIndex >= maxIndex ? 'Недоступно - вы находитесь в конце' : `Показать карточки ${currentIndex + itemsPerView + 1}-${Math.min(interviewCards.length, currentIndex + itemsPerView * 2)}`}`}
          title="Следующая группа карточек"
        >
          <IconArrowCircle
            outlined={false}
            direction="right"
            color="#1D2023"
            aria-hidden="true"
          />
        </S.NavigationButton>
      </S.CarouselWrapper>
      
      {totalSlides > 1 && (
        <S.DotsContainer 
          role="tablist" 
          aria-label="Навигация по группам карточек"
        >
          {Array.from({ length: totalSlides }, (_, index) => (
            <S.Dot
              key={index}
              $isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Перейти к группе карточек ${index + 1} из ${totalSlides}`}
              aria-controls={`carousel-panel-${index}`}
              tabIndex={index === currentIndex ? 0 : -1}
              title={`Группа карточек ${index + 1}`}
            />
          ))}
        </S.DotsContainer>
      )}
    </S.CarouselContainer>
  );
}); 