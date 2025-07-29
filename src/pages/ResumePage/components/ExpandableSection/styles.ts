import styled from "styled-components";
import { Header, Text, mts_brand_red } from "@chernyshovaalexandra/mtsui";

export const SectionContainer = styled.section`
  margin: 24px 0;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
  background: var(--background-light-lower);

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const SectionHeader = styled.button<{ $isExpanded: boolean; $hasDescription: boolean }>`
  width: 100%;
  background: var(--background-light-lower);
  padding: ${({ $isExpanded, $hasDescription }) => 
    ($isExpanded && $hasDescription) ? "20px 24px 22px 24px" : "20px 24px"};
  display: flex;
  align-items: ${({ $isExpanded, $hasDescription }) => 
    ($isExpanded && $hasDescription) ? "flex-start" : "center"};
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: left;
  border: none;
  
  &:hover {
    background: #e9ecef;
  }

  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: -2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const HeaderDescription = styled(Text)`
  opacity: 0.7;
  margin: 0;
`;

export const SectionTitle = styled(Header)`
  margin: 0;
  font-family: "MTS Wide";
  font-weight: 500;
  font-size: 32px;
  line-height: 110%;
  letter-spacing: 0px;
  color: #212529;
  text-align: left;
`;

export const SectionContent = styled.div<{ $isExpanded: boolean; $noPaddingTop?: boolean }>`
  max-height: ${({ $isExpanded }) => $isExpanded ? "2000px" : "0"};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  padding: ${({ $isExpanded, $noPaddingTop }) => {
    if (!$isExpanded) return "0 30px";
    return $noPaddingTop ? "0 30px 30px 30px" : "8px 30px 30px 30px";
  }};
  background: var(--background-light-lower);
  
  @media (max-width: 500px) {
    padding: ${({ $isExpanded, $noPaddingTop }) => {
      if (!$isExpanded) return "0 10px";
      return $noPaddingTop ? "0 10px 10px 10px" : "8px 10px 10px 10px";
    }};
  }
`; 