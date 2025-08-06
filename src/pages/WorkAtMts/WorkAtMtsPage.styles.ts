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
  
  ${mediaQuery('desktop')} {
    min-height: 300px;
    padding: 40px 0 20px;
  }
  
  ${mediaQuery('tablet')} {
    min-height: 250px;
    padding: 32px 0 16px;
  }
  
  ${mediaQuery('mobile')} {
    min-height: 200px;
    padding: 24px 0 12px;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 60%;
  
  ${mediaQuery('desktop')} {
    max-width: 100%;
  }
  
  ${mediaQuery('tablet')} {
    max-width: 70%;
  }
  
  ${mediaQuery('mobile')} {
    max-width: 100%;
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  overflow-x: hidden;
  padding-top: 46px;
  
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
  
  ${accessibilityStyles}
`;

export const MainTitle = styled(Header).attrs({
  as: 'h1'
})`
  margin: 0;
  text-align: left;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  line-height: 140%;
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

export const VacancySection = styled.div`
  max-width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
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
    font-size: 24px;
  }
  
  ${accessibilityStyles}
`;

export const VacancySubtitle = styled.p`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #666666;
  margin: 8px 0 24px 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin: 8px 0 16px 0;
  }
  
  ${accessibilityStyles}
`; 