import type { FC } from "react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { hrVideos } from "../../constants";
import {
  CarouselContainer,
  CarouselWrapper,
  CarouselCard,
  VideoCard,
  EmployeeName,
  VideoDescription,
  CarouselStatus,
  NavigationButton,
  DotsContainer,
  Dot,
  SlideRow
} from "./styles";

export const HRVideosCarousel: FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<CarouselRef | null>(null);

  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 500) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      const next = getItemsPerView();
      setItemsPerView(next);
      setCurrentIndex(0);
      carouselRef.current?.goTo?.(0, true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = useMemo(() => {
    const result: typeof hrVideos[] = [] as any;
    const chunkSize = Math.max(1, Math.min(itemsPerView, 3));
    for (let i = 0; i < hrVideos.length; i += chunkSize) {
      result.push(hrVideos.slice(i, i + chunkSize));
    }
    return result;
  }, [itemsPerView]);

  const totalSlides = slides.length;

  const handlePrevClick = () => carouselRef.current?.prev?.();
  const handleNextClick = () => carouselRef.current?.next?.();
  const handleDotClick = (index: number) => carouselRef.current?.goTo?.(index, true);

  return (
    <CarouselContainer
      role="region"
      aria-label="Карусель видео от HR-специалистов"
      aria-describedby="hr-carousel-instructions"
    >
      <CarouselStatus
        id="hr-carousel-instructions"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Показ слайдов {currentIndex + 1} из {totalSlides}. Используйте кнопки навигации или клавиши влево/вправо.
      </CarouselStatus>

      <CarouselWrapper>
        <Carousel
          ref={carouselRef}
          dots={false}
          infinite={false}
          accessibility
          afterChange={(idx) => setCurrentIndex(idx)}
        >
          {slides.map((group, slideIdx) => (
            <div key={slideIdx} role="group" aria-label={`Слайд ${slideIdx + 1} из ${totalSlides}`}>
              <SlideRow>
                {group.map((video) => (
                  <CarouselCard
                    key={video.id}
                    role="group"
                    aria-labelledby={`video-${video.id}-name`}
                    aria-describedby={`video-${video.id}-position`}
                  >
                    <VideoCard>
                      <div role="group" aria-label={`Воспроизведение: ${video.name} — ${video.position}`}>
                        <video
                          controls
                          playsInline
                          style={{ width: "100%", borderRadius: 16 }}
                          aria-label={`Видео: ${video.name} — ${video.position}`}
                        >
                          <source src={video.videoUrl} type="video/mp4" />
                          {video.subtitlesUrl && (
                            <track
                              kind="subtitles"
                              src={video.subtitlesUrl}
                              srcLang="ru"
                              label="Русский"
                              default
                            />
                          )}
                          Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                      </div>

                      <EmployeeName variant="H4-Wide" id={`video-${video.id}-name`} role="heading" aria-level={4}>
                        {video.name}
                      </EmployeeName>
                      <VideoDescription as="div" variant="P4-Regular-Text" id={`video-${video.id}-position`} aria-label="Должность">
                        {video.position}
                      </VideoDescription>
                    </VideoCard>
                  </CarouselCard>
                ))}
              </SlideRow>
            </div>
          ))}
        </Carousel>

        <NavigationButton
          $direction="prev"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          aria-label={`Предыдущий слайд. ${currentIndex === 0 ? "Недоступно - начало" : `Перейти к слайду ${currentIndex} из ${totalSlides}`}`}
          title="Предыдущий слайд"
        >
          <IconArrowCircle outlined={false} direction="left" color="#1D2023" aria-hidden="true" />
        </NavigationButton>

        <NavigationButton
          $direction="next"
          onClick={handleNextClick}
          disabled={currentIndex >= totalSlides - 1}
          aria-label={`Следующий слайд. ${currentIndex >= totalSlides - 1 ? "Недоступно - конец" : `Перейти к слайду ${currentIndex + 2} из ${totalSlides}`}`}
          title="Следующий слайд"
        >
          <IconArrowCircle outlined={false} direction="right" color="#1D2023" aria-hidden="true" />
        </NavigationButton>
      </CarouselWrapper>

      {totalSlides > 1 && (
        <DotsContainer role="tablist" aria-label="Навигация по слайдам с HR-видео">
          {Array.from({ length: totalSlides }, (_, index) => (
            <Dot
              key={index}
              $isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Перейти к слайду ${index + 1} из ${totalSlides}`}
              aria-controls={`hr-carousel-panel-${index}`}
              tabIndex={index === currentIndex ? 0 : -1}
              title={`Слайд ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </CarouselContainer>
  );
});