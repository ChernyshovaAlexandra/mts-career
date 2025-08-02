import { Text } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
`;

export const CarouselStatus = styled.div`
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 60px;
  
  @media (max-width: 768px) {
    padding: 0 50px;
  }

    @media (max-width: 500px) {
    padding: 0px;
  }
`;

export const CarouselTrack = styled.div<{
  $currentIndex: number;
  $itemsPerView: number;
}>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${({ $currentIndex, $itemsPerView }) => 
    ($currentIndex * (100 / $itemsPerView))}%);
  gap: 20px;
`;

export const CarouselCard = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
`;

export const InterviewCardElement = styled.div`
  background: #FFFFFF;
  width: 100%;
  max-width: 620px;
  height: 420px;
  border-radius: 20px;
  padding: 30px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 282px;
    height: 470px;
    padding: 20px;
    border-radius: 20px;
    margin: 0 auto;
  }
  
  @media (max-width: 500px) {
    width: 282px;
    height: 470px;
    padding: 20px;
    border-radius: 20px;
    margin: 0 auto;
  }  
  
  @media (max-width: 1024px) {
    max-width: 480px;
    height: 380px;
    padding: 24px;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

export const CardImagePlaceholder = styled.div`
  width: 100%;
  max-width: 560px;
  height: 206px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z' fill='%23D1D5DB'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 48px 48px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    width: 242px;
    height: 200px;
    border-radius: 16px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 1024px) {
    max-width: 432px;
    height: 186px;
    margin-bottom: 20px;
  }
`;

export const CardImage = styled.img`
  width: 560px;
  height: 206px;
  border-radius: 16px;
  object-fit: cover;
  display: block;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 180px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 1024px) {
    width: 432px;
    height: 186px;
    margin-bottom: 20px;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const CardTitle = styled(Text)`
  color: #1D2023;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  letter-spacing: 0px;
  text-transform: uppercase;
  margin: 0;
  font-family: 'MTS Text', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 1024px) {
    font-size: 22px;
  }
`;

export const CardDescription = styled(Text)`
  color: #6B7280;
  font-weight: 400;
  font-size: 17px;
  line-height: 140%;
  letter-spacing: 0px;
  margin: 0;
  flex: 1;
  font-family: 'MTS Text', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 1024px) {
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
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
  
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: #FFFFFF;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: translateY(-50%);
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-50%);
    }
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
  margin-top: 32px;
  
  @media (max-width: 768px) {
    margin-top: 24px;
    gap: 6px;
  }
`;

export const Dot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive }) => $isActive ? '#E20A16' : '#D1D5DB'};
  
  &:hover {
    background: ${({ $isActive }) => $isActive ? '#C8091C' : '#9CA3AF'};
    transform: scale(1.1);
  }
  
  &:focus-visible {
    outline: 2px solid #E20A16;
    outline-offset: 2px;
  }
`; 