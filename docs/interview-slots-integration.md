# Интеграция API слотов для страницы интервью

## Обзор функциональности

Компонент `InterviewSimulation` теперь интегрирован с API `/api/meets` для отображения реальных доступных слотов для записи на собеседование. Функциональность включает загрузку данных, обработку ошибок, состояния загрузки и преобразование данных в удобный для пользователя формат.

## API интеграция

### Эндпоинт `/api/meets`

**Метод**: `GET`  
**URL**: `/api/meets`  
**Авторизация**: Bearer Token  
**Ответ**: Объект с массивом слотов

```typescript
interface MeetsResponse {
  status: boolean;
  meets: MeetSlot[];
}

interface MeetSlot {
  id: number;
  type: string;           // "sobes"
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

**Пример ответа**:
```json
{
  "status": true,
  "meets": [
    {
      "id": 1,
      "type": "sobes",
      "date": "2025-08-18",
      "time": "10:00:00",
      "link": "https://meet.google.com/user1-20250818-1000",
      "status": "available",
      "staff": {
        "name": "user1@example.com",
        "img": null,
        "position": null,
        "directions": []
      }
    },
    {
      "id": 2,
      "type": "sobes",
      "date": "2025-08-18",
      "time": "11:00:00",
      "link": "https://meet.google.com/user1-20250818-1100",
      "status": "available",
      "staff": {
        "name": "user1@example.com",
        "img": null,
        "position": null,
        "directions": []
      }
    }
  ]
}
```

### Преобразование данных

Функция `transformMeetSlotsToSchedule` преобразует API данные в формат, удобный для отображения:

```typescript
const transformMeetSlotsToSchedule = (meetSlots: MeetSlot[]): DaySchedule[] => {
  const scheduleMap = new Map<string, DaySchedule>();
  
  meetSlots.forEach(slot => {
    // Парсим дату и время из API
    const dateStr = slot.date; // "2025-08-18"
    const timeStr = slot.time; // "10:00:00"
    
    // Создаем объект Date для получения дня недели
    const dateObj = new Date(dateStr);
    
    // Форматируем дату для отображения
    const dayName = dateObj.toLocaleDateString('ru-RU', { weekday: 'long' });
    const displayDate = dateObj.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long' 
    });
    
    // Форматируем время (убираем секунды)
    const displayTime = timeStr.substring(0, 5); // "10:00"
    
    const key = `${dayName}-${displayDate}`;
    
    if (!scheduleMap.has(key)) {
      scheduleMap.set(key, {
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date: displayDate,
        timeSlots: []
      });
    }
    
    const schedule = scheduleMap.get(key)!;
    
    // Проверяем, что слот доступен
    if (slot.status === 'available') {
      schedule.timeSlots.push({
        time: displayTime,
        available: true
      });
    }
  });
  
  return Array.from(scheduleMap.values());
};
```

## Состояния компонента

### 1. Загрузка (Loading)
```typescript
const [isLoading, setIsLoading] = useState<boolean>(true);
```

**Отображение**:
- Спиннер загрузки
- Текст "Загружаем доступные слоты..."
- ARIA статус для скринридеров

### 2. Ошибка (Error)
```typescript
const [error, setError] = useState<string | null>(null);
```

**Типы ошибок**:
- `401 Unauthorized`: Ошибка авторизации
- Сетевые ошибки
- Ошибки API

**Отображение**:
- Красное сообщение об ошибке
- Кнопка "Попробовать снова"

### 3. Пустой результат (Empty)
```typescript
const [schedule, setSchedule] = useState<DaySchedule[]>([]);
```

**Отображение**:
- Серое сообщение о отсутствии слотов
- Рекомендация попробовать позже

### 4. Успешная загрузка (Success)
**Отображение**:
- Календарь с доступными слотами
- Навигация по дням
- Выбор времени

## Обработка ошибок

### Авторизация
```typescript
if (err.response?.status === 401) {
  setError("Ошибка авторизации. Пожалуйста, войдите в систему заново.");
}
```

### API ошибки
```typescript
if (err.response?.data?.message) {
  setError(err.response.data.message);
} else {
  setError("Произошла ошибка при загрузке доступных слотов. Попробуйте позже.");
}
```

### Повторная попытка
```typescript
<Button 
  variant="secondary" 
  onClick={loadMeetSlots}
  style={{ marginTop: '12px' }}
>
  Попробовать снова
</Button>
```

## Форматирование дат и времени

### Локализация
```typescript
// День недели
const dayName = dateObj.toLocaleDateString('ru-RU', { weekday: 'long' });

// Дата
const displayDate = dateObj.toLocaleDateString('ru-RU', { 
  day: 'numeric', 
  month: 'long' 
});

// Время (убираем секунды)
const displayTime = timeStr.substring(0, 5); // "10:00"
```

### Примеры форматирования
- **День**: "Понедельник" → "Понедельник"
- **Дата**: "18 августа" → "18 августа"
- **Время**: "10:00:00" → "10:00"

## Структура расписания

### Группировка по дням
```typescript
interface DaySchedule {
  day: string;        // "Понедельник"
  date: string;       // "18 августа"
  timeSlots: TimeSlot[];
}
```

### Слоты времени
```typescript
interface TimeSlot {
  time: string;       // "10:00"
  available: boolean; // true/false
}
```

### Фиксированная сетка
Компонент использует фиксированную сетку времени для единообразного отображения:

```typescript
const fixedSlots = [
  { time: '10:00', available: false },
  { time: '11:00', available: false },
  { time: '12:00', available: false },
  { time: '13:00', available: false },
  { time: '–', available: false },
  { time: '14:00', available: false },
  { time: '15:00', available: false },
  { time: '16:00', available: false },
];
```

## Доступность (A11y)

### ARIA атрибуты
```typescript
// Состояние загрузки
<div role="status" aria-live="polite">
  <LoadingSpinner aria-hidden="true" />
  <Text>Загружаем доступные слоты...</Text>
</div>

// Ошибка
<ErrorMessage role="alert" aria-live="assertive">
  {error}
</ErrorMessage>

// Пустое состояние
<EmptyMessage>
  В данный момент нет доступных слотов...
</EmptyMessage>
```

### Клавиатурная навигация
- **Tab**: Переход между элементами
- **Enter/Space**: Выбор слота времени
- **Стрелки**: Навигация по календарю

### Screen Reader поддержка
- Описательные метки для всех кнопок
- Статусные сообщения для динамических обновлений
- Альтернативные тексты для иконок

## Стилизация

### Спиннер загрузки
```typescript
const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${mts_brand_red};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
```

### Сообщения об ошибках
```typescript
const ErrorMessage = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
  font-size: 14px;
`;
```

### Пустое состояние
```typescript
const EmptyMessage = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  color: #6B7280;
  padding: 32px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
`;
```

## Логирование и отладка

### Консольные логи
```typescript
// Загрузка данных
console.log('Загружаем доступные слоты...');
console.log('Получены слоты:', response.data);
console.log('Преобразованный график:', transformedSchedule);

// Ошибки
console.error('Ошибка при загрузке слотов:', err);
```

### Отладка состояний
- Проверка авторизации
- Валидация API ответа
- Преобразование данных
- Обработка ошибок

## Тестирование

### Ручное тестирование
1. **Загрузка слотов**: Проверить отображение спиннера
2. **Успешная загрузка**: Проверить отображение календаря
3. **Ошибка авторизации**: Симулировать 401 ошибку
4. **Сетевые ошибки**: Отключить интернет
5. **Пустой результат**: Проверить отображение пустого состояния

### Автоматизированное тестирование
```typescript
describe('InterviewSimulation API Integration', () => {
  it('should load meet slots successfully', async () => {
    // Тест успешной загрузки
  });

  it('should handle API errors gracefully', async () => {
    // Тест обработки ошибок
  });

  it('should transform API data correctly', () => {
    // Тест преобразования данных
  });
});
```

## Производительность

### Оптимизации
- Мемоизация функции загрузки с `useCallback`
- Ленивая загрузка данных при монтировании компонента
- Кэширование преобразованных данных

### Мониторинг
- Время загрузки API
- Количество ошибок
- Успешность преобразования данных

## Безопасность

### Валидация данных
- Проверка формата дат
- Валидация структуры ответа API
- Санитизация пользовательского ввода

### Авторизация
- Проверка токена на каждом запросе
- Автоматический редирект при истечении токена

## Будущие улучшения

### Планируемые функции
1. **Кэширование**: Сохранение слотов в localStorage
2. **Автообновление**: Периодическое обновление доступных слотов
3. **Фильтрация**: Фильтр по направлениям или времени
4. **Поиск**: Поиск по датам или времени
5. **Уведомления**: Push-уведомления о новых слотах

### Технические улучшения
1. **WebSocket**: Реальное время обновления слотов
2. **Оптимизация**: Виртуализация для большого количества слотов
3. **Офлайн режим**: Базовая функциональность без интернета
4. **PWA**: Кэширование для офлайн использования 