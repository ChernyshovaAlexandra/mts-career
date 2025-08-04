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
      headers: { "Content-Type": "application/json" },
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
    return this.http.post<void>("/api/game/result", payload);
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
    return this.http.get<MeetSlot[]>("/api/meets");
  }

  uploadResume(file: File) {
    const formData = new FormData();
    formData.append("resume", file);
    return this.http.post<ResumeAnalyseResponse>("/api/resume", formData);
  }

  bookInterview(meet_id: number, resume: File) {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("meet_id", String(meet_id));
    return this.http.post<void>("/api/sobes", formData);
  }

  bookCoffee(meet_id: number) {
    return this.http.post<void>("/api/kofe", { meet_id });
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
  disability: boolean;
}

export interface LoginResponse {
  access_token: string;
  user: UserData;
}

export interface GameStartResponse {
  session_id: string;
}

export interface GameResultPayload {
  game: string;
  result: string;
  prompt: string;
  points: number;
  question: string;
  answer: string;
  answerId: string;
  answers: unknown;
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
  start: string;
  end: string;
}

export interface ResumeAnalyseResponse {
  summary: string;
  tags: string[];
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
    kofe: unknown;
    games: [unknown];
    points: number;
    region: string;
    sobes: unknown;
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
