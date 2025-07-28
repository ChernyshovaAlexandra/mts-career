import { mts_bg_secondary_elevated } from "@chernyshovaalexandra/mtsui";
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
  flex: 0 0 240px;
  border-radius: 16px;
  background: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
