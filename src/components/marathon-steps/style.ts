import {
  mts_bg_lower,
  mts_greyscale_800,
  mts_icon_secondary,
} from "@chernyshovaalexandra/mtsui";
import styled, { css } from "styled-components";

export const MarathonSection = styled.section`
  position: relative;
`;

export const GrayBlock = styled.li`
  display: flex;
  border-radius: 32px;
  background: ${mts_bg_lower};
  flex: 1;
  padding: 30px;
  align-items: center;
  gap: 20px;
`;

export const GrayBlockDiv = styled.div`
  border-radius: 32px;
  background: ${mts_bg_lower};
  flex: 1;
  padding: 30px;
  text-align: center;
  dl {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  dt {
    color: ${mts_greyscale_800};
    text-align: center;
    font-feature-settings: "liga" off, "clig" off;
    font-family: "MTS Wide";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 28.8px */
    text-transform: uppercase;
  }
  dd {
    color: ${mts_icon_secondary};
    text-align: center;
    font-feature-settings: "liga" off, "clig" off;

    font-family: "MTS Text";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const HiddenHeading = styled.h2`
  ${srOnly}
`;

export const StyledOl = styled.ol`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;
