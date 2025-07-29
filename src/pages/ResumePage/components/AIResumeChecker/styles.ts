import styled from "styled-components";
import { Text, Button, mts_brand_red } from "@chernyshovaalexandra/mtsui";
import type React from 'react';

export const CheckerContainer = styled.section`
  background: var(--background-light-lower);
  border-radius: 12px;
  padding: 30px;
`;

export const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-top: 0;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  max-width: 540px;
  min-width: 400px;
  
  @media (max-width: 1200px) {
    max-width: none;
    min-width: auto;
  }
`;

export const ResultSection = styled.div`
  width: 664px;
  height: 456px;
  border-radius: 16px;
  border: 1px solid #D7DBE4;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-light-secondary);
  opacity: 1;
  margin-top: 0;
  
  @media (max-width: 1200px) {
    width: 100%;
    height: 300px;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const FormDescription = styled(Text)`
  margin-bottom: 24px;
  color: var(--text-primary);
  font-weight: 400;
  font-size: 17px;
  line-height: 140%;
`;

export const AttemptsInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  border-radius: 16px;
  padding: 12px 20px;
  margin-bottom: 24px;
`;

export const AttemptsText = styled(Text)`
  color: #212529;
  font-weight: 500;
`;

export const AttemptsCount = styled.span`
  font-weight: 700;
  color: #212529;
`;

export const FormField = styled.div`
  margin-bottom: 24px;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #212529;
`;

export const HiddenDescription = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const DropZone = styled.div<{ $isDragOver: boolean; $hasFile: boolean }>`
  border: 1px solid #D7DBE4;
  border-radius: 16px;
  height: 98px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isDragOver, $hasFile }) => 
    $hasFile ? '#F0F9F4' : $isDragOver ? '#FFF0F0' : 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${mts_brand_red};
    background: #FFF8F8;
  }

  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: -2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export const DropZoneIcon = styled.div<{ $hasFile?: boolean }>`
  font-size: 20px;
  margin-right: 8px;
  color: ${({ $hasFile }) => 
    $hasFile ? '#26CD58' : '#666'};
`;

export const DropZoneText = styled(Text)`
  color: #212529;
  margin-bottom: 4px;
`;

export const DropZoneSubtext = styled(Text)`
  font-size: 12px;
  color: var(--text-light-secondary);
`;

export const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  color: #26CD58;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SubmitButton: React.ComponentType<any> = styled(Button)`
  width: 100%;
  max-width: 300px;
  background-color: ${mts_brand_red} !important;
  border: 1px solid ${mts_brand_red} !important;
  text-transform: uppercase;
  font-weight: 600;
  padding: 16px;
  border-radius: 8px;
  
  &:disabled {
    background-color: #D0D5DD !important;
    border-color: #D0D5DD !important;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  @media (max-width: 768px) {
    max-width: none;
  }
`;

export const StatusMessage = styled.div`
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  
  &[aria-live] {
    min-height: 1px;
  }
`; 