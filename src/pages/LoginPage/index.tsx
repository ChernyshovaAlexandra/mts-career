import { type FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Header, Text, Button } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";

const PageWrapper = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #ff0032;
  font-size: 14px;
  cursor: pointer;
`;

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (!sent || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [sent, timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleEmailBlur = () => {
    if (email && !sent) setSent(true);
  };

  const handleResend = () => {
    setTimeLeft(600);
  };

  return (
    <MainLayout>
      <Container>
        <PageWrapper>
          <Header variant="H1-Wide" style={{ textAlign: "center" }}>
            Авторизация
          </Header>

          {sent && (
            <Text variant="P4-Regular-Text" style={{ textAlign: "center" }}>
              На твою почту был отправлен код для входа, он действует {minutes}
              :{seconds} мин.
            </Text>
          )}

          <Form>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />

            {sent && (
              <Input
                type="text"
                placeholder="Код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            )}

            {sent && (
              <BottomRow>
                <LinkButton type="button" onClick={handleResend}>
                  Отправить код повторно
                </LinkButton>
                <Button variant="primary">Войти</Button>
              </BottomRow>
            )}
          </Form>
        </PageWrapper>
      </Container>
    </MainLayout>
  );
};

export default LoginPage;
