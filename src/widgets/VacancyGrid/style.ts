import styled from "styled-components";
import {
  mts_text_primary,
  mts_brand_red,
  mts_bg_secondary_elevated,
} from "@chernyshovaalexandra/mtsui";

export const TagRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const FilterTag = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 10px;
  font-family: "MTS Compact", Arial, sans-serif;
  font-size: 14px;
  border: none;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "#000" : mts_bg_secondary_elevated};
  color: ${({ $active }) => ($active ? "#fff" : mts_text_primary)};
  transition: background 0.2s;

  &:focus {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

export const VacancyCard = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: ${mts_bg_secondary_elevated};
  padding: 16px;
  border-radius: 10px;
  min-height: 130px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 1px ${mts_brand_red};
  }
`;
