import type { FC } from "react";
import { memo, useState, useEffect, useRef, useCallback } from "react";
import { IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { interviewCards } from "../../constants";
import * as S from "./styles";

export const InterviewCarousel: FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const getItemsPerView = () => {
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
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Проверяем, что событие произошло на кнопках навигации или точках
    const target = e.target as HTMLElement;
    const isNavigationButton = target.closest('[role="button"]') || 
                              target.closest('[role="tab"]') ||
                              target.closest('button');
    
    if (!isNavigationButton) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(prev => Math.max(0, prev - 1));
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < maxIndex) {
          setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
        }
        break;
      case 'Home':
        e.preventDefault();
        setCurrentIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setCurrentIndex(maxIndex);
        break;
    }
  }, [currentIndex, maxIndex]);
  
  const handlePrevClick = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextClick = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.touches[0].clientX);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Минимальное расстояние для свайпа
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < maxIndex) {
        // Свайп влево - следующая карточка
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
      } else if (diff < 0 && currentIndex > 0) {
        // Свайп вправо - предыдущая карточка
        setCurrentIndex(prev => Math.max(0, prev - 1));
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, startX, currentX, currentIndex, maxIndex]);

  const getCurrentCards = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + itemsPerView, interviewCards.length);
    return interviewCards.slice(startIndex, endIndex);
  };

  const currentCards = getCurrentCards();
  const totalSlides = maxIndex + 1;

  return (
    <S.CarouselContainer 
      ref={carouselRef}
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
          ref={trackRef}
          $currentIndex={currentIndex} 
          $itemsPerView={itemsPerView}
          role="group"
          aria-label={`Группа карточек ${currentIndex + 1} из ${totalSlides}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
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
                    id={`card-${card.id}-title`}
                    role="heading"
                    aria-level={4}
                  >
                    {card.title}
                  </S.CardTitle>
                  
                  <S.CardDescription 
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