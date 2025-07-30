import styled from "styled-components";
import { Header, Text, mts_brand_red } from "@chernyshovaalexandra/mtsui";

export const CarouselContainer = styled.section`
  position: relative;
  overflow: hidden;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  margin: 0;
`;

export const CarouselTrack = styled.div<{ $currentIndex: number; $itemsPerView: number }>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${({ $currentIndex, $itemsPerView }) => 
    ($currentIndex * 100) / $itemsPerView}%);
  margin: 0 60px;
  
  @media (max-width: 768px) {
    margin: 0 50px;
  }
`;

export const CarouselCard = styled.article`
  flex: 0 0 33.333%;
  padding: 0 10px;
  box-sizing: border-box;
  
  @media (max-width: 800px) {
    flex: 0 0 50%;
  }
  
  @media (max-width: 500px) {
    flex: 0 0 100%;
  }
`;

export const TipCard = styled.div<{ $isFlipped: boolean }>`
  perspective: 1000px;
  height: 296px;
  width: 100%;
  max-width: 370px;
  cursor: pointer;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const CardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $isFlipped }) => $isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

export const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ffffff;
  border-radius: 32px;
  padding: 20px;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid #e9ecef;
    border-radius: 24px;
    pointer-events: none;
    z-index: 1;
  }
`;

export const CardFront = styled(CardSide)`
`;

export const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  padding: 16px;
`;

export const TipTitle = styled(Header)`
  margin: 0 0 12px 0;
  font-family: "MTS Wide";
  font-weight: 500;
  font-size: 24px;
  text-transform: uppercase;
  color: #212529;
  text-align: center;
  z-index: 2;
  position: relative;
`;

export const TipDescription = styled(Text)`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6c757d;
  text-align: center;
  z-index: 2;
  position: relative;
`;

export const BackContent = styled(Text)`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #212529;
  text-align: left;
  overflow-y: auto;
  z-index: 2;
  position: relative;
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
    outline: 2px solid ${mts_brand_red};
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
    ? `background: ${mts_brand_red};`
    : 'background: #dee2e6;'
  }

  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
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