import { Flex } from "antd";
import styled from "styled-components";

export const MainS = styled.section.attrs(() => ({
  role: "region",
  "aria-labelledby": "main-section-heading",
}))`
  background: url("/images/KV.png"),
    linear-gradient(
      347deg,
      #ffd4c9 -2.24%,
      #edccd3 16.66%,
      #bfb8ed 52.9%,
      #9faaff 76.53%,
      #a1a1ff 103.3%
    ),
    #d9d9d9;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 90%, 100%;
  position: relative;
  padding-top: 2rem;
  margin-bottom: -65px;
  aspect-ratio: 375/455;

  @media screen and (min-width: 470px) {
    aspect-ratio: 375/340;
  }
  @media screen and (min-width: 640px) {
    aspect-ratio: 375/300;
  }
  @media screen and (min-width: 840px) {
    aspect-ratio: 1440 / 525;
    background-position: 100% 60%;
    background-size: 55%, 100%;
  }

  /* Контраст и читаемость */
  h1 {
    color: #fff;
    text-transform: uppercase;
    white-space: pre-wrap;
    text-align: center;
    
    @media screen and (min-width: 840px) {
      text-align: left;
    }
    @media screen and (min-width: 1280px) {
      font-size: 56px;
      line-height: 110%;
    }
  }
  p {
    color: #fff;
    text-align: center;
    @media screen and (min-width: 840px) {
      text-align: left;
    }
  }

  /* Фокусная рамка для клавиатурной навигации */
  &:focus-within {
    outline: 3px solid #fff;
    outline-offset: 4px;
  }
`;

export const ContentMain = styled.div`
  flex: 1 1 50%;

  @media screen and (min-width: 840px) {
    flex: 0 1 50%;
    margin-top: 7%;
  }
`;
export const FlexStyled = styled(Flex)``;
