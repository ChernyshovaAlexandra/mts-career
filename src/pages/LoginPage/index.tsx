import { useState, useRef, useEffect, type FC, type FormEvent } from "react";
import axios from "axios";
import {
  Container,
  Header,
  Button,
  Input,
  Link,
  Text,
  mts_brand_red,
} from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { BottomRow, PageWrapper, Form } from "./style";
import { useOtpLogin } from "./hooks";
import { apiService, ApiService } from "../../services/apiService";

interface FieldErrors {
  email?: string;
  password?: string;
}
/**
 * Login page with *maximal* accessibility support (WCAG 2.2 AA):
 *  – Semantic landmarks & heading
 *  – Proper label↔input association via id/aria-labelledby
 *  – aria-invalid / aria-describedby when errors present
 *  – role="alert" + aria-live="assertive" for error message, focus on appearance
 *  – Loading state communicated via aria-busy
 */
const LoginPage: FC = () => {
  const { email, setEmail, password, setPassword, sent } = useOtpLogin();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [loading, setLoading] = useState(false);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

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
      const { data } = await apiService.login(email.trim(), password);
      ApiService.setAccessToken(data.access_token);
      // TODO: navigate/update store
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const resp = err.response.data as any;
        // 1. Field-level errors
        if (resp.errors) {
          const fe: FieldErrors = {};
          for (const key of Object.keys(resp.errors)) {
            const arr: string[] = resp.errors[key];
            if (arr && arr.length) fe[key as keyof FieldErrors] = arr[0];
          }
          setFieldErrors(fe);
          // если есть общий message
          if (resp.message && typeof resp.message === "string") {
            setGeneralError(resp.message);
          }
        } else {
          // 2. Fallback to message or error property
          const msg =
            resp.message ??
            resp.error ??
            "Ошибка авторизации. Попробуйте ещё раз.";
          setGeneralError(msg);
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
      {/* <main> landmark is implied by MainLayout; ensure only one H1 on page */}
      <Container aria-busy={loading}>
        {/* communicates loading state */}
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
            {/* {generalError && (
              <Text
                id={generalErrorId}
                // ref={errorRef}
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                variant="P3-Regular-Comp"
                style={{
                  textAlign: "center",
                  color: mts_brand_red,
                  marginTop: 12,
                }}
              >
                {generalError}
              </Text>
            )} */}
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
                style={{ display: "block", width: "100%", maxWidth: "100%" }}
                btn_type="link"
                variant="tetriary"
                aria-label="Перейти к регистрации"
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
