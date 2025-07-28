import {
  mts_bg_secondary_elevated,
  mts_brand_red,
} from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";

export const QuizQuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 32px;
  background: ${mts_bg_secondary_elevated};
  padding: 32px;
  margin-top: 12px;

  h2 {
    text-align: center;
    white-space: pre-wrap;
    max-width: 80%;
    margin: auto;
  }
`;

export const AnswersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 33px 0;

  &[data-has-selection="true"] > li:not([aria-checked="true"]) {
    opacity: 0.5;
  }

  @media (max-width: 1279px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 959px) {
    display: flex;
    overflow-x: auto;

    gap: 12px;
  }
`;

export const AnswerItem = styled.li`
  position: relative;
  flex: 0 0 240px;
  border-radius: 16px;
  background: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  outline: 2px solid transparent;

  &::before {
    content: attr(data-index);
    position: absolute;
    top: -18px; /* прижим вверх */
    left: 50%;
    transform: translateX(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-family: "MTS Text";
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    color: #fff;
    background: ${mts_brand_red};
    transition: background 0.2s ease, opacity 0.2s ease;
    z-index: 1;
  }

  &[aria-checked="true"] {
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.12);
    cursor: default;
    outline: 2px solid transparent;
  }
`;
