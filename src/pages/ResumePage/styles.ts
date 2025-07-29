import styled, { css, createGlobalStyle } from "styled-components";
import { Text, Header, mts_brand_red } from "@chernyshovaalexandra/mtsui";

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1000,
  large: 1264
} as const;

const mediaQuery = (breakpoint: keyof typeof breakpoints) => 
  `@media (max-width: ${breakpoints[breakpoint]}px)`;

const hideRedOutlineOnClick = css`
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const GlobalAccessibilityStyles = createGlobalStyle`
  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  button, a, [role="button"], [tabindex]:not([tabindex="-1"]) {
    ${hideRedOutlineOnClick}
  }
`;

export const PageContainer = styled.div`
  padding-top: 44px;
  max-width: ${breakpoints.large}px;
  margin: 0 auto;
  width: 100%;
`;

export const HeroSection = styled.section`
  position: relative;
  background-image: url('/images/resume-bg.webp');
  background-repeat: no-repeat;
  background-position: right top;
  background-size: auto 400px;
  min-height: 400px;
  
  ${mediaQuery('desktop')} {
    background-image: none;
    min-height: auto;
  }
  
  ${mediaQuery('tablet')} {
    background-size: auto 300px;
    min-height: 300px;
    background-position: right center;
  }
  
  ${mediaQuery('mobile')} {
    background-image: none;
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

export const MainTitle = styled(Header).attrs({
  as: 'h1'
})`
  padding: 68px 0 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  line-height: 140%;
  
  ${hideRedOutlineOnClick}
  
  ${mediaQuery('desktop')} {
    font-size: 30px;
    text-transform: uppercase;
  }
  
  ${mediaQuery('mobile')} {
    text-align: left;
  }
`;

export const IntroText = styled(Text)`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  margin-bottom: 21px;
  
  ${mediaQuery('desktop')} {
    display: none;
  }
`;

export const BulletList = styled.ul`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  margin: 0 0 21px 0;
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
  }
  
  ${mediaQuery('desktop')} {
    font-size: 16px;
  }
`;

export const MobileHeroImage = styled.div`
  display: none;
  
  ${mediaQuery('desktop')} {
    display: block;
    width: 100%;
    height: 300px;
    background-image: url('/images/resume-bg.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin: 24px 0;
  }
  
  ${mediaQuery('mobile')} {
    height: 200px;
  }
`;

export const ContentSection = styled.section`
  margin-top: 48px;
`; 