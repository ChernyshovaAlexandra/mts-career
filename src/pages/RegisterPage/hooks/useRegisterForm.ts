import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { apiService } from "../../../services/apiService";
import type {
  City,
  RegisterResponse,
  UseRegisterFormProps,
  ValidationErrors,
} from "./types";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_TTL_SEC = 600;

export const useRegisterForm = (): UseRegisterFormProps => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState<City>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disability, setDisability] = useState<string>("false");
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});
  const expired = codeSent && timeLeft <= 0;

  const sendCode = useCallback(async () => {
    if (!email.trim()) {
      setError("Сначала укажите e-mail");
      return;
    }
    setError(null);
    setSendingCode(true);
    try {
      const { data } = await apiService.checkEmail(email.trim());

      if (data && (data as any).status === false) {
        setError((data as any).message || "Не удалось отправить код");
        setCodeSent(false);
      } else {
        setCodeSent(true);
        setTimeLeft(OTP_TTL_SEC);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const msg =
          (err.response.data as { message?: string }).message ||
          "Не удалось отправить код";
        setError(msg);
      } else {
        setError("Сервер недоступен, попробуйте позже.");
      }
      setCodeSent(false);
    } finally {
      setSendingCode(false);
    }
  }, [email]);

  const submit = useCallback(async () => {
    setFieldErrors({});
    if (disability !== "true" && disability !== "false") {
      setError("Пожалуйста, укажите, есть ли у вас инвалидность");
      return null;
    }
    if (password !== password2) {
      setError("Пароли не совпадают");
      return null;
    }
    if (!city) {
      setError("Выберите город");
      return null;
    }
    setError(null);
    setLoading(true);
    try {
      const { data } = await apiService.register({
        email: email.trim(),
        password,
        region: city,
        name: firstName.trim(),
        last_name: lastName.trim(),
        code,
        disability: disability === "true" ? true : false,
      });

      if ((data as any).status === false && (data as any).errors) {
        const errors = (data as any).errors as ValidationErrors;
        setFieldErrors(errors);
        throw new Error("Validation errors");
      }
      return data as unknown as RegisterResponse;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const resp = err.response.data as any;
        if (resp.errors) {
          setFieldErrors(resp.errors as ValidationErrors);
        } else if (resp.message) {
          setError(resp.message);
        }
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [email, password, password2, city, firstName, lastName, code]);

  useEffect(() => {
    if (!codeSent || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [codeSent, timeLeft]);

  return {
    firstName,
    fieldErrors,
    setFirstName,
    lastName,
    setLastName,
    city,
    setCity,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    code,
    setCode,
    codeSent,
    loading,
    sendingCode,
    error,
    sendCode,
    submit,
    disability,
    setDisability,
    timeLeft,
    expired,
  };
};
