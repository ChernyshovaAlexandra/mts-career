import type { FC } from "react";
import { memo, useState, useRef } from "react";
import { EmployeeCarousel } from "../EmployeeCarousel/EmployeeCarousel";
import { ARIA_LABELS } from "./accessibility";
import {
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  ScheduleSection,
  ScheduleHeader,
  CarouselWrapper,
  CalendarGrid,
  DayCard,
  DayHeader,
  DayName,
  DayDate,
  TimeSlotsGrid,
  TimeSlotButton,
  NavigationButton,
  ScheduleButton,
  EmployeeSection,
  ConfirmationCard,
  EmployeeInfo,
  EmployeeAvatar,
  EmployeeDetails,
  EmployeeName,
  EmployeePosition,
  MeetingInfo,
  MeetingLabel,
  MeetingDateTime,
  CancelButton
} from "./styles";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  day: string;
  date: string;
  timeSlots: TimeSlot[];
}

const mockSchedule: DaySchedule[] = [
  {
    day: "Вторник",
    date: "29 июля",
    timeSlots: [
      { time: "11:00", available: true },
      { time: "12:00", available: true },
      { time: "13:00", available: true },
      { time: "15:00", available: false },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: true }
    ]
  },
  {
    day: "Среда",
    date: "30 июля",
    timeSlots: [
      { time: "11:00", available: false },
      { time: "12:00", available: true },
      { time: "13:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: true }
    ]
  },
  {
    day: "Четверг",
    date: "31 июля",
    timeSlots: [
      { time: "11:00", available: true },
      { time: "12:00", available: true },
      { time: "13:00", available: true },
      { time: "15:00", available: false },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: true }
    ]
  }
];

export const RandomCoffeeSection: FC = memo(() => {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string; date: string } | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("1");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleTimeSlotClick = (day: string, time: string, date: string, available: boolean) => {
    if (!available) return;
    
    if (selectedSlot && selectedSlot.day === day && selectedSlot.time === time) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot({ day, time, date });
    }
  };

  const isSlotSelected = (day: string, time: string) => {
    return selectedSlot?.day === day && selectedSlot?.time === time;
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployee(employeeId);
  };

  const handleScheduleMeeting = () => {
    if (selectedSlot && selectedEmployee) {
      setIsConfirmed(true);
      console.log("Scheduling meeting:", { slot: selectedSlot, employee: selectedEmployee });
    }
  };

  const handleCancelMeeting = () => {
    setIsConfirmed(false);
    setSelectedSlot(null);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (calendarRef.current) {
      const isMobile = window.innerWidth <= 768;
      const isSmallMobile = window.innerWidth <= 500;
      
      let scrollAmount;
      if (isSmallMobile) {
        scrollAmount = 250;
      } else if (isMobile) {
        scrollAmount = window.innerWidth - 80;
      } else {
        scrollAmount = 308;
      }
      
      const scrollLeft = direction === 'left' ? -scrollAmount : scrollAmount;
      
      calendarRef.current.scrollBy({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SectionContainer 
      role="region" 
      aria-labelledby="random-coffee-heading"
      aria-describedby="random-coffee-description"
      $isConfirmed={isConfirmed}
    >
      {!isConfirmed ? (
        <>
          <SectionHeader>
            <SectionTitle id="random-coffee-heading">
              {ARIA_LABELS.SECTION.TITLE}
            </SectionTitle>
            <SectionDescription id="random-coffee-description">
              {ARIA_LABELS.SECTION.DESCRIPTION}
            </SectionDescription>
          </SectionHeader>

          <EmployeeSection role="group" aria-labelledby="employee-section-title">
            <EmployeeCarousel 
              selectedEmployee={selectedEmployee}
              onEmployeeSelect={handleEmployeeSelect}
            />
          </EmployeeSection>

          <ScheduleSection role="group" aria-labelledby="schedule-section-title">
            <ScheduleHeader>
              
              <NavigationButton
                type="button"
                aria-label={ARIA_LABELS.NAVIGATION.PREV_WEEK}
                onClick={() => scrollCarousel('left')}
                title={ARIA_LABELS.NAVIGATION.PREV_WEEK}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
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
                                ? ARIA_LABELS.TIME_SLOTS.BOOK_SLOT(slot.time, daySchedule.day, daySchedule.date)
                                : ARIA_LABELS.TIME_SLOTS.SLOT_UNAVAILABLE(slot.time)
                            }
                            aria-pressed={isSlotSelected(daySchedule.day, slot.time)}
                          >
                            {slot.available ? slot.time : "-"}
                          </TimeSlotButton>
                        ))}
                      </TimeSlotsGrid>
                    </DayCard>
                  ))}
                </CalendarGrid>
              </CarouselWrapper>

              <NavigationButton
                type="button"
                aria-label={ARIA_LABELS.NAVIGATION.NEXT_WEEK}
                onClick={() => scrollCarousel('right')}
                title={ARIA_LABELS.NAVIGATION.NEXT_WEEK}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </NavigationButton>
            </ScheduleHeader>

            <ScheduleButton
              variant="primary"
              type="button"
              onClick={handleScheduleMeeting}
              disabled={!selectedSlot}
              aria-label={ARIA_LABELS.SECTION.SCHEDULE_MEETING}
            >
              {ARIA_LABELS.SECTION.SCHEDULE_MEETING}
            </ScheduleButton>
          </ScheduleSection>
        </>
      ) : (
        <>
          <SectionHeader>
            <SectionTitle id="random-coffee-heading">
              {ARIA_LABELS.SECTION.TITLE}
            </SectionTitle>
          </SectionHeader>
          
          <ConfirmationCard>
            <EmployeeInfo>
              <EmployeeAvatar>
                <img 
                  src="/images/employees/employee1.jpg" 
                  alt="Фото сотрудника"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </EmployeeAvatar>
              <EmployeeDetails>
                <EmployeeName>Григорий Усов</EmployeeName>
                <EmployeePosition>Должность</EmployeePosition>
              </EmployeeDetails>
            </EmployeeInfo>
            
            <MeetingInfo>
              <MeetingLabel>Дата встречи</MeetingLabel>
              <MeetingDateTime>
                {selectedSlot?.date.toUpperCase()} В {selectedSlot?.time}
              </MeetingDateTime>
            </MeetingInfo>
            
            <CancelButton
              variant="primary"
              type="button"
              onClick={handleCancelMeeting}
              aria-label="Отменить запись"
            >
              ОТМЕНИТЬ ЗАПИСЬ
            </CancelButton>
          </ConfirmationCard>
        </>
      )}
    </SectionContainer>
  );
}); 