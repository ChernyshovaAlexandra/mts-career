# ResumePage - Страница подготовки резюме

## Общее описание

ResumePage является образовательным модулем системы MTS Career, предназначенным для комплексного обучения пользователей навыкам создания эффективного резюме. Страница объединяет теоретические материалы, практические упражнения, технологии искусственного интеллекта и экспертные видеоматериалы от HR-специалистов МТС для создания полноценного образовательного опыта.

## Техническая архитектура

### Компонентная структура

```
ResumePage
├── ExpandableSection("tips") → TipsGrid (интерактивные советы)
├── ExpandableSection("dos-donts") → ResumeGame + MobileResumeGame (образовательная игра)
├── ExpandableSection("ai-checker") → AIResumeChecker (ИИ-анализ резюме)
└── ExpandableSection("hr-videos") → HRVideosCarousel (экспертные видео)
```

### Интерфейсы и типизация

#### Основные типы данных

```typescript
interface Tip {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
}

interface ResumeOption {
  id: string;
  isCorrect: boolean;
  explanation?: string;
}

interface GameQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options: ResumeOption[];
}

interface DirectionOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface HRVideo {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  subtitlesUrl: string;
  duration: string;
}
```

#### Компонентные интерфейсы

```typescript
interface ExpandableSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  noPaddingTop?: boolean;
}

interface AIResumeCheckerProps {
  attemptsRemaining: number;
}

interface VideoPlayerProps {
  videoUrl: string;
  subtitlesUrl: string;
  title: string;
  onClose: () => void;
}
```

### Обработчики событий

```typescript
// Управление разделами
const toggleSection = (sectionId: string) => void;

// TipsGrid обработчики
const handleCardClick = (tipId: string) => void;

// ResumeGame обработчики  
const handleOptionSelect = (questionId: string, optionId: string) => void;
const handleSubmit = () => void;
const handleRestart = () => void;

// AIResumeChecker обработчики
const handleDirectionChange = (value: string) => void;
const handleFileSelect = (file: File) => void;
const handleDrop = (e: React.DragEvent) => void;

// HRVideosCarousel обработчики
const handlePrevClick = () => void;
const handleNextClick = () => void;
const handleVideoPlay = (video: HRVideo) => void;
const handleCloseVideo = () => void;
```

### Специфичные улучшения для ResumePage

#### Образовательные карточки с переворачиванием

```typescript
<TipCard
  $isFlipped={flippedCards.has(tip.id)}
  role="button"
  aria-label={`Карточка совета: ${tip.title}`}
  onClick={() => handleCardClick(tip.id)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(tip.id);
    }
  }}
>
  <CardInner $isFlipped={flippedCards.has(tip.id)}>
    <CardFront>
      <TipTitle as="h3">{tip.title}</TipTitle>
      <TipDescription>{tip.shortDescription}</TipDescription>
    </CardFront>
    <CardBack>
      <BackContent>{tip.fullDescription}</BackContent>
    </CardBack>
  </CardInner>
</TipCard>
```

#### Интерактивная игра с адаптивностью

```typescript
<GameContainer>
  <StyledSteps
    direction="vertical"
    current={-1}
    items={stepItems}
    role="group"
    aria-label="Вопросы игры по составлению резюме"
  />
  <ActionButton
    variant="primary"
    onClick={handleSubmit}
    disabled={answeredQuestions === 0}
    aria-label="Узнать результат игры"
  >
    УЗНАТЬ РЕЗУЛЬТАТ
  </ActionButton>
</GameContainer>
```

#### Drag & Drop с валидацией файлов

```typescript
<DropZone
  $isDragOver={isDragOver}
  $hasFile={!!selectedFile}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  role="button"
  tabIndex={0}
  aria-labelledby="file-upload-label"
  aria-describedby="file-upload-help"
  aria-pressed={!!selectedFile}
>
  {selectedFile ? (
    <FileInfo>
      <DropZoneIcon $hasFile={!!selectedFile}>✓</DropZoneIcon>
      <DropZoneText>{selectedFile.name}</DropZoneText>
    </FileInfo>
  ) : (
    <>
      <DropZoneText>Перетащи или загрузи файл</DropZoneText>
      <DropZoneSubtext>Поддерживаются форматы .doc и .docx</DropZoneSubtext>
    </>
  )}
</DropZone>
```

#### Адаптивная карусель с видеопроигрывателем

```typescript
<CarouselContainer 
  role="region" 
  aria-label="Карусель видео от HR-специалистов"
>
  <CarouselTrack 
    $currentIndex={currentIndex} 
    $itemsPerView={itemsPerView}
    role="group"
    aria-label={`Видео группа ${currentIndex + 1} из ${totalSlides}`}
  >
    {hrVideos.map((video) => (
      <VideoCard key={video.id}>
        <PlayButton 
          aria-label={`Воспроизвести видео: ${video.name} - ${video.position}. Продолжительность: ${video.duration}`}
          onClick={() => handleVideoPlay(video)}
        />
        <SubtitlesOverlay>Субтитры</SubtitlesOverlay>
      </VideoCard>
    ))}
  </CarouselTrack>
</CarouselContainer>
```

## Компоненты и их назначение

### TipsGrid - Интерактивные советы

**Назначение**: Предоставление образовательного контента через интерактивные карточки с 3D-переворачиванием

**Ключевые особенности**:
- 6 карточек с советами по составлению резюме
- 3D CSS-анимация переворачивания карточек
- Адаптивная сетка (1-3 колонки в зависимости от экрана)
- Кнопка "Получить баллы" за просмотр всех советов
- Полная поддержка клавиатуры (Enter/Space)

**Структура данных**:
```typescript
const tips: Tip[] = [
  {
    id: "key-skills",
    title: "Сфокусируйся на ключевых навыках",
    shortDescription: "Выдели самые важные навыки",
    fullDescription: "Сконцентрируйся на тех навыках, которые напрямую связаны с требованиями вакансии..."
  }
];
```

### ResumeGame / MobileResumeGame - Образовательная игра

**Назначение**: Интерактивное обучение через игровой формат "правильно/неправильно"

**Ключевые особенности**:
- Пошаговые вопросы с вариантами ответов
- Система баллов
- Скачивание эталонного резюме после завершения
- Отдельная мобильная версия с оптимизированным UI
- Поддержка объяснений для каждого варианта ответа

**Игровая логика**:
```typescript
const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: "question1",
    questionNumber: 1,
    questionText: "Сравни два фрагмента резюме и выбери лучший.",
    options: [
      {
        id: "q1_option1",
        isCorrect: false,
        explanation: "Неправильно. Слишком общее описание без конкретных результатов"
      },
      {
        id: "q1_option2", 
        isCorrect: true,
        explanation: "Правильно! Конкретные цифры и достижения всегда лучше общих фраз"
      }
    ]
  }
  // ... дополнительные вопросы
];
```

### AIResumeChecker - ИИ-анализ резюме

**Назначение**: Персонализированная обратная связь по резюме с использованием искусственного интеллекта

**Ключевые особенности**:
- Ограничение 3 попытки на пользователя
- Поддержка форматов .doc и .docx
- Drag & Drop интерфейс с валидацией
- Выбор направления деятельности для точного анализа
- Статус-сообщения с aria-live для динамических обновлений

**Доступные направления**:
```typescript
const directionOptions: DirectionOption[] = [
  { label: "IT и разработка", value: "it" },
  { label: "Маркетинг и реклама", value: "marketing" },
  { label: "Продажи и развитие", value: "sales" },
  { label: "Финансы и аналитика", value: "finance" },
  { label: "Дизайн и творчество", value: "design" }
];
```

### HRVideosCarousel - Экспертные видеоматериалы

**Назначение**: Предоставление профессиональных советов от HR-специалистов МТС через видеоконтент

**Ключевые особенности**:
- Адаптивная карусель (1-3 видео в зависимости от экрана)
- Полноэкранный видеопроигрыватель с субтитрами
- Навигация клавиатурой и указательными устройствами
- Автоматическое воспроизведение при открытии
- Индикаторы прогресса и навигационные точки

**Структура видео**:
```typescript
const hrVideos: HRVideo[] = [
  {
    id: "video-1",
    name: "Анна Петрова",
    position: "HR-директор",
    description: "Расскажу, как составить резюме, которое привлечет внимание рекрутера с первых секунд просмотра.",
    imageUrl: "/images/hr/anna-petrova.jpg",
    videoUrl: "/videos/hr/anna-petrova.mp4",
    subtitlesUrl: "/videos/hr/anna-petrova.vtt",
    duration: "5-7 мин"
  }
];
```

### ExpandableSection - Организационный компонент

**Назначение**: Структурирование контента в раскрывающиеся секции для улучшения навигации

**Ключевые особенности**:
- Плавная анимация раскрытия/сокрытия
- ARIA-атрибуты для доступности
- Опциональные описания секций
- Поддержка клавиатурной навигации
- Индикация состояния (развернуто/свернуто)

### VideoPlayer - Полноэкранный проигрыватель

**Назначение**: Воспроизведение видеоконтента с поддержкой субтитров и полного экрана

**Ключевые особенности**:
- Полноэкранный режим с оверлеем
- Поддержка субтитров (.vtt формат)
- Закрытие по Escape или клику вне области
- Автоматический фокус на видео при открытии
- Адаптивные размеры (до 90% экрана)

## SEO и метаинформация

**Заголовок**: "Подготовка резюме - МТС Карьера | Создай идеальное резюме с помощью ИИ"

**Описание**: "Научись создавать резюме, которое выделит тебя среди других кандидатов. Карточки с советами, примеры, проверка ИИ и видео от HR-специалистов МТС."

**Ключевые слова**: резюме, CV, подготовка резюме, советы по резюме, МТС карьера, HR советы, искусственный интеллект, проверка резюме

**Структурированные данные**: Использует Schema.org HowTo разметку для пошагового руководства по созданию резюме

## Геймификация и мотивация

- **Система баллов**: 10 баллов за каждый правильный ответ в игре
- **Материальная награда**: Скачивание эталонного резюме
- **Прогресс-индикаторы**: Визуальное отображение прохождения этапов
- **Интерактивность**: Карточки, игра, drag&drop создают вовлекающий опыт
- **Персонализация**: ИИ-анализ с учетом выбранного направления деятельности

## Доступность и инклюзивность

- **WCAG 2.1 AA**: Полное соответствие стандартам доступности
- **Клавиатурная навигация**: Все интерактивные элементы доступны с клавиатуры
- **Screen Reader**: Подробные ARIA-метки и альтернативные описания
- **Цветовая контрастность**: Соответствие требованиям контрастности
- **Фокус-индикаторы**: Четкая визуализация фокуса для всех элементов
- **Субтитры**: Поддержка субтитров во всех видеоматериалах
- **Статус-сообщения**: Динамические обновления через aria-live 