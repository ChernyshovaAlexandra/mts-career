import { useState, type FC } from "react";

import { Section } from "../../shared";
import { EmployeeCard } from "../../entities/EmployeeCard";
import {
  Button,
  Carousel,
  DateInput,
  TimeInput,
} from "@chernyshovaalexandra/mtsui";
import { Flex } from "antd";

export const RandomCoffeeBlock: FC = () => {
  const items = [1, 2, 3, 4].map((_, i) => (
    <EmployeeCard
      key={i}
      name="Имя Фамилия"
      position="Должность"
      selected={i === 0}
      onClick={() => console.log(`Нажали карточку #${i + 1}`)}
    />
  ));
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <Section
      id="coffee-title"
      title="Рандом-кофе с сотрудником"
      subtitle="Краткое описание"
    >
      <Carousel
        items={items}
        slidesToShow={2}
        slidesToScroll={1}
        arrowColor="#FF0032"
        infinite={false}
      />

      <Flex gap="24px">
        <DateInput
          label="Дата"
          aria-label="Выбери дату"
          value={date}
          onChange={setDate}
        />
        <TimeInput
          label="Время"
          aria-label="Выбери время"
          value={time}
          onChange={setTime}
        />
      </Flex>

      <Button
        variant="primary"
        style={{ marginTop: 16 }}
        aria-label="Назначить встречу"
      >
        Назначить встречу
      </Button>
    </Section>
  );
};
