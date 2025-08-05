import styled from "styled-components";
import { Header, Text, Button } from "@chernyshovaalexandra/mtsui";
import { mts_brand_red } from "@chernyshovaalexandra/mtsui";

export const SectionContainer = styled.section<{ $isConfirmed?: boolean }>`
  background: #F2F3F7;
  border-radius: 24px;
  padding: 32px;
  margin: 40px 0;
  ${props => props.$isConfirmed && `
    margin: 40px auto;
    max-width: 800px;
  `}
  
  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px auto;
    max-width: 600px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin: 16px auto;
    max-width: 400px;
    border-radius: 12px;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 32px;
  text-align: left;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

export const SectionTitle = styled(Header).attrs({ as: 'h2' })`
  font-size: 32px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 110%;
  margin: 0 0 16px 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin: 0 0 12px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin: 0 0 10px 0;
  }
`;

export const SectionDescription = styled(Text)`
  font-family: 'MTS Text', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  color: #6B7280;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 150%;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 160%;
  }
`;

export const EmployeeSection = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const EmployeeSectionTitle = styled(Header).attrs({ as: 'h3' })`
  font-size: 20px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 120%;
  margin: 0 0 16px 0;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin: 0 0 12px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin: 0 0 10px 0;
  }
`;

export const ScheduleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ScheduleTitle = styled(Header).attrs({ as: 'h3' })`
  font-size: 20px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 120%;
  margin: 0;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const NavigationButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  &:focus {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const CarouselWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const CalendarGrid = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const DayCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  min-width: 280px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    min-width: 240px;
    padding: 16px;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    min-width: 200px;
    padding: 12px;
    border-radius: 8px;
  }
`;

export const DayHeader = styled.div`
  text-align: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const DayName = styled.div`
  font-family: 'MTS Wide', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1D2023;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const DayDate = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #6B7280;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

export const TimeSlotButton = styled.button<{ available: boolean; selected: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.selected ? mts_brand_red : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => {
    if (props.selected) return mts_brand_red;
    if (!props.available) return '#f3f4f6';
    return '#ffffff';
  }};
  color: ${props => {
    if (props.selected) return '#ffffff';
    if (!props.available) return '#9ca3af';
    return '#1D2023';
  }};
  font-family: 'MTS Text', sans-serif;
  font-size: 12px;
  font-weight: 400;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    ${props => props.available && !props.selected && `
      background: #f9fafb;
      border-color: ${mts_brand_red};
    `}
  }
  
  &:focus {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
    min-height: 28px;
  }
  
  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 10px;
    min-height: 24px;
  }
`;

export const ScheduleButton = styled(Button)`
  align-self: center;
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: 180px;
  }
  
  @media (max-width: 480px) {
    min-width: 160px;
  }
` as any;

export const ConfirmationCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  margin: 0 auto;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 auto;
    max-width: 350px;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    margin: 0 auto;
    max-width: 300px;
    border-radius: 8px;
  }
`;

export const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 16px;
  }
`;

export const EmployeeAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

export const EmployeeDetails = styled.div`
  flex: 1;
`;

export const EmployeeName = styled.div`
  font-family: 'MTS Wide', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1D2023;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const EmployeePosition = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #6B7280;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const MeetingInfo = styled.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const MeetingLabel = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #6B7280;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

export const MeetingDateTime = styled.div`
  font-family: 'MTS Wide', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #1D2023;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const CancelButton = styled(Button)`
  width: 100%;
  background: #e31e24;
  color: #ffffff;
  
  &:hover {
    background: #c41e24;
  }
` as any; 