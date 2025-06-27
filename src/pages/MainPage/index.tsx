import { Text } from "@chernyshovaalexandra/mtsui";
import { CardGrid, Section } from "../../shared";
import { ActivityCard, SkillCard } from "../../entities";
import { MainLayout } from "../../layouts";
import { useNavigate } from "react-router-dom"; // ✅ навигация

const MainPage = () => {
  const navigate = useNavigate(); // ✅

  return (
    <MainLayout>
      {/* <PageTitle title="Название проекта" subtitle="..." /> */}

      <Section title="О проекте">
        <Text variant="P3-Regular-Comp">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Section>

      <Section title="Общие навыки">
        <CardGrid columns={3}>
          <SkillCard
            title="Подготовка резюме"
            onClick={() => navigate("/resume")}
          />
          <SkillCard
            title="Подготовка к собеседованию"
            onClick={() => navigate("/interview")}
          />
          <SkillCard title="Работа в МТС" onClick={() => navigate("/work")} />
        </CardGrid>
      </Section>

      <Section title="Активности по направлениям">
        <CardGrid columns={2}>
          <ActivityCard title="Маркетинг и коммуникации" />
          <ActivityCard title="Сервис и услуги" />
          <ActivityCard title="IT-направление" />
          <ActivityCard title="Финансы" />
        </CardGrid>
      </Section>
    </MainLayout>
  );
};

export default MainPage;
