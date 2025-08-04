import type { UserData } from "../../../store/useUserStore";
export type City = string;

export interface RegisterResponse {
  access_token: string;
  token_type: string;
  user: UserData;
}
export interface ValidationErrors {
  [field: string]: string[];
}
export interface UseRegisterFormProps {
  fieldErrors: ValidationErrors;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  city?: City;
  expired: boolean;
  timeLeft: number;
  setCity: (v: City) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  password2: string;
  setPassword2: (v: string) => void;
  code: string;
  setCode: (v: string) => void;
  setDisability: (v: string) => void;
  codeSent: boolean;
  loading: boolean;
  disability: string;
  sendingCode: boolean;
  error: string | null;
  sendCode: () => Promise<void>;
  submit: () => Promise<RegisterResponse | null>;
}
