import styled from "styled-components";
import { Text, Button, mts_brand_red } from "@chernyshovaalexandra/mtsui";
import type React from 'react';

export const MobileGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  max-width: 100%;

  @media (min-width: 1251px) {
    display: none;
  }
`;

export const MobileStepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding: 0 20px;
`;

export const StepsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

export const StepCircle = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isResults?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  z-index: 2;
  position: relative;
  transform: ${({ $isResults }) => ($isResults ? 'scale(0.8)' : 'none')};
  transform-origin: center;
  
  ${({ $isActive, $isCompleted }) => {
    if ($isActive) {
      return `
        background: ${mts_brand_red};
        color: white;
        border: 2px solid ${mts_brand_red};
      `;
    } else if ($isCompleted) {
      return `
        background: #212529;
        color: white;
        border: 2px solid #212529;
      `;
    } else {
      return `
        background: white;
        color: #6c757d;
        border: 2px solid #dee2e6;
      `;
    }
  }}

  .success-indicator,
  .error-indicator {
    position: absolute;
    bottom: -4px;
    right: -8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 3;

    svg {
      width: 8px;
      height: 8px;
    }
  }

  .success-indicator {
    background: #26CD58;
    color: #ffffff;
  }

  .error-indicator {
    background: #F95721;
    color: #ffffff;
  }
`;

export const StepLine = styled.div<{ $isCompleted: boolean }>`
  width: 40px;
  height: 2px;
  background: ${({ $isCompleted }) => $isCompleted ? '#212529' : '#dee2e6'};
  transition: background-color 0.3s ease;
`;

export const QuestionTitle = styled(Text)`
  font-size: 18px;
  line-height: 140%;
  color: #212529;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
`;

export const OptionCard = styled.button<{ $isSelected: boolean; $isRevealed: boolean; $isCorrect?: boolean }>`
  width: 100%;
  height: auto;
  min-height: 180px;
  -webkit-tap-highlight-color: transparent; /* убрать вспышку при тапе на мобильных */
  border: ${({ $isSelected, $isRevealed, $isCorrect }) => {
    if ($isRevealed && $isSelected) {
      return `4px solid ${$isCorrect ? '#26CD58' : '#F95721'}`;
    }
    return $isSelected ? '4px solid transparent' : '1px solid #dee2e6';
  }};
  background: ${({ $isSelected, $isRevealed }) => {
    if ($isRevealed && $isSelected) {
      return '#ffffff';
    }
    return $isSelected
      ? `linear-gradient(#ffffff, #ffffff) padding-box,
         linear-gradient(9deg, #FFD4C9 4.4%, #EDCCD3 19.79%, #BFB8ED 49.27%, #9FAAFF 68.5%, #A1A1FF 90.29%) border-box`
      : '#ffffff';
  }};
  background-clip: ${({ $isSelected, $isRevealed }) =>
    $isRevealed && $isSelected ? 'border-box' : $isSelected ? 'padding-box, border-box' : 'border-box'};
  border-radius: 12px;
  cursor: ${({ $isRevealed }) => $isRevealed ? 'default' : 'pointer'};
  transition: border-color 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 16px;

  /* Убираем красную подсветку перед появлением градиента — ховер ничего не меняет */
  &:hover:not(:disabled) {}

  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:disabled {
    opacity: 0.8;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlaceholderText = styled(Text)`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
`;

export const OptionTitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 53px 16px;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: var(--text-primary);
`;

export const OptionContent = styled.div`
  display: block;
  width: 100%;
  height: auto;
  padding: 16px;
  text-align: left;
  white-space: pre-wrap;
  overflow: visible;
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  line-height: 140%;
  color: var(--text-primary);
`;

export const OCTitle = styled.div`
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  margin: 0 0 8px 0;
`;

export const OCSubtitle = styled.div`
  color: #4b5563;
  margin: 0 0 12px 0;
`;

export const OCParagraph = styled.p`
  margin: 12px 0 0 0;
`;

export const ResultBadge = styled.div<{ $isCorrect: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ $isCorrect }) => $isCorrect ? '#28a745' : '#dc3545'};
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

export const ActionButton: React.ComponentType<any> = styled(Button)`
  flex: 1;
  height: 48px;
  font-weight: 600;
`;

export const CongratulationsCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const CongratulationsTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 12px 0;
`;

export const CongratulationsText = styled.p`
  font-size: 14px;
  line-height: 140%;
  color: #6c757d;
  margin: 0 0 20px 0;
`;

export const DownloadButton: React.ComponentType<any> = styled(Button)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    flex-shrink: 0;
  }
`; 