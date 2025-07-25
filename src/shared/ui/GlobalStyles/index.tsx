import { createGlobalStyle } from "styled-components";

/**
 * Глобальные стили для приложения
 *
 * Включает стили для доступности, базовые стили и утилиты
 */
const GlobalStyles = createGlobalStyle`
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
    outline: 2px solid #4CAF50;
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
    color: #1a1a1a;
  }

  /* Улучшенная контрастность для ссылок */
  a {
    color: #0066cc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Стили для кнопок */
  button {
    font-family: inherit;
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
      outline: 2px solid #4CAF50;
      outline-offset: 2px;
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
`;

export default GlobalStyles;
