import { useState, type FC } from "react";
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
import { apiService } from "../../services/apiService";
import axios from "axios";

const LoginPage: FC = () => {
  const { email, setEmail, password, setPassword, sent } = useOtpLogin();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await apiService.login(email.trim(), password);
      /**
       * предполагаем, что backend вернёт:
       * { access_token: string }
       */
      // apiService.setAccessToken(data.access_token);

      // TODO: здесь – навигация на главную или обновление стора
      console.info(data, "Успешный логин");
    } catch (err) {
      // Axios-ошибка с телом `{ message: string }`
      if (axios.isAxiosError(err) && err.response?.data) {
        const message =
          // many backends кладут текст в разных полях
          (err.response.data as { message?: string; error?: string }).message ??
          (err.response.data as { error?: string }).error ??
          "Ошибка авторизации";
        setError(message);
      } else {
        setError("Не удалось подключиться к серверу. Попробуйте позже.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container>
        <PageWrapper>
          <Header variant="H1-Wide" style={{ textAlign: "center" }}>
            Вход
          </Header>

          <Form onSubmit={handleSubmit}>
            <Input
              required
              autoComplete="email"
              label="E-mail"
              disabled={sent}
              type="email"
              placeholder="Введи почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              required
              label="Пароль"
              placeholder="Введи пароль"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Text
                role="alert"
                variant="P3-Regular-Comp"
                style={{
                  textAlign: "center",
                  color: mts_brand_red,
                }}
              >
                {error}
              </Text>
            )}
            <BottomRow>
              <Button
                disabled={!email || !password}
                loading={loading}
                type="submit"
                variant="primary"
                aria-label="Перейти на страницу входа на платформу"
              >
                Войти
              </Button>
              <Button
                style={{ display: "block", width: "100%", maxWidth: "100%" }}
                link="/register"
                btn_type="link"
                variant="tetriary"
                aria-label="Перейти на страницу входа на платформу"
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
