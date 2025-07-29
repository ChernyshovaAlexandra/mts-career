import styled from "styled-components";
import { Button } from "@chernyshovaalexandra/mtsui";
import type React from 'react';

export const PlayerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const PlayerContainer = styled.div`
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
`;

export const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

export const CloseButton: React.ComponentType<any> = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.1) !important;
  border: none !important;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }
  
  &::before {
    content: '×';
    font-size: 24px;
    line-height: 1;
  }
`;

export const PlayerTitle = styled.div`
  position: absolute;
  bottom: 60px;
  left: 16px;
  right: 16px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 2;
`; 