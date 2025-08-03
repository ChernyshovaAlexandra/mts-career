import React, { useState } from 'react';
import { Button, Header, Text } from '@chernyshovaalexandra/mtsui';
import styled from 'styled-components';
import { mts_brand_red } from '@chernyshovaalexandra/mtsui';
import { DirectionSelect } from './DirectionSelect';
import { FileUpload } from './FileUpload';
import { ScheduleConfirmation } from './ScheduleConfirmation';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  day: string;
  date: string;
  timeSlots: TimeSlot[];
}

const SimulationContainer = styled.section<{ isConfirmed?: boolean }>`
  background: #f8f9fa;
  border-radius: 24px;
  padding: 32px;
  margin: 40px 0;
  width: ${props => props.isConfirmed ? '654px' : 'auto'};
  max-width: ${props => props.isConfirmed ? '654px' : 'none'};
  margin-left: ${props => props.isConfirmed ? 'auto' : '0'};
  margin-right: ${props => props.isConfirmed ? 'auto' : '0'};
  
  @media (max-width: 768px) {
    padding: 8px;
    border-radius: 16px;
    margin: 20px 0;
    width: ${props => props.isConfirmed ? 'calc(100% - 40px)' : 'auto'};
    max-width: ${props => props.isConfirmed ? '654px' : 'none'};
    margin-left: ${props => props.isConfirmed ? 'auto' : '0px'};
    margin-right: ${props => props.isConfirmed ? 'auto' : '0px'};
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    margin: 8px 0;
    border-radius: 12px;
    width: ${props => props.isConfirmed ? 'calc(100% - 32px)' : 'auto'};
    margin-left: ${props => props.isConfirmed ? 'auto' : '0px'};
    margin-right: ${props => props.isConfirmed ? 'auto' : '0px'};
  }
`;

const SimulationHeader = styled.div`
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled(Header).attrs({ as: 'h2' })`
  font-size: 32px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 110%;
  margin: 0 0 12px 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin: 0 0 16px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin: 0 0 12px 0;
  }
`;

const Description = styled(Text)`
  font-family: 'MTS Text', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  color: #6B7280;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 150%;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 160%;
  }
`;

const FormSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const DirectionField = styled(FormField)`
  flex: 520;
  max-width: 520px;
  
  @media (max-width: 768px) {
    max-width: none;
    flex: 1;
  }
`;

const FileField = styled(FormField)`
  flex: 664;
  max-width: 664px;
  
  @media (max-width: 768px) {
    max-width: none;
    flex: 1;
  }
`;

const FieldLabel = styled.span`
  font-family: 'MTS Text', sans-serif;
  font-size: 14px;
  color: #6B7280;
`;

const ScheduleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`;

const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  
  @media (max-width: 500px) {
    gap: 0;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
  }
`;

const NavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    border-color: ${mts_brand_red};
    background: #fef2f2;
  }
  
  &:focus-visible {
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
    color: #6B7280;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const CalendarGrid = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4px 0;
  scroll-behavior: smooth;
  
  /* Скрытие скроллбара */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Для Firefox */
  scrollbar-width: none;
  
  /* Для IE/Edge */
  -ms-overflow-style: none;
  
  @media (max-width: 768px) {
    /* На мобильных показываем по 1 карточке */
    width: 100%;
    justify-content: flex-start;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const DayCard = styled.div`
margin-left: 10px;
margin-right: 10px;
  background: white;
  border-radius: 16px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  width: 300px;
  height: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: calc(100vw - 120px);
    max-width: 280px;
    height: auto;
    min-height: 180px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 6px;
  }

  
  @media (max-width: 480px) {
    width: calc(100vw - 100px);
    max-width: 200px;
    margin-right: 15px;
    padding: 5px;
    min-height: 160px;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 6px;
  
  @media (max-width: 768px) {
    margin-bottom: 8px;
    padding-bottom: 4px;
  }
`;

const DayName = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 3px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

const DayDate = styled.div`
  font-family: 'MTS Text', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  flex: 1;
  align-content: start;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
  
  @media (max-width: 500px) {
    gap: 4px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-items: stretch;
  }
`;

const TimeSlotButton = styled.button<{ selected?: boolean; available?: boolean }>`
  width: 85px;
  height: 38px;
  padding: 0;
  border-radius: 6px;
  border: 1px solid ${props => props.selected ? mts_brand_red : '#e5e7eb'};
  background: ${props => props.selected ? mts_brand_red : 'white'};
  color: ${props => props.selected ? 'white' : props.available ? '#374151' : '#9CA3AF'};
  font-family: 'MTS Text', sans-serif;
  font-size: 11px;
  font-weight: 500;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  opacity: ${props => props.available ? 1 : 0.5};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 75px;
    height: 34px;
    font-size: 10px;
    border-radius: 5px;
  }
  
  @media (max-width: 500px) {
    width: 100%;
    max-width: 75px;
    min-width: 46px;
    height: 28px;
    font-size: 9px;
    border-radius: 4px;
  }
  
  &:hover {
    ${props => props.available && !props.selected && `
      border-color: ${mts_brand_red};
      background: #fef2f2;
    `}
  }
  
  &:focus-visible {
    outline: 2px solid ${mts_brand_red};
    outline-offset: 2px;
  }
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
`;

const mockSchedule: DaySchedule[] = [
  {
    day: 'Вторник',
    date: '29 июля',
    timeSlots: [
      { time: '11:00', available: true },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '–', available: false },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: true },
    ]
  },
  {
    day: 'Среда', 
    date: '30 июля',
    timeSlots: [
      { time: '11:00', available: true },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '–', available: false },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: true },
    ]
  },
  {
    day: 'Четверг',
    date: '31 июля', 
    timeSlots: [
      { time: '11:00', available: true },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '–', available: false },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: false },
    ]
  },
  {
    day: 'Четверг',
    date: '32 июля', 
    timeSlots: [
      { time: '11:00', available: true },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '–', available: false },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: false },
    ]
  },
  {
    day: 'Четверг',
    date: '33 июля', 
    timeSlots: [
      { time: '11:00', available: true },
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '–', available: false },
      { time: '15:00', available: true },
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: false },
    ]
  }
];

export const InterviewSimulation: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string; date: string } | null>(null);
  const [resumeFile, setResumeFile] = useState<string>('Название_файла.doc');
  const [fileSize, setFileSize] = useState<string>('xx мб');
  const [selectedDirection, setSelectedDirection] = useState<string>('frontend');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isScheduleConfirmed, setIsScheduleConfirmed] = useState<boolean>(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const handleTimeSlotClick = (day: string, time: string, date: string, available: boolean) => {
    if (!available) return;
    
    setSelectedSlot(
      selectedSlot?.day === day && selectedSlot?.time === time 
        ? null 
        : { day, time, date }
    );
  };

  const isSlotSelected = (day: string, time: string) => {
    return selectedSlot?.day === day && selectedSlot?.time === time;
  };

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    if (file) {
      setResumeFile(file.name);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeInMB} мб`);
    } else {
      setResumeFile('Название_файла.doc');
      setFileSize('xx мб');
    }
  };

  const handleScheduleMeeting = () => {
    if (selectedSlot) {
      setIsScheduleConfirmed(true);
      console.log('Встреча назначена:', selectedSlot);
      console.log('Направление:', selectedDirection);
      console.log('Файл резюме:', uploadedFile);
    }
  };

  const handleCancelSchedule = () => {
    setIsScheduleConfirmed(false);
    setSelectedSlot(null);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (calendarRef.current) {
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 500;
      
      let scrollAmount;
      if (isSmallMobile) {
        scrollAmount = 250; // 245px (ширина карточки) + 5px (gap между карточками)
      } else if (isMobile) {
        scrollAmount = window.innerWidth - 80; // На мобильных прокручиваем на ширину экрана минус отступы
      } else {
        scrollAmount = 308; // 300px (ширина карточки) + 8px (gap между карточками)
      }
      
      const scrollLeft = direction === 'left' ? -scrollAmount : scrollAmount;
      
      calendarRef.current.scrollBy({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

      return (
    <SimulationContainer aria-labelledby="simulation-title" isConfirmed={isScheduleConfirmed}>
      <SimulationHeader>
        <Title id="simulation-title">
          Симуляция собеседования
        </Title>
        {!isScheduleConfirmed && (
          <Description>
            Выбери направление, в котором хочешь работать. Затем проверенное ИИ резюме. Зарезервируй подходящее время и пройди пробное 
            интервью для начисления баллов. После выбора слота на твою почту придёт письмо со ссылкой на встречу. Если не сможешь прийти, заранее 
            отмени собеседование в личном кабинете
          </Description>
        )}
      </SimulationHeader>

      {isScheduleConfirmed && selectedSlot ? (
        <ScheduleConfirmation
          direction={selectedDirection}
          day={selectedSlot.day}
          date={selectedSlot.date}
          time={selectedSlot.time}
          onCancel={handleCancelSchedule}
        />
      ) : (
        <>
          <FormSection>
            <DirectionField>
              <FieldLabel>Направление</FieldLabel>
              <DirectionSelect
                value={selectedDirection}
                onChange={setSelectedDirection}
              />
            </DirectionField>
            
            <FileField>
              <FieldLabel>Резюме в формате .doc</FieldLabel>
              <FileUpload
                fileName={resumeFile}
                fileSize={fileSize}
                onFileChange={handleFileChange}
                acceptedFormats=".doc,.docx,.pdf"
                label=""
              />
            </FileField>
          </FormSection>

          <ScheduleSection>
            <ScheduleHeader>
              <NavigationButton
                type="button"
                aria-label="Предыдущая неделя"
                onClick={() => scrollCarousel('left')}
              >
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </NavigationButton>
              
              <CarouselWrapper>
                <CalendarGrid ref={calendarRef}>
                  {mockSchedule.map((daySchedule) => (
                    <DayCard key={`${daySchedule.day}-${daySchedule.date}`}>
                      <DayHeader>
                        <DayName>{daySchedule.day}</DayName>
                        <DayDate>{daySchedule.date}</DayDate>
                      </DayHeader>
                      <TimeSlotsGrid>
                        {daySchedule.timeSlots.map((slot, index) => (
                          <TimeSlotButton
                            key={`${daySchedule.day}-${slot.time}-${index}`}
                            type="button"
                            available={slot.available}
                            selected={isSlotSelected(daySchedule.day, slot.time)}
                            onClick={() => handleTimeSlotClick(daySchedule.day, slot.time, daySchedule.date, slot.available)}
                            aria-label={
                              slot.available 
                                ? `Выбрать время ${slot.time} в ${daySchedule.day.toLowerCase()}`
                                : `Время ${slot.time} недоступно`
                            }
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </TimeSlotButton>
                        ))}
                      </TimeSlotsGrid>
                    </DayCard>
                  ))}
                </CalendarGrid>
              </CarouselWrapper>
              
              <NavigationButton
                type="button"
                aria-label="Следующая неделя"
                onClick={() => scrollCarousel('right')}
              >
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </NavigationButton>
            </ScheduleHeader>
          </ScheduleSection>

          <ActionSection>
            <Button
              variant="primary"
              type="button"
              aria-label="Назначить встречу на выбранное время"
              disabled={!selectedSlot}
              onClick={handleScheduleMeeting}
            >
              НАЗНАЧИТЬ ВСТРЕЧУ
            </Button>
          </ActionSection>
        </>
      )}
    </SimulationContainer>
  );
}; 