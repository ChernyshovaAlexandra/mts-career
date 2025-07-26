import { useNavigate } from "react-router-dom";
import { CardGrid } from "./CardGrid";
import { SkillCard } from "./SkillCard";
import { Section } from "../../shared";
import { applyNbsp } from "../../utils";

export const SkillsSection = () => {
  const navigate = useNavigate();

  return (
    <Section
      id="skills"
      title="Общие навыки для будущей работы"
      subtitle={applyNbsp("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")}
      headingLevel={2}
    >
      <CardGrid>
        <SkillCard
          title={`Подготовка\nрезюме`}
          description={applyNbsp("Научись создавать резюме, которое выделит тебя среди других кандидатов. Узнай, что ценит работодатель, получи персональные советы и обратную связь от ИИ.")}
          img="/images/skills/resume.png"
          onClick={() => navigate("/resume")}
        />

        <SkillCard
          title={`Подготовка\nк собеседованию`}
          description={applyNbsp("Попробуй себя в роли кандидата: отработай собеседование в симуляции, получи советы и будь готов к настоящему интервью.")}
          img="/images/skills/interview.png"
          onClick={() => navigate("/interview")}
        />

        <SkillCard
          title="Работа в МТС"
          description={applyNbsp("Узнай, как устроена работа в МТС из первых уст. Читай реальные истории, открывай вакансии и знакомься с командой.")}
          img="/images/skills/work.png"
          onClick={() => navigate("/work")}
        />
      </CardGrid>
    </Section>
  );
};
