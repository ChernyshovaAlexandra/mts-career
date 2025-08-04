import { type FC, useMemo, useRef } from "react";
import {
  Input,
  Select,
  Container,
  Header,
  Text,
  Button,
  Link,
  mts_brand_red,
  IconError,
  RadioGroup,
} from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { Form, PageWrapper } from "../LoginPage/style";
import { emailRegex, useRegisterForm } from "./hooks/useRegisterForm";
import type { City, RegisterResponse } from "./hooks/types";
import { useUserStore } from "../../store";
import { ApiService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../shared";
import { Flex } from "antd";

const cities: City[] = [
  "Москва",
  "Санкт-Петербург",
  "Екатеринбург",
  "Казань",
  "Новосибирск",
  "Витебск",
];

const RegisterPage: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  const {
    firstName,
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
    codeSent,
    setCode,
    fieldErrors,
    loading,
    sendingCode,
    error,
    sendCode,
    submit,
    timeLeft,
    expired,
    inval,
    setInval,
  } = useRegisterForm();
  const { showSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: RegisterResponse | null = await submit();
      if (!data) return;

      ApiService.setAccessToken(data.access_token);

      setUser(data.user);

      showSnackbar({
        message: (
          <div style={{ display: "flex", alignItems: "center" }}>
            Успешно зарегистрированы!
          </div>
        ),
        type: "success",
        autoHideDuration: 5000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      showSnackbar({
        message: "Ошибка регистрации. Попробуйте ещё раз.",
        type: "error",
      });
    }
  };

  const passwordsMatch = useMemo(
    () => password2.length > 0 && password === password2,
    [password, password2]
  );

  const emailValid = useMemo(() => {
    if (email.length < 2) return true;
    return emailRegex.test(email);
  }, [email]);

  return (
    <MainLayout>
      <Container>
        <PageWrapper>
          <Header variant="H1-Wide" style={{ textAlign: "center" }}>
            Регистрация
          </Header>

          <Form
            onSubmit={onSubmit}
            aria-describedby="form-description"
            aria-busy={loading}
          >
            <Input
              id="firstName"
              name="firstName"
              label="Имя"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              aria-required="true"
              errorMessage={fieldErrors.firstName?.[0]}
            />

            <Input
              id="lastName"
              name="lastName"
              label="Фамилия"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              aria-required="true"
              errorMessage={fieldErrors.last_name?.[0]}
            />

            <Select
              id="city"
              name="city"
              label="Город"
              placeholder="Выберите город"
              options={cities.map((c) => ({ label: c, value: c }))}
              value={city!}
              onChange={(_name, value) => setCity(value as City)}
              required
              aria-required="true"
              errorMessage={fieldErrors.region?.[0]}
            />

            <RadioGroup
              name="inval"
              direction="horizontal"
              options={[
                { label: "Да", value: "true" },
                { label: "Нет", value: "false" },
              ]}
              value={inval}
              onChange={setInval}
              label="Имеется ли у вас установленная инвалидность?"
            />
            <Input
              id="password"
              name="password"
              label="Пароль"
              placeholder="Введи пароль"
              autoComplete="new-password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              errorMessage={fieldErrors.password?.[0]}
            />

            <Input
              id="password2"
              name="password2"
              label="Подтверждение пароля"
              placeholder="Введи пароль ещё раз"
              autoComplete="new-password"
              value={password2}
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              required
              aria-invalid={password2.length > 0 && !passwordsMatch}
              aria-describedby={
                password2.length > 0 && !passwordsMatch
                  ? "password-mismatch"
                  : undefined
              }
              errorMessage={
                password2.length > 0 && !passwordsMatch
                  ? `Пароли не совпадают`
                  : null
              }
            />

            <Input
              id="email"
              ref={emailRef}
              name="email"
              label="E-mail"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!emailValid}
              aria-required="true"
              validatePattern={emailRegex}
              errorMessage={
                !emailValid ? "Неверный формат e-mail" : fieldErrors.email?.[0]
              }
            />

            <Input
              id="code"
              name="code"
              label="Код из письма"
              placeholder="Введи код"
              autoComplete="one-time-code"
              value={code}
              disabled={!codeSent}
              type="text"
              onChange={(e) => setCode(e.target.value)}
              required
              errorMessage={fieldErrors.code?.[0]}
            />
            {codeSent ? (
              <Flex gap="20px" align="center">
                <Text variant="P3-Regular-Comp">
                  Код действует{" "}
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </Text>
                <Link onClick={sendCode}>Отправить код повторно</Link>
              </Flex>
            ) : (
              <></>
            )}
            <Text id="form-description" variant="P3-Regular-Comp">
              Продолжая, ты соглашаешься с{" "}
              <Link style={{ display: "inline", fontSize: "inherit" }}>
                Офертой
              </Link>{" "}
              и{" "}
              <Link style={{ display: "inline", fontSize: "inherit" }}>
                Условиями обработки персональных данных
              </Link>
              .
            </Text>
            {error && (
              <Flex align="center" gap="5px">
                <IconError style={{ color: mts_brand_red }} />
                <Text
                  variant="P4-Regular-Comp"
                  style={{ color: mts_brand_red }}
                >
                  {error}
                </Text>
              </Flex>
            )}
            {!codeSent ? (
              <Button
                style={{ width: "100%", maxWidth: "100%", marginTop: 16 }}
                variant="secondary"
                type="button"
                onClick={sendCode}
                disabled={sendingCode || !emailValid}
              >
                {sendingCode ? "Отправляем…" : "Получить код"}
              </Button>
            ) : (
              <>
                <Button
                  style={{ width: "100%", maxWidth: "100%", marginTop: 16 }}
                  variant="tetriary"
                  type="submit"
                  disabled={loading || !passwordsMatch || !emailValid || !code}
                >
                  {loading ? "Зарегистрируем…" : "Зарегистрироваться"}
                </Button>
              </>
            )}
          </Form>
        </PageWrapper>
      </Container>
    </MainLayout>
  );
};

export default RegisterPage;
