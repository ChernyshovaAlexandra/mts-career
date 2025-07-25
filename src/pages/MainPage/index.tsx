import { Text } from "@chernyshovaalexandra/mtsui";
import { CardGrid, Section } from "../../shared";
import { ActivityCard, SkillCard } from "../../entities";
import { MainLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { KVSection, MarathonSteps } from "../../components";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <KVSection />
      <MarathonSteps />
      {/*

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
          <ActivityCard
            title="Маркетинг и коммуникации"
            onClick={() => navigate("/marketing")}
          />
          <ActivityCard
            title="Сервис и услуги"
            onClick={() => navigate("/service")}
          />
          <ActivityCard
            title="IT-направление"
            onClick={() => navigate("/it")}
          />
          <ActivityCard title="Финансы" onClick={() => navigate("/finance")} />
        </CardGrid>
      </Section> */}
    </MainLayout>
  );
};

export default MainPage;
