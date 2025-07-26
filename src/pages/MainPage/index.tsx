import { MainLayout } from "../../layouts";
import {
  ActivitiesSection,
  KVSection,
  MarathonSteps,
  SkillsSection,
  VideoSection
} from "../../components";

const MainPage = () => {
  return (
    <MainLayout>
      <KVSection />
      <MarathonSteps />
      <SkillsSection />
      <ActivitiesSection />
      <VideoSection />
    </MainLayout>
  );
};

export default MainPage;
