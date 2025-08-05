# API Endpoint: /api/resume

## Описание
Эндпоинт для отправки резюме на анализ с помощью искусственного интеллекта.

## Метод
`POST`

## URL
`/api/resume`

## Авторизация
**Требуется**: Bearer Token
```
Authorization: Bearer {access_token}
```

## Параметры запроса

### Body (multipart/form-data)

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `resume` | File | ✅ Да | Файл резюме в формате .doc или .docx |

### Пример запроса

```javascript
// Создание FormData
const formData = new FormData();
formData.append('resume', file); // file - объект File

// Отправка запроса
const response = await fetch('/api/resume', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your_access_token_here'
  },
  body: formData
});
```

### Пример с Axios

```javascript
import axios from 'axios';

const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await axios.post('/api/resume', formData, {
    headers: {
      'Authorization': 'Bearer your_access_token_here'
    }
  });
  
  return response.data;
};
```

## Ответ

### Успешный ответ (200 OK)

```json
{
  "summary": "Краткий анализ резюме от ИИ",
  "tags": [
    "Рекомендация 1",
    "Рекомендация 2",
    "Рекомендация 3"
  ]
}
```

### Структура ответа

| Поле | Тип | Описание |
|------|-----|----------|
| `summary` | string | Краткий анализ резюме с указанием сильных и слабых сторон |
| `tags` | string[] | Массив конкретных рекомендаций по улучшению резюме |

## Коды ошибок

### 400 Bad Request
```json
{
  "message": "The resume field is required.",
  "errors": {
    "resume": [
      "The resume field is required."
    ]
  }
}
```

**Причины:**
- Файл не был отправлен
- Поле `resume` отсутствует в FormData
- Файл имеет неподдерживаемый формат

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

**Причины:**
- Отсутствует токен авторизации
- Токен недействителен или истек

### 413 Payload Too Large
```json
{
  "message": "File too large"
}
```

**Причины:**
- Размер файла превышает допустимый лимит

### 429 Too Many Requests
```json
{
  "message": "Rate limit exceeded"
}
```

**Причины:**
- Превышен лимит попыток анализа резюме

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

**Причины:**
- Ошибка на сервере при обработке файла
- Проблемы с ИИ-сервисом

## Ограничения

### Поддерживаемые форматы файлов
- `.doc` - Microsoft Word Document (старый формат)
- `.docx` - Microsoft Word Document (новый формат)

### Размер файла
- Максимальный размер: **10 MB**

### Лимиты использования
- Количество попыток: **3 раза** на пользователя
- Интервал между попытками: **1 минута**

## Примеры использования

### JavaScript (Browser)

```javascript
// Получение файла из input
const fileInput = document.getElementById('resume-file');
const file = fileInput.files[0];

// Проверка формата
if (!file.name.endsWith('.doc') && !file.name.endsWith('.docx')) {
  alert('Поддерживаются только файлы .doc и .docx');
  return;
}

// Проверка размера (10MB = 10 * 1024 * 1024 bytes)
if (file.size > 10 * 1024 * 1024) {
  alert('Файл слишком большой. Максимальный размер: 10MB');
  return;
}

// Отправка файла
const formData = new FormData();
formData.append('resume', file);

try {
  const response = await fetch('/api/resume', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: formData
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Анализ резюме:', result);
  } else {
    const error = await response.json();
    console.error('Ошибка:', error);
  }
} catch (error) {
  console.error('Сетевая ошибка:', error);
}
```

### React Component

```jsx
import { useState } from 'react';
import { apiService } from '../services/apiService';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.uploadResume(file);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".doc,.docx"
        onChange={handleFileChange}
        disabled={loading}
      />
      <button type="submit" disabled={!file || loading}>
        {loading ? 'Отправка...' : 'Отправить на анализ'}
      </button>
      
      {error && <div className="error">{error}</div>}
      
      {result && (
        <div className="result">
          <h3>Результаты анализа</h3>
          <p>{result.summary}</p>
          <ul>
            {result.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
```

### cURL

```bash
curl -X POST \
  -H "Authorization: Bearer your_access_token_here" \
  -F "resume=@path/to/your/resume.docx" \
  https://your-api-domain.com/api/resume
```

### Postman

1. **Method**: POST
2. **URL**: `https://your-api-domain.com/api/resume`
3. **Headers**:
   - `Authorization`: `Bearer your_access_token_here`
4. **Body**:
   - Type: `form-data`
   - Key: `resume`
   - Value: Select file (Type: File)
   - File: Choose your resume file

## Безопасность

### Валидация файлов
- Проверка расширения файла
- Проверка MIME-типа
- Сканирование на вредоносное содержимое
- Ограничение размера файла

### Авторизация
- Обязательная авторизация через Bearer Token
- Проверка валидности токена на каждом запросе
- Автоматическое обновление токена при необходимости

### Rate Limiting
- Ограничение количества запросов в единицу времени
- Защита от DDoS атак
- Лимиты на пользователя и IP-адрес

## Мониторинг и логирование

### Логируемые события
- Успешные загрузки файлов
- Ошибки валидации
- Ошибки авторизации
- Превышение лимитов
- Ошибки обработки файлов

### Метрики
- Количество загрузок в день
- Среднее время обработки
- Процент успешных запросов
- Популярные форматы файлов 