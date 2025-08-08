import axios, { type AxiosInstance } from "axios";
import type { UserData } from "../store";

/**
 * Strongly‑typed API client for the backend described in the
 * specification. Handles auth token attachment automatically and
 * exposes convenience wrappers for each endpoint.
 */
export class ApiService {
  private readonly http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      timeout: 15000,
      // Убираем Content-Type по умолчанию, чтобы не перезаписывать для FormData
    });

    this.http.interceptors.request.use((config) => {
      const token = ApiService.getAccessToken();
      if (token) {
        if (config.headers) {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          console.info(config);
        }
      }
      
      // Логируем конфигурацию запроса для отладки
      console.log('Axios Request Config:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        dataType: config.data instanceof FormData ? 'FormData' : typeof config.data
      });
      
      return config;
    });
  }
  /* ------------------------------------------------------------------ */
  /*                              helpers                               */
  /* ------------------------------------------------------------------ */

  static getAccessToken(): string | undefined {
    return localStorage.getItem("access_token") ?? undefined;
  }

  static setAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
  }

  static clearAccessToken(): void {
    localStorage.removeItem("access_token");
  }

  /* ------------------------------------------------------------------ */
  /*                        1. AUTH & USERS                             */
  /* ------------------------------------------------------------------ */

  checkEmail(email: string) {
    return this.http.post<{ status: boolean; message?: string }>(
      "/api/check-email",
      { email }
    );
  }

  register(payload: RegisterPayload) {
    return this.http.post<void>("/api/register", payload);
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>("/api/login", { email, password });
  }

  resetPassword(payload: { email: string; nickname?: string }) {
    return this.http.post<void>("/api/resetPassword", payload);
  }

  /* ------------------------------------------------------------------ */
  /*                              2. GAMES                              */
  /* ------------------------------------------------------------------ */

  startGame(game: string) {
    return this.http.post<GameStartResponse>("/api/game/start", { game });
  }

  sendGameResult(payload: GameResultPayload) {
    return this.http.post<GameStartResponse>("/api/game/result", payload);
  }

  /* ------------------------------------------------------------------ */
  /*                        3. IMAGE GALLERY                            */
  /* ------------------------------------------------------------------ */

  getGallery(params: GalleryParams) {
    return this.http.post<GalleryItem[]>("/api/gallery", params);
  }

  selectImage(image_id: string) {
    return this.http.post<void>("/api/select-image", { image_id });
  }

  likeImage(image_id: string) {
    return this.http.post<void>("/api/like-image", { image_id });
  }

  /* ------------------------------------------------------------------ */
  /*                     4. MEETS / INTERVIEWS                          */
  /* ------------------------------------------------------------------ */

  listMeets() {
    return this.http.get<MeetsResponse>("/api/meets");
  }

  uploadResume(file: File) {
    console.log('API Service: Начинаем загрузку файла', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    const formData = new FormData();
    formData.append("resume", file);
    
    // Проверяем содержимое FormData
    console.log('API Service: FormData создан');
    for (let [key, value] of formData.entries()) {
      console.log('API Service: FormData entry:', key, value);
    }
    
    // Позволяем браузеру самому установить правильный Content-Type для FormData
    return this.http.post<ResumeAnalyseResponse>("/api/resume", formData);
  }

  bookInterview(meet_id: number, resume: File) {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("meet_id", String(meet_id));
    return this.http.post<InterviewBookingResponse>("/api/sobes", formData);
  }

  bookCoffee(meet_id: number) {
    return this.http.post<InterviewBookingResponse>("/api/kofe", { meet_id });
  }

  /* ------------------------------------------------------------------ */
  /*                       5. PUBLIC INFORMATION                        */
  /* ------------------------------------------------------------------ */

  getInfo() {
    return this.http.get<SystemInfo>("/api/info");
  }

  getStatus() {
    return this.http.get<UserStatus>("/api/status");
  }

  getStandings() {
    return this.http.get<StandingItem[]>("/api/standings");
  }

  confirmEducation(payload: EducationPayload) {
    return this.http.post<void>("/api/edu", payload);
  }
}

/* -------------------------------------------------------------------- */
/*                                 TYPES                                */
/* -------------------------------------------------------------------- */

export interface RegisterPayload {
  email: string;
  password: string;
  region: string;
  name: string;
  last_name: string;
  code: string;
  business?: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserData;
}

// Описание вложенного объекта игры
export interface GameInfo {
  name: string;
  type: string; // например "quiz"
  days: number[]; // например [1,2,3…]
  max_attempts: number;
  max_points: number;
}

export interface AnswerOption {
  full_img: string;
  id: number;
  test_points: number | null;
  text: string;
  thumb_img: string;
}

export interface QuestionData {
  day: number;
  full_img: string;
  id: number;
  points: number;
  text: string;
  thumb_img: string;
  answers: AnswerOption[];
}

export interface GameStartResponse {
  status: boolean;
  day: number;
  user_game_day: number;
  answered_questions: number;
  total_questions: number;
  game: GameInfo;
  next_day: string;
  question: QuestionData;
  user_questions: any[];
}

export interface GameResultPayload {
  game: string;
  result?: string;
  prompt?: string;
  points?: number;
  question?: string;
  answer?: string;
  answerId?: string;
  answers?: unknown;
}

export interface GalleryParams {
  question_id: string;
  my?: boolean;
  sort?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  likes: number;
  isMine: boolean;
}

export interface MeetSlot {
  id: number;
  type: string;
  date: string;
  time: string;
  link: string;
  status: string;
  staff: {
    name: string;
    img: string | null;
    position: string | null;
    directions: string[];
  };
}

export interface MeetsResponse {
  status: boolean;
  meets: MeetSlot[];
}

export interface ResumeAnalyseResponse {
  analysis?: string;
  summary?: string;
  tags?: string[];
  status?: boolean;
}

export interface InterviewBookingResponse {
  status: boolean;
  message?: string;
}

export interface SystemInfo {
  games: string[];
  version: string;
}

export interface UserStatus {
  user: {
    nickname: string;
    name: string;
    position: string;
    /** Кол-во оставшихся попыток проверки резюме (приходит с бэка) */
    check_resume_attempts_left?: number;
    kofe: {
      id: number;
      type: string;
      date: string;
      time: string;
      link: string;
      status: string;
      staff: {
        name: string;
        directions: string[];
      };
    } | null;
    games: Array<{
      name: string;
      status: string;
      points: number;
    }>;
    points: number;
    region: string;
    sobes: {
      id: number;
      type: string;
      date: string;
      time: string;
      link: string;
      status: string;
      staff: {
        name: string;
        directions: string[];
      };
    } | null;
    status: string;
  };
  position: number | null;
}

export interface StandingItem {
  email: string;
  points: number;
}

export interface EducationPayload {
  child: {
    name: string;
    age: number;
  };
  parents: {
    name: string;
    phone: string;
  };
}

export const apiService = new ApiService("https://tb.anilau.com");
