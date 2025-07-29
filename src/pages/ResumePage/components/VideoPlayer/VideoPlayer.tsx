import type { FC } from "react";
import { memo, useRef, useEffect } from "react";
import {
  PlayerOverlay,
  PlayerContainer,
  VideoElement,
  CloseButton,
  PlayerTitle
} from "./styles";

interface VideoPlayerProps {
  videoUrl: string;
  subtitlesUrl: string;
  title: string;
  onClose: () => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = memo(({ 
  videoUrl, 
  subtitlesUrl, 
  title, 
  onClose 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.focus();
    }
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <PlayerOverlay onClick={handleOverlayClick}>
      <PlayerContainer>
        <CloseButton
          variant="secondary"
          onClick={onClose}
          aria-label="Закрыть видео"
        />
        
        <VideoElement
          ref={videoRef}
          controls
          autoPlay
          crossOrigin="anonymous"
          aria-label={`Видео: ${title}`}
        >
          <source src={videoUrl} type="video/mp4" />
          <track
            kind="subtitles"
            src={subtitlesUrl}
            srcLang="ru"
            label="Русский"
            default
          />
          Ваш браузер не поддерживает воспроизведение видео.
        </VideoElement>
        
        <PlayerTitle>{title}</PlayerTitle>
      </PlayerContainer>
    </PlayerOverlay>
  );
}); 