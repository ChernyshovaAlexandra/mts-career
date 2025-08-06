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
  padding-top: 0;
  
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
  
  ${accessibilityStyles}
`;

export const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(
    347deg,
    #ffd4c9 -2.24%,
    #edccd3 16.66%,
    #bfb8ed 52.9%,
    #9faaff 76.53%,
    #a1a1ff 103.3%
  );
  min-height: 400px;
  padding: 68px 0 40px;
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    min-height: 300px;
    padding: 40px 0 20px;
    margin-bottom: 32px;
  }
  
  @media (max-width: 480px) {
    min-height: 250px;
    padding: 32px 0 16px;
    margin-bottom: 24px;
  }
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
  margin: 0 auto;
  text-align: left;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  line-height: 110%;
  color: #fff;
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 4px;
    border-radius: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
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

export const BulletList = styled.ol`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0px;
  margin: 0 0 80px 0;
  padding-left: 20px;
  list-style: none;
  counter-reset: item;
  color: #fff;

  li {
    margin-bottom: 8px;
    position: relative;
    counter-increment: item;
    padding-left: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &::before {
      content: counter(item, decimal-leading-zero);
      color: #fff;
      position: absolute;
      left: -34px;
      top: 0;
      font-size: 24px;
      line-height: 130%;
      font-weight: 400;
    }
    
    &:focus-within {
      outline: 2px solid ${mts_brand_red};
      outline-offset: 2px;
      border-radius: 4px;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  @media (prefers-contrast: high) {
    li::before {
      color: #000000;
    }
  }
  
  ${mediaQuery('desktop')} {
    font-size: 20px;
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
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 4px;
    border-radius: 4px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  @media (prefers-contrast: high) {
    color: #000000;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  
  outline: none;
  
  user-select: none;
  
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
  
  user-select: none;
  
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
  
  &[role="img"] {
    pointer-events: none;
  }
  
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