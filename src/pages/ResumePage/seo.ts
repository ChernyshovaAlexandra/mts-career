export const resumePageSEO = {
  title: "Подготовка резюме - МТС Карьера | Создай идеальное резюме с помощью ИИ",
  description: "Научись создавать резюме, которое выделит тебя среди других кандидатов. Карточки с советами, примеры, проверка ИИ и видео от HR-специалистов МТС. Бесплатные инструменты для составления резюме.",
  keywords: "резюме, CV, подготовка резюме, советы по резюме, МТС карьера, HR советы, искусственный интеллект, проверка резюме, работа в МТС, карьера, вакансии",
  
  // Open Graph
  ogTitle: "Подготовка резюме с ИИ - МТС Карьера",
  ogDescription: "Шаг за шагом научись создавать резюме мечты. Советы от HR, проверка ИИ, примеры и видео от экспертов МТС. Начни карьеру с идеального резюме!",
  ogImage: "/images/og/resume-page.jpg",
  ogUrl: "https://career.mts.ru/resume",
  
  // Twitter Card
  twitterTitle: "Создай идеальное резюме с МТС Карьера",
  twitterDescription: "Советы от HR, проверка ИИ и примеры резюме от экспертов МТС. Все инструменты для создания резюме мечты в одном месте.",
  twitterImage: "/images/twitter/resume-card.jpg",
  
  // Technical SEO
  canonical: "https://career.mts.ru/resume",
  robots: "index, follow",
  
  // Structured Data (JSON-LD)
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Подготовка резюме",
    "description": "Научись создавать резюме, которое выделит тебя среди других кандидатов с помощью советов от HR-экспертов МТС",
    "url": "https://career.mts.ru/resume",
    "mainEntity": {
      "@type": "HowTo",
      "name": "Как подготовить идеальное резюме",
      "description": "Пошаговое руководство по созданию резюме с советами от HR-специалистов, проверкой ИИ и практическими примерами",
      "image": "/images/resume-bg.webp",
      "totalTime": "PT30M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Документ Word"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "ИИ-проверка резюме"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Изучи основные советы",
          "text": "Ознакомься с карточками советов по составлению резюме от HR-экспертов",
          "position": 1
        },
        {
          "@type": "HowToStep", 
          "name": "Сравни примеры",
          "text": "Изучи хорошие и неудачные примеры резюме, выбери удачные варианты",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "name": "Получи обратную связь от ИИ",
          "text": "Загрузи свое резюме и получи персональные рекомендации от искусственного интеллекта",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "name": "Посмотри видео от HR",
          "text": "Изучи видеосоветы от HR-специалистов МТС с практическими рекомендациями",
          "position": 4
        }
      ]
    },
    "provider": {
      "@type": "Organization",
      "name": "МТС",
      "url": "https://mts.ru",
      "logo": {
        "@type": "ImageObject",
        "url": "https://career.mts.ru/images/mts-logo.png"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "МТС Карьера",
          "item": "https://career.mts.ru"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Подготовка резюме",
          "item": "https://career.mts.ru/resume"
        }
      ]
    }
  }
}; 