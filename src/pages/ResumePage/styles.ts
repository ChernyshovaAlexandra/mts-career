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
  max-width: ${breakpoints.large}px;
  margin: 0 auto;
  width: 100%;
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

export const MainTitle = styled(Header).attrs({
  as: 'h1'
})`
  margin: 0 auto;
  text-align: center;
  font-size: 56px;
  font-weight: 500;
  font-family: "MTS Wide", sans-serif;
  font-style: normal;
  text-transform: uppercase;
  line-height: 140%;
  color: #fff;
  
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
  color: #fff;
  
  ${mediaQuery('desktop')} {
    display: none;
  }
`;

export const BulletList = styled.ol`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0px;
  margin: 0 0 21px 0;
  padding-left: 20px;
  list-style: none;
  counter-reset: item;
  color: #fff;

  li {
    margin-bottom: 8px;
    position: relative;
    counter-increment: item;
    
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
  }
  
  ${mediaQuery('desktop')} {
    font-size: 20px;
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