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

export const HeaderSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 0;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 0;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const HeaderImage = styled.div`
  position: absolute;
  right: 0;
  top: 74px;
  width: 456px;
  height: 367px;
  background-image: url('/images/mts-job.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  @media (max-width: 768px) {
    position: relative;
    right: auto;
    top: auto;
    width: 200px;
    height: 200px;
    align-self: center;
  }
  
  @media (max-width: 500px) {
    width: 150px;
    height: 150px;
  }
`;

export const MainTitle = styled(Header).attrs({
  as: 'h1'
})`
  padding-top: 74px;
  margin: 0 0 16px 0;
  text-align: left;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  line-height: 110%;
  
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
    font-size: 16px;
  }
  
  @media (max-width: 500px) {
    margin: 0 0 20px 0;
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