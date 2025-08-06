import React, { useState, useEffect, useCallback } from "react";
import { Button, Header, Text } from "@chernyshovaalexandra/mtsui";
import styled from "styled-components";
import { mts_brand_red } from "@chernyshovaalexandra/mtsui";
import { apiService } from "../../../services/apiService";
import type { MeetSlot } from "../../../services/apiService";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  day: string;
  date: string;
  timeSlots: TimeSlot[];
}

interface Employee {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
}

const CoffeeContainer = styled.section<{ isConfirmed?: boolean }>`
  background: #f8f9fa;
  border-radius: 24px;
  padding: 32px;
  margin: 40px 0;
  width: ${(props) => (props.isConfirmed ? "800px" : "auto")};
  max-width: ${(props) => (props.isConfirmed ? "800px" : "none")};
  margin-left: ${(props) => (props.isConfirmed ? "auto" : "0")};
  margin-right: ${(props) => (props.isConfirmed ? "auto" : "0")};

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 16px;
    margin: 20px 0;
    width: ${(props) => (props.isConfirmed ? "calc(100% - 32px)" : "auto")};
    max-width: ${(props) => (props.isConfirmed ? "800px" : "none")};
    margin-left: ${(props) => (props.isConfirmed ? "auto" : "0px")};
    margin-right: ${(props) => (props.isConfirmed ? "auto" : "0px")};
  }
`;

const CoffeeHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled(Header).attrs({ as: "h2" })`
  font-size: 32px;
  color: #1d2023;
  font-family: "MTS Wide", sans-serif;
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
  font-family: "MTS Text", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  color: #6b7280;
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

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${mts_brand_red};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
  font-size: 14px;
`;

const EmptyMessage = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  padding: 32px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;

const EmployeeSection = styled.div`
  margin-bottom: 32px;
`;

const EmployeeTitle = styled.h3`
  font-family: "MTS Text", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1d2023;
  margin: 0 0 16px 0;
  text-align: center;
`;

const EmployeeCard = styled.div<{ selected?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid ${(props) => (props.selected ? mts_brand_red : "#e5e7eb")};
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: ${mts_brand_red};
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const EmployeeAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${mts_brand_red};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  margin: 0 auto 16px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const EmployeeName = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1d2023;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const EmployeePosition = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const EmployeeDescription = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 14px;
  color: #6b7280;
  line-height: 140%;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ScheduleSection = styled.div`
  margin-bottom: 32px;
`;

const ScheduleTitle = styled.h3`
  font-family: "MTS Text", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1d2023;
  margin: 0 0 16px 0;
  text-align: center;
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
`;

const DayCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 8px;
`;

const DayName = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1d2023;
  margin-bottom: 4px;
`;

const DayDate = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 12px;
  color: #6b7280;
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const TimeSlotButton = styled.button<{
  selected?: boolean;
  available?: boolean;
}>`
  width: 100%;
  height: 32px;
  padding: 0;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.selected ? mts_brand_red : "#e5e7eb")};
  background: ${(props) => (props.selected ? mts_brand_red : "white")};
  color: ${(props) =>
    props.selected ? "white" : props.available ? "#374151" : "#9CA3AF"};
  font-family: "MTS Text", sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: ${(props) => (props.available ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.available ? 1 : 0.5)};

  &:hover {
    ${(props) =>
      props.available &&
      !props.selected &&
      `
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

const ConfirmationCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  border: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const ConfirmationTitle = styled.h3`
  font-family: "MTS Text", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1d2023;
  margin: 0 0 16px 0;
`;

const ConfirmationDetails = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 140%;
`;

const ConfirmationEmployee = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`;

const ConfirmationEmployeeName = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1d2023;
  margin-bottom: 4px;
`;

const ConfirmationEmployeePosition = styled.div`
  font-family: "MTS Text", sans-serif;
  font-size: 14px;
  color: #6b7280;
`;

// Функция для преобразования API данных в формат компонента
const transformMeetSlotsToSchedule = (meetSlots: MeetSlot[]): DaySchedule[] => {
  const scheduleMap = new Map<string, DaySchedule>();

  meetSlots.forEach((slot) => {
    // Парсим дату и время из API
    const dateStr = slot.date; // "2025-08-18"
    const timeStr = slot.time; // "10:00:00"

    // Создаем объект Date для получения дня недели
    const dateObj = new Date(dateStr);

    // Форматируем дату для отображения
    const dayName = dateObj.toLocaleDateString("ru-RU", { weekday: "long" });
    const displayDate = dateObj.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

    // Форматируем время (убираем секунды)
    const displayTime = timeStr.substring(0, 5); // "10:00"

    const key = `${dayName}-${displayDate}`;

    if (!scheduleMap.has(key)) {
      scheduleMap.set(key, {
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date: displayDate,
        timeSlots: [],
      });
    }

    const schedule = scheduleMap.get(key)!;

    // Проверяем, что слот доступен
    if (slot.status === "available") {
      schedule.timeSlots.push({
        time: displayTime,
        available: true,
      });
    }
  });

  // Сортируем слоты по времени и добавляем недоступные слоты
  const result: DaySchedule[] = [];

  scheduleMap.forEach((schedule) => {
    // Сортируем слоты по времени
    schedule.timeSlots.sort((a, b) => {
      const timeA = new Date(`2000-01-01 ${a.time}`);
      const timeB = new Date(`2000-01-01 ${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

    // Добавляем фиксированные слоты для полноты расписания
    const fixedSlots = [
      { time: "10:00", available: false },
      { time: "11:00", available: false },
      { time: "12:00", available: false },
      { time: "13:00", available: false },
      { time: "14:00", available: false },
      { time: "15:00", available: false },
    ];

    // Заменяем доступные слоты на реальные
    fixedSlots.forEach((fixedSlot, index) => {
      const availableSlot = schedule.timeSlots.find(
        (slot) => slot.time === fixedSlot.time && slot.available
      );
      if (availableSlot) {
        fixedSlots[index] = availableSlot;
      }
    });

    schedule.timeSlots = fixedSlots;
    result.push(schedule);
  });

  // Сортируем дни по дате
  result.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return result;
};

// Функция для получения уникальных сотрудников из слотов
const getUniqueEmployees = (meetSlots: MeetSlot[]): Employee[] => {
  const employeeMap = new Map<string, Employee>();

  meetSlots.forEach((slot) => {
    if (slot.status === "available") {
      const email = slot.staff.name;
      const name = email.split("@")[0]; // Извлекаем имя из email

      if (!employeeMap.has(email)) {
        employeeMap.set(email, {
          id: slot.id.toString(),
          name: name.charAt(0).toUpperCase() + name.slice(1), // Капитализируем имя
          position: slot.staff.position || "Сотрудник МТС",
          description: "Расскажу о корпоративной культуре и работе в МТС",
          imageUrl: slot.staff.img || "",
        });
      }
    }
  });

  return Array.from(employeeMap.values());
};

export const RandomCoffeeSection: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
    date: string;
  } | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // Загрузка доступных слотов
  const loadMeetSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Загружаем доступные слоты для кофе...");
      const response = await apiService.listMeets();

      console.log("Получены слоты:", response.data);

      if (
        response.data.status &&
        response.data.meets &&
        response.data.meets.length > 0
      ) {
        // Фильтруем только кофе-встречи (type: "kofe" или все доступные)
        const coffeeSlots = response.data.meets.filter(
          (slot) => slot.status === "available"
        );

        if (coffeeSlots.length > 0) {
          const uniqueEmployees = getUniqueEmployees(coffeeSlots);
          const transformedSchedule = transformMeetSlotsToSchedule(coffeeSlots);

          setEmployees(uniqueEmployees);
          setSchedule(transformedSchedule);

          console.log("Уникальные сотрудники:", uniqueEmployees);
          console.log("Преобразованный график:", transformedSchedule);
        } else {
          setEmployees([]);
          setSchedule([]);
          console.log("Нет доступных кофе-слотов");
        }
      } else {
        setEmployees([]);
        setSchedule([]);
        console.log("Нет доступных слотов");
      }
    } catch (err: any) {
      console.error("Ошибка при загрузке слотов:", err);

      if (err.response?.status === 401) {
        setError("Ошибка авторизации. Пожалуйста, войдите в систему заново.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          "Произошла ошибка при загрузке доступных слотов. Попробуйте позже."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeetSlots();
  }, [loadMeetSlots]);

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedSlot(null); // Сбрасываем выбор времени при смене сотрудника
  };

  const handleTimeSlotClick = (
    day: string,
    time: string,
    date: string,
    available: boolean
  ) => {
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

  const handleBookCoffee = async () => {
    if (selectedSlot && selectedEmployee) {
      try {
        // Здесь можно добавить логику бронирования кофе
        console.log("Бронируем кофе:", {
          employee: selectedEmployee,
          slot: selectedSlot,
        });

        setIsConfirmed(true);
      } catch (err) {
        console.error("Ошибка при бронировании кофе:", err);
        setError("Произошла ошибка при бронировании кофе. Попробуйте позже.");
      }
    }
  };

  const handleCancelBooking = () => {
    setIsConfirmed(false);
    setSelectedEmployee(null);
    setSelectedSlot(null);
  };

  return (
    <CoffeeContainer
      aria-labelledby="coffee-title"
      isConfirmed={isConfirmed}
      role="region"
      aria-describedby="coffee-description"
    >
      <CoffeeHeader>
        <Title id="coffee-title">Рандом-кофе с сотрудником</Title>
        {!isConfirmed && (
          <Description id="coffee-description">
            Запишись на 10-минутную онлайн-встречу с сотрудником МТС. Получи
            баллы и узнай больше о корпоративной культуре из первых уст.
          </Description>
        )}
      </CoffeeHeader>

      {isLoading ? (
        <div role="status" aria-live="polite">
          <LoadingSpinner aria-hidden="true" />
          <Text variant="P4-Regular-Text" style={{ textAlign: "center" }}>
            Загружаем доступные встречи...
          </Text>
        </div>
      ) : error ? (
        <ErrorMessage role="alert" aria-live="assertive">
          {error}
          <br />
          <Button
            variant="secondary"
            onClick={loadMeetSlots}
            style={{ marginTop: "12px" }}
          >
            Попробовать снова
          </Button>
        </ErrorMessage>
      ) : employees.length === 0 ? (
        <EmptyMessage>
          В данный момент нет доступных сотрудников для кофе-встреч.
          <br />
          Попробуйте позже или обратитесь к администратору.
        </EmptyMessage>
      ) : isConfirmed && selectedEmployee && selectedSlot ? (
        <ConfirmationCard>
          <ConfirmationTitle>Встреча забронирована!</ConfirmationTitle>
          <ConfirmationDetails>
            Ваша встреча с сотрудником МТС успешно забронирована. На вашу почту
            придет письмо со ссылкой на встречу.
          </ConfirmationDetails>

          <ConfirmationEmployee>
            <ConfirmationEmployeeName>
              {selectedEmployee.name}
            </ConfirmationEmployeeName>
            <ConfirmationEmployeePosition>
              {selectedEmployee.position}
            </ConfirmationEmployeePosition>
          </ConfirmationEmployee>

          <ConfirmationDetails>
            <strong>Время встречи:</strong> {selectedSlot.day},{" "}
            {selectedSlot.date} в {selectedSlot.time}
          </ConfirmationDetails>

          <Button
            variant="secondary"
            onClick={handleCancelBooking}
            aria-label="Отменить запись на кофе-встречу"
          >
            ОТМЕНИТЬ ЗАПИСЬ
          </Button>
        </ConfirmationCard>
      ) : (
        <>
          <EmployeeSection>
            <EmployeeTitle>Выберите сотрудника</EmployeeTitle>
            <EmployeeCard
              selected={!!selectedEmployee}
              onClick={() => handleEmployeeSelect(employees[0])}
              role="button"
              tabIndex={0}
              aria-label={`Выбрать сотрудника ${employees[0]?.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleEmployeeSelect(employees[0]);
                }
              }}
            >
              <EmployeeAvatar>{employees[0]?.name.charAt(0)}</EmployeeAvatar>
              <EmployeeName>{employees[0]?.name}</EmployeeName>
              <EmployeePosition>{employees[0]?.position}</EmployeePosition>
              <EmployeeDescription>
                {employees[0]?.description}
              </EmployeeDescription>
            </EmployeeCard>
          </EmployeeSection>

          {selectedEmployee && (
            <ScheduleSection>
              <ScheduleTitle>Выберите время встречи</ScheduleTitle>
              <ScheduleGrid>
                {schedule.map((daySchedule) => (
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
                          onClick={() =>
                            handleTimeSlotClick(
                              daySchedule.day,
                              slot.time,
                              daySchedule.date,
                              slot.available
                            )
                          }
                          aria-label={
                            slot.available
                              ? `Выбрать время ${
                                  slot.time
                                } в ${daySchedule.day.toLowerCase()}`
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
              </ScheduleGrid>
            </ScheduleSection>
          )}

          <ActionSection>
            <Button
              variant="primary"
              type="button"
              aria-label={
                selectedSlot
                  ? `Забронировать кофе с ${selectedEmployee?.name} на ${selectedSlot.day} в ${selectedSlot.time}`
                  : "Выберите время для бронирования кофе"
              }
              disabled={!selectedSlot || !selectedEmployee}
              onClick={handleBookCoffee}
            >
              ЗАБРОНИРОВАТЬ КОФЕ
            </Button>
          </ActionSection>
        </>
      )}
    </CoffeeContainer>
  );
};
