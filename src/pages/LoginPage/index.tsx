import { useState, useRef, useEffect, type FC, type FormEvent } from "react";
import axios from "axios";
import {
  Container,
  Header,
  Button,
  Input,
  Link,
} from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { BottomRow, PageWrapper, Form } from "./style";
import { useOtpLogin } from "./hooks";
import { apiService, ApiService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useUserStore, type UserData } from "../../store";

interface FieldErrors {
  email?: string;
  password?: string;
}

const LoginPage: FC = () => {
  const { email, setEmail, password, setPassword, sent } = useOtpLogin();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);

  const emailId = "login-email";
  const passwordId = "login-password";
  const generalErrorId = "login-error";

  useEffect(() => {
    if (generalError) {
      errorRef.current?.focus();
    }
  }, [generalError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setLoading(true);

    try {
      const loginResp = await apiService.login(email.trim(), password);
      const token = loginResp.data.access_token;
      ApiService.setAccessToken(token);

      const statusResp = await apiService.getStatus();
      const { user, position } = statusResp.data;
      const updUser: UserData = {
        ...user,
        personalCode: user.nickname,
        position: position,
      };

      setUser({ ...updUser });

      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const resp = err.response.data as any;
        if (resp.errors) {
          const fe: FieldErrors = {};
          for (const key of Object.keys(resp.errors)) {
            const arr: string[] = resp.errors[key];
            if (arr?.length) fe[key as keyof FieldErrors] = arr[0];
          }
          setFieldErrors(fe);
          if (typeof resp.message === "string") {
            setGeneralError(resp.message);
          }
        } else {
          setGeneralError(
            resp.message ??
              resp.error ??
              "Ошибка авторизации. Попробуйте ещё раз."
          );
        }
      } else {
        setGeneralError("Не удалось подключиться к серверу. Попробуйте позже.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container aria-busy={loading}>
        <PageWrapper>
          <Header
            id="login-heading"
            variant="H1-Wide"
            style={{ textAlign: "center" }}
          >
            Вход
          </Header>
          <Form
            as="form"
            onSubmit={handleSubmit}
            aria-labelledby="login-heading"
          >
            <Input
              id={emailId}
              name="email"
              required
              autoComplete="email"
              label="E-mail"
              disabled={sent || loading}
              type="email"
              placeholder="Введи почту"
              value={email}
              errorMessage={fieldErrors.email}
              aria-describedby={
                fieldErrors.email
                  ? `${emailId}-error`
                  : generalError
                  ? generalErrorId
                  : undefined
              }
              aria-invalid={!!fieldErrors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id={passwordId}
              name="password"
              required
              label="Пароль"
              autoComplete="current-password"
              placeholder="Введи пароль"
              value={password}
              type="password"
              disabled={loading}
              errorMessage={fieldErrors.password}
              aria-describedby={
                fieldErrors.password
                  ? `${passwordId}-error`
                  : generalError
                  ? generalErrorId
                  : undefined
              }
              aria-invalid={!!fieldErrors.password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <BottomRow>
              <Button
                disabled={!email || !password || loading}
                loading={loading}
                type="submit"
                variant="primary"
                aria-label="Войти в личный кабинет"
              >
                Войти
              </Button>
              <Button
                link="/register"
                btn_type="link"
                variant="tetriary"
                aria-label="Перейти к регистрации"
                style={{ display: "block", width: "100%", maxWidth: "100%" }}
              >
                Зарегистрироваться
              </Button>
              <Link url="/password-recovery" type="link">
                Не помню пароль
              </Link>
            </BottomRow>
          </Form>
        </PageWrapper>
      </Container>
    </MainLayout>
  );
};

export default LoginPage;
