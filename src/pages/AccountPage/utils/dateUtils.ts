/**
 * Форматирует дату и время для отображения в карточках
 * @param date - дата в формате "YYYY-MM-DD"
 * @param time - время в формате "HH:MM:SS"
 * @returns отформатированная строка даты и времени
 */
export const formatDateTime = (date: string, time: string): string => {
  try {
    const dateObj = new Date(`${date}T${time}`);
    
    // Проверяем, что дата валидна
    if (isNaN(dateObj.getTime())) {
      return `${date} в ${time}`;
    }
    
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString('ru-RU', { month: 'long' });
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} в ${hours}:${minutes}`;
  } catch (error) {
    // Fallback к простому форматированию
    return `${date} в ${time}`;
  }
};

/**
 * Получает направление из массива направлений
 * @param directions - массив направлений
 * @returns строку с направлением или "Общее направление"
 */
export const getDirectionFromArray = (directions: string[]): string => {
  if (!directions || directions.length === 0) {
    return "Общее направление";
  }
  
  return directions[0]; // Возвращаем первое направление
}; 