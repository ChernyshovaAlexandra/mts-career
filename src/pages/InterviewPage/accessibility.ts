/**
 * Утилиты для улучшения доступности страницы интервью
 */

// Константы для ARIA атрибутов
export const ARIA_LABELS = {
  CAROUSEL: {
    REGION: "Карусель карточек с советами для интервью",
    INSTRUCTIONS: "Используйте кнопки навигации или клавиши влево/вправо для перемещения",
    PREV_BUTTON: "Предыдущие карточки",
    NEXT_BUTTON: "Следующие карточки",
    DOT: "Перейти к группе карточек",
    CARD: "Карточка с советом для интервью"
  },
  SIMULATION: {
    REGION: "Симуляция собеседования",
    FORM: "Форма выбора параметров",
    SCHEDULE: "Выбор времени встречи",
    ACTIONS: "Действия",
    DIRECTION: "Направление",
    FILE: "Резюме в формате .doc",
    TIME_SLOT: "Выбрать время",
    UNAVAILABLE_SLOT: "Время недоступно",
    SCHEDULE_BUTTON: "Назначить встречу"
  },
  PAGE: {
    MAIN_HEADING: "Подготовка к собеседованию",
    STEPS_LIST: "Этапы подготовки к собеседованию",
    DECORATIVE_IMAGE: "Иллюстрация подготовки к собеседованию",
    BASIC_RULES: "Основные правила",
    GET_POINTS: "Получить баллы за изучение материалов"
  }
} as const;

// Клавиши для навигации
export const NAVIGATION_KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  ENTER: 'Enter',
  SPACE: ' ',
  TAB: 'Tab'
} as const;

export const accessibilityUtils = {

  generateId: (prefix: string, suffix?: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${prefix}-${timestamp}-${random}${suffix ? `-${suffix}` : ''}`;
  },


  isKeyboardNavigation: (event: KeyboardEvent): boolean => {
    return event.key === NAVIGATION_KEYS.ARROW_LEFT || 
           event.key === NAVIGATION_KEYS.ARROW_RIGHT ||
           event.key === NAVIGATION_KEYS.HOME ||
           event.key === NAVIGATION_KEYS.END;
  },

  isFocusable: (element: HTMLElement): boolean => {
    const tagName = element.tagName.toLowerCase();
    const type = (element as HTMLInputElement).type;
    
    return (
      tagName === 'button' ||
      tagName === 'input' ||
      tagName === 'select' ||
      tagName === 'textarea' ||
      tagName === 'a' ||
      element.tabIndex >= 0 ||
      (tagName === 'input' && type !== 'hidden')
    );
  },

  setFocus: (element: HTMLElement | null): void => {
    if (element && accessibilityUtils.isFocusable(element)) {
      element.focus();
    }
  },

  getTimeSlotDescription: (day: string, time: string, available: boolean): string => {
    if (available) {
      return `Выбрать время ${time} в ${day.toLowerCase()}`;
    }
    return `Время ${time} недоступно`;
  },


  getScheduleButtonDescription: (selectedSlot: { day: string; time: string } | null): string => {
    if (selectedSlot) {
      return `Назначить встречу на ${selectedSlot.day} в ${selectedSlot.time}`;
    }
    return "Выберите время для назначения встречи";
  }
};

export const useAccessibility = () => {
  const handleKeyboardNavigation = (
    event: KeyboardEvent,
    currentIndex: number,
    maxIndex: number,
    onIndexChange: (index: number) => void
  ): void => {
    switch (event.key) {
      case NAVIGATION_KEYS.ARROW_LEFT:
        event.preventDefault();
        if (currentIndex > 0) {
          onIndexChange(currentIndex - 1);
        }
        break;
      case NAVIGATION_KEYS.ARROW_RIGHT:
        event.preventDefault();
        if (currentIndex < maxIndex) {
          onIndexChange(currentIndex + 1);
        }
        break;
      case NAVIGATION_KEYS.HOME:
        event.preventDefault();
        onIndexChange(0);
        break;
      case NAVIGATION_KEYS.END:
        event.preventDefault();
        onIndexChange(maxIndex);
        break;
    }
  };

  const manageFocus = (elementRef: React.RefObject<HTMLElement>): void => {
    if (elementRef.current) {
      accessibilityUtils.setFocus(elementRef.current);
    }
  };

  return {
    handleKeyboardNavigation,
    manageFocus
  };
};

export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'role'?: string;
  'tabIndex'?: number;
}

export interface KeyboardNavigationProps {
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
} 