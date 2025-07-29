export interface HRVideo {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  subtitlesUrl: string;
  duration: string;
}

export const hrVideos: HRVideo[] = [
  {
    id: "video-1",
    name: "Анна Петрова",
    position: "HR-директор",
    description: "Расскажу, как составить резюме, которое привлечет внимание рекрутера",
    imageUrl: "/images/hr/anna-petrova.jpg",
    videoUrl: "/videos/hr/anna-petrova.mp4",
    subtitlesUrl: "/videos/hr/anna-petrova.vtt",
    duration: "5-7 мин"
  },
  {
    id: "video-2", 
    name: "Михаил Сидоров",
    position: "Старший рекрутер",
    description: "Покажу ошибки в резюме и как их избежать на конкретных примерах.",
    imageUrl: "/images/hr/mikhail-sidorov.jpg",
    videoUrl: "/videos/hr/mikhail-sidorov.mp4",
    subtitlesUrl: "/videos/hr/mikhail-sidorov.vtt",
    duration: "6-8 мин"
  },
  {
    id: "video-3",
    name: "Елена Козлова", 
    position: "IT-рекрутер",
    description: "Поделюсь особенностями составления резюме.",
    imageUrl: "/images/hr/elena-kozlova.jpg",
    videoUrl: "/videos/hr/elena-kozlova.mp4",
    subtitlesUrl: "/videos/hr/elena-kozlova.vtt",
    duration: "4-6 мин"
  },
  {
    id: "video-4",
    name: "Дмитрий Волков",
    position: "Ведущий рекрутер",
    description: "Объясню, как описать навыки, чтобы выделиться среди других кандидатов.",
    imageUrl: "/images/hr/dmitry-volkov.jpg",
    videoUrl: "/videos/hr/dmitry-volkov.mp4",
    subtitlesUrl: "/videos/hr/dmitry-volkov.vtt",
    duration: "7-9 мин"
  }
]; 