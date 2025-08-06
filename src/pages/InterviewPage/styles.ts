import styled, { createGlobalStyle } from "styled-components";
import { Text, mts_brand_red } from "@chernyshovaalexandra/mtsui";

const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1000,
  large: 1264,
} as const;

const mediaQuery = (breakpoint: keyof typeof breakpoints) =>
  `@media (max-width: ${breakpoints[breakpoint]}px)`;

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
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
`;

export const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: center;
  padding: 60px 0;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 250px;
    gap: 30px;
    padding: 50px 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 40px 0 20px;
    text-align: center;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;

  @media (max-width: 768px) {
    gap: 20px;
    max-width: 100%;
  }
`;

export const MainTitle = styled(Text)`
  color: #1d2023;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 1.25;
  }
`;

export const IntroText = styled(Text)`
  color: #6b7280;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const BulletList = styled.ul`
  font-family: "MTS Text", sans-serif;
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

  ${mediaQuery("desktop")} {
    font-size: 16px;
  }
`;

export const MobileHeroImage = styled.div`
  width: 300px;
  height: 300px;
  background: url("/images/interview-hero.svg") no-repeat center;
  background-size: contain;
  justify-self: center;

  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
`;

export const ContentSection = styled.section`
  padding: 40px 0 80px;

  @media (max-width: 768px) {
    padding: 30px 0 60px;
  }
`;
