import { type FC, useRef } from "react";
import { Container, Header, Button, Input } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { BottomRow, LinkButton, PageWrapper, Form } from "./style";
import { useOtpLogin } from "./hooks";
import { OtpTimer } from "./components";

const LoginPage: FC = () => {
  const {
    email,
    setEmail,
    code,
    setCode,
    sent,
    setSent,
    timeLeft,
    startTimer,
    expired,
  } = useOtpLogin();

  const codeInputRef = useRef<HTMLInputElement>(null);

  /* --- callbacks --- */
  const requestOtp = () => {
    // TODO: запросить код на backend
    setSent(true);
    startTimer();
    /* Переводим фокус на появившееся поле */
    queueMicrotask(() => codeInputRef.current?.focus());
  };

  const resendOtp = () => {
    // TODO: повторный запрос кода
    startTimer();
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.info(111);
    e.preventDefault();
    sent ? /* TODO: отправить email+code */ null : requestOtp();
  };

  return (
    <MainLayout>
      <Container>
        <PageWrapper>
          <Header variant="H1-Wide" style={{ textAlign: "center" }}>
            Авторизация
          </Header>

          {sent && <OtpTimer seconds={timeLeft} />}

          <Form onSubmit={handleSubmit}>
            <Input
              autoComplete="email"
              label="E-mail"
              disabled={sent}
              type="email"
              placeholder="Введи почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {sent && (
              <Input
                ref={codeInputRef}
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="\d{6}"
                aria-describedby="code-timer"
                type="password"
                label="Код"
                placeholder="6-значный код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            )}

            {sent ? (
              <BottomRow>
                {expired ? (
                  <LinkButton
                    as="button"
                    type="button"
                    onClick={resendOtp}
                    aria-disabled={!expired}
                    tabIndex={expired ? 0 : -1}
                  >
                    Отправить код повторно
                  </LinkButton>
                ) : (
                  <></>
                )}

                <Button type="submit" variant="primary">
                  Войти
                </Button>
              </BottomRow>
            ) : (
              <BottomRow>
                <Button type="submit" variant="primary">
                  Получить код для входа
                </Button>
              </BottomRow>
            )}
          </Form>
        </PageWrapper>
      </Container>
    </MainLayout>
  );
};

export default LoginPage;
