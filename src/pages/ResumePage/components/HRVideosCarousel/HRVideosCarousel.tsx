import type { FC } from "react";
import { memo } from "react";
import { hrVideos } from "../../constants";
import {
  CarouselContainer,
  CarouselWrapper,
  CarouselTrack,
  CarouselCard,
  VideoCard,
  EmployeeName,
  VideoDescription,
  CarouselStatus
} from "./styles";

export const HRVideosCarousel: FC = memo(() => {
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
          Горизонтальная карусель. Прокручивайте влево/вправо касанием или мышью.
        </CarouselStatus>

        <CarouselWrapper>
          <CarouselTrack role="group" aria-label="Список видео">
            {hrVideos.map((video) => (
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
                      style={{ width: '100%', borderRadius: 16 }}
                      aria-label={`Видео: ${video.name} — ${video.position}`}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      {video.subtitlesUrl && (
                        <track kind="subtitles" src={video.subtitlesUrl} srcLang="ru" label="Русский" default />
                      )}
                      Ваш браузер не поддерживает воспроизведение видео.
                    </video>
                  </div>
                  
                  <EmployeeName 
                    variant="H4-Wide"
                    id={`video-${video.id}-name`}
                    role="heading"
                    aria-level={4}
                  >
                    {video.name}
                  </EmployeeName>
                  <VideoDescription 
                    as="div"
                    variant="P4-Regular-Text"
                    id={`video-${video.id}-position`}
                    aria-label="Должность"
                  >
                    {video.position}
                  </VideoDescription>
                </VideoCard>
              </CarouselCard>
            ))}
          </CarouselTrack>
          
          
        </CarouselWrapper>
        
      </CarouselContainer>
      
    </>
  );
}); 