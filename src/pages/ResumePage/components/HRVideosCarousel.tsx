import type { FC } from "react";
import { memo, useState, useEffect } from "react";
import { Text, Header, IconArrowCircle } from "@chernyshovaalexandra/mtsui";
import { VideoPlayer } from "./VideoPlayer";
import styled from "styled-components";

interface HRVideo {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  subtitlesUrl: string;
  duration: string;
}

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
    width: 100%;
    max-width: 344px;
    padding: 20px;
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
  
  &:hover {
    ${({ $isActive }) => !$isActive && 'background: #adb5bd;'}
  }
`;

const hrVideos: HRVideo[] = [
  {
    id: "video-1",
    name: "Анна Петрова",
    position: "HR-директор",
    description: "Расскажу, как составить резюме, которое привлечет внимание рекрутера с первых секунд просмотра.",
    imageUrl: "/images/hr/anna-petrova.jpg",
    videoUrl: "/videos/hr/anna-petrova.mp4",
    subtitlesUrl: "/videos/hr/anna-petrova.vtt",
    duration: "5-7 мин"
  },
  {
    id: "video-2", 
    name: "Михаил Сидоров",
    position: "Старший рекрутер",
    description: "Покажу самые распространенные ошибки в резюме и как их избежать на конкретных примерах.",
    imageUrl: "/images/hr/mikhail-sidorov.jpg",
    videoUrl: "/videos/hr/mikhail-sidorov.mp4",
    subtitlesUrl: "/videos/hr/mikhail-sidorov.vtt",
    duration: "6-8 мин"
  },
  {
    id: "video-3",
    name: "Елена Козлова", 
    position: "IT-рекрутер",
    description: "Поделюсь особенностями составления резюме для IT-сферы и технических специальностей.",
    imageUrl: "/images/hr/elena-kozlova.jpg",
    videoUrl: "/videos/hr/elena-kozlova.mp4",
    subtitlesUrl: "/videos/hr/elena-kozlova.vtt",
    duration: "4-6 мин"
  },
  {
    id: "video-4",
    name: "Дмитрий Волков",
    position: "Ведущий рекрутер",
    description: "Объясню, как правильно описать навыки и достижения, чтобы выделиться среди других кандидатов.",
    imageUrl: "/images/hr/dmitry-volkov.jpg",
    videoUrl: "/videos/hr/dmitry-volkov.mp4",
    subtitlesUrl: "/videos/hr/dmitry-volkov.vtt",
    duration: "7-9 мин"
  }
];

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

  return (
    <>
      <CarouselContainer>
        <CarouselWrapper>
          <CarouselTrack $currentIndex={currentIndex} $itemsPerView={itemsPerView}>
            {hrVideos.map((video) => (
              <CarouselCard key={video.id}>
                <VideoCard>
                  <VideoPreview>
                    <EmployeeImage 
                      src={video.imageUrl}
                      alt={`Фото сотрудника ${video.name}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <PlayButton 
                      aria-label={`Воспроизвести видео: ${video.name}`}
                      onClick={() => handleVideoPlay(video)}
                    />
                    <SubtitlesOverlay>Субтитры субтитры</SubtitlesOverlay>
                  </VideoPreview>
                  
                  <EmployeeName variant="H4-Wide">
                    {video.name}
                  </EmployeeName>
                  
                  <VideoDescription variant="P4-Regular-Text">
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
            aria-label="Предыдущие видео"
          >
            <IconArrowCircle
              outlined={false}
              direction="left"
              color="#1D2023"
            />
          </NavigationButton>
          
          <NavigationButton
            $direction="next" 
            onClick={handleNextClick}
            disabled={currentIndex >= maxIndex}
            aria-label="Следующие видео"
          >
            <IconArrowCircle
              outlined={false}
              direction="right"
              color="#1D2023"
            />
          </NavigationButton>
        </CarouselWrapper>
        
        <DotsContainer>
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Dot
              key={index}
              $isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </DotsContainer>
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