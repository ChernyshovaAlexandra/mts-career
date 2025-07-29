import type { FC } from "react";
import { memo, useState, useEffect } from "react";
import { Text, Header, IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { VideoPlayer } from "./VideoPlayer";
import type { HRVideo } from "../constants";
import { hrVideos } from "../constants";
import styled from "styled-components";

const CarouselContainer = styled.section`
  position: relative;
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin: 0;
`;

const CarouselTrack = styled.div<{ $currentIndex: number; $itemsPerView: number }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${({ $currentIndex, $itemsPerView }) => 
    ($currentIndex * 100) / $itemsPerView}%);
  margin: 0 60px;
  
  @media (max-width: 768px) {
    margin: 0 50px;
  }
`;

const CarouselCard = styled.article`
  flex: 0 0 33.333%;
  padding: 0 10px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    flex: 0 0 50%;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const VideoCard = styled.div`
  background: #ffffff;
  border-radius: 32px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 344px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    width: 282px;
    height: 426px;
    border-radius: 16px;
    padding: 20px;
  }
  
  @media (max-width: 500px) {
    width: 260px;
    height: 380px;
    gap: 12px;
    padding: 16px;
  }
`;

const VideoPreview = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  
  @media (max-width: 500px) {
    width: 240px;
    height: 240px;
  }
`;

const EmployeeImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: translate(-50%, -50%) scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid #E31E24;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 12px solid #333;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    margin-left: 3px;
  }
`;

const SubtitlesOverlay = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const EmployeeName = styled(Header)`
  font-size: 24px;
  font-weight: 500;
  line-height: 120%;
  margin: 0;
  color: #212529;
  text-transform: uppercase;


    @media (max-width: 500px) {
    font-size: 22px;
  }
`;

const VideoDescription = styled(Text)`
  font-size: 17px;
  font-weight: 400;
  line-height: 140%;
  color: #495057;
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  text-align: left;

      @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const NavigationButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => $direction === 'prev' ? 'left: 0;' : 'right: 0;'}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 1px solid #dee2e6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #adb5bd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:focus-visible {
    outline: 2px solid #E31E24;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $isActive }) => $isActive 
    ? 'background: #E31E24;'
    : 'background: #dee2e6;'
  }

  &:focus-visible {
    outline: 2px solid #E31E24;
    outline-offset: 2px;
    transform: scale(1.2);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:hover {
    ${({ $isActive }) => !$isActive && 'background: #adb5bd;'}
  }
`;

const CarouselStatus = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;



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
            {hrVideos.map((video, index) => (
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