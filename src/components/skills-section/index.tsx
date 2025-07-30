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
      subtitle={applyNbsp(`Сделай первые шаги к карьере в МТС: оттачивай мастерство самопрезентации, совершенствуй деловое общение и знакомься с командой.`)}
      headingLevel={2}
    >
      <CardGrid>
        <SkillCard
          title={`Подготовка\nрезюме`}
          description={applyNbsp("Создай резюме, которое заметят: проверенные рекомендации, реальные примеры, проверка ИИ и лайфхаки от HR-экспертов МТС для успешного старта карьеры.")}
          img="/images/skills/resume.png"
          onClick={() => navigate("/resume")}
        />

        <SkillCard
          title={`Подготовка\nк собеседованию`}
          description={applyNbsp("Пройди путь от теории к практике: работающие советы, симуляция интервью и конструктивная обратная связь помогут чувствовать себя уверенно.")}
          img="/images/skills/interview.png"
          onClick={() => navigate("/interview")}
        />

        <SkillCard
          title="Работа в МТС"
          description={applyNbsp("Узнай, как устроена работа в МТС: выбери интересующую область, изучи доступные вакансии и пообщайся с командой напрямую.")}
          img="/images/skills/work.png"
          onClick={() => navigate("/work")}
        />
      </CardGrid>
    </Section>
  );
};
