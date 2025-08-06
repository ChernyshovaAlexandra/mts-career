import styled, { css } from "styled-components";
import { Header } from "@chernyshovaalexandra/mtsui";
import { mts_brand_red } from "@chernyshovaalexandra/mtsui";

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1000,
  large: 1264
} as const;

const mediaQuery = (breakpoint: keyof typeof breakpoints) => 
  `@media (max-width: ${breakpoints[breakpoint]}px)`;

const accessibilityStyles = css`
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
  
  @media (prefers-contrast: high) {
    color: #000000;
    background-color: #FFFFFF;
    border: 2px solid #000000;
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 4px;
    border-radius: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
  
  ${accessibilityStyles}
`;

export const ContentContainer = styled.div`
  max-width: 1264px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 20px;
    max-width: 100%;
  }
`;

export const MainTitle = styled(Header).attrs({
  as: 'h1'
})`
  padding-top: 74px;
  margin: 0 auto;
  text-align: left;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  line-height: 110%;
  
  /* Улучшенная доступность для фокуса */
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 4px;
    border-radius: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Улучшенная читаемость */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  /* Улучшенный контраст */
  @media (prefers-contrast: high) {
    color: #000000;
  }
  
  ${mediaQuery('desktop')} {
    font-size: 30px;
    text-transform: uppercase;
  }
  
  ${mediaQuery('mobile')} {
    text-align: left;
  }
`;

export const BulletList = styled.ul`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  margin: 0 0 80px 0;
  padding-left: 20px;
  list-style: none;

  li {
    margin-bottom: 8px;
    position: relative;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &::before {
      content: "•";
      color: ${mts_brand_red};
      position: absolute;
      left: -16px;
      top: 0;
      font-size: 26px;
      line-height: 1;
    }
    
    /* Улучшенная доступность для фокуса */
    &:focus-within {
      outline: 2px solid ${mts_brand_red};
      outline-offset: 2px;
      border-radius: 4px;
    }
  }
  
  /* Улучшенная читаемость */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  /* Улучшенный контраст для людей с нарушениями зрения */
  @media (prefers-contrast: high) {
    li::before {
      color: #000000;
    }
  }
  
  ${mediaQuery('desktop')} {
    font-size: 16px;
  }
  
  @media (max-width: 500px) {
    margin: 0;
  }
`;

export const ContentSection = styled.section`
  padding: 0 0 80px;
  
  @media (max-width: 768px) {
    padding: 0px 0 60px;
  }
  
  ${accessibilityStyles}
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  color: #1D2023;
  font-family: MTS Wide;
  font-weight: 500;
  font-style: Medium;
  leading-trim: NONE;
  line-height: 110%;
  letter-spacing: 0px;

  margin: 0;
  text-align: left;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  /* Улучшенная доступность для фокуса */
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 4px;
    border-radius: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Улучшенный контраст */
  @media (prefers-contrast: high) {
    color: #000000;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  
  /* Убираем возможность фокуса на контейнере карусели */
  outline: none;
  
  /* Убираем возможность выделения при клике */
  user-select: none;
  
  /* Убираем возможность фокуса */
  &:focus {
    outline: none;
  }
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: var(--background-light-lower);
  border-radius: 32px;
  padding: 30px;
  position: relative;
  
  /* Убираем возможность выделения при клике */
  user-select: none;
  
  /* Убираем возможность фокуса */
  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
    padding: 20px;
    border-radius: 24px;
  }
  
  @media (max-width: 500px) {
    padding: 20px;
  }
  
  ${accessibilityStyles}
`;

export const CarouselHeader = styled.div`
  position: relative;
  margin-bottom: 32px;
  align-self: flex-start;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const CarouselSubtitle = styled.p`
  font-family: 'MTS Text', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  color: #6B7280;
  margin: 12px 0 0 0;
  text-align: left;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 70%;
  }
  
  /* Улучшенный контраст */
  @media (prefers-contrast: high) {
    color: #000000;
  }
`;

export const CarouselImage = styled.div`
  position: absolute;
  top: -190px;
  right: 0;
  width: 500px;
  height: 385px;
  background: url('/images/interview-bg.webp') no-repeat center;
  background-size: contain;
  pointer-events: none;
  z-index: 3;
  transform: translateY(-50%);
  
  /* Улучшенная доступность для скринридеров */
  &[role="img"] {
    /* Обеспечиваем, что декоративные изображения не мешают навигации */
    pointer-events: none;
  }
  
  /* Улучшенная читаемость */
  @media (prefers-reduced-motion: reduce) {
    transform: none;
  }
  
  @media (max-width: 1024px) {
    width: 400px;
    height: 308px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
  
  &.mobile-header-image {
    @media (max-width: 768px) {
      display: block !important;
      position: static !important;
      width: 200px;
      height: 154px;
      transform: none;
      margin: 20px auto;
      z-index: 1;
    }
  }
`;

export const CreateInterviewButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: ${mts_brand_red};
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'MTS Text', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  max-width: 300px;
  margin: 24px 0;
  
  &:hover {
    background: #d32f2f;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 4px;
    border-radius: 12px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 14px;
    max-width: 250px;
    margin: 20px 0;
  }
  
  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 13px;
    max-width: 200px;
    margin: 16px 0;
  }
  
  ${accessibilityStyles}
`; 