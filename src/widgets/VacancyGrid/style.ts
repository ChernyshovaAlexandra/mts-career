import styled from "styled-components";
import {
  mts_text_primary,
  mts_brand_red,
  mts_bg_secondary_elevated,
  mts_text_tertiary,
} from "@chernyshovaalexandra/mtsui";

export const TagRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 500px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    gap: 12px;
    padding-bottom: 8px;
  }
`;

export const FilterTag = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? mts_text_tertiary : mts_bg_secondary_elevated};
  color: ${({ $active }) => ($active ? "#fff" : mts_text_primary)};
  transition: background 0.2s;

  &:focus {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  @media (max-width: 500px) {
    flex-shrink: 0;
    white-space: nowrap;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(622px, 1fr));
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const VacancyCard = styled.article`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: ${mts_bg_secondary_elevated};
  padding: 30px;
  border-radius: 32px;
  width: 622px;
  height: 200px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 160px;
    padding: 20px;
    border-radius: 16px;
  }
  
  @media (max-width: 500px) {
    padding: 20px;
    border-radius: 32px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 200px;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 1;
  
  @media (max-width: 500px) {
    height: auto;
    gap: 0;
    justify-content: space-between;
    min-height: 200px;
  }
`;

export const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 500px) {
    gap: 10px;
  }
`;

export const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  
  @media (max-width: 500px) {
    margin-top: 20px;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 140%;
  color: #666666;
  
  @media (max-width: 500px) {
    flex-wrap: wrap;
    gap: 4px;
    line-height: 1.4;
  }
`;

export const TagItem = styled.span`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: "•";
    margin: 0 4px;
    color: #666666;
  }
  
  @media (max-width: 500px) {
    &:not(:last-child)::after {
      margin: 0 2px;
    }
  }
`;

export const ActionButton = styled.button`
  background: ${mts_brand_red};
  border: none;
  border-radius: 16px;
  width: 44px;
  height: 44px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #d60028;
  }
  
  &:focus {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  @media (max-width: 500px) {
    display: none;
  }
`;
