import styled from "styled-components";
import { Text, Header } from "@chernyshovaalexandra/mtsui";

export const CarouselContainer = styled.section`
  position: relative;
  overflow: hidden;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0 60px; /* space for nav buttons */

  @media (max-width: 768px) {
    padding: 0 0px;
  }
`;

// Row container used inside each Ant Design Carousel slide
export const SlideRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`;

export const CarouselCard = styled.article`
  flex: 0 0 33.333%;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0; /* allow content to shrink within flex item to avoid overflow */
  
  @media (max-width: 1024px) {
    flex: 0 0 50%;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

export const VideoCard = styled.div`
  background: #ffffff;
  border-radius: 32px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 344px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    max-width: 282px;
    height: 426px;
    border-radius: 16px;
    padding: 20px;
  }
  
  @media (max-width: 500px) {
    max-width: 260px;
    height: 380px;
    gap: 12px;
    padding: 16px;
  }
`;

export const VideoPreview = styled.div`
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
    width: 200px;
    height: 200px;
  }
`;

export const EmployeeImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const PlayButton = styled.button`
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

export const SubtitlesOverlay = styled.div`
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

export const EmployeeName = styled(Header)`
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

export const VideoDescription = styled(Text)`
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

export const NavigationButton = styled.button<{ $direction: 'prev' | 'next' }>`
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

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

export const Dot = styled.button<{ $isActive: boolean }>`
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

export const CarouselStatus = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`; 