import { useState, type FC } from "react";
import styled from "styled-components";
import {
  Container,
  Header,
  Input,
  Select,
  Button,
} from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";

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
  const [city, setCity] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle registration
  };

  return (
    <MainLayout>
      <Container>
        <Header variant="H1-Wide" style={{ marginBottom: 24 }}>
          Регистрация
        </Header>
        <Form onSubmit={onSubmit}>
          <Input label="E-mail" value={email} onChange={setEmail} />
          <Input label="Имя" value={firstName} onChange={setFirstName} />
          <Input label="Фамилия" value={lastName} onChange={setLastName} />
          <Select
            label="Город"
            placeholder="Выберите город"
            options={cities.map((c) => ({ label: c, value: c }))}
            value={city}
            onChange={setCity}
          />
          <Button variant="primary" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default RegisterPage;
