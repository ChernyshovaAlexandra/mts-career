import { useNavigate } from "react-router-dom";
import { ActivitiesGrid, ActivitiesWrapper } from "./styles";
import { ActivityCard } from "./ActivityCard";
import { Section } from "../../shared";
import { applyNbsp } from "../../utils";

export const ActivitiesSection = () => {
  const navigate = useNavigate();

  const activities = [
    {
      title: "Финтех",
      description: applyNbsp(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      route: "/activities/fintech",
    },
    {
      title: "MTC Медиа",
      description: applyNbsp(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      route: "/activities/media",
    },
    {
      title: "Рекламные технологии AdTech",
      description: applyNbsp(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      route: "/activities/adtech",
    },
    {
      title: "IT-направление MTS Web Services",
      description: applyNbsp(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      route: "/activities/web",
    },
    {
      title: "Кикшеринг МТС Юрент",
      description: applyNbsp(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      route: "/activities/urent",
    },
    {
      title: "Телеком",
      description: applyNbsp(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      route: "/activities/telecom",
    },
  ];

  return (
    <ActivitiesWrapper>
      <Section
        id="activities"
        title="Участвуй в активностях"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        headingLevel={2}
      >
        <ActivitiesGrid>
          {activities.map((item) => (
            <ActivityCard
              key={item.title}
              title={item.title}
              description={item.description}
              onClick={() => navigate(item.route)}
            />
          ))}
        </ActivitiesGrid>
      </Section>
    </ActivitiesWrapper>
  );
};
