import { useState, type FC, useRef } from "react";
import styled from "styled-components";
import { Input, Select, Button } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { Section } from "../../shared";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  margin: 0 auto;
`;

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Екатеринбург",
  "Казань",
  "Новосибирск",
];

const RegisterPage: FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Пример валидации (показываем, как можно сфокусироваться)
    if (!email.trim()) {
      emailRef.current?.focus();
      return;
    }

    // TODO: handle registration
  };

  return (
    <MainLayout>
      <Section title="Регистрация" aria-labelledby="registration-title">
        <Form onSubmit={onSubmit} aria-describedby="form-description">
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend
              id="registration-title"
              style={{ fontSize: 24, marginBottom: 8 }}
            >
              Регистрация
            </legend>
            <p id="form-description" style={{ fontSize: 14, color: "#666" }}>
              Все поля обязательны для заполнения
            </p>

            <Input
              id="email"
              ref={emailRef}
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-describedby="form-description"
            />

            <Input
              id="firstName"
              label="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              aria-required="true"
            />

            <Input
              id="lastName"
              label="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              aria-required="true"
            />

            <Select
              id="city"
              name="город"
              label="Город"
              placeholder="Выберите город"
              options={cities.map((c) => ({ label: c, value: c }))}
              value={city}
              onChange={(val) => setCity(val)}
              required
              aria-required="true"
            />

            <Button
              variant="primary"
              type="submit"
              aria-label="Отправить форму регистрации"
            >
              Зарегистрироваться
            </Button>
          </fieldset>
        </Form>
      </Section>
    </MainLayout>
  );
};

export default RegisterPage;
