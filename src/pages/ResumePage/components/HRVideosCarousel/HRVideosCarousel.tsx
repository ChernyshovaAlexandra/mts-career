import type { FC } from "react";
import { memo, useState, useEffect } from "react";
import { IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { VideoPlayer } from "../VideoPlayer";
import type { HRVideo } from "../../constants";
import { hrVideos } from "../../constants";
import {
  CarouselContainer,
  CarouselWrapper,
  CarouselTrack,
  CarouselCard,
  VideoCard,
  VideoPreview,
  EmployeeImage,
  PlayButton,
  SubtitlesOverlay,
  EmployeeName,
  VideoDescription,
  NavigationButton,
  DotsContainer,
  Dot,
  CarouselStatus
} from "./styles";

export const HRVideosCarousel: FC = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [playingVideo, setPlayingVideo] = useState<HRVideo | null>(null);
  
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    return 3;
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
  
  const maxIndex = Math.max(0, hrVideos.length - itemsPerView);
  
  const handlePrevClick = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextClick = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleVideoPlay = (video: HRVideo) => {
    setPlayingVideo(video);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  const getCurrentVideos = () => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + itemsPerView, hrVideos.length);
    return hrVideos.slice(startIndex, endIndex);
  };

  const currentVideos = getCurrentVideos();
  const totalSlides = maxIndex + 1;

  return (
    <>
      <CarouselContainer 
        role="region" 
        aria-label="Карусель видео от HR-специалистов"
        aria-describedby="carousel-instructions"
      >
        <CarouselStatus
          id="carousel-instructions"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          Показаны видео {currentIndex + 1}-{currentIndex + currentVideos.length} из {hrVideos.length}. 
          Используйте кнопки навигации или клавиши влево/вправо для перемещения.
        </CarouselStatus>

        <CarouselWrapper>
          <CarouselTrack 
            $currentIndex={currentIndex} 
            $itemsPerView={itemsPerView}
            role="group"
            aria-label={`Видео группа ${currentIndex + 1} из ${totalSlides}`}
          >
            {hrVideos.map((video) => (
              <CarouselCard 
                key={video.id}
                role="group"
                aria-labelledby={`video-${video.id}-name`}
                aria-describedby={`video-${video.id}-description`}
              >
                <VideoCard>
                  <VideoPreview>
                    <EmployeeImage 
                      src={video.imageUrl}
                      alt={`Фотография ${video.name}, ${video.position}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <PlayButton 
                      aria-label={`Воспроизвести видео: ${video.name} - ${video.position}. Продолжительность: ${video.duration}`}
                      aria-describedby={`video-${video.id}-description`}
                      onClick={() => handleVideoPlay(video)}
                      title={`Воспроизвести видео: ${video.description}`}
                    />
                    <SubtitlesOverlay aria-hidden="true">
                      Субтитры
                    </SubtitlesOverlay>
                  </VideoPreview>
                  
                  <EmployeeName 
                    variant="H4-Wide"
                    id={`video-${video.id}-name`}
                    role="heading"
                    aria-level={4}
                  >
                    {video.name}
                  </EmployeeName>
                  
                  <VideoDescription 
                    variant="P4-Regular-Text"
                    id={`video-${video.id}-description`}
                  >
                    {video.description}
                  </VideoDescription>
                </VideoCard>
              </CarouselCard>
            ))}
          </CarouselTrack>
          
          <NavigationButton
            $direction="prev"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            aria-label={`Предыдущие видео. ${currentIndex === 0 ? 'Недоступно - вы находитесь в начале' : `Показать видео ${Math.max(1, currentIndex)}-${currentIndex + itemsPerView - 1}`}`}
            title="Предыдущая группа видео"
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
            aria-label={`Следующие видео. ${currentIndex >= maxIndex ? 'Недоступно - вы находитесь в конце' : `Показать видео ${currentIndex + itemsPerView + 1}-${Math.min(hrVideos.length, currentIndex + itemsPerView * 2)}`}`}
            title="Следующая группа видео"
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
            aria-label="Навигация по группам видео"
          >
            {Array.from({ length: totalSlides }, (_, index) => (
              <Dot
                key={index}
                $isActive={index === currentIndex}
                onClick={() => handleDotClick(index)}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Перейти к группе видео ${index + 1} из ${totalSlides}`}
                aria-controls={`carousel-panel-${index}`}
                tabIndex={index === currentIndex ? 0 : -1}
                title={`Группа видео ${index + 1}`}
              />
            ))}
          </DotsContainer>
        )}
      </CarouselContainer>

      {playingVideo && (
        <VideoPlayer
          videoUrl={playingVideo.videoUrl}
          subtitlesUrl={playingVideo.subtitlesUrl}
          title={`${playingVideo.name} - ${playingVideo.position}`}
          onClose={handleCloseVideo}
        />
      )}
    </>
  );
}); 