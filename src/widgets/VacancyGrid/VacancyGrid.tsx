import type { FC } from "react";
import { Button } from "antd";

const vacancies = new Array(6).fill(null);

export const VacancyGrid: FC = () => (
  <section aria-labelledby="vacancy-title">
    <h2 id="vacancy-title">Вакансии</h2>

    <div
      style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
    >
      {["Все", "Продажи и развитие", "Дизайн", "Финансы", "Работа в IT"].map(
        (tag) => (
          //   <FilterTag key={tag} label={tag} />
          <>{tag}</>
        )
      )}
    </div>

    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      }}
    >
      {vacancies.map((_, i) => (
        <article
          key={i}
          aria-label={`Вакансия ${i + 1}`}
          style={{ border: "1px solid #eee", padding: 16 }}
        >
          <h3>Продавец (Розничная сеть МТС)</h3>
          <p>от 60 000 до 90 000 ₽</p>
          <p style={{ fontSize: 12, color: "#777" }}>
            В офисе • Гибкий график • АО РТК
          </p>
          <Button type="link" aria-label="Смотреть вакансию">
            →
          </Button>
        </article>
      ))}
    </div>

    <Button
      type="primary"
      style={{ marginTop: 24 }}
      aria-label="Больше вакансий"
    >
      Больше вакансий
    </Button>
  </section>
);
