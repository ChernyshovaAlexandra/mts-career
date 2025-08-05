import styled from "styled-components";
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
  
  @media (max-width: 1024px) {
    flex: 0 0 50%;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

export const NavigationButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => $direction === 'prev' ? 'left: 0;' : 'right: 0;'}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  &:focus {
    outline: 2px solid #e31e24;
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

export const Dot = styled.button<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ $isActive }) => $isActive ? '#e31e24' : '#d1d5db'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $isActive }) => $isActive ? '#e31e24' : '#9ca3af'};
  }
  
  &:focus {
    outline: 2px solid #e31e24;
    outline-offset: 2px;
  }
`;

export const CarouselStatus = styled.div`
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`; 