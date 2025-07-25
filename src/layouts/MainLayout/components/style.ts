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
    background-position: 100% 60%;
    background-size: 55%, 100%;
    position: relative;
    margin-bottom: -5rem;
    padding: 4rem;
    aspect-ratio: 1440 / 525;
  
    /* Контраст и читаемость */
    h1 {
      color: #fff;
      text-transform: uppercase;
      white-space: pre-wrap;
    }
    p {
      color: #fff;
    }
  
    /* Фокусная рамка для клавиатурной навигации */
    &:focus-within {
      outline: 3px solid #fff;
      outline-offset: 4px;
    }
  `;