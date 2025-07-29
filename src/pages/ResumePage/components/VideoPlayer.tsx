import type { FC } from "react";
import { memo, useRef, useEffect } from "react";
import { Button } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

interface VideoPlayerProps {
  videoUrl: string;
  subtitlesUrl: string;
  title: string;
  onClose: () => void;
}

const PlayerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const PlayerContainer = styled.div`
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.1) !important;
  border: none !important;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }
  
  &::before {
    content: '×';
    font-size: 24px;
    line-height: 1;
  }
`;

const PlayerTitle = styled.div`
  position: absolute;
  bottom: 60px;
  left: 16px;
  right: 16px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

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