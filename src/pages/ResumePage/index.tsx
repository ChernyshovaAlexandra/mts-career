import type { FC } from "react";
import { useState } from "react";
import { 
  Text, 
  Header, 
  Button,
  Container,
  mts_brand_red 
} from "@chernyshovaalexandra/mtsui";
import { Card, CardGrid, PageTitle } from "../../shared";
import { MainLayout } from "../../layouts";
import {
  TipsGrid,
  ExpandableSection,
  ResumeGame
} from "./components";
import styled from "styled-components";

const PageContainer = styled.div`
  padding-top: 44px;
  max-width: 1264px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  position: relative;
  background-image: url('/images/resume-bg.webp');
  background-repeat: no-repeat;
  background-position: right top;
  background-size: auto 400px;
  min-height: 400px;
  
  @media (max-width: 768px) {
    background-size: auto 300px;
    min-height: 300px;
    background-position: right center;
  }
  
  @media (max-width: 480px) {
    background-image: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 60%;
  
  @media (max-width: 768px) {
    max-width: 70%;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const IntroText = styled(Text)`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  margin-bottom: 21px;
`;

const BulletList = styled.ul`
  font-family: 'MTS Text', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  margin: 0;
  padding-left: 20px;
  margin-bottom: 21px;
  list-style: none;

  li {
    margin-bottom: 8px;
    position: relative;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &::before {
      content: "•";
      color: ${mts_brand_red};
      position: absolute;
      left: -16px;
      top: 0;
      font-size: 26px;
      line-height: 1;
    }
  }
`;

const ResumePage: FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <MainLayout>
      <Container>
        <PageContainer>
          <HeroSection>
            <ContentWrapper>
              <PageTitle>Подготовка резюме</PageTitle>
              
              <IntroText variant="P4-Regular-Text">
                Шаг за шагом научись создавать резюме, которое выделит тебя среди других кандидатов.
              </IntroText>

              <BulletList>
                <li>Изучи основные советы</li>
                <li>Сравни хорошие и неудачные примеры</li>
                <li>Получи обратную связь от HR</li>
                <li>Познакомься с опытом реальных сотрудников МТС</li>
                <li>Перейди к следующему этапу</li>
              </BulletList>
            </ContentWrapper>
          </HeroSection>




          <section 
            style={{ marginTop: 48 }}
            aria-labelledby="additional-resources-heading"
            role="region"
          >

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
            </ExpandableSection>

            <ExpandableSection
              id="ai-check"
              title="Проверка резюме с помощью ИИ"
              isExpanded={expandedSections.includes("ai-check")}
              onToggle={() => toggleSection("ai-check")}
            >
              <Card>
                <Text variant="P4-Regular-Text">
                  Загрузи свое резюме и получи персональные рекомендации от ИИ для улучшения:
                </Text>
                <BulletList>
                  <li>Структуры и форматирования</li>
                  <li>Содержания и ключевых слов</li>
                  <li>Соответствия требованиям вакансии</li>
                  <li>Грамматики и стилистики</li>
                </BulletList>
                <Button 
                  variant="secondary" 
                  style={{ marginTop: 16 }}
                  aria-label="Загрузить резюме для проверки"
                >
                  Загрузить резюме
                </Button>
              </Card>
            </ExpandableSection>

            <ExpandableSection
              id="hr-videos"
              title="Видео от HR-специалистов"
              isExpanded={expandedSections.includes("hr-videos")}
              onToggle={() => toggleSection("hr-videos")}
            >
              <CardGrid columns={3}>
                {[
                  "Как составить идеальное резюме",
                  "Топ-5 ошибок в резюме",
                  "Резюме для IT-сферы"
                ].map((title, index) => (
                  <Card key={index}>
                    <div 
                      style={{
                        width: "100%",
                        height: 120,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 8,
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      aria-label={`Превью видео: ${title}`}
                    >
                      <Text variant="P4-Regular-Text" style={{ opacity: 0.6 }}>
                        Видео
                      </Text>
                    </div>
                    <Header variant="H4-Wide" style={{ fontSize: 16, marginBottom: 8 }}>
                      {title}
                    </Header>
                    <Text variant="P4-Regular-Text" style={{ fontSize: 14, opacity: 0.7 }}>
                      Длительность: 5-7 мин
                    </Text>
                  </Card>
                ))}
              </CardGrid>
            </ExpandableSection>
          </section>
        </PageContainer>
      </Container>
    </MainLayout>
  );
};

export default ResumePage;
