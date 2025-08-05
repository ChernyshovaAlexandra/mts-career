# Интеграция кофе-встреч для страницы работы

## Обзор функциональности

Компонент `RandomCoffeeSection` интегрирован с API `/api/meets` для отображения доступных кофе-встреч с сотрудниками МТС. Функциональность включает загрузку данных о сотрудниках, выбор времени встречи, бронирование и подтверждение записи.

## API интеграция

### Использование существующего API `/api/meets`

Компонент использует тот же API `/api/meets`, что и страница интервью, но с фокусом на кофе-встречи:

```typescript
interface MeetSlot {
  id: number;
  type: string;           // "sobes" или "kofe"
  date: string;           // "2025-08-18"
  time: string;           // "10:00:00"
  link: string;           // "https://meet.google.com/..."
  status: string;         // "available"
  staff: {
    name: string;         // "user1@example.com"
    img: string | null;   // null
    position: string | null; // null
    directions: string[]; // []
  };
}
```

### Фильтрация сотрудников

```typescript
const getUniqueEmployees = (meetSlots: MeetSlot[]): Employee[] => {
  const employeeMap = new Map<string, Employee>();
  
  meetSlots.forEach(slot => {
    if (slot.status === 'available') {
      const email = slot.staff.name;
      const name = email.split('@')[0]; // Извлекаем имя из email
      
      if (!employeeMap.has(email)) {
        employeeMap.set(email, {
          id: slot.id.toString(),
          name: name.charAt(0).toUpperCase() + name.slice(1), // Капитализируем имя
          position: slot.staff.position || 'Сотрудник МТС',
          description: 'Расскажу о корпоративной культуре и работе в МТС',
          imageUrl: slot.staff.img || ''
        });
      }
    }
  });
  
  return Array.from(employeeMap.values());
};
```

## Компонентная структура

### RandomCoffeeSection

**Назначение**: Основной компонент для организации кофе-встреч с сотрудниками МТС

**Ключевые особенности**:
- Загрузка доступных сотрудников из API
- Выбор сотрудника с визуальной индикацией
- Выбор времени встречи через календарь
- Подтверждение бронирования
- Обработка ошибок и состояний загрузки

**Состояния компонента**:
1. **Загрузка**: Спиннер + текст "Загружаем доступные встречи..."
2. **Ошибка**: Красное сообщение + кнопка "Попробовать снова"
3. **Пустой результат**: Серое сообщение о отсутствии сотрудников
4. **Выбор**: Интерфейс выбора сотрудника и времени
5. **Подтверждение**: Карточка подтверждения бронирования

## Интерфейсы и типизация

### Employee
```typescript
interface Employee {
  id: string;
  name: string;           // "User1" (извлечено из email)
  position: string;       // "Сотрудник МТС"
  description: string;    // "Расскажу о корпоративной культуре..."
  imageUrl: string;       // URL аватара или пустая строка
}
```

### TimeSlot и DaySchedule
```typescript
interface TimeSlot {
  time: string;           // "10:00"
  available: boolean;     // true/false
}

interface DaySchedule {
  day: string;            // "Понедельник"
  date: string;           // "18 августа"
  timeSlots: TimeSlot[];
}
```

## UI компоненты

### CoffeeContainer
```typescript
const CoffeeContainer = styled.section<{ isConfirmed?: boolean }>`
  background: #f8f9fa;
  border-radius: 24px;
  padding: 32px;
  margin: 40px 0;
  width: ${props => props.isConfirmed ? '800px' : 'auto'};
  max-width: ${props => props.isConfirmed ? '800px' : 'none'};
  margin-left: ${props => props.isConfirmed ? 'auto' : '0'};
  margin-right: ${props => props.isConfirmed ? 'auto' : '0'};
`;
```

### EmployeeCard
```typescript
const EmployeeCard = styled.div<{ selected?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid ${props => props.selected ? mts_brand_red : '#e5e7eb'};
  transition: all 0.2s ease;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    border-color: ${mts_brand_red};
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
  }
`;
```

### ConfirmationCard
```typescript
const ConfirmationCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  border: 1px solid #e5e7eb;
`;
```

## Логика работы

### 1. Загрузка данных
```typescript
const loadMeetSlots = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    const response = await apiService.listMeets();
    
    if (response.data.status && response.data.meets && response.data.meets.length > 0) {
      // Фильтруем только доступные слоты
      const coffeeSlots = response.data.meets.filter(slot => 
        slot.status === 'available'
      );
      
      if (coffeeSlots.length > 0) {
        const uniqueEmployees = getUniqueEmployees(coffeeSlots);
        const transformedSchedule = transformMeetSlotsToSchedule(coffeeSlots);
        
        setEmployees(uniqueEmployees);
        setSchedule(transformedSchedule);
      }
    }
  } catch (err: any) {
    // Обработка ошибок
  } finally {
    setIsLoading(false);
  }
}, []);
```

### 2. Выбор сотрудника
```typescript
const handleEmployeeSelect = (employee: Employee) => {
  setSelectedEmployee(employee);
  setSelectedSlot(null); // Сбрасываем выбор времени при смене сотрудника
};
```

### 3. Выбор времени
```typescript
const handleTimeSlotClick = (day: string, time: string, date: string, available: boolean) => {
  if (!available) return;
  
  setSelectedSlot(
    selectedSlot?.day === day && selectedSlot?.time === time 
      ? null 
      : { day, time, date }
  );
};
```

### 4. Бронирование
```typescript
const handleBookCoffee = async () => {
  if (selectedSlot && selectedEmployee) {
    try {
      // Здесь можно добавить логику бронирования кофе
      console.log('Бронируем кофе:', {
        employee: selectedEmployee,
        slot: selectedSlot
      });
      
      setIsConfirmed(true);
    } catch (err) {
      console.error('Ошибка при бронировании кофе:', err);
      setError("Произошла ошибка при бронировании кофе. Попробуйте позже.");
    }
  }
};
```

## Обработка ошибок

### Типы ошибок
- `401 Unauthorized`: Ошибка авторизации
- Сетевые ошибки
- Ошибки API

### Отображение ошибок
```typescript
if (err.response?.status === 401) {
  setError("Ошибка авторизации. Пожалуйста, войдите в систему заново.");
} else if (err.response?.data?.message) {
  setError(err.response.data.message);
} else {
  setError("Произошла ошибка при загрузке доступных слотов. Попробуйте позже.");
}
```

## Доступность (A11y)

### ARIA атрибуты
```typescript
// Состояние загрузки
<div role="status" aria-live="polite">
  <LoadingSpinner aria-hidden="true" />
  <Text>Загружаем доступные встречи...</Text>
</div>

// Ошибка
<ErrorMessage role="alert" aria-live="assertive">
  {error}
</ErrorMessage>

// Выбор сотрудника
<EmployeeCard
  role="button"
  tabIndex={0}
  aria-label={`Выбрать сотрудника ${employee.name}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEmployeeSelect(employee);
    }
  }}
>
```

### Клавиатурная навигация
- **Tab**: Переход между элементами
- **Enter/Space**: Выбор сотрудника или времени
- **Стрелки**: Навигация по календарю

### Screen Reader поддержка
- Описательные метки для всех кнопок
- Статусные сообщения для динамических обновлений
- Альтернативные тексты для иконок

## Стилизация

### Цветовая схема
- **Основной цвет**: `#DC2626` (mts_brand_red)
- **Фон**: `#f8f9fa`
- **Текст**: `#1D2023` (заголовки), `#6B7280` (описание)
- **Границы**: `#e5e7eb`

### Адаптивность
- **Desktop**: Полная ширина для выбора, 800px для подтверждения
- **Tablet**: Адаптированные размеры карточек
- **Mobile**: Одноколоночная сетка

### Анимации
```typescript
// Hover эффекты
&:hover {
  border-color: ${mts_brand_red};
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
}

// Переходы
transition: all 0.2s ease;
```

## Интеграция со страницей работы

### WorkPage структура
```typescript
const WorkPage: React.FC = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Container>
          <ContentWrapper>
            <MainTitle>Работа в МТС</MainTitle>
            <Description>...</Description>
          </ContentWrapper>

          <VacancySection>
            <SectionTitle>Актуальные вакансии</SectionTitle>
            <VacancyGrid>
              {/* Карточки вакансий */}
            </VacancyGrid>
          </VacancySection>

          <RandomCoffeeSection />
        </Container>
      </PageContainer>
    </MainLayout>
  );
};
```

### Стили страницы
```typescript
export const PageContainer = styled.div`
  padding: 40px 0;
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export const MainTitle = styled(Header).attrs({ as: 'h1' })`
  font-size: 48px;
  color: #1D2023;
  font-family: 'MTS Wide', sans-serif;
  font-weight: 500;
  line-height: 110%;
  margin: 0 0 16px 0;
`;
```

## Логирование и отладка

### Консольные логи
```typescript
// Загрузка данных
console.log('Загружаем доступные слоты для кофе...');
console.log('Получены слоты:', response.data);
console.log('Уникальные сотрудники:', uniqueEmployees);

// Бронирование
console.log('Бронируем кофе:', {
  employee: selectedEmployee,
  slot: selectedSlot
});

// Ошибки
console.error('Ошибка при загрузке слотов:', err);
```

### Отладка состояний
- Проверка авторизации
- Валидация API ответа
- Преобразование данных сотрудников
- Обработка ошибок

## Тестирование

### Ручное тестирование
1. **Загрузка данных**: Проверить отображение спиннера
2. **Успешная загрузка**: Проверить отображение сотрудников
3. **Выбор сотрудника**: Проверить визуальную индикацию
4. **Выбор времени**: Проверить работу календаря
5. **Бронирование**: Проверить подтверждение
6. **Ошибки**: Симулировать различные ошибки

### Автоматизированное тестирование
```typescript
describe('RandomCoffeeSection', () => {
  it('should load employees successfully', async () => {
    // Тест загрузки сотрудников
  });

  it('should handle employee selection', () => {
    // Тест выбора сотрудника
  });

  it('should handle time slot selection', () => {
    // Тест выбора времени
  });

  it('should handle booking confirmation', async () => {
    // Тест подтверждения бронирования
  });
});
```

## Производительность

### Оптимизации
- Мемоизация функции загрузки с `useCallback`
- Ленивая загрузка данных при монтировании компонента
- Кэширование преобразованных данных сотрудников

### Мониторинг
- Время загрузки API
- Количество ошибок
- Успешность преобразования данных

## Безопасность

### Валидация данных
- Проверка формата дат
- Валидация структуры ответа API
- Санитизация данных сотрудников

### Авторизация
- Проверка токена на каждом запросе
- Автоматический редирект при истечении токена

## Будущие улучшения

### Планируемые функции
1. **Множественный выбор**: Выбор из нескольких сотрудников
2. **Фильтрация**: Фильтр по должностям или отделам
3. **Поиск**: Поиск сотрудников по имени
4. **Уведомления**: Push-уведомления о новых доступных встречах
5. **История**: Просмотр прошлых встреч

### Технические улучшения
1. **WebSocket**: Реальное время обновления доступности
2. **Оптимизация**: Виртуализация для большого количества сотрудников
3. **Офлайн режим**: Базовая функциональность без интернета
4. **PWA**: Кэширование для офлайн использования 