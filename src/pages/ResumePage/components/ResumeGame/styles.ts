import styled from "styled-components";
import { Text, Button, mts_brand_red } from "@chernyshovaalexandra/mtsui";
import { Steps } from 'antd';
import type React from 'react';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1250px) {
    display: none;
  }
`;

export const InstructionText = styled(Text)`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
  color: #495057;
`;

export const StyledSteps: React.ComponentType<any> = styled(Steps)`
  --accent-dark-positive-inverted: #26CD58;
  --accent-dark-negative-inverted: #F95721;
  --background-light-stroke: #BCC3D080;

  .ant-steps-item {
    padding-bottom: 32px;
    
    &:last-child {
      padding-bottom: 0;
    }
  }

  .ant-steps-item-icon {
    background: #ffffff !important;
    border: 1px solid #e0e6ed;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    width: 34px;
    height: 48px;
    border-radius: 32px;
    margin-inline-end: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    @media (max-width: 768px) {
      width: 32px;
      height: 44px;
      font-size: 18px;
      margin-inline-end: 12px;
    }
    
    .ant-steps-icon {
      font-size: 24px;
      font-weight: 500;
      line-height: 120%;
    }

    // Композитная иконка с номером и индикатором
    .step-icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      
      .step-number {
        font-size: 24px;
        font-weight: 500;
        line-height: 120%;
        color: var(--text-primary);
      }

      .success-indicator,
      .error-indicator {
        position: absolute;
        bottom: -6px;
        right: -12px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 2;

        svg {
          width: 12px;
          height: 12px;
        }

        @media (max-width: 768px) {
          width: 18px;
          height: 18px;
          bottom: -5px;
          right: -10px;

          svg {
            width: 10px;
            height: 10px;
          }
        }
      }

      .success-indicator {
        background: var(--accent-dark-positive-inverted);
        color: #ffffff;
      }

      .error-indicator {
        background: var(--accent-dark-negative-inverted);
        color: #ffffff;
      }
    }
  }

  // Основной кружок остается белым для всех состояний
  // так как статус показывается через маленький индикатор
  .ant-steps-item-process .ant-steps-item-icon,
  .ant-steps-item-finish .ant-steps-item-icon,
  .ant-steps-item-error .ant-steps-item-icon {
    background: #ffffff !important;
    border: 1px solid #e0e6ed !important;
  }

  .ant-steps-item-content {
    min-height: auto;
  }

  .ant-steps-item-icon >.ant-steps-icon {
    color: var(--text-primary) !important;
    transform: scale(0.8);
  }

  .ant-steps-item-title {
    font-size: 16px;
    line-height: 140%;
    color: #212529;
    font-weight: 400;
    padding-right: 0;
    
    &::after {
      display: none;
    }
  }

  .ant-steps-item-description {
    color: #6c757d;
    font-size: 14px;
    margin-top: 4px;
  }

  .ant-steps-item-tail {
    padding: 8px 0 8px 24px;
    
    &::after {
      background-color: var(--background-light-stroke) !important;
      width: 2px;
      left: 24px;
    }
  }

  // Переопределяем цвет линий для всех состояний
  .ant-steps-item-wait .ant-steps-item-tail::after,
  .ant-steps-item-process .ant-steps-item-tail::after,
  .ant-steps-item-finish .ant-steps-item-tail::after,
  .ant-steps-item-error .ant-steps-item-tail::after {
    background-color: var(--background-light-stroke) !important;
  }
`;

export const StepContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    align-items: start;
  }
`;

export const QuestionText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 140%;
  color: #212529;
  font-weight: 400;
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
    flex-direction: column;
  }
`;

export const ImageCard = styled.button<{ $isSelected: boolean; $isRevealed: boolean; $isCorrect?: boolean }>`
  width: 370px;
  height: 370px;
  background: ${({ $isSelected, $isCorrect, $isRevealed }) => {
    if (!$isRevealed) return $isSelected ? '#f8f9fa' : '#e9ecef';
    if ($isCorrect) return '#d4edda';
    return $isSelected ? '#f8d7da' : '#e9ecef';
  }};
  border: 3px solid ${({ $isSelected, $isCorrect, $isRevealed }) => {
    if (!$isRevealed) return $isSelected ? mts_brand_red : 'transparent';
    if ($isCorrect) return '#28a745';
    return $isSelected ? '#dc3545' : 'transparent';
  }};
  border-radius: 16px;
  cursor: ${({ $isRevealed }) => $isRevealed ? 'default' : 'pointer'};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover:not(:disabled) {
    border-color: ${mts_brand_red};
    background: #f8f9fa;
  }

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

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const PlaceholderText = styled(Text)`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
`;

export const ResultBadge = styled.div<{ $isCorrect: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${({ $isCorrect }) => $isCorrect ? '#28a745' : '#dc3545'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const CongratulationsCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 24px;
    margin-left: 16px;
    margin-right: 16px;
    max-width: none;
  }
`;

export const CongratulationsTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CongratulationsText = styled.p`
  font-size: 16px;
  line-height: 140%;
  color: #6c757d;
  margin: 0 0 24px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 0 0 20px 0;
  }
`;

export const DownloadButton: React.ComponentType<any> = styled(Button)`
  margin: 0 auto;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

export const ActionButton: React.ComponentType<any> = styled(Button)`
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`; 