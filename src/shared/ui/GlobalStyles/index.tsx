import { createGlobalStyle } from "styled-components";

/**
 * Глобальные стили для приложения
 *
 * Включает стили для доступности, базовые стили и утилиты
 * Адаптивный дизайн: десктопная версия для больших экранов,
 * мобильная версия для iPhone 13 mini и подобных устройств
 */
const GlobalStyles = createGlobalStyle`
  /* CSS переменные */
  :root {
    /* Размеры компонентов */
    --header-height: 64px;
    --footer-height: 72px;
    
    /* Цвета текстов */
    --text-primary: #1D2023;
    --text-light-secondary:#626C77;
    --text-controls-tertiary-active: #F2F3F7;
    --text-light-secondary: #626C77;
    --text-light-primary-link: #0070E5;
    --text-light-accent: #007CFF;  
    
    /* Размеры шрифтов */
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-base: 16px;
    --font-size-lg: 17px;
    --font-size-xl: 18px;
    --font-size-2xl: 20px;
    --font-size-3xl: 24px;
    --font-size-4xl: 32px;
    --font-size-5xl: 56px;
    
    /* Высота строк */
    --line-height-tight: 120%;
    --line-height-normal: 140%;
    --line-height-relaxed: 160%;
    
    /* Межбуквенное расстояние */
    --letter-spacing-none: 0px;
    --letter-spacing-wide: 0.6px;
    
    /* Веса шрифтов */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-black: 900;
  }

  /* Мобильные оптимизации */
  @media (max-width: 768px) {
    html {
      /* Предотвращение 300ms задержки на мобильных устройствах */
      touch-action: manipulation;
      /* Улучшенная производительность скролла */
      -webkit-overflow-scrolling: touch;
      /* Оптимизация для мобильных устройств */
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
  }

  /* Подключение шрифтов MTS Wide */
  @font-face {
    font-family: 'MTS Wide';
    src: url('/fonts/MTSWide-Regular.woff2') format('woff2'),
         url('/fonts/MTSWide-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Wide';
    src: url('/fonts/MTSWide-Medium.woff2') format('woff2'),
         url('/fonts/MTSWide-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Wide';
    src: url('/fonts/MTSWide-Bold.woff2') format('woff2'),
         url('/fonts/MTSWide-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Wide';
    src: url('/fonts/MTSWide-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Wide';
    src: url('/fonts/MTSWide-Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  /* Подключение шрифтов MTS Text */
  @font-face {
    font-family: 'MTS Text';
    src: url('/fonts/MTSText-Regular.woff2') format('woff2'),
         url('/fonts/MTSText-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Text';
    src: url('/fonts/MTSText-Medium.woff2') format('woff2'),
         url('/fonts/MTSText-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Text';
    src: url('/fonts/MTSText-Bold.woff2') format('woff2'),
         url('/fonts/MTSText-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MTS Text';
    src: url('/fonts/MTSText-Black.woff2') format('woff2'),
         url('/fonts/MTSText-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  /* Скрытые элементы для скринридеров */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Базовые стили для доступности */
  *:focus {
    outline: 2px solid var(--text-light-accent);
    outline-offset: 2px;
  }

  /* Улучшенная читаемость текста */
  body {
    font-family: 'MTS Wide', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: var(--text-primary);
  }

  /* Мобильные оптимизации для body */
  @media (max-width: 768px) {
    body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      font-size: 16px; /* Предотвращает зум на iOS */
    }
  }

  /* Улучшенная контрастность для ссылок */
  a {
    color: var(--text-light-primary-link);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Стили для кнопок */
  button {
    font-family: inherit;
  }

  @media (max-width: 768px) {
    button {
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
  }

  /* Улучшенная доступность для интерактивных элементов */
  [role="button"],
  [role="link"] {
    cursor: pointer;
  }

  /* Стили для фокуса на мобильных устройствах */
  @media (max-width: 768px) {
    *:focus {
      outline: none;
    }
    
    button:focus,
    a:focus,
    [tabindex]:focus {
      outline: 2px solid var(--text-light-accent);
      outline-offset: 2px;
    }

    .card, [class*="Card"] {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background: #ffffff;
    }

    .mobile-container {
      padding: 0 16px;
      max-width: 375px;
      margin: 0 auto;
    }
  }

  /* Улучшенная доступность для списков */
  ul, ol {
    padding-left: 1.5em;
  }

  /* Стили для заголовков */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.25;
  }

  /* Улучшенная доступность для изображений */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Стили для форм */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  @media (max-width: 768px) {
    input, textarea, select {
      -webkit-appearance: none;
      border-radius: 0;
    }
  }

  /* Улучшенная доступность для таблиц */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  /* Стили для скроллбара */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  @media (max-width: 768px) {
    ::-webkit-scrollbar {
      display: none;
    }
    
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
`;

export default GlobalStyles;
