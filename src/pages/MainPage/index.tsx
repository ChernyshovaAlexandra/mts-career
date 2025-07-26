import { Text } from "@chernyshovaalexandra/mtsui";
import { CardGrid, Section } from "../../shared";
import { ActivityCard, SkillCard } from "../../entities";
import { MainLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { KVSection, MarathonSteps, SkillsSection } from "../../components";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <KVSection />
      <MarathonSteps />
      <SkillsSection />
      {/*

      

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
