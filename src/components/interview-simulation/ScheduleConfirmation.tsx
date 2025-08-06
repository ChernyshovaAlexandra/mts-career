import React from 'react';
import { Button } from '@chernyshovaalexandra/mtsui';
import styled from 'styled-components';

interface ScheduleConfirmationProps {
  direction: string;
  day: string;
  date: string;
  time: string;
  onCancel: () => void;
}

const ConfirmationContainer = styled.div`
  background: white;
  border-radius: 32px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
    min-height: 250px;
    border-radius: 24px;
  }
  
  @media (max-width: 480px) {
    padding: 0px;
    min-height: 220px;
    border-radius: 20px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 30px;
  right: 0px;
  width: 220px;
  height: 190px;
  background: url('/images/schedule-done-bg.webp') no-repeat center;
  background-size: contain;
  pointer-events: none;
  z-index: 1;
  
  @media (max-width: 768px) {
    right: 0px;
    width: 100px;
    height: 80px;
  }
  
  @media (max-width: 480px) {
  right: 0px;
    width: 80px;
    height: 64px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const DirectionLabel = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 6px;
  }
`;

const DirectionValue = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const DateLabel = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 6px;
  }
`;

const DateValue = styled.div`
  font-family: 'MTS Wide', sans-serif;
  font-size: 32px;
  font-weight: 500;
  color: #1D2023;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const SuccessMessage = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #059669;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 16px;
    padding: 10px 12px;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CancelButton = styled(Button)`
max-width: 100%;
  
`;

const getDirectionLabel = (value: string): string => {
  const directions: Record<string, string> = {
    'frontend': 'Frontend разработка',
    'backend': 'Backend разработка', 
    'fullstack': 'Fullstack разработка',
    'mobile': 'Мобильная разработка',
    'devops': 'DevOps',
    'qa': 'Тестирование (QA)',
    'data': 'Data Science',
    'ml': 'Machine Learning',
    'security': 'Информационная безопасность',
    'analyst': 'Системный аналитик',
  };
  
  return directions[value] || 'Работа в IT';
};

const formatDate = (day: string, date: string, time: string): string => {
  console.info(day)
  const dateFormatted = date.replace(' ', ' ').toUpperCase();
  const timeFormatted = time;
  
  return `${dateFormatted} В ${timeFormatted}`;
};

export const ScheduleConfirmation: React.FC<ScheduleConfirmationProps> = ({
  direction,
  day,
  date,
  time,
  onCancel
}) => {
  const directionLabel = getDirectionLabel(direction);
  const formattedDate = formatDate(day, date, time);

  return (
    <ConfirmationContainer>
      <BackgroundImage />
      
      <ContentWrapper>
        <SuccessMessage>
          ✓ Собеседование успешно создано! На вашу почту отправлено письмо со ссылкой на встречу.
        </SuccessMessage>
        
        <DirectionLabel>Направление</DirectionLabel>
        <DirectionValue>{directionLabel}</DirectionValue>
        
        <DateLabel>Дата собеседования</DateLabel>
        <DateValue>{formattedDate}</DateValue>
      </ContentWrapper>
      
      <ActionWrapper>
        <CancelButton
          variant="secondary"
          type="button"
          onClick={onCancel}
          aria-label="Вернуться к выбору времени"
        >
          Выбрать другое время
        </CancelButton>
      </ActionWrapper>
    </ConfirmationContainer>
  );
}; 