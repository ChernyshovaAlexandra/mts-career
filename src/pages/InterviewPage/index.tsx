import type { FC } from "react";
import { Text, Header, Button } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { InterviewCarousel } from "./components/InterviewCarousel";
// import { interviewPageSEO } from "./seo";
import styled, { css } from "styled-components";
import { mts_brand_red } from "@chernyshovaalexandra/mtsui";

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

const PageContainer = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding-bottom: 40px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1264px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 12px;
  
  @media (max-width: 768px) {
    gap: 20px;
    max-width: 100%;
  }
`;

const MainTitle = styled(Header).attrs({
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
  
  ${hideRedOutlineOnClick}
  
  ${mediaQuery('desktop')} {
    font-size: 30px;
    text-transform: uppercase;
  }
  
  ${mediaQuery('mobile')} {
    text-align: left;
  }
`;

const BulletList = styled.ul`
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
  }
  
  ${mediaQuery('desktop')} {
    font-size: 16px;
  }
`;

const ContentSection = styled.section`
  padding: 0 0 80px;
  
  @media (max-width: 768px) {
    padding: 0px 0 60px;
  }
`;

const SectionTitle = styled.h2`
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
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselWrapper = styled.div`
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
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 400px;
    padding: 20px;
    border-radius: 24px;
  }
`;

const CarouselHeader = styled.div`
  position: relative;
  margin-bottom: 32px;
  align-self: flex-start;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const CarouselSubtitle = styled.p`
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
`;

const CarouselImage = styled.div`
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

const InterviewPage: FC = () => {

  return (
    <>
      <MainLayout>
        <PageContainer>
          <ContentContainer>
          <ContentWrapper>
                <MainTitle id="main-heading">
                  Подготовка к собеседованию
                </MainTitle>
                
                <CarouselImage 
                  role="img" 
                  aria-label="Иллюстрация подготовки к собеседованию"
                  className="mobile-header-image"
                />

                <BulletList 
                  role="list" 
                  aria-label="Этапы подготовки к собеседованию"
                >
                  <li role="listitem">Читай советы от экспертов по найму</li>
                  <li role="listitem">Пройди тренировку интервью онлайн</li>
                  <li role="listitem">Получи обратную связь и двигайся дальше</li>
                </BulletList>
              </ContentWrapper>

            <ContentSection 
              aria-labelledby="basic-rules-heading"
              role="main"
            >
              <CarouselContainer>
                <CarouselImage 
                  role="img" 
                  aria-label="Иллюстрация подготовки к собеседованию"
                />
                <CarouselWrapper>
                  <CarouselHeader>
                    <SectionTitle id="basic-rules-heading">
                      Основные правила
                    </SectionTitle>
                    <CarouselSubtitle>
                      Узнай секреты успешного интервью: листай слайдер, запоминай ключевые моменты и получай заслуженные баллы
                    </CarouselSubtitle>
                  </CarouselHeader>
                  <InterviewCarousel />

                  <Button
                  variant="primary"

              type="button"
              aria-label="Получить баллы за изучение материалов"
            >
              Получить баллы
            </Button>
                </CarouselWrapper>


              </CarouselContainer>
            </ContentSection>
            
          </ContentContainer>
        </PageContainer>
      </MainLayout>
    </>
  );
};

export default InterviewPage;
