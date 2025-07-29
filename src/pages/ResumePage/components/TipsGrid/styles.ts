import styled from "styled-components";
import { Header, Text, mts_brand_red } from "@chernyshovaalexandra/mtsui";

export const TipsContainer = styled.section`
  margin: 24px 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  
  @media (max-width: 500px) {
    padding: 0 10px;
  }
  
  @media (min-width: 769px) and (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 370px));
    justify-content: center;
  }
  
  @media (min-width: 1201px) {
    grid-template-columns: repeat(auto-fit, 370px);
    justify-content: center;
  }
`;

export const TipCard = styled.article<{ $isFlipped: boolean }>`
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
`;

export const TipDescription = styled(Text)`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6c757d;
  text-align: center;
`;

export const BackContent = styled(Text)`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #212529;
  text-align: left;
  overflow-y: auto;
`; 