import type { FC } from "react";
import { useState } from "react";
import { Container } from "@chernyshovaalexandra/mtsui";
import { MainLayout } from "../../layouts";
import { useSEO } from "../../shared";
import { useUserStore } from "../../store";
import {
  TipsGrid,
  ExpandableSection,
  ResumeGame,
  MobileResumeGame,
  AIResumeChecker,
  HRVideosCarousel
} from "./components";
import {
  PageContainer,
  HeroSection,
  ContentWrapper,
  MainTitle,
  IntroText,
  BulletList,
  MobileHeroImage,
  ContentSection,
  GlobalAccessibilityStyles
} from "./styles";
import { resumePageSEO } from "./seo";

const ResumePage: FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const attemptsLeft = useUserStore((s) => s.user?.checkResumeAttemptsLeft ?? 0);

  useSEO(resumePageSEO);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      <GlobalAccessibilityStyles />
      <MainLayout>
        <HeroSection aria-labelledby="main-heading" role="banner">
          <Container>
            <ContentWrapper>
              <MainTitle id="main-heading" variant="H1-Wide">
                Подготовка резюме
              </MainTitle>
              
              <IntroText variant="P4-Regular-Text" role="text">
                Шаг за шагом научись создавать резюме, которое выделит тебя среди других кандидатов.
              </IntroText>

              <BulletList 
                role="list" 
                aria-label="Этапы подготовки резюме"
              >
                <li role="listitem">Изучи основные советы</li>
                <li role="listitem">Сравни хорошие и неудачные примеры</li>
                <li role="listitem">Получи обратную связь от HR</li>
                <li role="listitem">Познакомься с опытом реальных сотрудников МТС</li>
                <li role="listitem">Перейди к следующему этапу</li>
              </BulletList>
            </ContentWrapper>
          </Container>
        </HeroSection>

        <Container>
          <PageContainer>
            <MobileHeroImage 
              role="img" 
              aria-label="Иллюстрация подготовки резюме"
            />

            <ContentSection 
              aria-labelledby="learning-resources-heading"
              role="main"
            >
              <h2 
                id="learning-resources-heading" 
                className="visually-hidden"
              >
                Материалы для обучения
              </h2>

              <ExpandableSection
                id="tips"
                title="Карточки с советами"
                description="Нажимай на карточки, читай рекомендации по составлению резюме и получай баллы после просмотра."
                isExpanded={expandedSections.includes("tips")}
                onToggle={() => toggleSection("tips")}
              >            
                <TipsGrid />
              </ExpandableSection>

              <ExpandableSection
                id="dos-donts"
                title="Собери резюме"
                description="Выбирай удачные примеры и избегай ошибок. По кнопке узнай результат, получи баллы и скачай эталон резюме."
                isExpanded={expandedSections.includes("dos-donts")}
                onToggle={() => toggleSection("dos-donts")}
              >
                <ResumeGame />
                <MobileResumeGame />
              </ExpandableSection>

              <ExpandableSection
                id="ai-checker"
                title="Проверка резюме с помощью ИИ"
                isExpanded={expandedSections.includes("ai-checker")}
                onToggle={() => toggleSection("ai-checker")}
                noPaddingTop={true}
              >
                <AIResumeChecker attemptsRemaining={attemptsLeft} />
              </ExpandableSection>

              <ExpandableSection
                id="hr-videos"
                title="Видео от HR-специалистов"
                description="Специалисты подут тебе советы по подготовке резюме."
                isExpanded={expandedSections.includes("hr-videos")}
                onToggle={() => toggleSection("hr-videos")}
              >
                <HRVideosCarousel />
              </ExpandableSection>
            </ContentSection>
          </PageContainer>
        </Container>
      </MainLayout>
    </>
  );
};

export default ResumePage;
