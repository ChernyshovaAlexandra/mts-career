# AccountPage - Страница личного кабинета пользователя

## Общее описание

AccountPage является центральным элементом системы MTS Career, предоставляющим пользователю единую точку доступа ко всем аспектам его участия в программе развития карьеры. Страница объединяет персональную информацию, прогресс обучения, социальные взаимодействия и систему геймификации.

## Техническая архитектура

### Компонентная структура

```
AccountPage
├── PersonalDataCard (персональная информация)
├── TablePositionCard (рейтинг и баллы)
├── InterviewSimulationCard (симуляция собеседований)
├── RandomCoffeeCard (нетворкинг)
├── ActivityScaleCard (развитие навыков)
└── FeedbackCard (обратная связь)
```

### Интерфейсы и типизация

#### Основные типы данных

```typescript
interface ActivityItem {
  name: string;
  progress: string;
  completed?: boolean;
}

interface PersonalDataCardProps {
  firstName: string;
  lastName: string;
  personalCode: string;
  city: string;
  status: string;
}

interface TablePositionCardProps {
  position: number;
  points: string;
  onViewRating: () => void;
}

interface InterviewSimulationCardProps {
  direction: string;
  interviewDate: string;
  onChangeTime: () => void;
}

interface RandomCoffeeCardProps {
  employeeName: string;
  position: string;
  meetingDate: string;
  onChangeTime: () => void;
  employeeImage?: string;
}

interface ActivityScaleCardProps {
  generalSkills: ActivityItem[];
  activities: ActivityItem[];
  onActivityClick: (activityName: string) => void;
}

interface FeedbackCardProps {
  description: string;
  onTakeSurvey: () => void;
}
```

### Обработчики событий

```typescript
// Основные обработчики страницы
const handleViewRating = () => void;
const handleChangeInterviewTime = () => void;
const handleChangeCoffeeTime = () => void;
const handleActivityClick = (activityName: string) => void;
const handleTakeSurvey = () => void;
```

### Специфичные улучшения для AccountPage

#### Карточки

```typescript
// Каждая карточка использует семантический тег article
<Card aria-labelledby="card-title">
  <h2 id="card-title">Заголовок карточки</h2>
  {/* Содержимое */}
</Card>
```

#### Интерактивные элементы

```typescript
// Кнопки с описательными aria-label
<Button
  aria-label={`Изменить время встречи с ${employeeName}`}
  onClick={handleChangeTime}
>
  ИЗМЕНИТЬ ВРЕМЯ
</Button>

// Ссылки с контекстной информацией
<ActivityLink
  aria-label={`Перейти к активности: ${activityName}. Прогресс: ${progress}`}
  onClick={() => onActivityClick(activityName)}
>
  {activityName}
  <ChevronRight aria-hidden="true" />
</ActivityLink>
```

#### Прогресс и статусы

```typescript
// Прогресс с aria-live для динамических обновлений
<div aria-live="polite" aria-atomic="true">
  <ProgressText>{progress}</ProgressText>
  {completed && <StarIcon aria-label="Завершено" />}
</div>
```

#### Формы и поля

```typescript
// Связанные label и input
<FieldLabel htmlFor="employee-name">Имя сотрудника</FieldLabel>
<FieldValue id="employee-name">{employeeName}</FieldValue>
```

## Компоненты и их интерфейсы

### PersonalDataCard

**Назначение**: Отображение персональной информации пользователя

```typescript
interface PersonalDataCardProps {
  firstName: string;
  lastName: string;
  personalCode: string;
  city: string;
  status: string;
}
```

### TablePositionCard

**Назначение**: Отображение позиции в рейтинге и баллов

```typescript
interface TablePositionCardProps {
  position: number;
  points: string;
  onViewRating: () => void;
}
```

### InterviewSimulationCard

**Назначение**: Информация о запланированной симуляции собеседования

```typescript
interface InterviewSimulationCardProps {
  direction: string;
  interviewDate: string;
  onChangeTime: () => void;
}
```

### RandomCoffeeCard

**Назначение**: Информация о запланированной встрече с сотрудником

```typescript
interface RandomCoffeeCardProps {
  employeeName: string;
  position: string;
  meetingDate: string;
  onChangeTime: () => void;
  employeeImage?: string;
}
```

### ActivityScaleCard

**Назначение**: Отображение прогресса по навыкам и активностям

```typescript
interface ActivityItem {
  name: string;
  progress: string;
  completed?: boolean;
}

interface ActivityScaleCardProps {
  generalSkills: ActivityItem[];
  activities: ActivityItem[];
  onActivityClick: (activityName: string) => void;
}
```

### FeedbackCard

**Назначение**: Возможность пройти опрос и получить баллы

```typescript
interface FeedbackCardProps {
  description: string;
  onTakeSurvey: () => void;
}
```
