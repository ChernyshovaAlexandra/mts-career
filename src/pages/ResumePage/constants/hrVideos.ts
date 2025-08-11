export interface HRVideo {
  id: string;
  name: string;
  position: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  subtitlesUrl?: string;
  duration: string;
  /** When true, this video plays inline directly inside the carousel card */
  playInline?: boolean;
}

export const hrVideos: HRVideo[] = [
  {
    id: "hr-lud",
    name: "Людмила Красникова",
    position: "Руководитель группы подбора",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Lud.mp4",
    duration: "",
    playInline: true
  },
  {
    id: "hr-ans",
    name: "Анастасия Еряшкина",
    position: "Руководитель группы подбора",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Ans.mp4",
    duration: "",
    playInline: true
  },
  {
    id: "hr-mark",
    name: "Марк Гуревич",
    position: "Ведущий ИТ-рекрутер",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Mark.mp4",
    duration: "",
    playInline: true
  },
  // {
  //   id: "hr-art",
  //   name: "Артем Соколов",
  //   position: "Руководитель группы подбор",
  //   description: "",
  //   imageUrl: "",
  //   videoUrl: "/videos/hr/HR_Art.mp4",
  //   duration: "",
  //   playInline: true
  // },
  {
    id: "hr-mziuri",
    name: "Мзиури Чаава",
    position: "Руководитель группы подбора",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Mziuri.mp4",
    duration: "",
    playInline: true
  },
  {
    id: "hr-dar",
    name: "Дарья Селезнева",
    position: "Специалист группы подбора",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Dar.mp4",
    duration: "",
    playInline: true
  },
  {
    id: "hr-gal",
    name: "Галина Дворникова",
    position: "Менеджер по персоналу",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Gal.mp4",
    duration: "",
    playInline: true
  },
  {
    id: "hr-val",
    name: "Валерия Скубьева",
    position: "Менеджер по персоналу",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Val.mp4",
    duration: "",
    playInline: true
  },
  {
    id: "hr-kat",
    name: "Екатерина Галактионова",
    position: "Ведущий ИТ-рекрутер",
    description: "",
    imageUrl: "",
    videoUrl: "/videos/hr/HR_Kat.mp4",
    duration: "",
    playInline: true
  }
];