import type { FC } from "react";
import { Section } from "../../shared";
import { Carousel } from "antd";

export const SuccessStoriesCarousel: FC = () => (
  <section aria-labelledby="success-title">
    <Section title="История успеха" subtitle="Краткое описание" />
    <Carousel dots>
      {[1, 2, 3].map((_, i) => (
        <div key={i} style={{ padding: "0 8px" }}>
          {/* <EmployeeCard
            name="Имя Фамилия"
            position="Должность"
            selected={i === 0}
            onClick={() => console.log(`Нажали карточку #${i + 1}`)}
          /> */}
        </div>
      ))}
    </Carousel>
  </section>
);
